"use client";
import React, { useState } from 'react';
import "./Works.scss"
import { DataWorks } from './DataWorks';
import Image from 'next/image';
import { Modal_Image } from '../Modal_Image/Modal_Image';

const Works = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (work) => {
        setSelectedImage(work);
    };

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
                                onClick={() => openModal(work)}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    ))
                }
            </div>

            {/* Modal for full-size image */}
            <Modal_Image selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            <span></span>
        </div>
    )
}

export default Works;