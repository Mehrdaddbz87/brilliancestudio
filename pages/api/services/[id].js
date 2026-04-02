import { prisma } from "@/lib/prisma";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { servicePagesBySlug } from "@/lib/service-pages";

export default async function handler(req, res) {
  const session = await requireAdminApiSession(req, res);

  if (!session) {
    return;
  }

  const itemId = Number(req.query.id);

  if (!Number.isInteger(itemId)) {
    return res.status(400).json({ error: "Invalid service item id." });
  }

  if (req.method === "PATCH") {
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

    try {
      const item = await prisma.serviceItem.update({
        where: { id: itemId },
        data: {
          slug: trimmedSlug,
          eyebrow: String(eyebrow || "").trim() || null,
          title: matchedService.title,
          description: trimmedDescription,
          imageUrl: String(imageUrl || "").trim() || null,
          imageAlt: String(imageAlt || "").trim() || matchedService.title,
          sortOrder:
            Number.isFinite(Number(sortOrder)) && String(sortOrder).trim() !== ""
              ? Number(sortOrder)
              : 0,
        },
      });

      return res.status(200).json({ item });
    } catch (error) {
      console.error("Failed to update service item:", error);
      return res.status(500).json({ error: "Failed to update service item." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.serviceItem.delete({
        where: { id: itemId },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Failed to delete service item:", error);
      return res.status(500).json({ error: "Failed to delete service item." });
    }
  }

  res.setHeader("Allow", ["PATCH", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed." });
}
