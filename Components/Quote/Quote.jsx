"use client";

import { useRef, useState } from "react";
import { quoteMessage, whatsappMessageUrl } from "../../lib/contact";
import Icon from "../UI/Icon";
import "./Quote.scss";

const services = [
  { name: "Sillones y sofás", icon: "sofa" },
  { name: "Colchones", icon: "bed" },
  { name: "Sillas y tapizados", icon: "chair" },
  { name: "Interior de autos", icon: "car" },
  { name: "Alfombras", icon: "rug" },
  { name: "Otro tapizado", icon: "plus" },
];

export default function Quote() {
  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [zone, setZone] = useState("");
  const [details, setDetails] = useState("");
  const [copyFeedback, setCopyFeedback] = useState(null);
  const [copying, setCopying] = useState(false);
  const zoneInput = useRef(null);
  const message = quoteMessage({ service, quantity, zone, details });
  const currentFeedback = copyFeedback?.message === message ? copyFeedback.status : null;

  async function copyMessage() {
    setCopyFeedback(null);
    setCopying(true);
    try {
      await navigator.clipboard.writeText(message);
      setCopyFeedback({ message, status: "copied" });
    } catch {
      setCopyFeedback({ message, status: "manual" });
    } finally {
      setCopying(false);
    }
  }

  function submitQuote(event) {
    event.preventDefault();
    if (!zone.trim()) {
      zoneInput.current.setCustomValidity("Escribí tu barrio o localidad.");
      zoneInput.current.reportValidity();
      return;
    }
    if (event.nativeEvent.submitter?.value === "copy") {
      copyMessage();
      return;
    }
    window.open(whatsappMessageUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="presupuesto" className="section quote" aria-labelledby="quote-title">
      <div className="container quote-layout">
        <div className="quote-intro">
          <p className="eyebrow">EMPECEMOS POR TU CONSULTA</p>
          <h2 id="quote-title" className="section-title">Contanos qué<br />querés limpiar.</h2>
          <p className="quote-description">Completá estos datos y llevate el mensaje listo a WhatsApp. Walter evalúa tu caso y coordina el presupuesto con vos.</p>
          <ol className="quote-guide">
            <li><span>01</span><div><strong>Elegí el tapizado</strong><p>Indicá qué necesitás limpiar y la cantidad.</p></div></li>
            <li><span>02</span><div><strong>Contanos tu zona</strong><p>Con el barrio o la localidad alcanza para empezar.</p></div></li>
            <li><span>03</span><div><strong>Sumá las fotos en WhatsApp</strong><p>Una foto general y otra de las manchas ayudan a evaluar el trabajo.</p></div></li>
          </ol>
          <a className="text-link" href={whatsappMessageUrl("Hola Walter, necesito orientación para limpiar un tapizado.")} target="_blank" rel="noopener noreferrer">Prefiero consultar directamente<Icon name="arrow" /></a>
        </div>

        <form className="quote-form" onSubmit={submitQuote} aria-label="Preparar consulta por WhatsApp">
          <fieldset className="quote-services">
            <legend>¿Qué necesitás limpiar?</legend>
            <div className="quote-service-options">
              {services.map((item) => (
                <label className="quote-service-option" key={item.name}>
                  <input type="radio" name="service" value={item.name} checked={service === item.name} onChange={(event) => setService(event.target.value)} required />
                  <span><Icon name={item.icon} />{item.name}<Icon name="check" className="selection-check" /></span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="quote-fields">
            <div className="quote-field">
              <label htmlFor="quote-quantity">Cantidad</label>
              <input id="quote-quantity" type="number" inputMode="numeric" min="1" max="99" step="1" required value={quantity} onChange={(event) => setQuantity(event.target.value)} aria-describedby="quantity-help" />
              <small id="quantity-help">Unidades a limpiar.</small>
            </div>
            <div className="quote-field">
              <label htmlFor="quote-zone">Barrio o localidad</label>
              <input ref={zoneInput} id="quote-zone" type="text" autoComplete="address-level2" placeholder="Escribí tu zona" required maxLength={100} value={zone} onChange={(event) => { setZone(event.target.value); event.target.setCustomValidity(""); }} aria-describedby="zone-help" />
              <small id="zone-help">La cobertura se confirma al coordinar.</small>
            </div>
          </div>

          <div className="quote-field">
            <label htmlFor="quote-details">¿Algo más que debamos saber? <span>Opcional</span></label>
            <textarea id="quote-details" rows={3} maxLength={500} placeholder="Por ejemplo: sillón de 3 cuerpos, manchas en un apoyabrazos…" value={details} onChange={(event) => setDetails(event.target.value)} />
          </div>
          <div className="quote-photo-note"><Icon name="camera" /><p>Las fotos se adjuntan en WhatsApp, después de continuar.</p></div>
          <button className="button button-primary quote-submit" type="submit"><Icon name="chat" />Continuar en WhatsApp<Icon name="arrow" /></button>
          <p className="quote-send-note">Revisá el mensaje en WhatsApp y envialo cuando esté listo.</p>
          <div className="quote-copy">
            <p>¿No pudiste abrir WhatsApp? Copiá el mensaje y pegalo en el chat con Walter.</p>
            <button className="button button-secondary quote-submit" type="submit" name="action" value="copy" disabled={copying}>
              {copying ? "Copiando…" : "Copiar mensaje"}
            </button>
            <p className="quote-copy-status" role="status" aria-atomic="true">
              {currentFeedback === "copied" && "Mensaje copiado. Ya podés pegarlo en WhatsApp."}
              {currentFeedback === "manual" && "No pudimos copiarlo automáticamente. Seleccioná el mensaje de abajo y copialo."}
            </p>
            {currentFeedback === "manual" && (
              <div className="quote-field">
                <label htmlFor="quote-message">Mensaje para copiar</label>
                <textarea id="quote-message" readOnly rows={7} value={message} onFocus={(event) => event.target.select()} />
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
