import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

/**
 * Reusable page header block for secondary pages with optional action buttons.
 */
export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: PageIntroProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
      <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-5 break-words font-fantasy text-3xl uppercase tracking-[0.08em] text-text sm:text-4xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-text/75">
          {description}
        </p>
        {actions ? (
          <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
