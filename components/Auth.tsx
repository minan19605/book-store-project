"use client";

import React, {useState} from 'react'
import styles from './Auth.module.css'
import { IoMdClose } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import Image from "next/image";
import {handleSignup, handleEmailPwdLogin, GoogleLogin, guestLogin, getFriendlyErrorMessage} from './ProcessAuth'
import type {OperationResult} from './ProcessAuth'
import { type User } from 'firebase/auth'

interface AuthProps {
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({onClose}) => {
  const [loginOrSignUp, setLoginOrSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')

  const handleToggleView = () => {
    setLoginOrSignUp(!loginOrSignUp)
    setError('')
    setEmail('')
    setPwd('')
  }

  // const handleGoogleLogin = async () => {
  //   const result: OperationResult = await GoogleLogin();

  //   if(result.success) {
  //     setError('')
  //     onClose()
  //     console.log("Authentication successful! User UID", result.user.uid)
  //   } else {
  //     const friendlyMessage = getFriendlyErrorMessage(result.error);
  //     setError(friendlyMessage)
  //     console.log("Authentication failure! error: ", result.error)
  //   }
  // }

  const handleGoogleLogin = async () => {
    try {
        // 1. await 成功：直接获取到 User 对象
        const user: User = await GoogleLogin();
        
        // 成功处理逻辑
        setError('');
        onClose();
        // console.log("Authentication successful! User UID", user.uid); 
        
    } catch (error) {
        // 2. catch 失败：捕获到 GoogleLogin 中抛出的 Error 对象
        
        // 提取错误信息
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        
        // 失败处理逻辑
        const friendlyMessage = getFriendlyErrorMessage(errorMessage); // 假设这个函数依然存在
        setError(friendlyMessage);
        console.log("Authentication failure! error: ", errorMessage);
    }
  }

  const handleGuestLogin = async () => {
    const result: OperationResult = await guestLogin();

    if(result.success) {
      setError('')
      onClose()
      console.log("Authentication successful! User UID", result.user.uid)
    } else {
      const friendlyMessage = getFriendlyErrorMessage(result.error);
      setError(friendlyMessage)
      console.log("Authentication failure! error: ", result.error)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let result: OperationResult;

    if(loginOrSignUp === true) { 
      // login
      result = await handleEmailPwdLogin(email, pwd);
    }else { 
      // sign up
      result = await handleSignup(email, pwd);
    }

    if(result.success) {
      setError('')
      onClose()
      console.log("Authentication successful! User UID", result.user.uid)
    } else {
      const friendlyMessage = getFriendlyErrorMessage(result.error);
      setError(friendlyMessage)
      console.log("Authentication failure! error: ", result.error)
    }
  }

  return (
    <div className={styles.auth__wrapper}>
      <div className={styles.auth}>
        <div className={styles.auth__content}>
          <div className={styles['auth__content--title']}>{loginOrSignUp? "Log in to Summarist" : "Sign up to Summarist"}</div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {loginOrSignUp &&  (
            <>
            <button className={styles.btn  + ' ' + styles.login__guest} onClick={handleGuestLogin}>
              <FaUser className={styles["guest__icon"]} />
              <div>Login as a Guest</div>
            </button>
            <div className={styles.auth__separator}>
              <span className={styles['auth__separator--text']}>or</span>
            </div>
          </>
        )}
          <button className={styles.btn  + ' ' + styles.login__google} onClick={handleGoogleLogin}>
              <figure className={styles["goole__icon--mask"]}>
                <Image src="/assets/google.png" width={24} height={24} alt="landing" />
              </figure>
              <div>{loginOrSignUp? "Login with Google" : "Sign up with Google"}</div>
          </button>
          <div className={styles.auth__separator}>
            <span className={styles["auth__separator--text"]}>or</span>
          </div>
          <form onSubmit = {handleFormSubmit} action="" className={styles.auth__form}>
            <input type="email" className={styles.auth__input} placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className={styles.auth__input} placeholder='Password' value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            <button className={styles.btn}>{loginOrSignUp? "Login" : "Sign up"}</button>
          </form>
        </div>
        {loginOrSignUp && <div className={styles["auth__forgot--pwd"]}>Forgot your password?</div>}
        <button className={styles.auth__switch} onClick={() => handleToggleView()}>
          {loginOrSignUp ? `Don't have an account?` : `Already have an account?`}
        </button>
        <div className={styles["auth__close--btn"]} onClick={onClose}>
          <IoMdClose />
        </div>
      </div>
    </div>
  )
}

export default Auth;