"use client";

import { useState } from "react";
import Image from "next/image";
import { DataWorks } from "./DataWorks";
import Dialog from "../UI/Dialog";
import Icon from "../UI/Icon";
import "./Works.scss";

function Comparison({ work, large = false }) {
  return (
    <div className={`comparison ${large ? "comparison-large" : ""}`}>
      {[["before", "Antes"], ["after", "Después"]].map(([key, label]) => (
        <figure key={key}>
          <Image src={work[key]} alt={`${work.title}: ${label.toLowerCase()} de la limpieza`} width={800} height={600} sizes={large ? "(max-width: 700px) 90vw, 45vw" : "(max-width: 700px) 44vw, 23vw"} />
          <figcaption className={key}>{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Works() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="resultados" className="section works" aria-labelledby="works-title">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">EL CAMBIO SE VE</p><h2 id="works-title">Antes y después, de verdad.</h2></div>
          <p>Una muestra de nuestros trabajos. Mirá de cerca el resultado de cada limpieza.</p>
        </div>
        <div className="work-grid">
          {DataWorks.map((work) => (
            <article className="work-card" key={work.id}>
              <Comparison work={work} />
              <div className="work-info">
                <div><p>{work.category}</p><h3>{work.title}</h3></div>
                <button type="button" onClick={() => setSelected(work)} className="work-expand" aria-label={`Ampliar antes y después: ${work.title.toLowerCase()}`}><Icon name="expand" /><span>Ampliar</span></button>
              </div>
            </article>
          ))}
        </div>
        <p className="results-note">Cada tapizado es diferente. Evaluamos su estado y el tipo de manchas antes de trabajar.</p>
        <Dialog open={!!selected} onClose={() => setSelected(null)} title={selected?.title || "Detalle del trabajo"}>
          {selected && <Comparison work={selected} large />}
        </Dialog>
      </div>
    </section>
  );
}
