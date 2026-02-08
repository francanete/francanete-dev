import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "francanete.dev",
  description: "Developer portfolio and blog by francanete",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Script
          id="plaudera-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(w,d){var p=w.Plaudera=w.Plaudera||function(){(p.q=p.q||[]).push(arguments)};p.l=+new Date;var s=d.createElement("script");s.async=1;s.src="http://localhost:3000/widget.js";d.head.appendChild(s)}(window,document);Plaudera('init',{workspace:'i3i8l3qfgp0h1zxe2n0dcswj'});`,
          }}
        />
      </body>
    </html>
  );
}
