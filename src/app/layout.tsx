import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/PageTransition";

// Geist — tipografía oficial del producto (paquete `geist` de Vercel)
// GeistSans.variable → --font-geist-sans
// GeistMono.variable → --font-geist-mono

// IBM Plex Serif — reservada para momentos editoriales (citas, cierres)
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aulentra — Sistema operativo académico",
  description:
    "Aulentra organiza, conecta y estructura toda la operación de una institución educativa. En una sola capa. Sin fricciones. Sin caos.",
  keywords: [
    "Aulentra",
    "sistema educativo",
    "gestión académica",
    "plataforma institucional",
    "SaaS educativo",
  ],
  authors: [{ name: "Aulentra" }],
  openGraph: {
    title: "Aulentra",
    description: "La educación no necesita más herramientas. Necesita estructura.",
    url: "https://aulentra.com",
    siteName: "Aulentra",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulentra",
    description: "Sistema operativo académico.",
  },
  robots: {
    // Pre-lanzamiento: sin indexar hasta go-live.
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable} ${plexSerif.variable}`}
    >
      <body>
        <Header />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
