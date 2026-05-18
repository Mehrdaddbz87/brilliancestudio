import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{12,}$/;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  // Rate limit: 5 attempts per 15 minutes per IP
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  const { allowed } = rateLimit(ip, 5, 15 * 60 * 1000);
  if (!allowed) {
    return res.status(429).json({ error: "Too many attempts. Please try again later." });
  }

  const { token, password, confirmPassword } = req.body || {};

  if (!token || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ error: "Password must be at least 12 characters and include letters, numbers, and a special character." });
  }

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      return res.status(400).json({ error: "This reset link is invalid or has expired." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.adminCredential.upsert({
      where: { email: resetToken.email },
      update: { passwordHash },
      create: { email: resetToken.email, passwordHash },
    });

    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Failed to reset password. Please try again." });
  }
}

