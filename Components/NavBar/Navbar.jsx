"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "../UI/Icon";
import WhatsAppLink from "../UI/WhatsAppLink";
import "./Navbar.scss";

const links = [
  ["Servicios", "#servicios"],
  ["Resultados", "#resultados"],
  ["Cómo trabajamos", "#trabajamos"],
  ["Zonas", "#zonas"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const onPointer = (event) => { if (!header.current?.contains(event.target)) setOpen(false); };
    const media = window.matchMedia("(min-width: 901px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    media.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Walter Tapizados, inicio" onClick={() => setOpen(false)}>
          <Image src="/Logo-blanco.png" alt="" width={50} height={50} />
          <span><strong>Walter</strong><small>LIMPIEZA DE TAPIZADOS</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-contact"><WhatsAppLink>Hablemos</WhatsAppLink></div>
        <button className="menu-toggle" ref={toggle} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Navegación móvil" hidden={!open}>
        <div className="container">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<Icon name="arrow" /></a>)}
          <a href="#presupuesto" onClick={() => setOpen(false)}>Pedir presupuesto<Icon name="arrow" /></a>
          <a href="#preguntas" onClick={() => setOpen(false)}>Preguntas frecuentes<Icon name="arrow" /></a>
          <a href="#contacto" onClick={() => setOpen(false)}>Contacto<Icon name="arrow" /></a>
        </div>
      </nav>
    </header>
  );
}
