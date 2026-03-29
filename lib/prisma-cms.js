import { prisma } from "@/lib/prisma";

/**
 * Maps the Prisma service page shape into the frontend CMS contract.
 */
function mapServicePage(page) {
  if (!page) {
    return null;
  }

  return {
    eyebrow: page.eyebrow,
    title: page.title,
    description: page.description,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    primaryAction: page.primaryCtaLabel
      ? {
          label: page.primaryCtaLabel,
          href: page.primaryCtaHref,
        }
      : null,
    secondaryAction: page.secondaryCtaLabel
      ? {
          label: page.secondaryCtaLabel,
          href: page.secondaryCtaHref,
        }
      : null,
    items: page.items.map((item) => ({
      eyebrow: item.eyebrow,
      title: item.title,
      description: item.description,
      image: item.imageUrl
        ? {
            url: item.imageUrl,
            alt: item.imageAlt || item.title,
          }
        : null,
    })),
    sections: page.sections || [],
    source: "database",
  };
}

/**
 * Maps the Prisma references page shape into the frontend CMS contract.
 */
function mapReferencePage(page) {
  if (!page) {
    return null;
  }

  return {
    eyebrow: page.eyebrow,
    title: page.title,
    description: page.description,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    primaryAction: page.primaryCtaLabel
      ? {
          label: page.primaryCtaLabel,
          href: page.primaryCtaHref,
        }
      : null,
    secondaryAction: page.secondaryCtaLabel
      ? {
          label: page.secondaryCtaLabel,
          href: page.secondaryCtaHref,
        }
      : null,
    items: page.items.map((item) => ({
      category: item.category,
      title: item.title,
      summary: item.summary,
      image: item.imageUrl
        ? {
            url: item.imageUrl,
            alt: item.imageAlt || item.title,
          }
        : null,
    })),
    sections: page.sections || [],
    source: "database",
  };
}

/**
 * Maps Prisma legal page records into the shared legal page shape.
 */
function mapLegalPage(page) {
  if (!page) {
    return null;
  }

  return {
    eyebrow: page.eyebrow,
    title: page.title,
    description: page.description,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    sections: page.sections || [],
    source: "database",
  };
}

/**
 * Reads CMS page content from Prisma as a fallback when Sanity is unavailable.
 */
export async function getDatabaseCmsPage(slug) {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    if (slug === "services") {
      const page = await prisma.servicePage.findUnique({
        where: { slug: "services" },
        include: {
          items: {
            orderBy: { sortOrder: "asc" },
          },
        },
      });

      return mapServicePage(page);
    }

    if (slug === "references") {
      const page = await prisma.referencePage.findUnique({
        where: { slug: "references" },
        include: {
          items: {
            orderBy: { sortOrder: "asc" },
          },
        },
      });

      return mapReferencePage(page);
    }

    if (slug === "terms" || slug === "impressum") {
      const page = await prisma.legalPage.findUnique({
        where: { slug },
      });

      return mapLegalPage(page);
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch Prisma CMS content for ${slug}:`, error);
    return null;
  }
}
