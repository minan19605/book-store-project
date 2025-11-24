'use client'

import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFont } from './FontContext';
import { useAuth } from './AuthContext';

import { HiOutlineHome, HiOutlineBookmark, HiOutlineCog, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { HiOutlinePencilSquare, HiOutlineMagnifyingGlass, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2'
import Auth from './Auth';

// const NAV = [
//   { href: '/for-you',    label: 'For you' },
//   { href: '/library',    label: 'My Library' },
//   { href: '/highlights', label: 'Highlights' },
//   { href: '/search',     label: 'Search' },
//   { href: '/settings',    label: 'Settings' },

// ];

const FONT_MODES = [0, 1, 2, 3];

export default function SideBar() {
    const currentPath = usePathname();

    const playerRoutePrefix = '/player/'
    const isPlayRoute = currentPath.startsWith(playerRoutePrefix);

    const sidebarHeight = isPlayRoute ? "sidebar__PlayerHeight" :"sidebar__defaultHeight"

    const { fontSizeMode, setFontSizeMode } = useFont();

    const { isLoggedIn,isModalOpen, logout, openModal, closeModal } = useAuth()
    // const isLoggedIn = !! currentUser

    const handleClick = () => {
        if(isLoggedIn) {
            logout()
        } else {
            openModal()
        }
    }
    const displayText = isLoggedIn ? "Logout" : "Login";

  return (
    <aside className="sideBar">
        <figure className="sidebar__icon--wrapper">
            <Image className="sidebar__icon" sizes="180px" fill={true} src="/assets/logo.png" alt="logo" />
        </figure>
        <div className={`sidebar__wrapper ${sidebarHeight}`}>
            <div className="sidebar__top">
                <Link href="/for-you">
                <div className="sidebar__link--wrapper">
                    {currentPath === "/for-you" ? (<div className="siderbar__sider siderbar__sider--active"></div>)
                    : (<div className="siderbar__sider" ></div>)}
                    <div className="sidebar__link--icon">
                        <HiOutlineHome />
                    </div>
                    <div className="sidebar__link--text">For you</div>
                </div>
                </Link>
                <Link href="/library">
                <div className="sidebar__link--wrapper">
                    {currentPath === "/library" ? (<div className="siderbar__sider siderbar__sider--active"></div>)
                    :(<div className="siderbar__sider" ></div>)}
                    <div className="sidebar__link--icon">
                        <HiOutlineBookmark />
                    </div>
                    <div className="sidebar__link--text">My Library</div>
                </div>
                </Link>
                <div className="sidebar__link--wrapper siderbar__link--not-allowed">
                    <div className="siderbar__sider" ></div>
                    <div className="sidebar__link--icon">
                        <HiOutlinePencilSquare />
                    </div>
                    <div className="sidebar__link--text">Highlights</div>
                </div>
                <div className="sidebar__link--wrapper siderbar__link--not-allowed">
                    <div className="siderbar__sider" ></div>
                    <div className="sidebar__link--icon">
                        <HiOutlineMagnifyingGlass />
                    </div>
                    <div className="sidebar__link--text">Search</div>
                </div>

                {isPlayRoute && 
                (<div className="sidebar__link--wrapper font__selector--wrapper">
                    { FONT_MODES.map(mode => {
                        const fontSize = 16 + mode*4;
                        let className = `font-size text-[${fontSize}px]`
                        const fontBottomClass = ' border-b-[3px] border-solid border-[#2bd97c]'
                        if (fontSizeMode === mode) {
                            className = className + fontBottomClass
                        } 
                        return (
                            <div key={mode} className={className} onClick={() => setFontSizeMode(mode)}>
                                Aa
                            </div>
                        )
                    })}
                </div>)}

            </div>
            <div className="sidebar__bottom">
                <Link href="/settings">
                <div className="sidebar__link--wrapper">
                    {currentPath === "/settings" ? (<div className="siderbar__sider siderbar__sider--active"></div>)
                    : (<div className="siderbar__sider" ></div>)}
                    <div className="sidebar__link--icon">
                        <HiOutlineCog />
                    </div>
                    <div className="sidebar__link--text">Settings</div>
                </div>
                </Link>
                <div className="sidebar__link--wrapper siderbar__link--not-allowed">
                    <div className="siderbar__sider" ></div>
                    <div className="sidebar__link--icon">
                        <HiOutlineQuestionMarkCircle />
                    </div>
                    <div className="sidebar__link--text">Help & Support</div>
                </div>
                <div className="sidebar__link--wrapper" onClick={handleClick}>
                    <div className="siderbar__sider" ></div>
                    <div className="sidebar__link--icon">
                        <HiOutlineArrowRightOnRectangle />
                    </div>
                    <div className="sidebar__link--text">{displayText}</div>
                </div>
            </div>
        </div>

        {
        isModalOpen && (
          <Auth onClose={closeModal} />
        )
      }
    </aside>
  )
}
