"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../firebase/init'
import { AuthContext } from './AuthContext';

const PROTECTED_ROUTES = ['/for-you'];
const PUBLIC_AUTH_ROUTES = ['/'];

// Before client get Auth statues, show a loading 
// avoid the home page flashing
const LoadingScreen = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    fontSize: '24px' 
  }}>
    Loading ...
  </div>
);

export default function AuthListener({ children }: {children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    // 1: Trace if Firebase finish check user status
    const [isLoading, setIsLoading] = useState(true); 
    // 2: check user 
    const [user, setUser] = useState<User | null>(null);

    const [isLoggedIn, setIsLoggedIn]  = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const logout = () => {
        closeModal()
        return signOut(auth)
    }

    const constextValue = useMemo( () => ({
        currentUser:user,
        isLoading,
        isLoggedIn,
        isModalOpen,
        logout,
        openModal,
        closeModal,
    }), [user, isLoading, isLoggedIn, isModalOpen])

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) =>{
            
            setUser(currentUser); 
            setIsLoading(false);
            
            // console.log("Set is loading false and value is: ", isLoading)

            const isUserLoggedIn = !!currentUser;

            // 1. check if current route is in the protected route list
            const isProetecdRoute = PROTECTED_ROUTES.some( route => pathname.startsWith(route))

            // 2. check current route is in publice Auth route list
            const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.includes(pathname)

            if (isUserLoggedIn) {

                setIsLoggedIn(true)
                setIsLoading(false); 

                if( isPublicAuthRoute ) {
                    // if already logged, and access the Home page, force to the for-you page
                    router.replace('/for-you')
                }
                // if access for-you and child pages, contiune rendering
            } else {
                setIsLoggedIn(false)
                // setIsLoading(true); 
            }
        });
        return () => unsubscribe()
    }, [pathname, router])

    if (isLoading) {
        return <LoadingScreen />;
    }

    // console.log("Here is Loading status: ", isLoading)

    // Check if we are currently on a route that requires immediate redirection (and the redirect 
    // hasn't completed yet). This happens when the component re-renders before the router finishes.
    const isUserLoggedIn = !!user;
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.includes(pathname);

    // 2. Hide content if a redirection is known to be required:
    if ((isUserLoggedIn && isPublicAuthRoute)) {
        // If the user is logged in and is on a public auth route (e.g., '/'), OR
        // If the user is logged out and is on a protected route (e.g., '/dashboard').
        // In both cases, a redirect is in progress. We return null/loader to avoid flashing.
        return <LoadingScreen />;
    }

    // 3. If no loading and no redirection is required, render the page content.
    return (<AuthContext.Provider value= {constextValue}> 
                { children}
            </AuthContext.Provider>)
}
