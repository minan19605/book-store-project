'use client'

import React from 'react'
import styles from './page.module.css'
import { Book } from '@/components/ForYouSelected'

import { useFont } from '@/components/FontContext';

const FONT_CLASSES_MAP: { [key: number]: string } = {
  0: 'text-[16px]',  
  1: 'text-[20px]',  
  2: 'text-[24px]',  
  3: 'text-[28px]',  
};

export default function BookContent({bookData}: {bookData:Book}) {
  const { fontSizeMode } = useFont();
  const fontSizeClass = FONT_CLASSES_MAP[fontSizeMode] || FONT_CLASSES_MAP[0];

  return (
    <div className={styles["book__content"]}>
        <div className={styles["title"]}>
            {bookData.title}
        </div>
        <div className={`${styles["text"]} ${fontSizeClass}`}>
            {bookData.summary}
        </div>
    </div>
  )
}
