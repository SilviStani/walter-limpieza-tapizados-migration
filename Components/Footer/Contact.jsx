import React from 'react';
import "./Footer.scss";
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
    return (
        <div className='Presentation'>
            <h3>Contacto</h3>
            <Image
                src={"/mapa.png"}
                alt=''
                height={40}
                width={40}
            />
            <p>Atendemos en Ciudad Santa Fé Capital y Alrededores</p>
            <Link
                href="https://wa.me/5493425972698/?text=Estoy%20interesado%20en%20su%20servicio"
                className="button">
                Contactar
            </Link>
        </div>
    )
} 