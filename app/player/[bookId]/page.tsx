
import React from 'react'
import styles from './page.module.css'

import { Book, getOneBook } from '@/components/ForYouSelected'
import SearchBar from '@/components/SearchBar';
import AudioBar from '@/components/AudioBar';
import BookContent from './BookContent';



export default async function page({params}: {params: Promise<{bookId: string}>}) {
  const {bookId} = await params;
  const bookUrl = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`

  const bookData:Book = await getOneBook(bookUrl)

  return (
    <>
    <SearchBar />
    <div className={styles["summary"]}>
        <BookContent bookData={bookData} />
    </div>
    < AudioBar bookData={bookData}/>
    </>
  )
}
