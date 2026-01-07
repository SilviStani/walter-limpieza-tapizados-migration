import React from 'react';
import "./Works.scss"
import { DataWorks } from './DataWorks';
import Image from 'next/image';

const Works = () => {
  return (
    <div className='WorksWrapper'>
        <h1 className='WorksTitle'>Algunos de Nuestros Trabajos</h1>
        <div className="PhotoContainer">
            {/* Aquí puedes agregar las imágenes de los trabajos realizados */}
            {
                DataWorks.map((work) => (
                    <div key={work.id} className="PhotoItem">
                        <Image
                        height={400} 
                        width={400} 
                        src={work.img} 
                        alt={work.title} 
                        className="WorkImage"
                        />
                    </div>
                ))
            }
        </div>
        <span></span>
    </div>
  )
}

export default Works;