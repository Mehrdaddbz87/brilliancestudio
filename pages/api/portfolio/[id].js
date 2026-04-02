import { prisma } from "@/lib/prisma";
import { requireAdminApiSession } from "@/lib/admin-auth";

export default async function handler(req, res) {
  const session = await requireAdminApiSession(req, res);

  if (!session) {
    return;
  }

  const itemId = Number(req.query.id);

  if (!Number.isInteger(itemId)) {
    return res.status(400).json({ error: "Invalid portfolio item id." });
  }

  if (req.method === "PATCH") {
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

    try {
      const item = await prisma.referenceItem.update({
        where: { id: itemId },
        data: {
          slug: trimmedSlug,
          category: String(category || "").trim() || null,
          title: trimmedTitle,
          summary: trimmedSummary,
          imageUrl: String(imageUrl || "").trim() || null,
          imageAlt: String(imageAlt || "").trim() || null,
          sortOrder:
            Number.isFinite(Number(sortOrder)) && String(sortOrder).trim() !== ""
              ? Number(sortOrder)
              : 0,
        },
      });

      return res.status(200).json({ item });
    } catch (error) {
      console.error("Failed to update portfolio item:", error);
      return res.status(500).json({ error: "Failed to update portfolio item." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.referenceItem.delete({
        where: { id: itemId },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Failed to delete portfolio item:", error);
      return res.status(500).json({ error: "Failed to delete portfolio item." });
    }
  }

  res.setHeader("Allow", ["PATCH", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed." });
}
