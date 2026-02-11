import React from 'react';
import "./Footer.scss";
import Image from 'next/image';

export const FooterServices = () => {
    return (
        <div className='Presentation'>
            <h3>Servicios</h3>
            <Image
                src="/Logo.png"
                alt="Logo"
                height={100}
                width={100}
                className='Image'
            />
            <ul>
                <li>
                    <Image
                        src={"/check.png"}
                        alt=''
                        height={20}
                        width={20}
                    />
                    Limpieza de Sillones
                </li>
                <li>
                    <Image
                        src={"/check.png"}
                        alt=''
                        height={20}
                        width={20}
                    />
                    Limpieza de Colchones
                </li>
                <li>
                    <Image
                        src={"/check.png"}
                        alt=''
                        height={20}
                        width={20}
                    />
                    Limpieza de Sillas y Tapizados
                </li>
                <li>
                    <Image
                        src={"/check.png"}
                        alt=''
                        height={20}
                        width={20}
                    />
                    Limpieza de Alfombras
                </li>
            </ul>
        </div>
    )
}