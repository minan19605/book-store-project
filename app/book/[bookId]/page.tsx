
import React, { Suspense } from 'react'
// import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import styles from './page.module.css'

import { Book, getOneBook } from '@/components/ForYouSelected'
import ConditionalReadListenButton from './ConditionalReadListenButton'

import { HiOutlineClock, HiOutlineStar, HiOutlineMicrophone, HiOutlineLightBulb, HiOutlineBookOpen } from 'react-icons/hi'
import AddToLibrary from './AddToLibrary'

import { ShimmerWrapper, Skeleton } from '@/components/ShimmerSkeleton';

const BookInfoSkeleton:React.FC = () => {
    return (
        <div className="flex gap-4">
          <div className='gap-8'>
        <ShimmerWrapper>
            {/* Title */}
            <Skeleton className="h-24 w-[700px] " />
        </ShimmerWrapper>
        
        <ShimmerWrapper>
            {/* Author */}
            <Skeleton className="h-8 w-80" />
        </ShimmerWrapper>

        <ShimmerWrapper>
            {/* Subtitle */}
            <Skeleton className="h-10 w-80" />
        </ShimmerWrapper>

        <ShimmerWrapper>
            {/* duration */}
            <Skeleton className="h-16 w-100" />
        </ShimmerWrapper>

        <ShimmerWrapper>
            {/* Button */}
            <Skeleton className="h-12 w-80" />
        </ShimmerWrapper>

        <ShimmerWrapper>
            {/* Add to library */}
            <Skeleton className="h-8 w-20" />
        </ShimmerWrapper>
        <div className={styles["secondary-title"]}>What&apos;s it about?</div>
        <ShimmerWrapper>
            {/* Button */}
            <Skeleton className="h-12 w-80" />
        </ShimmerWrapper>

        <ShimmerWrapper>
            {/* Para */}
            <Skeleton className="h-50 w-160" />
        </ShimmerWrapper>
        <div className={styles["secondary-title"]}>About the author</div>
        <ShimmerWrapper>
            {/* Para */}
            <Skeleton className="h-50 w-160" />
        </ShimmerWrapper>
        </div>

        <ShimmerWrapper>
            {/* 封面照片 */}
            <Skeleton className="w-[300px] h-[300px] bg-gray-300" />
        </ShimmerWrapper>
      </div>
    );
};

export default async function page({params}: {params: Promise<{bookId: string}>}) {
  const {bookId} = await params;
  const bookUrl = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`

  const bookData:Book = await getOneBook(bookUrl)
  // console.log(bookData.title)

  return (
    <>
    <SearchBar />
    <div className="max-w-[1100px] w-full mx-auto px-6">
      <div className="w-full py-10">
        <Suspense fallback={< BookInfoSkeleton />} >
        {(<div className={styles.inner__wrapper}>
          <div className="inner-book w-full">
            <div className={styles["inner-book__title"]}>{bookData.title}</div>
            <div className={styles["inner-book__author"]}>{bookData.author}</div>
            <div className={styles["inner-book__subtitle"]}>{bookData.subTitle}</div>
            <div className={styles["inner-book__wrapper"]}>
              <div className={styles["description__wrapper"]}>
                <div className={styles["description"]}>
                  <div className={styles["icon"]}>
                    <HiOutlineStar size={24}/>
                  </div>
                  <div className={styles["info"]}>{bookData.averageRating} ({bookData.totalRating} ratings)</div>
                </div>
                <div className={styles["description"]}>
                  <div className={styles["icon"]}>
                    < HiOutlineClock size={24}/>
                  </div>
                  <div className={styles["info"]}>03:22</div>
                </div>
                <div className={styles["description"]}>
                  <div className={styles["icon"]}>
                    <HiOutlineMicrophone size={24}/>
                  </div>
                  <div className={styles["info"]}>{bookData.type}</div>
                </div>
                <div className={styles["description"]}>
                  <div className={styles["icon"]}>
                    < HiOutlineLightBulb size={24}/>
                  </div>
                  <div className={styles["info"]}>{bookData.keyIdeas} key ideas</div>
                </div>
              </div>
            </div>
            <div className={styles["btn__wrapper"]}>
              <ConditionalReadListenButton text={'Read'} bookId={bookData.id} styles={styles} icon={<HiOutlineBookOpen size={24}/>}/>
              <ConditionalReadListenButton text={'Listen'} bookId={bookData.id} styles={styles} icon={<HiOutlineMicrophone size={24}/>}/>
            </div>
            { <AddToLibrary bookId={bookData.id} />}
            <div className={styles["secondary-title"]}>What&apos;s it about?</div>
            <div className={styles["tag__wrapper"]}>
              {bookData.tags.map((tag,idx) => (<div key={idx} className={styles["tag"]}>{tag}</div>))}
            </div>
            <div className={styles["content-para"]}>{bookData.bookDescription}</div>
            <div className={styles["secondary-title"]}>About the author</div>
            <div className={styles["content-para"]}>{bookData.authorDescription}</div>
          </div>
          <div className="inner__bookimg--wrapper">
            <figure className="bookimg__wrapper w-[300px] h-[300px]">
              <img className="book__image block" src={bookData.imageLink}></img>
            </figure>
          </div>
        </div>)}
        </Suspense>
      </div>
    </div>
    </>
  )
}
