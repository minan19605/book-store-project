'use client';

import React, {useState, useEffect} from 'react'
import { addBookToLibrary, fetchUserLibrary, removeBookFromLibrary } from '@/components/DbOperation'
import { useAuth } from '@/components/AuthContext'; 
import styles from './page.module.css'
import { HiOutlineBookmark } from 'react-icons/hi';

export default function AddToLibrary({bookId}:{bookId:string}) {

    const { currentUser, isLoggedIn, openModal} = useAuth()
    const [ifExist, SetIfExist ] = useState(false)

    console.log("Ini ifExist is: ", ifExist)

    const displayText = ifExist ? "Saved in My Library":
        "Add title to My Library";

    console.log(displayText)

    const handleClick = async () => {
        if(!isLoggedIn || !currentUser) {
            openModal()
            return
        }
        else {
            const userId = currentUser.uid;
            if(ifExist) {
                await removeBookFromLibrary(userId, bookId);
                SetIfExist(false)
            }else {
                await addBookToLibrary(userId, bookId);
                SetIfExist(true);
            }
        }
    }

    useEffect(() => {
        SetIfExist(false);

        const checkBook = async (userId:string, bookId:string) => {
            const bookList = await fetchUserLibrary(userId)
            console.log("Book list is: ",bookList)
            if (bookList.length > 0 && bookList.includes(bookId)) {
                console.log(bookId, "in list is true")
                SetIfExist(true);
            }else {
                console.log(bookId, "in list is false")
            }
        }
        
        if(isLoggedIn && currentUser) {
            const userId = currentUser.uid;
        
            (async () => await checkBook(userId, bookId))();
        }
        console.log("After get book info, ifExist is: ", ifExist)
        
    }, [bookId, currentUser, ifExist, isLoggedIn])

  return (
    <div className={styles["bookmark"]}>
        <HiOutlineBookmark size={24}/>
        <div className={styles["bookmark-text"]} onClick={handleClick} >{ displayText }</div>
    </div>
  )
}
