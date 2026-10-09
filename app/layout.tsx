import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const geistSans = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Daniel Mafla | Desarrollador de software",
  description:
    "Portafolio de Daniel Mafla, estudiante de Ingeniería de Software interesado en crear soluciones tecnológicas útiles.",
  applicationName: "Daniel Mafla Portfolio",
  openGraph: {
    title: "Daniel Mafla | Desarrollador de software",
    description:
      "Proyectos, experiencia académica y perfil profesional de Daniel Mafla.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
        <Script id="theme-preference" strategy="beforeInteractive">
          {`try { const saved = localStorage.getItem('daniel-portfolio-theme'); const dark = saved === 'dark' || (saved !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.dataset.theme = dark ? 'dark' : 'light'; document.documentElement.style.colorScheme = dark ? 'dark' : 'light'; } catch {}`}
        </Script>
      </body>
    </html>
  );
}
