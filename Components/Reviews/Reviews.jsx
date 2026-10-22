import Icon from "../UI/Icon";
import { business } from "../../lib/contact";
import feedback from "./reviews.json";
import "./Reviews.scss";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
});

function Stars({ rating }) {
  return (
    <span className="review-stars" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} width="18" height="18" viewBox="0 0 24 24" fill={index < rating ? "currentColor" : "none"} stroke="currentColor" aria-hidden="true">
          <path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-3-5.6 3 1-6.2L2.9 9.6l6.3-.9Z" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section id="opiniones" className="section reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LA EXPERIENCIA DE NUESTROS CLIENTES</p>
            <h2 id="reviews-title">Lo que dicen de nuestro trabajo.</h2>
          </div>
          <p>Sus palabras también cuentan. Una selección de opiniones que nuestros clientes compartieron en Google Maps.</p>
        </div>

        <div className="reviews-summary">
          <div className="reviews-score">
            <strong>{feedback.rating.toLocaleString("es-AR", { minimumFractionDigits: 1 })}<span> / 5</span></strong>
            <div>
              <Stars rating={feedback.rating} />
              <p>{feedback.reviewCount} opiniones en <span className="reviews-source">Google Maps</span></p>
            </div>
          </div>
          <a className="button button-secondary" href={business.googleMaps} target="_blank" rel="noopener noreferrer">
            Ver todas las opiniones<Icon name="arrow" />
          </a>
        </div>

        <div className="reviews-grid">
          {feedback.reviews.map((review) => (
            <figure className="review-card" key={review.url}>
              <Stars rating={review.rating} />
              <blockquote cite={review.url}><p>“{review.text}”</p></blockquote>
              <figcaption>
                <span className="review-avatar" aria-hidden="true">{review.author.split(" ").slice(0, 2).map((word) => word[0]).join("")}</span>
                <div>
                  <a className="review-author" href={review.profile} target="_blank" rel="noopener noreferrer">{review.author}</a>
                  <time dateTime={review.date}>{dateFormatter.format(new Date(review.date))}</time>
                </div>
              </figcaption>
              <a className="text-link review-source-link" href={review.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver la reseña de ${review.author} en Google Maps`}>
                Ver en Google Maps<Icon name="arrow" />
              </a>
            </figure>
          ))}
        </div>
        <p className="reviews-note">Selección de reseñas de Google Maps. Puntuación y cantidad de opiniones consultadas el <time dateTime={feedback.checkedAt}>{dateFormatter.format(new Date(feedback.checkedAt))}</time>.</p>
      </div>
    </section>
  );
}
