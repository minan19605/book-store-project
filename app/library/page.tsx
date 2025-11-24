'use client';

import React from 'react'
import styles from './page.module.css'
import SideBar from '@/components/SideBar'
import SearchBar from '@/components/SearchBar'

import Image from "next/image";
import { useAuth } from '@/components/AuthContext';

import GetBooks from './GetBooks';


export default function Page() {
    const {isLoggedIn, currentUser, openModal} = useAuth()

  return (
    <div className="wrapper">
        < SideBar />
        <main className="mainWindow">
            <SearchBar />
            <div className="max-w-[1100px] w-full mx-auto px-6">
                <div className="container w-full py-10">
                {isLoggedIn && currentUser ? 
                    (< GetBooks userId={currentUser.uid} />)
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
