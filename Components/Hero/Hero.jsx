import React from 'react';
import "./Hero.scss";
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='HeroWrapper'>
      <div className='TextContainer'>
        <h1 className='Title'>Limpieza y Desinfección de Tapizados</h1>
        <p className='Desc'>Sillones, Sofás, Automoviles, Cortinados, Colchones, Alfombras, Limpieza en Seco.
          <br />Santa Fé, Argentina</p>
      </div>
      <div className='rightContainer'>
        <Link href="https://wa.me/5493425972698/?text=Estoy%20interesado%20en%20su%20servicio" target='_blank'>
          <button className="buttons">Pida su <br /> Presupuesto</button>
        </Link>
        <Link href="#trabajamos">
          <button className="buttonInvert">Nuestro<br />Servicio</button>
        </Link>
      </div>
    </div>
  )
}

export default Hero;