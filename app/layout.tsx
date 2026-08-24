import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { GTMScript, GTMNoScript } from "@/components/analytics/GTM";
import { ClarityScript } from "@/components/analytics/Clarity";
import { CookieConsent } from "@/components/analytics/CookieConsent";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased" style={{ background: "var(--bg)" }}>
        <GTMNoScript />
        <GTMScript />
        <ClarityScript />

        {children}

        <CookieConsent />
      </body>
    </html>
  );
}
