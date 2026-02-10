"use client";
import React, { useState } from 'react';
import "./Bottom.scss";
import Image from 'next/image';
import PrivacyModal from '../Modal/PrivacyModal';
import policy from '../Modal/privacy-policy.json';


export const Bottom = () => {
    const currentYear = new Date().getFullYear();
    const [open, setOpen] = useState(false);
    return (
        <div className="Bottom">
            <p>© {currentYear} Walter Tapizados| Todos los derechos reservados.</p>
            <p>Desarrollado por
                <a
                    href="https://www.linkedin.com/in/silvina-staniszewski-developer/"
                    target="_blank"
                    rel="noopener noreferrer">
                    {" "}Silvina_Dev {" "}
                </a>
                <Image
                    src="/click.png"
                    alt="click aqui"
                    width={20}
                    height={20}
                    className="click-icon"
                />
            </p>
            <button className="privacy-link" onClick={() => setOpen(true)}>Política de Privacidad</button>
            <PrivacyModal open={open} onClose={() => setOpen(false)}>
                <h2>{policy.title}</h2>
                <p>Última actualización: {policy.updated}</p>
                {policy.sections.map((s, i) => (
                    <section key={i}>
                        <h3>{s.heading}</h3>
                        <p>{s.body}</p>
                    </section>
                ))}
            </PrivacyModal>
        </div>
    )
}