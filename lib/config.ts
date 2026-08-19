export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Nome do Cliente",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemplo.com.br",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    "Descrição do site do cliente",
  locale: "pt_BR",
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511999999999",
  whatsappMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
    "Olá! Vim pelo site e gostaria de mais informações.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  alertContacts: (process.env.NEXT_PUBLIC_ALERT_CONTACTS ?? "").split(","),
};

export const analyticsConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
  googleSearchConsoleToken:
    process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_TOKEN ?? "",
  bingWebmasterToken: process.env.NEXT_PUBLIC_BING_WEBMASTER_TOKEN ?? "",
};
