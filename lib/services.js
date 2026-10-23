export const services = [
  { id: "sofa", title: "Sillones y sofás", icon: "sofa", query: "sillones y sofás", text: "Para ese lugar de la casa que usás todos los días.", featured: true },
  { id: "bed", title: "Colchones", icon: "bed", query: "colchones", text: "Limpieza profunda para tu espacio de descanso.", featured: true },
  { id: "chair", title: "Sillas y tapizados", icon: "chair", query: "sillas y tapizados", text: "Cuidamos los detalles de tus muebles tapizados.", featured: true },
  { id: "car", title: "Interior de autos", icon: "car", query: "tapizados de auto", text: "Renová la limpieza de los asientos de tu vehículo.", featured: true },
  { id: "rug", title: "Alfombras", icon: "rug", featured: false },
  { id: "other", title: "Otro tapizado", icon: "plus", featured: false },
];

export const featuredServices = services.filter((service) => service.featured);
