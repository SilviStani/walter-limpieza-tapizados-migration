import { business, phoneUrl } from "../../lib/contact";
import Icon from "../UI/Icon";
import WhatsAppLink from "../UI/WhatsAppLink";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer id="contacto" className="site-footer">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-copy"><p className="eyebrow">HABLEMOS DE TU TAPIZADO</p><h2>Un mensaje es<br />el primer paso.</h2><p>Mandanos una foto y contanos en qué zona estás.<br />Te ayudamos a encontrar el servicio que necesitás.</p><WhatsAppLink className="button button-light">Consultar por WhatsApp</WhatsAppLink></div>
          <div className="contact-details">
            <div><Icon name="pin" /><p><strong>Vamos a tu domicilio</strong><span>{business.area}</span><small>Consultanos por la cobertura en tu zona.</small></p></div>
            <div><Icon name="clock" /><p><strong>Horario de atención</strong><span>{business.hours}</span></p></div>
            <div><Icon name="chat" /><p><strong>Atención personalizada</strong><a href={phoneUrl()}>{business.phone}</a></p></div>
          </div>
        </div>
        <div className="footer-row">
          <div><a className="footer-brand" href="#inicio">Walter<span> Limpieza de tapizados</span></a><p>Cuidamos tus muebles a conciencia.</p></div>
          <nav aria-label="Enlaces del pie de página"><a href="#servicios">Servicios</a><a href="#zonas">Zonas</a><a href="#preguntas">Preguntas frecuentes</a><a href={business.instagram} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a></nav>
        </div>
      </div>
    </footer>
  );
}
