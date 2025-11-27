'use client';

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import SideBar from '@/components/SideBar'
import SearchBar from '@/components/SearchBar'

import Image from "next/image";
import { useAuth } from '@/components/AuthContext';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';


// import { getAuth } from "firebase/auth";
import { db } from '@/firebase/init';

const getCustomer = async (userId: string): Promise<string | undefined> => {
    const customerRef = doc(db, "customers", userId)
    const customerSnapShot = await getDoc(customerRef);
    // console.log("customer data: ", customerSnapShot.data()?.email)
    return customerSnapShot.data()?.email as string | undefined;
}

const getCustomerSubscription = async (userId: string): Promise<string | undefined> => {
    const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
    const q = query(
        subscriptionsRef,
        where("status", "in", ["trialing", "active"])
    );

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs[0].data())
    const data = querySnapshot.docs[0].data()
    const item = data.items && data.items.length >0 ? data.items[0]: null;
    // console.log("Item product name: ", item.price.product.name)
    // console.log("Item product description: ", item.price.product.description)
    return item.price.product.name; //item.price.product.description]
}

const getCustomerPayment = async (userid:string): Promise<string | undefined> => {
    const paymentRef = collection(db, "customers", userid, "payments");
    const q = query(paymentRef, where("status", "in", ["succeeded", "paid"]));

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs[0])
    const data = querySnapshot.docs[0].data();
    const item = data.items && data.items.length >0 ? data.items[0] : null;
    // console.log("Payments is ", item.description)
    return item.description;
}

export default function Page() {
    const {isLoggedIn,openModal, currentUser} = useAuth()
    const [email, setEmail] = useState<string>('')
    const [plan, setPlan] = useState<string>('')

    useEffect(() => {
        if(!isLoggedIn) return

        const userId = currentUser?.uid
        if (!userId) return

        const loadUserInfo = async () => {
            const userEmail = await getCustomer(userId)
            if(userEmail) {
                setEmail(userEmail)
            } else {
                setEmail("None")
            }

            const subscriptionPlan = await getCustomerSubscription(userId)
            if(subscriptionPlan) {
                setPlan(subscriptionPlan)
            } else {
                const paymentPlan = await getCustomerPayment(userId)
                if(paymentPlan){
                    setPlan(paymentPlan)
                }else {
                    setPlan("Please choose your plan")
                }
            }
        }

        loadUserInfo()
        
    },[currentUser?.uid, isLoggedIn])

  return (
    <div className="wrapper">
        < SideBar />
        <main className="mainWindow">
            <SearchBar />
            <div className="row max-w-[1100px] w-full mx-auto px-6">
                <div className="container w-full py-10">
                    <div className={styles.title}>Settings</div>
                    {isLoggedIn ? 
                    (<>
                        <div className={styles.content}>
                            <div className={styles.subtitle}>Your Subscription plan</div>
                            <div className={styles.text}>{plan}</div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.subtitle}>Email</div>
                            <div className={styles.text}>{email}</div>
                        </div>
                    </>)
                    :
                    (<div className={styles.settingLogin__Wrapper}>
                        <Image src="/assets/login.png" width={460} height={380} alt="landing" />
                        <div className={styles.loginText}>Log into your account to see your details.</div>
                        <button className={styles.loginBtn} onClick={openModal}>Login</button>
                    </div>)}
                </div>
            </div>
        </main>
    </div>
  )
}
