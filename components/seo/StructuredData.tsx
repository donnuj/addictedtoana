import { siteConfig } from "@/lib/config";

interface OrganizationSchemaProps {
  type?: "Organization" | "LocalBusiness" | "ProfessionalService";
  logo?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
}

export function OrganizationSchema({
  type = "Organization",
  logo,
  address,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    ...(logo && { logo: `${siteConfig.url}${logo}` }),
    ...(siteConfig.contactEmail && { email: siteConfig.contactEmail }),
    ...(siteConfig.phone && {
      telephone: `+${siteConfig.phone}`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.phone}`,
        contactType: "customer service",
        availableLanguage: "Portuguese",
      },
    }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
        addressCountry: "BR",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: url ?? siteConfig.url,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
