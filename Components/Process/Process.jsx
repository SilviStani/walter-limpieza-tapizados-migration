import "./Process.scss";

const steps = [
  ["Contanos qué necesitás", "Mandanos una foto del tapizado y tu zona por WhatsApp."],
  ["Coordinamos la visita", "Evaluamos el trabajo y acordamos el presupuesto y el turno con vos."],
  ["Limpiamos a fondo", "Inspeccionamos el material, tratamos las manchas y realizamos la limpieza."],
  ["Te guiamos con el cuidado", "Revisamos el resultado y te orientamos sobre el secado del tapizado."],
];

export default function Process() {
  return (
    <section id="trabajamos" className="section process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">ASÍ DE SIMPLE</p><h2 id="process-title">Vos nos escribís.<br />Nosotros nos ocupamos.</h2></div>
          <p>Atención personalizada desde la primera consulta hasta el cuidado después de la limpieza.</p>
        </div>
        <ol className="process-steps">
          {steps.map(([title, text], index) => <li key={title}><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
