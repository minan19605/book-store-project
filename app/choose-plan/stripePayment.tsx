import {
  collection,
  DocumentData,
  getDocs,
  addDoc,
  query,
  where,
  QueryDocumentSnapshot,
  onSnapshot,
} from 'firebase/firestore';


// import { getAuth } from "firebase/auth";
import { auth, db } from '@/firebase/init';

// Define the structure of the returned object
export interface PriceInfo {
  productId: string;
  productDescription: string;
  productName: string;
  priceId: string;
  priceType: string;
}


export async function fetchActiveProductsAndPrices(): Promise<PriceInfo[]> {
    // const userId = auth.currentUser?.uid;

  try {
    const productsQuery = query(
      collection(db, 'products'),
      where('active', '==', true)
    );

    const productsSnapshot = await getDocs(productsQuery);

    // Use Promise.all to handle concurrent fetching of prices
    const pricesInfo = await Promise.all(
      productsSnapshot.docs.map(async (productDoc: QueryDocumentSnapshot<DocumentData>) => {
        console.log("Product: ",productDoc.id, ' => ', productDoc.data());

        const priceSnapshot = await getDocs(collection(productDoc.ref, 'prices'));

        priceSnapshot.forEach((priceDoc) => {
          console.log("Price: ",priceDoc.id, ' => ', priceDoc.data());
        });

        const priceDoc = priceSnapshot.docs[0]
        return ({
          productId: productDoc.id,
          productDescription: productDoc.data().description,
          productName: productDoc.data().name,
          priceId: priceDoc.id,
          priceType: priceDoc.data().type,
        });
    }));
    
    console.log("Final: ", pricesInfo)

    return pricesInfo;

  } catch (error) {
    console.error('Error fetching products and prices:', error);
    return []
  }
}

export const getCheckoutUrl = async ( product:PriceInfo ): Promise<string> => {
  const userId = auth.currentUser?.uid;

  if (!userId) throw new Error("User is not authenticated");

  // console.log("The user email is: ", auth.currentUser?.email)

  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  let priceInfo = {
    price: product.priceId,
    mode: "payment",
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  }
  if (product.priceType === 'recurring') {
     priceInfo = {
        price: product.priceId,
        mode: "subscription",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
  }

  const docRef = await addDoc(checkoutSessionRef, priceInfo);

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error?: { message: string };
        url?: string;
      };
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};