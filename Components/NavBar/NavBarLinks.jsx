import React from 'react';
import "./Navbar.scss";
import { NavbarData } from "./NavbarData.js";
import Image from 'next/image';

export const NavBarLinks = () => {
    return (
        <div className="rightWrapper">
            {
                NavbarData.map((e) => (
                    e.src.length > 1 ?
                        <a
                            key={e.id}
                            href={e.url}
                            target={e.target.length > 1 ? e.target : null}
                            className='right'
                            >
                            <Image
                                src={e.src}
                                alt={e.title}
                                height={40}
                                width={40}
                                className='imageLogos'
                            />
                        </a>
                        :
                        <a
                            key={e.id}
                            href={e.url}
                            target={e.target}
                            className='right'
                        >
                            <p className='sections'>{e.title}</p>
                        </a>
                ))
            }
        </div>
    )
}