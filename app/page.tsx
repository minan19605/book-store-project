"use client";
import React, {useState} from "react";

import Nav from "@/components/Nav";
import Landing from "@/components/Landing";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Numbers from "@/components/Numbers";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";


// import { useAuth } from '@/components/AuthContext'; 
// import SearchBar from '@/components/SearchBar'
// import ForYouMainPart from '@/components/ForYouMainPart'

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const openAuth = () => setIsAuthOpen(true)
  const closeAuth = () => setIsAuthOpen(false)

  // const { isLoggedIn } = useAuth()
  return (
    <>
      <Nav onOpen={openAuth} />
      <div className="row">
        <div className="container">
          <Landing onOpen={openAuth} />
          <Features />
          <Reviews onOpen={openAuth} />
          <Numbers />
        </div>
      </div>
      <Footer />
      {
        isAuthOpen && (
          <Auth onClose={closeAuth} />
        )
      }
    </>
  )
}
