import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: `Política de privacidade e uso de dados de ${siteConfig.name} em conformidade com a LGPD.`,
  robots: { index: false, follow: false },
});

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900">
        Política de Privacidade
      </h1>

      <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            1. Coleta de Dados
          </h2>
          <p>
            Coletamos dados pessoais fornecidos voluntariamente (nome, e-mail,
            telefone) por meio de formulários de contato, além de dados de
            navegação via cookies analíticos e de marketing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            2. Finalidade
          </h2>
          <p>
            Os dados coletados são utilizados para: atendimento ao cliente,
            envio de comunicações relevantes, análise de performance do site e
            veiculação de publicidade segmentada (Google Ads, Meta Ads).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            3. Cookies e Tecnologias
          </h2>
          <p>
            Utilizamos Google Tag Manager, Google Analytics 4, Microsoft
            Clarity, Meta Pixel e Microsoft Ads para análise e remarketing.
            Você pode recusar cookies não essenciais pelo banner de consentimento
            exibido na primeira visita.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            4. Compartilhamento
          </h2>
          <p>
            Não vendemos dados pessoais. Podemos compartilhá-los com parceiros
            tecnológicos (Google, Meta, Microsoft) exclusivamente para as
            finalidades descritas acima.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            5. Seus Direitos (LGPD)
          </h2>
          <p>
            Você tem direito a acessar, corrigir, excluir ou portar seus dados,
            além de revogar o consentimento a qualquer momento. Entre em contato
            via{" "}
            {siteConfig.contactEmail ? (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-zinc-900 underline"
              >
                {siteConfig.contactEmail}
              </a>
            ) : (
              "nossos canais de atendimento"
            )}
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            6. Retenção de Dados
          </h2>
          <p>
            Dados são mantidos pelo período necessário à finalidade e conforme
            exigido por lei. Após esse prazo, são eliminados de forma segura.
          </p>
        </section>

        <p className="mt-8 border-t border-zinc-100 pt-6 text-sm text-zinc-400">
          Última atualização: {new Date().toLocaleDateString("pt-BR")} —{" "}
          {siteConfig.name}
        </p>
      </div>
    </main>
  );
}
