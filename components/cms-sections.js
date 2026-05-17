import Image from "next/image";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";

/**
 * Renders a simple prose content block from CMS-managed section data.
 */
function TextSection({ section }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
      {section.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {section.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 break-words font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
        {section.heading}
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-text/75">
        {section.body}
      </p>
    </div>
  );
}

/**
 * Renders a highlighted list of CMS-managed feature bullets.
 */
function FeatureListSection({ section }) {
  return (
    <div className="rounded-[2rem] border border-accent/20 bg-accent/[0.06] p-8">
      {section.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {section.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 break-words font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
        {section.heading}
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {section.items?.map((item) => (
          <li
            key={item}
            className="min-w-0 break-words rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-text/80"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Renders a call-to-action block with optional primary and secondary links.
 */
function CtaSection({ section }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/[0.05] to-accent/[0.08] p-8">
      {section.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {section.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 break-words font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
        {section.heading}
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-text/75">
        {section.body}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        {section.primaryLabel && section.primaryHref ? (
          <Button href={section.primaryHref}>{section.primaryLabel}</Button>
        ) : null}
        {section.secondaryLabel && section.secondaryHref ? (
          <Button href={section.secondaryHref} variant="ghost">
            {section.secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Renders a gallery-style section for image-backed CMS entries.
 */
function GallerySection({ section }) {
  return (
    <div>
      {section.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {section.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 break-words font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
        {section.heading}
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {section.items?.map((item) => (
          <div
            key={item._key || item.title}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
          >
            {item.image?.url ? (
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image.url}
                  alt={item.image.alt || item.title || "Gallery image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-[radial-gradient(circle_at_top,rgba(185,154,69,0.28),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
            )}
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/75">
                {item.eyebrow || item.category}
              </p>
              <p className="mt-3 font-fantasy text-xl uppercase tracking-[0.08em] text-text">
                {item.title}
              </p>
              <p className="mt-3 text-base leading-7 text-text/72">
                {item.description || item.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Dispatches CMS section records to the matching visual component by `_type`.
 */
export function CmsSections({ sections = [] }) {
  if (!sections.length) {
    return null;
  }

  return (
    <div className="mx-auto mt-16 max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
      {sections.map((section, index) => {
        const key = section._key || `${section._type}-${index}`;

        return (
          <FadeInSection key={key} delay={0.05 + index * 0.04}>
            {section._type === "textSection" ? (
              <TextSection section={section} />
            ) : null}
            {section._type === "featureListSection" ? (
              <FeatureListSection section={section} />
            ) : null}
            {section._type === "ctaSection" ? (
              <CtaSection section={section} />
            ) : null}
            {section._type === "gallerySection" ? (
              <GallerySection section={section} />
            ) : null}
          </FadeInSection>
        );
      })}
    </div>
  );
}
