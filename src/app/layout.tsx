import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "KogoPAY — Global Payments Made Simple",
  description:
    "Fast, transparent and secure cross-border payments for individuals and businesses. Send money globally with competitive rates and low fees.",
  keywords:
    "KogoPAY, cross-border payments, international money transfer, send money, remittance, exchange rates, global payments",
  openGraph: {
    title: "KogoPAY — Global Payments Made Simple",
    description:
      "Fast, transparent and secure cross-border payments for individuals and businesses.",
    type: "website",
    siteName: "KogoPAY",
  },
  twitter: {
    card: "summary_large_image",
    title: "KogoPAY — Global Payments Made Simple",
    description:
      "Fast, transparent and secure cross-border payments for individuals and businesses.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans selection:bg-gold/30 selection:text-brand-red-deep">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
