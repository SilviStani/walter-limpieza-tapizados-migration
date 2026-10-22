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
antes de compilar, o actualizá el valor predeterminado en `src/app/layout.js`.

La vista previa en WhatsApp requiere un despliegue público accesible: no puede
leer la web que se ejecuta solamente en tu computadora.

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
