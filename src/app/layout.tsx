// src/app/layout.tsx

import "../styles/globals.css";
import { CitiesProvider } from "../context/CitiesContext";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>✨ | City Directory</title>
        <meta name="description" content="Explore the city directory" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased text-gray-900 bg-gray-50">
        <CitiesProvider>
          <Header />
          <main className="container mx-auto p-4 sm:p-8">{children}</main>
          <Footer />
        </CitiesProvider>
      </body>
    </html>
  );
}
