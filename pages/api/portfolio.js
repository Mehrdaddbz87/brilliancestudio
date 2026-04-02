import { prisma } from "@/lib/prisma";
import { requireAdminApiSession } from "@/lib/admin-auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const page = await prisma.referencePage.findUnique({
      where: { slug: "references" },
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

    const { slug, category, title, summary, imageUrl, imageAlt, sortOrder } =
      req.body || {};
    const trimmedSlug = String(slug || "").trim();
    const trimmedTitle = String(title || "").trim();
    const trimmedSummary = String(summary || "").trim();

    if (!trimmedSlug || !trimmedTitle || !trimmedSummary) {
      return res.status(400).json({
        error: "Slug, title, and summary are required.",
      });
    }

    const page = await prisma.referencePage.findUnique({
      where: { slug: "references" },
      select: { id: true, items: { select: { id: true } } },
    });

    if (!page) {
      return res.status(404).json({ error: "Portfolio page not found." });
    }

    try {
      const item = await prisma.referenceItem.create({
        data: {
          pageId: page.id,
          slug: trimmedSlug,
          category: String(category || "").trim() || null,
          title: trimmedTitle,
          summary: trimmedSummary,
          imageUrl: String(imageUrl || "").trim() || null,
          imageAlt: String(imageAlt || "").trim() || null,
          sortOrder:
            Number.isFinite(Number(sortOrder)) && String(sortOrder).trim() !== ""
              ? Number(sortOrder)
              : page.items.length + 1,
        },
      });

      return res.status(201).json({ item });
    } catch (error) {
      console.error("Failed to create portfolio item:", error);
      return res.status(500).json({ error: "Failed to create portfolio item." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed." });
}
