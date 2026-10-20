import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Observatório Quantitativo da República (2003–2026) | Dossiê Urbano & Empírico",
  description:
    "Painel analítico e comparativo empírico baseado em dados oficiais (IBGE, Banco Central, Tesouro Nacional, INPE, STF, STJ e TSE) sobre os governos Lula (2003–2010 e 2023–2026) e Bolsonaro / Flávio Bolsonaro (2019–2022 e Plano 2026).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#f7f8f6] text-zinc-900 font-sans">
        {children}
      </body>
    </html>
  );
}
