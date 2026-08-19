import type { Metadata } from "next";
import { siteConfig, analyticsConfig } from "./config";

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  const title = overrides?.title ?? siteConfig.name;
  const description = overrides?.description ?? siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: String(title),
      description: String(description),
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(title),
      description: String(description),
      images: ["/og-image.jpg"],
    },
    verification: {
      google: analyticsConfig.googleSearchConsoleToken || undefined,
      other: analyticsConfig.bingWebmasterToken
        ? { "msvalidate.01": analyticsConfig.bingWebmasterToken }
        : undefined,
    },
    alternates: {
      canonical: siteConfig.url,
    },
    ...overrides,
  };
}
