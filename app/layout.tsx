import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Cloud script */}
        <Script
          strategy="afterInteractive"
          async
          src="https://plausible.io/js/pa-jjzjjkzlrC6g-cNxqEsZJ.js"
        />

        {/* Initialisation */}
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function(){ (plausible.q = plausible.q || []).push(arguments) };
            plausible.init = plausible.init || function(i){ plausible.o = i || {} };
            plausible.init();
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
