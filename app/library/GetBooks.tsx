'use client';

import React, {Suspense, useEffect, useState} from 'react'
import {Book, BookHtml, getBooks, BookLoading} from '@/components/ForYouSelected'

import { fetchUserLibrary } from '@/components/DbOperation';
import styles from '@/components/ForYouSelected.module.css'

const fetchBookData = async (bookId:string):Promise<Book> => {
  const bookUrl = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`;
  const response = await fetch(bookUrl)
    if( !response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json()
    // console.log("In getBooks",data)
    return data
}

export default function GetBooks({userId}:{userId:string}) {
  const [booksData, setBooksData] = useState<Book []>([])
  const [finishedBooks, setFinishedBooks] = useState<Book []>([])

  useEffect(() => {

    const fetchFinishedBooks = async () => {
      const url = `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=`
      const recommendUrl = url + 'recommended'
      const finishedBooks = await getBooks(recommendUrl)
      setFinishedBooks(finishedBooks)
    }

    const queryBookList = async () => {
      const bookList = await fetchUserLibrary(userId)
      if(bookList.length === 0) {
        setBooksData([])
        return;
      }

      const bookPromises = bookList.map(bookId => fetchBookData(bookId))
      const allBookData = await Promise.all(bookPromises);
      setBooksData(allBookData)
      console.log(allBookData)
    }

    queryBookList()
    fetchFinishedBooks()

  }, [userId])

  const len = booksData.length;

  const subTitle = len>1 ? `${len} items`: `${len} item`
  const subTitle2 = `${finishedBooks.length} items`

  return (
    <>
      <div className={styles["recommended__wrapper"]}>
        <div className={styles["for-you__title"]}>Saved Books </div>
        <div className={styles["for-you__subtitle"]}>{subTitle}</div>
        {len ===0 ?(
          <div className='bg-[#f1f6f4] max-w-ft flex flex-col items-center gap-2 p-8 rounded-xl mx-auto mb-14 text-center'>
            <div className="text-[#042330] font-semibold text-lg">Save your favorite books!</div>
            <div className="text-[#394547]">When you save a book, it will appear here.</div>
          </div>
        )
        :(<div className={styles["for-you__books"]}>
          <Suspense fallback={< BookLoading />} >
            { booksData.map( (book) => <BookHtml book={book} styles={styles} key={book.id}/> )}
          </Suspense>
        </div>)}
    </div>
    <div className={styles["recommended__wrapper"]}>
        <div className={styles["for-you__title"]}>Finished</div>
        <div className={styles["for-you__subtitle"]}>{subTitle2}</div>
        <div className={styles["for-you__books"]}>
          <Suspense fallback={< BookLoading />} >
            { finishedBooks.slice(0,5).map( (book) => <BookHtml book={book} styles={styles} key={book.id}/> )}
          </Suspense>
        </div>
    </div>
  </>
  )
}
