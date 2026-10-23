This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Portada al compartir enlaces

La portada está en `src/app/opengraph-image.png` (1200 × 630). Next.js publica
la imagen e incorpora sus metadatos Open Graph automáticamente. La misma imagen
se utiliza para las tarjetas grandes de Twitter/X.

Para regenerarla con el logo, la imagen y los colores del sitio:

```bash
node scripts/generate-social-image.mjs
```

Los metadatos apuntan al dominio público `https://walter-limpieza-tapizados.digital/`.
Si cambia el dominio, configurá `NEXT_PUBLIC_SITE_URL` con la nueva URL completa
antes de compilar, o actualizá el valor predeterminado en `lib/site.js`.

La vista previa en WhatsApp requiere un despliegue público accesible: no puede
leer la web que se ejecuta solamente en tu computadora.

## SEO local

El título de la página es `Limpieza de tapizados en Santa Fe | Walter`.
La URL canónica, los metadatos sociales y las rutas de rastreo comparten el
dominio definido en `lib/site.js` mediante `NEXT_PUBLIC_SITE_URL`. Configurá
la URL pública del dominio, con `https://`; se normaliza a su raíz con barra final.

- `src/app/sitemap.js` genera `/sitemap.xml` con la página de inicio, la única
  página pública de contenido. Las secciones con anclas no son páginas separadas.
- `src/app/robots.js` genera `/robots.txt`, permite el rastreo del sitio e indica
  la URL absoluta del sitemap.
- `src/app/layout.js` define el título, la descripción y la URL canónica.

Si cambia el dominio, configurá `NEXT_PUBLIC_SITE_URL` antes de volver a compilar
y desplegar. Tras el despliegue, comprobá `/robots.txt` y `/sitemap.xml` en el
dominio público. Podés enviar el sitemap a Google Search Console para facilitar
su descubrimiento; esto no garantiza la indexación ni una posición en resultados.

Referencia: [metadatos de Next.js](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

## Opiniones de clientes

La sección `Opiniones` muestra una selección fija de tres reseñas reales de
[Google Maps](https://maps.app.goo.gl/1nFcRFraTuuooot56), consultadas el 22 de octubre
de 2026. No utiliza API, claves ni servicios de terceros para cargar las reseñas.

Los textos originales, autores, fechas, puntuaciones y enlaces están en
`Components/Reviews/reviews.json`. Para actualizar la selección, verificá cada
reseña en Google Maps y editá ese archivo. Actualizá también `rating`, `reviewCount`
y `checkedAt` al volver a consultar la puntuación global. Los cambios se reflejan
al volver a compilar y desplegar la web; no hay sincronización automática.

## Desarrollo local

### Verificaciones automáticas

Con Node.js 22 actualizado y las dependencias instaladas con `npm ci`:

```bash
npx playwright install --only-shell chromium
npm run check
```

`check` ejecuta lint, las pruebas unitarias del mensaje y los enlaces, la
compilación de producción y las pruebas de navegador. Playwright inicia y
detiene su propio servidor de producción en el puerto 4177. Para repetir solo
las pruebas: `npm run test:unit` o, después de compilar, `npm run test:e2e`.
`npm test` ejecuta ambas suites y requiere una compilación previa.

Las pruebas de navegador cubren validación del presupuesto, apertura de WhatsApp,
copia automática y manual, contexto de la galería, y teclado/foco en los modales
de resultados y privacidad. Se ejecutan en Chromium de escritorio y con emulación
móvil. Los envíos y el portapapeles se simulan: no se contacta a WhatsApp.

`.github/workflows/ci.yml` ejecutará esas verificaciones en cada PR, en pushes a
`main`/`master` y manualmente una vez que los archivos estén en GitHub. Conserva
informes, capturas y trazas durante siete días. Los archivos locales de resultados
están ignorados por Git. El workflow no modifica las reglas de protección de rama.

La configuración sigue las guías de [CI de Playwright](https://playwright.dev/docs/ci-intro)
y [servidor de pruebas](https://playwright.dev/docs/test-webserver).

### Casos de la galería

`Components/Works/DataWorks.js` contiene las fotos y el contexto de cada trabajo.
Los campos de material, problema y tratamiento se muestran cuando tienen datos.
Los [casos pendientes y criterios de contenido](docs/casos-reales.md) detallan
qué información falta para incorporar colchones y sillas como trabajos reales.

### Mediciones de recursos

El [informe de imágenes, fuentes y videos](docs/performance/README.md) conserva
las mediciones antes y después, sus condiciones y el procedimiento para
repetirlas. La imagen principal ya se sirve como WebP de 20,7–44,5 KB en las
pantallas móviles ensayadas. Se retiraron la fuente Geist Mono sin uso y nueve
videos sin referencias en el sitio.

### Servicios y contacto

Editá `lib/services.js` para actualizar los servicios del sitio y las opciones
del presupuesto. Los servicios con `featured: true` aparecen además como tarjetas
en la sección Servicios; `query` define el texto de consulta de esas tarjetas.

Los datos de contacto están en `lib/contact.js`. Mantené `business.phone` en
formato internacional (con `+` y código de país); los enlaces de llamada y
WhatsApp se generan desde ese mismo valor, quitando espacios y guiones.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
