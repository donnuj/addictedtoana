"use client";

interface EmailEmbedProps {
  embedCode: string;
  title?: string;
}

/**
 * Drop any email marketing platform embed here (RD Station, Mailchimp, etc.)
 * Pass the raw HTML embed code as `embedCode`.
 */
export function EmailEmbed({ embedCode, title }: EmailEmbedProps) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      {title && (
        <h3 className="mb-4 text-lg font-semibold tracking-tight text-zinc-900">
          {title}
        </h3>
      )}
      <div
        className="email-embed-container"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    </div>
  );
}
