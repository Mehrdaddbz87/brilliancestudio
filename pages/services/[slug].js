import { ServiceDetailPage } from "@/components/service-detail-page";
import { prisma } from "@/lib/prisma";
import { servicePagesBySlug } from "@/lib/service-pages";

export default function DynamicServicePage({ service }) {
  return <ServiceDetailPage service={service} />;
}

export async function getServerSideProps(context) {
  const slug = String(context.params?.slug || "").trim();

  context.res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (!slug) {
    return { notFound: true };
  }

  let dbService = null;

  try {
    dbService = await prisma.serviceItem.findUnique({
      where: { slug },
      select: {
        slug: true,
        eyebrow: true,
        title: true,
        description: true,
        imageUrl: true,
        imageAlt: true,
      },
    });
  } catch {
    // DB unavailable — fall through to static data below
  }

  if (dbService) {
    return {
      props: {
        service: {
          ...dbService,
          seoDescription: dbService.description,
        },
      },
    };
  }

  const staticService = servicePagesBySlug[slug];

  if (!staticService) {
    return { notFound: true };
  }

  return {
    props: {
      service: {
        slug: staticService.slug,
        eyebrow: "Services",
        title: staticService.title,
        description: staticService.description[0] || "",
        imageUrl: null,
        imageAlt: null,
        seoDescription: staticService.metaDescription,
      },
    },
  };
}
