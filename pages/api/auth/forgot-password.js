import crypto from "crypto";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const { email } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!email || email.toLowerCase().trim() !== adminEmail?.toLowerCase()) {
    return res.status(200).json({ success: true });
  }

  try {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.updateMany({
      where: { email: adminEmail, used: false },
      data: { used: true },
    });

    await prisma.passwordResetToken.create({
      data: { email: adminEmail, token, expiresAt },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const resetUrl = `${siteUrl}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: "Brilliance Studio - Password Reset",
      text: `You requested a password reset.\n\nClick the link below to set a new password. The link expires in 1 hour.\n\n${resetUrl}\n\nIf you did not request this, ignore this email.`,
      html: `<p>You requested a password reset for your Brilliance Studio admin account.</p><p>Click the link to set a new password. Expires in <strong>1 hour</strong>.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
  }

  return res.status(200).json({ success: true });
}
