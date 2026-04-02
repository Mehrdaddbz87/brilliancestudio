import { ServiceDetailPage } from "@/components/service-detail-page";
import { prisma } from "@/lib/prisma";

export default function DynamicServicePage({ service }) {
  return <ServiceDetailPage service={service} />;
}

export async function getServerSideProps(context) {
  const slug = String(context.params?.slug || "").trim();

  context.res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const service = await prisma.serviceItem.findUnique({
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

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service: {
        ...service,
        seoDescription: service.description,
      },
    },
  };
}
