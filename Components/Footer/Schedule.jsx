import React from 'react';
import "./Footer.scss";
import Image from 'next/image';

export const Schedule = () => {
    return (
        <div className='Presentation'>
            <h3>Horarios</h3>
            <Image
                src="/reloj.png"
                alt="horario"
                width={50}
                height={50}
            />
            <p>Lunes a Sábado: 9:00 hs - 19:00 hs</p>
            <div className="garantia">
                <h3>Nuestra Garantía </h3>
                <ul>
                    <li>
                        <Image
                            src={"/check.png"}
                            alt=''
                            height={20}
                            width={20}
                        />
                        Productos Profesionales
                    </li>
                    <li>
                        <Image
                            src={"/check.png"}
                            alt=''
                            height={20}
                            width={20}
                        />
                        Secado Rápido
                    </li>
                    <li>
                        <Image
                            src={"/check.png"}
                            alt=''
                            height={20}
                            width={20}
                        />
                        Atención Personalizada                        </li>
                </ul>
            </div>
        </div>
    )
}