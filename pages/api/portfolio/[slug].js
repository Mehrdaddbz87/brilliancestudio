import { prisma } from "@/lib/prisma";
import { requireAdminApiSession } from "@/lib/admin-auth";

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method === "GET") {
    try {
      const item = await prisma.referenceItem.findFirst({
        where: { slug: String(slug || "").trim() },
      });

      if (!item) {
        return res.status(404).json({ error: "Portfolio item not found." });
      }

      return res.status(200).json({ item });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch portfolio item." });
    }
  }

  if (req.method === "PATCH") {
    const session = await requireAdminApiSession(req, res);
    if (!session) return;

    const { category, title, summary, imageUrl, imageAlt, sortOrder } =
      req.body || {};

    try {
      const item = await prisma.referenceItem.updateMany({
        where: { slug: String(slug || "").trim() },
        data: {
          ...(category !== undefined && { category: String(category).trim() || null }),
          ...(title !== undefined && { title: String(title).trim() }),
          ...(summary !== undefined && { summary: String(summary).trim() }),
          ...(imageUrl !== undefined && { imageUrl: String(imageUrl).trim() || null }),
          ...(imageAlt !== undefined && { imageAlt: String(imageAlt).trim() || null }),
          ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        },
      });

      return res.status(200).json({ item });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update portfolio item." });
    }
  }

  if (req.method === "DELETE") {
    const session = await requireAdminApiSession(req, res);
    if (!session) return;

    try {
      await prisma.referenceItem.deleteMany({
        where: { slug: String(slug || "").trim() },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete portfolio item." });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed." });
}
