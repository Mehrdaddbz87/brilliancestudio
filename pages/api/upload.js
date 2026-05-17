import { put } from "@vercel/blob";
import formidable from "formidable";
import fs from "fs";

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
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function safeFileName(original) {
  const ext = (original.match(/\.[^.]+$/) || [""])[0].toLowerCase();
  const base = original
    .replace(/\.[^.]+$/, "")
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
    filter: ({ mimetype }) => Boolean(mimetype && ALLOWED_TYPES.includes(mimetype)),
  });

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Upload failed: " + err.message });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: "No file received." });
    }

    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      fs.unlink(file.filepath, () => {});
      return res.status(400).json({ error: "File type not allowed." });
    }

    try {
      const fileName = safeFileName(file.originalFilename || "upload.jpg");
      const fileBuffer = fs.readFileSync(file.filepath);

      // Use Vercel Blob in production, local filesystem locally
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blob = await put(`portfolio/${fileName}`, fileBuffer, {
          access: "public",
          contentType: file.mimetype,
        });
        fs.unlink(file.filepath, () => {});
        return res.status(200).json({ url: blob.url });
      }

      // Local development fallback — save to public/uploads/
      const uploadDir = `${process.cwd()}/public/uploads`;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const destPath = `${uploadDir}/${fileName}`;
      fs.renameSync(file.filepath, destPath);
      return res.status(200).json({ url: `/uploads/${fileName}` });

    } catch (error) {
      fs.unlink(file.filepath, () => {});
      return res.status(500).json({ error: "Could not save file: " + error.message });
    }
  });
}
