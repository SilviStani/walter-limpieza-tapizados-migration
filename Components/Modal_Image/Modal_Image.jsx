import React from 'react';
import "../Works/Works.scss" 
import Image from 'next/image';

export const Modal_Image = ({ selectedImage, setSelectedImage }) => {
    const closeModal = () => {
        setSelectedImage(null);
    };
    return (
        <>
            {selectedImage && (
                <div className="ModalOverlay" onClick={closeModal}>
                    <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
                        <button className="CloseButton" onClick={closeModal}>✕</button>
                        <Image
                            height={600}
                            width={600}
                            src={selectedImage.img}
                            alt={selectedImage.title}
                            className="ModalImage"
                        />
                    </div>
                </div>
            )}
        </>
    )
}