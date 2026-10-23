import assert from "node:assert/strict";
import { test } from "node:test";
import { business, phoneUrl, quoteMessage, whatsappMessageUrl, whatsappUrl } from "../../lib/contact.js";

test("el presupuesto conserva servicio, cantidad y acentos, y recorta los campos libres", () => {
  assert.equal(quoteMessage({
    service: "Sillones y sofás", quantity: "2", zone: "  Santa Fe centro  ",
    details: "  Manchas en el apoyabrazos & respaldo.\nTengo fotos.  ",
  }), [
    "Hola Walter, quisiera consultar un presupuesto.",
    "Servicio: Sillones y sofás.",
    "Cantidad: 2.",
    "Barrio o localidad: Santa Fe centro.",
    "Detalles: Manchas en el apoyabrazos & respaldo.\nTengo fotos.",
  ].join("\n"));
});

test("el presupuesto omite detalles vacíos sin dejar una línea extra", () => {
  assert.equal(quoteMessage({ service: "Colchones", quantity: "1", zone: "Centro", details: " \n " }), [
    "Hola Walter, quisiera consultar un presupuesto.",
    "Servicio: Colchones.",
    "Cantidad: 1.",
    "Barrio o localidad: Centro.",
  ].join("\n"));
});

test("WhatsApp preserva tildes, saltos y caracteres reservados en un único parámetro", () => {
  const message = "Sillón & sofá + sillas?\nZona: Candioti #2 / 50%";
  const url = new URL(whatsappMessageUrl(message));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.searchParams.get("text"), message);
  assert.equal([...url.searchParams].length, 1);
  assert.equal(url.hash, "");
});

test("los enlaces siguen el teléfono configurado aunque tenga espacios y guiones", () => {
  const original = business.phone;
  try {
    business.phone = "+54 9 11 1234-5678";
    assert.equal(phoneUrl(), "tel:+5491112345678");
    assert.equal(new URL(whatsappMessageUrl("Consulta")).pathname, "/5491112345678");
  } finally {
    business.phone = original;
  }
});

test("la consulta rápida incluye el servicio o el mensaje general", () => {
  assert.equal(new URL(whatsappUrl("tapizados de auto")).searchParams.get("text"),
    "Hola Walter, quisiera un presupuesto para limpieza de tapizados de auto. Mi zona es: ");
  assert.equal(new URL(whatsappUrl()).searchParams.get("text"),
    "Hola Walter, quisiera un presupuesto para limpiar un tapizado. Mi zona es: ");
});
