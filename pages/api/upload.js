import fs from "fs";
import path from "path";

import formidable from "formidable";

import { requireAdminApiSession } from "@/lib/admin-auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

function safeFileName(original) {
  const ext = path.extname(original).toLowerCase();
  const base = path
    .basename(original, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  const timestamp = Date.now();
  return `${base}-${timestamp}${ext}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const session = await requireAdminApiSession(req, res);
  if (!session) return;

  ensureUploadDir();

  const form = formidable({
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
    maxFileSize: MAX_FILE_SIZE,
    filter: ({ mimetype }) => ALLOWED_TYPES.includes(mimetype),
  });

  form.parse(req, (err, _fields, files) => {
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

    const fileName = safeFileName(file.originalFilename || "upload.jpg");
    const destPath = path.join(UPLOAD_DIR, fileName);

    fs.rename(file.filepath, destPath, (renameErr) => {
      if (renameErr) {
        return res.status(500).json({ error: "Could not save file." });
      }

      return res.status(200).json({ url: `/uploads/${fileName}` });
    });
  });
}
