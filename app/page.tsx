import { ProfilePanel } from "@/components/ui/ProfilePanel";
import { LinksPanel } from "@/components/ui/LinksPanel";
import { WebPageSchema } from "@/components/seo/StructuredData";
import { profileData } from "@/lib/links";

export default function Home() {
  return (
    <>
      <WebPageSchema title={profileData.name} description={profileData.bio} />

      {/*
        Mobile: coluna única
        Desktop (lg+): split — esquerda sticky profile, direita scroll links
      */}
      <div className="min-h-[100dvh] lg:flex">

        {/* Painel esquerdo — sticky no desktop */}
        <div
          className="lg:sticky lg:top-0 lg:h-[100dvh] lg:w-[42%] lg:flex-shrink-0"
          style={{ background: "var(--panel-left)", borderRight: "1px solid rgba(255,255,255,0.05)" }}
        >
          <ProfilePanel />
        </div>

        {/* Painel direito — scrollável */}
        <div className="flex-1">
          <LinksPanel />
        </div>

      </div>
    </>
  );
}
