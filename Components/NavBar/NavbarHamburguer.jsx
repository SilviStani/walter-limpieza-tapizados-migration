"use client";
import React, { useState, useEffect } from 'react';
import "./Navbar.scss";
import { NavbarData } from "./NavbarData.js";
import Image from 'next/image';

const NavbarHamburguer = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="hamburguerMenu">
      <button
        className={`hamburger ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen(!open)}
      >
        <Image
          src="/hamburguer_menu.png"
          alt="Menu"
          width={30}
          height={30}
          className='menuHamburguesaImg'
        />
      </button>

      <div
        className={`menu-backdrop ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside className={`side-menu ${open ? 'open' : ''}`} role="menu" aria-hidden={!open}>
        <ul>
          {NavbarData.map((e) => (
            <li key={e.id}>
              <a href={e.url} target={e.target} onClick={() => setOpen(false)}>
                {e.src.length > 1 ? (
                  <Image src={e.src} alt={e.title} height={36} width={36} />
                ) : (
                  <span className="menu-link">{e.title}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default NavbarHamburguer;