/**
 * Creates stable anchor ids for legal sections so the table of contents can deep-link into them.
 */
function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitParagraphs(body) {
  return String(body || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/**
 * Resolves a contact item to a clickable href when one can be inferred safely.
 */
function renderHref(item) {
  if (item.href) {
    return item.href;
  }

  if (item.value?.includes("@")) {
    return `mailto:${item.value}`;
  }

  return null;
}

/**
 * Renders structured legal sections with a sticky table of contents and semantic contact blocks.
 */
export function LegalContent({ sections = [] }) {
  if (!sections.length) {
    return null;
  }

  return (
    <div className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
      <aside
        aria-label="Legal page contents"
        className="hidden h-fit rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:block lg:sticky lg:top-28"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          On this page
        </p>
        <nav className="mt-4">
          <ol className="space-y-3">
            {sections.map((section, index) => {
              const id = section.anchorId || slugify(section.heading) || `section-${index + 1}`;

              return (
                <li key={section._key || id}>
                  <a
                    href={`#${id}`}
                    className="inline-flex rounded-xl px-2 py-2 text-sm leading-6 text-text/75 transition hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/70"
                  >
                    {section.heading}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>

      <div className="space-y-6">
        {sections.map((section, index) => {
          const id = section.anchorId || slugify(section.heading) || `section-${index + 1}`;
          const paragraphs = splitParagraphs(section.body);

          return (
            <article
              key={section._key || id}
              id={id}
              aria-labelledby={`${id}-heading`}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
            >
              {section.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  {section.eyebrow}
                </p>
              ) : null}

              <h2
                id={`${id}-heading`}
                className="mt-4 font-fantasy text-2xl uppercase tracking-[0.08em] text-text"
              >
                {section.heading}
              </h2>

              {paragraphs.length ? (
                <div className="mt-5 space-y-4">
                  {paragraphs.map((paragraph) => (
                    <p
                      key={`${id}-${paragraph.slice(0, 24)}`}
                      className="text-lg leading-8 text-text/75"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {section.listItems?.length ? (
                <ul className="mt-6 space-y-3">
                  {section.listItems.map((item) => (
                    <li
                      key={`${id}-${item}`}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-base leading-7 text-text/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.contactItems?.length ? (
                <address className="mt-6 not-italic">
                  <ul className="space-y-3">
                    {section.contactItems.map((item) => {
                      const href = renderHref(item);

                      return (
                        <li
                          key={`${id}-${item.label}-${item.value}`}
                          className="rounded-2xl border border-accent/20 bg-accent/[0.06] px-4 py-4 text-base leading-7 text-text/80"
                        >
                          <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                            {item.label}
                          </span>
                          {href ? (
                            <a
                              href={href}
                              className="mt-2 inline-flex break-all text-text transition hover:text-accent"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <span className="mt-2 block whitespace-pre-line">
                              {item.value}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </address>
              ) : null}

              {section.note ? (
                <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/[0.06] px-4 py-4">
                  <p className="text-sm leading-7 text-text/78">{section.note}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
