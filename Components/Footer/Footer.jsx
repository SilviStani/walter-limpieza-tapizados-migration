import React from 'react';
import "./Footer.scss";
import Presentation from './Presentation';
import Contact from './Contact';
import { FooterServices } from './Footer_Services';
import { Schedule } from './Schedule';


const Footer = () => {
  return (
    <div className='FooterWrapper'>
      <Presentation />
      <FooterServices />
      <Contact />
      <Schedule />
    </div>
  )
}

export default Footer;