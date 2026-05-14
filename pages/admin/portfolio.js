import Head from "next/head";

import { ContentManager } from "@/components/admin/content-manager";
import { requireAdminPageSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const portfolioFields = [
  {
    name: "slug",
    label: "Slug",
    placeholder: "maison-aurelia",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Lifestyle",
    required: false,
  },
  {
    name: "title",
    label: "Title",
    placeholder: "Maison Aurelia",
  },
  {
    name: "summary",
    label: "Summary",
    placeholder: "Short project summary for the portfolio grid.",
    type: "textarea",
  },
  {
    name: "imageUrl",
    label: "Image",
    placeholder: "/images/placeholders/reference.svg",
    type: "image-upload",
    required: false,
  },
  {
    name: "imageAlt",
    label: "Image Alt",
    placeholder: "Portfolio image alt text",
    required: false,
  },
  {
    name: "sortOrder",
    label: "Sort Order",
    placeholder: "1",
    type: "number",
    required: false,
  },
];

function serializePortfolioItem(item) {
  return {
    id: item.id,
    slug: item.slug,
    category: item.category,
    title: item.title,
    summary: item.summary,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    sortOrder: item.sortOrder,
  };
}

export default function AdminPortfolioPage({ items }) {
  return (
    <>
      <Head>
        <title>Admin Portfolio | Brilliance Studio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ContentManager
        sectionLabel="Portfolio"
        title="Manage Portfolio"
        description="Create and curate the portfolio cards displayed on the public showcase page."
        endpoint="/api/portfolio"
        fields={portfolioFields}
        initialItems={items}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const authResult = await requireAdminPageSession(context);

  if ("redirect" in authResult) {
    return authResult;
  }

  const page = await prisma.referencePage.findUnique({
    where: { slug: "references" },
    include: {
      items: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return {
    props: {
      items: page?.items.map(serializePortfolioItem) || [],
    },
  };
}
