# Contexto de los trabajos

Los casos publicados se editan en `Components/Works/DataWorks.js`. Cada ficha
admite `material`, `problem` y `treatment`; se muestran tanto en la tarjeta como
en el modal. Los campos sin información se dejan en `null` y no se muestran.

En los dos casos existentes se describen solamente la superficie y las marcas
visibles en las fotografías. No se identifica la composición de las fibras ni
la causa de las manchas. El tratamiento específico no está documentado y se
mantiene en `null`, sin atribuir productos, técnicas o resultados sanitarios.

## Casos de otros servicios pendientes

La revisión del 23 de octubre de 2026 encontró estas imágenes, pero el usuario
confirmó que no dispone de información adicional sobre los trabajos:

| Servicio o candidato | Archivos disponibles | Información faltante |
| --- | --- | --- |
| Colchón | `public/colchon.jpg` | Descripción del trabajo, material confirmado, problema, tratamiento y momento de la foto |
| Superficie acolchada por identificar | `public/acolchado-antes.jpg`, `public/acolchado-desp.jpg` | Identificar el objeto y confirmar que las fotos pertenecen al mismo trabajo, material, problema y tratamiento |
| Sillas | No se encontraron fotos identificadas como sillas | Fotografías del trabajo y su descripción |

No se incorporaron estos archivos como nuevos casos reales. Una foto aislada
no permite deducir el tratamiento ni presentar una comparación antes/después.

Para ampliar la galería, registrar para cada trabajo:

- Servicio y título breve.
- Material, sin adivinar la fibra por la apariencia.
- Problema atendido y tratamiento efectivamente realizado.
- Fotografías correspondientes al mismo trabajo, identificadas como antes y
  después; si solo hay una foto, registrar qué momento muestra y adaptar la
  presentación sin duplicarla para simular una comparación.

Agregar una entrada a `DataWorks` con `id` único, `title`, `category`, `before`,
`after`, `material`, `problem` y `treatment` cuando se disponga de esa información.
Actualizar las pruebas si se completa un tratamiento que antes estaba ausente.
