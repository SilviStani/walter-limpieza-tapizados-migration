export const business = {
  name: "Walter Tapizados",
  phone: "+54 9 342 597-2698",
  instagram: "https://www.instagram.com/waltertapizados/",
  hours: "Lunes a sábado, de 9 a 19 h",
  area: "Santa Fe capital y región de influencia",
};

export function whatsappUrl(service) {
  const message = service
    ? `Hola Walter, quisiera un presupuesto para limpieza de ${service}. Mi zona es: `
    : "Hola Walter, quisiera un presupuesto para limpiar un tapizado. Mi zona es: ";
  return whatsappMessageUrl(message);
}

export function whatsappMessageUrl(message) {
  return `https://wa.me/5493425972698?text=${encodeURIComponent(message)}`;
}

export function quoteMessage({ service, quantity, zone, details }) {
  return [
    "Hola Walter, quisiera consultar un presupuesto.",
    `Servicio: ${service}.`,
    `Cantidad: ${quantity}.`,
    `Barrio o localidad: ${zone.trim()}.`,
    details.trim() ? `Detalles: ${details.trim()}` : null,
  ].filter(Boolean).join("\n");
}
