import { PortfolioDetailPage } from "@/components/portfolio-detail-page";
import { getPageContent } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export default function PortfolioItemPage({ item }) {
  return <PortfolioDetailPage item={item} />;
}

export async function getServerSideProps(context) {
  const slug = String(context.params?.slug || "").trim();

  context.res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (!slug) {
    return { notFound: true };
  }

  let dbItem = null;

  try {
    dbItem = await prisma.referenceItem.findFirst({
      where: { slug },
    });
  } catch {
    // DB unavailable — fall through to static fallback
  }

  if (dbItem) {
    return {
      props: {
        item: {
          slug: dbItem.slug,
          title: dbItem.title,
          category: dbItem.category,
          summary: dbItem.summary,
          imageUrl: dbItem.imageUrl,
          imageAlt: dbItem.imageAlt,
        },
      },
    };
  }

  // Fallback: look up item by slug in CMS content
  let fallbackItem = null;

  try {
    const content = await getPageContent("portfolio");
    fallbackItem = (content.items || []).find((i) => i.slug === slug);
  } catch {
    // ignore
  }

  if (!fallbackItem) {
    return { notFound: true };
  }

  return {
    props: {
      item: {
        slug: fallbackItem.slug || slug,
        title: fallbackItem.title || "",
        category: fallbackItem.category || "Portfolio",
        summary: fallbackItem.summary || fallbackItem.description || "",
        imageUrl: fallbackItem.image?.url || fallbackItem.imageUrl || null,
        imageAlt: fallbackItem.image?.alt || fallbackItem.imageAlt || fallbackItem.title || "",
      },
    },
  };
}
