import Icon from "../UI/Icon";
import { whatsappMessageUrl } from "../../lib/contact";
import "./Coverage.scss";

const areas = [
  "Santa Fe capital",
  "Santo Tomé y Sauce Viejo",
  "Paraná (Entre Ríos)",
  "Rincón y toda la costa hasta Arroyo Leyes",
  "Esperanza, Franck y corredor de la ruta 70",
  "Recreo",
  "Candioti y zona norte por la ruta 11",
];

export default function Coverage() {
  return (
    <section id="zonas" className="coverage" aria-labelledby="coverage-title">
      <div className="container coverage-layout">
        <div className="coverage-intro">
          <p className="eyebrow"><Icon name="pin" /> CERCA TUYO</p>
          <h2 id="coverage-title" className="section-title">Vamos a tu domicilio.</h2>
          <p>Atendemos en Santa Fe capital y toda su región de influencia. Llegamos a localidades vecinas, la costa y los corredores de las rutas 70 y 11.</p>
          <div className="coverage-inquiry"><p>¿No encontrás tu localidad?</p><a className="text-link" href={whatsappMessageUrl("Hola Walter, no encontré mi localidad entre las zonas de cobertura. ¿Atienden en mi zona? Mi localidad es: ")} target="_blank" rel="noopener noreferrer">Escribinos y consultá<Icon name="arrow" /></a></div>
        </div>
        <div className="coverage-areas">
          <p className="coverage-list-label">LOCALIDADES Y CORREDORES</p>
          <ul className="coverage-list">{areas.map((area) => <li key={area}><Icon name="check" /><span>{area}</span></li>)}</ul>
        </div>
      </div>
    </section>
  );
}
