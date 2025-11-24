'use client';

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthContext'

type CSSModule = Readonly<Record<string, string>>;

export default function ConditionalReadListenButton({text, bookId, styles, icon}: {text:string, bookId: string, styles:CSSModule, icon:React.ReactNode}) {
    const { isLoggedIn, openModal } = useAuth()
//   const isLoggedIn = !! currentUser
    if(isLoggedIn) {
      return (
        <Link href={`/player/${bookId}`}>
          <button className={styles["read"]}>
            {icon}
            <div className={styles["btn-text"]}>{text}</div>
          </button>
        </Link>
      )
    } else {
      return (
        <button className={styles["read"]} onClick={openModal}>
          {icon}
          <div className={styles["btn-text"]}>{text}</div>
        </button>
      )
    }
  }
