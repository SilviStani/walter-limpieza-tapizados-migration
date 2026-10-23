import Icon from "../UI/Icon";
import { whatsappUrl } from "../../lib/contact";
import { featuredServices } from "../../lib/services";
import "./Services.scss";

export default function Services() {
  return (
    <section id="servicios" className="section services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">QUÉ LIMPIAMOS</p><h2 id="services-title">Un cuidado para cada tapizado.</h2></div>
          <p>Contanos qué necesitás limpiar. Evaluamos el material y su estado para recomendarte el tratamiento.</p>
        </div>
        <div className="service-grid">
          {featuredServices.map((service, index) => (
            <a className="service-card" href={whatsappUrl(service.query)} target="_blank" rel="noopener noreferrer" key={service.id} aria-label={`Consultar por ${service.title.toLowerCase()} en WhatsApp`}>
              <div className="service-top"><Icon name={service.icon} /><span>0{index + 1}</span></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-link">Consultar<Icon name="arrow" /></span>
            </a>
          ))}
        </div>
        <p className="services-extra">¿Alfombras, cortinados u otro tapizado? <a href={whatsappUrl("alfombras, cortinados u otro tapizado")} target="_blank" rel="noopener noreferrer">Consultanos por tu caso <span aria-hidden="true">↗</span></a></p>
      </div>
    </section>
  );
}
