'use client';

import React from 'react'
import styles from './page.module.css'
import SideBar from '@/components/SideBar'
import SearchBar from '@/components/SearchBar'

import Image from "next/image";
import { useAuth } from '@/components/AuthContext';

export default function Page() {
    const {isLoggedIn,openModal} = useAuth()
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
                            <div className={styles.text}>premium</div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.subtitle}>Email</div>
                            <div className={styles.text}>hanna@gmail.com</div>
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
