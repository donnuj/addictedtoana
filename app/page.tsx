import { HeroSection } from "@/components/ui/HeroSection";
import { LeadForm } from "@/components/ui/LeadForm";
import { WebPageSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <>
      <WebPageSchema
        title={siteConfig.name}
        description={siteConfig.description}
      />
      <main>
        <HeroSection />

        {/* Lead capture section */}
        <section
          id="contato"
          className="mx-auto max-w-2xl px-6 py-24"
        >
          <LeadForm
            title="Entre em contato"
            buttonLabel="Enviar"
            campaign="organico"
          />
        </section>
      </main>
    </>
  );
}
