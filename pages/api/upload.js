import { put } from "@vercel/blob";
import formidable from "formidable";
import fs from "fs";
import path from "path";

import { requireAdminApiSession } from "@/lib/admin-auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function safeFileName(original) {
  const ext = path.extname(original || "upload.jpg").toLowerCase() || ".jpg";
  const base = path
    .basename(original || "upload", path.extname(original || ""))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return `${base}-${Date.now()}${ext}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const session = await requireAdminApiSession(req, res);
  if (!session) return;

  const form = formidable({
    maxFileSize: MAX_FILE_SIZE,
    keepExtensions: true,
  });

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Upload failed: " + err.message });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: "No file received." });
    }

    const mimeType = file.mimetype || "image/jpeg";

    if (!ALLOWED_TYPES.includes(mimeType)) {
      return res.status(400).json({ error: "File type not allowed. Use JPEG, PNG, WebP, GIF, or SVG." });
    }

    try {
      const fileName = safeFileName(file.originalFilename || "upload.jpg");
      const fileBuffer = fs.readFileSync(file.filepath);

      // Production: Vercel Blob
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blob = await put(fileName, fileBuffer, {
          access: "public",
          contentType: mimeType,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        return res.status(200).json({ url: blob.url });
      }

      // Local development: save to public/uploads/
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const destPath = path.join(uploadDir, fileName);
      fs.copyFileSync(file.filepath, destPath);
      return res.status(200).json({ url: `/uploads/${fileName}` });

    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Upload failed: " + (error.message || "Unknown error") });
    } finally {
      try { fs.unlinkSync(file.filepath); } catch {}
    }
  });
}
