// import React from 'react'
import {auth} from '../firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signInAnonymously, type User } from 'firebase/auth'
import { FirebaseError } from 'firebase/app';

// Login/Sign up by using Google account
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

/**
 * Map of Firebase Auth error codes to user-friendly messages.
 * This object is used to translate technical error codes into messages 
 * that can be safely displayed to the user in the UI.
 */
export const FIREBASE_ERROR_MESSAGES: { [key: string]: string } = {
    // ----------------------------------------------------
    // General / Catch-All Errors
    // ----------------------------------------------------
    'default': "An unexpected error occurred. Please try again.",
    'auth/operation-not-allowed': "This authentication method is disabled. Please contact support.",
    'auth/too-many-requests': "Access temporarily blocked due to too many failed attempts. Try again later.",
    
    // ----------------------------------------------------
    // Login (signInWithEmailAndPassword) Errors
    // ----------------------------------------------------
    // This is the most common error for incorrect email/password (hides the specific reason for security)
    'auth/invalid-credential': "Login failed: The email or password you entered is incorrect.",
    'auth/user-not-found': "Login failed: This email address is not registered.",
    'auth/wrong-password': "Login failed: The password you entered is incorrect.",
    
    // ----------------------------------------------------
    // Sign Up (createUserWithEmailAndPassword) Errors
    // ----------------------------------------------------
    'auth/email-already-in-use': "Sign up failed: This email is already in use. Please log in instead.",
    'auth/weak-password': "Password is too weak: Please use a password with at least 6 characters.",
    
    // ----------------------------------------------------
    // Input/Format Errors
    // ----------------------------------------------------
    'auth/invalid-email': "Invalid email format: Please enter a valid email address.",
    
    // ----------------------------------------------------
    // OAuth/Token Errors (Less common for basic forms)
    // ----------------------------------------------------
    'auth/user-disabled': "Your account has been disabled by an administrator.",
    'auth/expired-action-code': "The link or code provided has expired.",
};

/**
 * Retrieves a user-friendly message for a given Firebase error code.
 * Falls back to a generic message if the code is not found in the map.
 * * @param errorCode The specific Firebase error code (e.g., 'auth/invalid-credential').
 * @returns A user-friendly string message.
 */
export const getFriendlyErrorMessage = (errorCode: string): string => {
    // Looks up the code; if the key doesn't exist, it defaults to the 'default' message.
    return FIREBASE_ERROR_MESSAGES[errorCode] || FIREBASE_ERROR_MESSAGES['default'];
};

export type OperationResult = 
    |{success: true; user: User;}
    |{success: false; error: string;}

// const GoogleLogin = async (): Promise<OperationResult> => {
//     const provider = new GoogleAuthProvider() ;

//     try {
//         const userCredential = await signInWithPopup(auth, provider);
//         return { 
//             success: true, // Discriminator field
//             user: userCredential.user
//         };
//     } catch (e) {
//         let errorInfo: string = 'auth/unknown-error';

//         if (e instanceof FirebaseError)  errorInfo = e.code ; 
//         else if (e instanceof Error)     errorInfo = e.message;

//         return { success: false, error: errorInfo}
//     }
// }

const GoogleLogin = async (): Promise<User> => {
    const provider = new GoogleAuthProvider();

    try {
        const userCredential = await signInWithPopup(auth, provider);
        // 成功时：直接返回 User 对象
        return userCredential.user; 
    } catch (e) {
        let errorInfo: string = 'auth/unknown-error';

        if (e instanceof FirebaseError) {
            // 失败时：使用 throw 抛出 Firebase 错误码
            errorInfo = e.code; 
        } else if (e instanceof Error) {
            // 失败时：抛出通用错误信息
            errorInfo = e.message;
        }

        // 统一抛出一个新的 Error 对象，以便调用方可以在 catch 块中捕获
        throw new Error(errorInfo);
    }
}

const guestLogin = async (): Promise<OperationResult> => {
    try {
        const userCredential = await signInAnonymously(auth)
        return { 
            success: true, // Discriminator field
            user: userCredential.user
        };
    } catch (e) {
        let errorInfo: string = 'auth/unknown-error';

        if (e instanceof FirebaseError)  errorInfo = e.code ; 
        else if (e instanceof Error)     errorInfo = e.message;

        return { success: false, error: errorInfo}
    }
}

const handleSignup = async (email:string, password:string) : Promise<OperationResult> => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { 
            success: true, // Discriminator field
            user: userCredential.user
        };

    } catch (e) {
        let errorInfo: string = 'auth/unknown-error';

        if (e instanceof FirebaseError)  errorInfo = e.code ; 
        else if (e instanceof Error)     errorInfo = e.message;

        return { success: false, error: errorInfo}
    }
}

const handleEmailPwdLogin = async (email:string, password:string) : Promise<OperationResult> => {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { 
            success: true, // Discriminator field
            user: userCredential.user
        };

    } catch (e) {
        let errorInfo: string ='auth/unknown-error';

        if (e instanceof FirebaseError)  errorInfo = e.code ;
        else if (e instanceof Error)     errorInfo = e.message;

        return { success: false, error: errorInfo}
    }
}

export {handleSignup, handleEmailPwdLogin, GoogleLogin, guestLogin}


