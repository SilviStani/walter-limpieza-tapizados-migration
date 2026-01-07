"use client";
import React, { useState, useEffect } from 'react';
import "./Navbar.scss";
import { NavbarData } from "./NavbarData.js";
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className='NavbarWrapper'>
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
                <Link href={e.url} target={e.target} onClick={() => setOpen(false)}>
                  {e.src.length > 1 ? (
                    <Image src={e.src} alt={e.title} height={36} width={36} />
                  ) : (
                    <span className="menu-link">{e.title}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="leftWrapper">
        <Link
          href={"/"}
          className='left'>
          <Image
            src="/Logo-blanco.png"
            alt="Walter limpieza tapizados. pagina inicio."
            height={70}
            width={70}
            className='logoImage'
          />
          <p><span>Walter</span><br />Limpieza Tapizados</p>
        </Link>
      </div>
      <div className="rightWrapper">
        {
          NavbarData.map((e) => (
            e.src.length > 1 ?
              <Link
                key={e.id}
                href={e.url}
                target={e.target}
                className='right'>
                <Image
                  src={e.src}
                  alt={e.title}
                  height={40}
                  width={40}
                  className='imageLogos'
                />
              </Link>
              :
              <Link
                key={e.id}
                href={e.url}
                target={e.target}
                className='right'
              >
                <p className='sections'>{e.title}</p>
              </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Navbar;