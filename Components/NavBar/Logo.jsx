import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import "./Navbar.scss";

export const Logo = () => {
    return (
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
    )
}