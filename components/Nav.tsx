import React from 'react'
import Image from "next/image";

interface NavProps {
  onOpen: () => void;
}

const Nav: React.FC<NavProps> = ({onOpen}) => {
  return (
    <>
        <nav className="nav">
        <div className="nav__wrapper">
            <figure className="nav__img--mask">
            <Image className="nav__img" sizes="200px" fill={true} src="/assets/logo.png" alt="logo" />
            </figure>
            <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={onOpen}>Login</li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
            </ul>
        </div>
        </nav>
    </>
  )
}

export default Nav;
