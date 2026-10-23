import { Geist } from "next/font/google";
import { siteUrl } from "../../lib/site.js";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: siteUrl,
  title: "Limpieza de tapizados en Santa Fe | Walter",
  description: "Limpieza profesional de sillones, colchones y tapizados a domicilio en Santa Fe y alrededores. Consultá tu presupuesto por WhatsApp.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "es_AR",
    siteName: "Walter Tapizados",
    title: "Limpieza de tapizados en Santa Fe | Walter",
    description: "Cuidamos tus muebles a conciencia. Limpieza profesional a domicilio de sillones, colchones, sillas y autos. Consultá por WhatsApp.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limpieza de tapizados en Santa Fe | Walter",
    description: "Servicio profesional a domicilio. Cuidamos tus muebles a conciencia.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body className={geistSans.variable}>
        {children}
      </body>
    </html>
  );
}
