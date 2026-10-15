import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || "https://walter-limpieza-tapizados.digital";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Walter Limpieza de Tapizados",
  description: "Limpieza profesional de sillones, colchones y tapizados a domicilio en Santa Fe y alrededores. Consultá tu presupuesto por WhatsApp.",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
