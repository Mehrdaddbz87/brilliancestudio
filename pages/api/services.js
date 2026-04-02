import { prisma } from "@/lib/prisma";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { servicePagesBySlug } from "@/lib/service-pages";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const page = await prisma.servicePage.findUnique({
      where: { slug: "services" },
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return res.status(200).json({ page });
  }

  if (req.method === "POST") {
    const session = await requireAdminApiSession(req, res);

    if (!session) {
      return;
    }

    const { slug, eyebrow, description, imageUrl, imageAlt, sortOrder } =
      req.body || {};
    const trimmedSlug = String(slug || "").trim();
    const trimmedDescription = String(description || "").trim();
    const matchedService = servicePagesBySlug[trimmedSlug];

    if (!trimmedSlug || !trimmedDescription || !matchedService) {
      return res.status(400).json({
        error: "Please select one of the offered services and add a description.",
      });
    }

    const page = await prisma.servicePage.findUnique({
      where: { slug: "services" },
      select: { id: true, items: { select: { id: true } } },
    });

    if (!page) {
      return res.status(404).json({ error: "Services page not found." });
    }

    const existingItem = await prisma.serviceItem.findUnique({
      where: { slug: trimmedSlug },
      select: { id: true },
    });

    if (existingItem) {
      return res.status(400).json({
        error: "This service already exists. Please edit the existing entry instead.",
      });
    }

    try {
      const item = await prisma.serviceItem.create({
        data: {
          pageId: page.id,
          slug: trimmedSlug,
          eyebrow: String(eyebrow || "").trim() || null,
          title: matchedService.title,
          description: trimmedDescription,
          imageUrl: String(imageUrl || "").trim() || null,
          imageAlt: String(imageAlt || "").trim() || matchedService.title,
          sortOrder:
            Number.isFinite(Number(sortOrder)) && String(sortOrder).trim() !== ""
              ? Number(sortOrder)
              : page.items.length + 1,
        },
      });

      return res.status(201).json({ item });
    } catch (error) {
      console.error("Failed to create service item:", error);
      return res.status(500).json({ error: "Failed to create service item." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed." });
}
