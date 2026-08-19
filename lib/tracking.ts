declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function push(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

export const track = {
  pageView: (url: string) =>
    push({ event: "page_view", page_location: url }),

  lead: (source: string, campaign?: string) =>
    push({ event: "generate_lead", lead_source: source, campaign }),

  whatsappClick: (location: string) =>
    push({ event: "whatsapp_click", click_location: location }),

  formSubmit: (formName: string) =>
    push({ event: "form_submit", form_name: formName }),

  formStart: (formName: string) =>
    push({ event: "form_start", form_name: formName }),

  conversion: (type: string, value?: number, currency = "BRL") =>
    push({ event: "conversion", conversion_type: type, value, currency }),

  custom: (event: string, params: Record<string, unknown> = {}) =>
    push({ event, ...params }),
};
