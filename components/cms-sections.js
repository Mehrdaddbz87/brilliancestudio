import Image from "next/image";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";

/**
 * Renders a simple prose content block — open editorial style, no box.
 */
function TextSection({ section, ctaHref, ctaLabel }) {
  return (
    <div className="py-2">
      {section.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
          {section.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 break-words text-2xl font-semibold leading-snug text-text sm:text-3xl">
        {section.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-text/60">
        {section.body}
      </p>
      {ctaHref ? (
        <a
          href={ctaHref}
          className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent transition-all duration-200 hover:tracking-[0.35em]"
        >
          {ctaLabel || "Learn more"} &rarr;
        </a>
      ) : null}
    </div>
  );
}

/**
 * Renders a textSection + featureListSection side-by-side in an editorial
 * two-column layout, separated by a thin gold top rule.
 */
function TextFeaturePair({ text, features }) {
  return (
    <div className="pt-2">
      <div className="mb-10 h-px w-full bg-accent/20" />
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <TextSection section={text} ctaHref="/contact" ctaLabel="Start your project" />
        </div>
        <div className="md:col-span-3">
          <FeatureListSection section={features} />
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a highlighted list of CMS-managed feature bullets.
 * Editorial open layout: gold dash prefix, thin dividers, no heavy borders.
 */
function FeatureListSection({ section }) {
  return (
    <div className="py-4">
      {section.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
          {section.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 break-words text-2xl font-semibold text-text sm:text-3xl">
        {section.heading}
      </h2>
      <ul className="mt-8 divide-y divide-white/[0.07]">
        {section.items?.map((item) => (
          <li
            key={item}
            className="flex items-start gap-5 py-5"
          >
            <span className="mt-0.5 shrink-0 text-base font-semibold leading-none text-accent select-none">
              &mdash;
            </span>
            <span className="text-base leading-relaxed text-text/75">
              {item}
            </span>
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
 * When a textSection is immediately followed by a featureListSection, they are
 * rendered together in a two-column editorial layout.
 */
export function CmsSections({ sections = [] }) {
  if (!sections.length) {
    return null;
  }

  // Build a render queue, collapsing adjacent text+feature pairs
  const queue = [];
  let i = 0;
  while (i < sections.length) {
    const curr = sections[i];
    const next = sections[i + 1];
    if (
      curr._type === "textSection" &&
      next?._type === "featureListSection"
    ) {
      queue.push({ type: "pair", text: curr, features: next, key: curr._key || `pair-${i}` });
      i += 2;
    } else {
      queue.push({ type: "single", section: curr, key: curr._key || `${curr._type}-${i}` });
      i += 1;
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
      {queue.map((entry, index) => {
        if (entry.type === "pair") {
          return (
            <FadeInSection key={entry.key} delay={0.05 + index * 0.04}>
              <TextFeaturePair text={entry.text} features={entry.features} />
            </FadeInSection>
          );
        }

        const { section } = entry;
        return (
          <FadeInSection key={entry.key} delay={0.05 + index * 0.04}>
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
