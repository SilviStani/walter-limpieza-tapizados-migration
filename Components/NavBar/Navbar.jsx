import React from 'react';
import "./Navbar.scss";
import { NavbarData } from "./NavbarData.js";
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='NavbarWrapper'>
      <div className="leftWrapper">
        <Link
          href={"/"}
          target='_itself'
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
                href={"/"}
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
                href={"/"}
                target={e.target}
                className='right'
              >
                <h1 className='sections'>{e.title}</h1>
              </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Navbar;