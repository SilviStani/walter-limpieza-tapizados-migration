import Image from "next/image";
import Icon from "../UI/Icon";
import "./Hero.scss";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow"><Icon name="pin" /> SANTA FE Y ALREDEDORES</p>
          <h1 id="hero-title">Volvé a disfrutar<br />de tus <em>tapizados.</em></h1>
          <p className="hero-description">Limpieza profesional a domicilio para tus sillones, colchones y tapizados. Cuidamos tus muebles a conciencia.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#presupuesto"><Icon name="chat" />Pedir presupuesto<Icon name="arrow" /></a>
            <a className="text-link" href="#resultados">Ver resultados<Icon name="arrow" /></a>
          </div>
          <p className="hero-note">Mandanos una foto y tu zona por WhatsApp.<br />Te orientamos sobre el servicio que necesitás.</p>
        </div>
        <div className="hero-visual">
          <Image className="hero-photo" src="/wal_limpieza.png" alt="Limpieza de un sillón con equipo de extracción" fill sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) 48vw, 570px" preload />
          <div className="hero-caption"><span className="caption-icon"><Icon name="sofa" /></span><span><strong>Tu casa, más disfrutable.</strong><small>Nosotros nos ocupamos de la limpieza.</small></span></div>
        </div>
      </div>
      <div className="container hero-benefits" aria-label="Nuestro servicio">
        <span><Icon name="pin" />Atención a domicilio</span>
        <span><Icon name="check" />Productos profesionales</span>
        <span><Icon name="chat" />Trato personalizado</span>
      </div>
    </section>
  );
}
