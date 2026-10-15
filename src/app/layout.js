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

export const metadata = {
  title: "Walter Limpieza de Tapizados",
  description: "Limpieza profesional de sillones, colchones y tapizados a domicilio en Santa Fe y alrededores. Consultá tu presupuesto por WhatsApp.",
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
