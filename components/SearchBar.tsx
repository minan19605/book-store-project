'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import styles from './searchBar.module.css'
import { HiOutlineClock, HiOutlineMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import { Book } from './ForYouSelected'
import GetAudioDuration from './GetAudioDuration';

import { ShimmerWrapper, Skeleton } from './ShimmerSkeleton';

type CSSModule = Readonly<Record<string, string>>;

const SearchedBook = ({book, styles}:{book:Book, styles: CSSModule}) => {
    return (
      <Link href={`/book/${book.id}`} key={book.id}>
          <div className={styles["search__book--link"]}>
              <div className={styles["book__image--wrapper"]}>
                  <img className={styles["book__image"]} src={book.imageLink} alt="book" />
              </div>
              <div>
                <div className={styles["search__book--title"]}>{book.title}</div>
                <div className={styles["search__book--author"]}>{book.author}</div>
                <div className={styles["recommended__book--details"]}>
                  <div className={styles["recommended__book--details-icon"]}>
                      <HiOutlineClock size={16} />
                  </div>
                  < GetAudioDuration audioUrl={book.audioLink} />
                </div>
              </div>
          </div>
      </Link>
    )
}

interface BookSkeletonProps {
  count? : number; 
}

/**
 * 书籍卡片骨架：模拟 LibraryPage 中的书籍网格布局。
 * 需要根据想要的Skeleton 来调整下面HTML的内容
 */
export const BookGridSkeleton: React.FC<BookSkeletonProps> = ({ count = 4 }) => {
    const cards = Array.from({ length: count }, (_, index) => (
        <div 
          key={index} 
          className="flex"
        >
          <ShimmerWrapper>
              {/* 封面照片 */}
              <Skeleton className="w-20 h-20 mb-4 bg-gray-300" />
          </ShimmerWrapper>
          <div className='gap-4 flex flex-col ml-4'>
            <ShimmerWrapper>
                {/* 标题骨架 */}
                <Skeleton className="h-5 w-60 " />
            </ShimmerWrapper>
            
            <ShimmerWrapper>
                {/* 作者骨架 */}
                <Skeleton className="h-3 w-10" />
            </ShimmerWrapper>

            <ShimmerWrapper>
                {/* duration */}
                <Skeleton className="h-3 w-8" />
            </ShimmerWrapper>
          </div>
      </div>
    ));

    return (
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
            {cards}
        </div>
    );
};

export default function SearchBar() {
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchResult, setSearchResult] = useState<Book[]>([])

  const searchBook = async (inputValue:string) => {
    const url = `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${inputValue}`
    const response = await fetch(url)
    if( !response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data: Book[] = await response.json()
    setSearchResult(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if(!inputValue) {
      setSearchResult([])
      return;
    }

    setIsLoading(true)

    const handler = setTimeout(() => {
      searchBook(inputValue)
      setIsLoading(false)
    }, 2300)

    return () => clearTimeout(handler)
  }, [inputValue])


  return (
    <div className={styles.search__background}>
      <div className={styles['searchBar__wrapper']}>
        <input type="text" placeholder='Input book name' className={styles["searchBar__input"]}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}/>
        <div className={styles["searchBar__icon"]}>
          {inputValue ? <HiXMark size={24} onClick={() => setInputValue('')} /> : <HiOutlineMagnifyingGlass size={24} />}
        </div>
      </div>
      {inputValue && 
      <div className={styles['search__books--wrapper']}>
        {isLoading ? (<BookGridSkeleton />) :
        (searchResult.length > 0 ? searchResult.map( (book) => <SearchedBook book={book} styles={styles} key={book.id}/> ): "No Books found")}
      </div>}
    </div>
  )
}
