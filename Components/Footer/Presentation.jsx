import React from 'react';
import "./Footer.scss";
import Image from 'next/image';

const Presentation = () => {
    return (
        <div className='Presentation'>
            <h3>Walter Tapizados</h3>
            <Image
                src="/Logo-blanco.png"
                alt="Logo"
                height={80}
                width={80}
                className='Image'
            />
            <div className="descr">
                <ul>
                    <li>Limpieza profesional de Tapizados a domicilio</li>
                    <li>Cuidamos tus muebles a conciencia</li>
                </ul>
            </div>
        </div>
    )
}

export default Presentation;