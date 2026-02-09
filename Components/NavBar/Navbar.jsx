"use client";
import React from 'react';
import "./Navbar.scss";
import NavbarHamburguer from './NavbarHamburguer';
import { Logo } from './Logo';
import { NavBarLinks } from './NavBarLinks';

const Navbar = () => {
  return (
    <div className='NavbarWrapper'>
      <NavbarHamburguer />
      <Logo />
      <NavBarLinks/>
    </div>
  )
}

export default Navbar;