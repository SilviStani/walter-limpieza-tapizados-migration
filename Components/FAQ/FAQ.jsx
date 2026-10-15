import Icon from "../UI/Icon";
import { whatsappMessageUrl } from "../../lib/contact";
import "./FAQ.scss";

const questions = [
  {
    question: "¿Qué necesitás para darme un presupuesto?",
    answer: "Contanos qué tapizado querés limpiar, cuántas unidades son y en qué barrio o localidad estás. Sumá una foto general y fotos de las manchas en WhatsApp para que podamos evaluar el trabajo.",
  },
  {
    question: "¿Cuánto tarda el trabajo y cuándo puedo usar el tapizado?",
    answer: "El trabajo suele durar alrededor de 2 horas. Al coordinar la visita, consultanos por el tiempo de secado de tu tapizado y cuándo podés volver a usarlo.",
  },
  {
    question: "¿Cómo preparo el espacio antes de la visita?",
    answer: "Al coordinar, contanos dónde está el tapizado y cómo es el acceso. Confirmá con Walter qué espacio y condiciones necesita para realizar la limpieza.",
  },
  {
    question: "¿Qué medios de pago puedo usar?",
    answer: "Aceptamos efectivo y transferencia. Coordiná los detalles del pago con Walter al confirmar el servicio.",
  },
  {
    question: "¿Se pueden sacar todas las manchas?",
    answer: "Evaluamos el material, el estado del tapizado y el tipo de manchas antes de trabajar. Mandanos fotos de cerca para conversar sobre el tratamiento y el resultado posible en tu caso.",
  },
  {
    question: "¿Enviar la consulta ya reserva un turno?",
    answer: "La consulta es el primer contacto. El presupuesto, la cobertura y el turno se acuerdan con Walter por WhatsApp.",
  },
];

export default function FAQ() {
  return (
    <section id="preguntas" className="section faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-intro"><p className="eyebrow">ANTES DE COORDINAR</p><h2 id="faq-title" className="section-title">Tus dudas,<br />más claras.</h2><p>Lo que conviene saber antes de pedir tu limpieza.</p><a className="text-link" href={whatsappMessageUrl("Hola Walter, tengo una consulta sobre el servicio de limpieza de tapizados: ")} target="_blank" rel="noopener noreferrer">Tengo otra pregunta<Icon name="arrow" /></a></div>
        <div className="faq-list">
          {questions.map(({ question, answer }) => (
            <details className="faq-item" key={question}>
              <summary><h3>{question}</h3><Icon name="plus" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
