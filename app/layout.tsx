import type { Metadata } from "next";
import { VT323, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Indira Portal",
  description: "Indira Portal (Nexaryx): a fictional console OS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="green"
      className={`${vt323.variable} ${plexMono.variable}`}
    >
      <body className="bg-void text-ink font-mono text-body">
        <div className="crt-scanlines crt-vignette relative min-h-dvh">
          {children}
        </div>
      </body>
    </html>
  );
}
