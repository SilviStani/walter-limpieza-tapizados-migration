import Icon from "../UI/Icon";
import { whatsappUrl } from "../../lib/contact";
import "./Services.scss";

const services = [
  { title: "Sillones y sofás", icon: "sofa", query: "sillones y sofás", text: "Para ese lugar de la casa que usás todos los días." },
  { title: "Colchones", icon: "bed", query: "colchones", text: "Limpieza profunda para tu espacio de descanso." },
  { title: "Sillas y tapizados", icon: "chair", query: "sillas y tapizados", text: "Cuidamos los detalles de tus muebles tapizados." },
  { title: "Interior de autos", icon: "car", query: "tapizados de auto", text: "Renová la limpieza de los asientos de tu vehículo." },
];

export default function Services() {
  return (
    <section id="servicios" className="section services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">QUÉ LIMPIAMOS</p><h2 id="services-title">Un cuidado para cada tapizado.</h2></div>
          <p>Contanos qué necesitás limpiar. Evaluamos el material y su estado para recomendarte el tratamiento.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <a className="service-card" href={whatsappUrl(service.query)} target="_blank" rel="noopener noreferrer" key={service.icon} aria-label={`Consultar por ${service.title.toLowerCase()} en WhatsApp`}>
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
