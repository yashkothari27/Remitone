import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remitone — Send Money Worldwide, Instantly",
  description:
    "Fast, secure, and affordable international money transfers to over 200 countries. Trusted by millions for competitive exchange rates and low fees.",
  keywords:
    "money transfer, international transfer, send money, remittance, exchange rates, Remitone",
  openGraph: {
    title: "Remitone — Send Money Worldwide, Instantly",
    description:
      "Fast, secure, and affordable international money transfers to over 200 countries.",
    type: "website",
    siteName: "Remitone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remitone — Send Money Worldwide, Instantly",
    description:
      "Fast, secure, and affordable international money transfers to over 200 countries.",
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
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
