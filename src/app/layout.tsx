"use client"; // só se for client component, mas layout geralmente é server component

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../../public/css/Banner.css";
import "../../public/css/vendidos.css";

import "../../public/css/Footer.css";
import "../../public/css/produto.css";
import "../../public/css/cardsprodutos.css";
import "../../public/css/navbar.css";
// não importe o bootstrap.bundle.min.js aqui


import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased">{children}</body>
    </html>
  );
}
