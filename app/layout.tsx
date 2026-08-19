import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { GTMScript, GTMNoScript } from "@/components/analytics/GTM";
import { ClarityScript } from "@/components/analytics/Clarity";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { OrganizationSchema } from "@/components/seo/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <OrganizationSchema />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-white font-sans text-zinc-900 antialiased">
        <GTMNoScript />
        <GTMScript />
        <ClarityScript />

        {children}

        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
