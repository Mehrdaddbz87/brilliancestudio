import { getFallbackCmsPage } from "@/lib/cms";
import { getDatabaseCmsPage } from "@/lib/prisma-cms";

function normalizeContentSlug(slug) {
  if (slug === "portfolio") {
    return "references";
  }

  return slug;
}

/**
 * Loads editable content from Prisma first and falls back to the in-repo dataset.
 */
export async function getPageContent(slug) {
  const normalizedSlug = normalizeContentSlug(slug);
  const databaseContent = await getDatabaseCmsPage(normalizedSlug);

  if (databaseContent) {
    return databaseContent;
  }

  return {
    ...getFallbackCmsPage(normalizedSlug),
    source: "fallback",
  };
}
