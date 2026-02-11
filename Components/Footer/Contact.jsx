"use client";
import React, { useState } from 'react';
import "./Footer.scss";
import Image from 'next/image';
import Link from 'next/link';
import Map_Modal from '../Modal/Map_Modal';

export default function Contact() {
    const [open, setOpen] = useState(false);

    return (
        <div className='Presentation'>
            <h3>Contacto</h3>
            <div
                onClick={() => setOpen(true)}
                className="map-link"
            >
                <Image
                    src={"/mapa.png"}
                    alt=''
                    height={40}
                    width={40}
                />
            </div>
            <Map_Modal open={open} onClose={() => setOpen(false)} />
            <p>Atendemos en Ciudad Santa Fé Capital y Alrededores</p>
            <Link
                href="https://wa.me/5493425972698/?text=Estoy%20interesado%20en%20su%20servicio"
                className="button">
                Contactar
            </Link>
        </div>
    )
} 