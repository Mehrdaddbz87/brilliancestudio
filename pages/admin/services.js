import Head from "next/head";

import { ContentManager } from "@/components/admin/content-manager";
import { requireAdminPageSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { servicePagesBySlug, serviceNavItems } from "@/lib/service-pages";

const serviceFields = [
  {
    name: "slug",
    label: "Service",
    placeholder: "Select an offered service",
    type: "select",
    options: serviceNavItems.map((item) => ({
      label: item.label,
      value: item.href.replace("/services/", ""),
    })),
  },
  {
    name: "eyebrow",
    label: "Eyebrow",
    placeholder: "Design + Build",
    required: false,
  },
  {
    name: "title",
    label: "Title",
    placeholder: "Selected automatically",
    readOnly: true,
    helpText: "This title is locked to the selected service offering.",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Short service summary for the overview card.",
    type: "textarea",
  },
  {
    name: "imageUrl",
    label: "Image URL",
    placeholder: "/images/placeholders/service.svg",
    required: false,
  },
  {
    name: "imageAlt",
    label: "Image Alt",
    placeholder: "Service image alt text",
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

function serializeServiceItem(item) {
  return {
    id: item.id,
    slug: item.slug,
    eyebrow: item.eyebrow,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    sortOrder: item.sortOrder,
  };
}

export default function AdminServicesPage({ items }) {
  return (
    <>
      <Head>
        <title>Admin Services | Brilliance Studio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ContentManager
        sectionLabel="Service"
        title="Manage Services"
        description="Maintain the service entries shown on the public services overview page."
        endpoint="/api/services"
        fields={serviceFields}
        initialItems={items}
        onFormDataChange={(nextData, changedField) => {
          if (changedField !== "slug") {
            return nextData;
          }

          const matchedService = servicePagesBySlug[nextData.slug];

          return {
            ...nextData,
            title: matchedService?.title || "",
          };
        }}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const authResult = await requireAdminPageSession(context);

  if ("redirect" in authResult) {
    return authResult;
  }

  const page = await prisma.servicePage.findUnique({
    where: { slug: "services" },
    include: {
      items: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return {
    props: {
      items: page?.items.map(serializeServiceItem) || [],
    },
  };
}
