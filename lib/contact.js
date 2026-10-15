export const business = {
  name: "Walter Tapizados",
  phone: "+54 9 342 597-2698",
  instagram: "https://www.instagram.com/waltertapizados/",
  hours: "Lunes a sábado, de 9 a 19 h",
  area: "Santa Fe capital y alrededores",
};

export function whatsappUrl(service) {
  const message = service
    ? `Hola Walter, quisiera un presupuesto para limpieza de ${service}. Mi zona es: `
    : "Hola Walter, quisiera un presupuesto para limpiar un tapizado. Mi zona es: ";
  return `https://wa.me/5493425972698?text=${encodeURIComponent(message)}`;
}
