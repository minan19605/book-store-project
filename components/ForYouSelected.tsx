import React, { Suspense } from 'react'
import Link from 'next/link';
import styles from './ForYouSelected.module.css'
// import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa'
import { HiOutlineClock, HiOutlineStar } from 'react-icons/hi'
import GetAudioDuration from './GetAudioDuration';
import { ShimmerWrapper, Skeleton } from './ShimmerSkeleton';

export interface Book {
    id: string;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRating: number;
    averageRating: number;
    keyIdeas: number;
    type: string;
    status: string;
    subscriptionRequired: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
}

export const getOneBook = async ( url: string) : Promise<Book> => {

    const response = await fetch(url)
    if( !response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json()
    // console.log("In getBooks",data)

    // console.log("Start fetch book....")
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log("end fetch book !!!")
    return data
}

export const getBooks = async ( url: string) : Promise<Book[]> => {

    const response = await fetch(url)
    if( !response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json()
    // console.log("In getBooks",data)

    // console.log("Start fetch book....")
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log("end fetch book !!!")
    return data
}

type CSSModule = Readonly<Record<string, string>>;

export const BookHtml = ({book, styles}:{book:Book, styles: CSSModule}) => {

    return (
        <Link href={`/book/${book.id}`} key={book.id}>
            <div className={styles["for-you__book--wrapper"]}>
                {book.subscriptionRequired && <div className={styles.book__pill}>Premium</div>}
                <div className={styles["book__image--wrapper"]}>
                    <img className={styles["book__image"]} src={book.imageLink} alt="book" />
                </div>
                <div className={styles["recommended__book--title"]}>{book.title}</div>
                <div className={styles["recommended__book--author"]}>{book.author}</div>
                <div className={styles["recommended__book--subtitle"]}>{book.subTitle}</div>
                <div className={styles["recommend__book--details-wrapper"]}>
                    <div className={styles["recommended__book--details"]}>
                        <div className={styles["recommended__book--details-icon"]}>
                            <HiOutlineClock size={16} />
                        </div>
                        {/* <div className={styles["recommended__book--details-text"]}>{audioDuration}</div> */}
                        < GetAudioDuration audioUrl={book.audioLink} />
                    </div>
                    <div className={styles["recommended__book--details"]}>
                        <div className={styles["recommended__book--details-icon"]}>
                            <HiOutlineStar size={16 }  />
                        </div>
                        <div className={styles["recommended__book--details-text"]}>{book.averageRating}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const SelectedBookSkeleton:React.FC = () => {
    return (
        <ShimmerWrapper>
            {/* A whole block */}
            <Skeleton className="w-[600px] h-[200px] bg-gray-300" />
        </ShimmerWrapper>
    )
}

/**
 * One Book Skeletion
 */
export const BookSkeleton:React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
          <ShimmerWrapper>
              {/* 封面照片 */}
              <Skeleton className="w-40 h-40 bg-gray-300" />
          </ShimmerWrapper>

        <ShimmerWrapper>
            {/* Title */}
            <Skeleton className="h-5 w-40 " />
        </ShimmerWrapper>
        
        <ShimmerWrapper>
            {/* Author */}
            <Skeleton className="h-3 w-10" />
        </ShimmerWrapper>

        <ShimmerWrapper>
            {/* Subtitle */}
            <Skeleton className="h-3 w-10" />
        </ShimmerWrapper>

        <ShimmerWrapper>
            {/* duration */}
            <Skeleton className="h-3 w-8" />
        </ShimmerWrapper>
      </div>
    );
};

export const BookLoading = () => {
    return (
    <>
        {Array.from({ length: 5 }).map((_, index) => (
            <BookSkeleton key={index} />
        ))}
    </>
    )
}

export default async function ForYouSelected() {
    const url = `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=`
    const selectedUrl = url + 'selected'
    const selectedBook = await getBooks(selectedUrl);

    const recommendUrl = url + 'recommended'
    const recommendedBooks = await getBooks(recommendUrl)

    const suggestedUrl = url + 'suggested'
    const suggestedBooks = await getBooks(suggestedUrl)


  return (
    <>
    <div className={styles["selected__wrapper"]}>
        <div className={styles["for-you__title"]}>Selected just for you</div>
        <Suspense fallback={< SelectedBookSkeleton />} >
            {<Link href={`/book/${selectedBook[0].id}`} key={selectedBook[0].id}>
            <div className={styles["selected__book--wrapper"]} >
                <div className={styles["selected__book--para"]}>{selectedBook[0].subTitle}</div>
                <div className={styles["selected__book--line"]}></div>
                <div className={styles["selected__book--content"]}>
                    <figure className={styles["book__image--wrapper"]}>
                        <img width={140} height={140} alt="" src={selectedBook[0].imageLink} />
                    </figure>
                    <div className={styles["selected__book--text"]}>
                        <div className={styles["selected__book--title"]}>{selectedBook[0].title}</div>
                        <div className={styles["selected__book--author"]}>{selectedBook[0].author}</div>
                        <div className={styles["selected__book--duration-wrapper"]}>
                            <div className={styles["selected__book--playicon"]}>
                                <FaPlayCircle size={40}/>
                            </div>
                            <div className={styles["selected__book--duration"]}>3 mins 23 secs</div>
                        </div>
                    </div>
                </div>
            </div>
            </Link>}
        </Suspense>
    </div>
    <div className={styles["recommended__wrapper"]}>
        <div className={styles["for-you__title"]}>Recommended for you</div>
        <div className={styles["for-you__subtitle"]}>We think you&apos;ll like this</div>
        <div className={styles["for-you__books"]}>
            <Suspense fallback={< BookLoading />} >
            { recommendedBooks.slice(0,5).map( (book) => <BookHtml book={book} styles={styles} key={book.id}/> )}
            </Suspense>
        </div>
    </div>
    <div className={styles["recommended__wrapper"]}>
        <div className={styles["for-you__title"]}>Suggested Books</div>
        <div className={styles["for-you__subtitle"]}>Browse those books</div>
        <div className={styles["for-you__books"]}>
            <Suspense fallback={< BookLoading />} >
            { suggestedBooks.slice(0,5).map( (book) => <BookHtml book={book} styles={styles} key={book.id}/>)}
            </Suspense>
        </div>
    </div>
    </>
  )
}
