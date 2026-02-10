import React from 'react';
import "./DescriptionProcess.scss";
import { ProcessData } from './Process.js';

export const ProcessDesc = () => {
    return (
        <>
            <span></span>
            <div
                className='DescriptionWrapper'>
                {
                    ProcessData.map((e) => (
                        e.id < 6 ? (
                            <div
                                key={e.id}
                                className='DescriptionContainer'
                                style={{ backgroundImage: e.img ? `url(${e.img})` : 'none', backgroundSize: 'cover' }}
                            >
                                <div className='textWrapper'>
                                    <h1 className='DescriptionTitle'>{e.id + ". " + e.title}</h1>
                                    <p className='DescriptionParagraph'>{e.description}</p>
                                </div>
                            </div>
                        ) : (
                            <div
                                key={e.id}
                                className='DescriptionContainer'
                                style={{ backgroundImage: e.img ? `url(${e.img})` : 'none', backgroundSize: 'cover' }}
                            >
                                <div className='textWrapper'>
                                    <h1 className='DescriptionTitle'>{e.title}</h1>
                                    <p className='DescriptionParagraph'>{e.description}</p>
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
            <span></span>
        </>
    )
}