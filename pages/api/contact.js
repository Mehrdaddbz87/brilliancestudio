import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const MAX_NAME_LEN = 120;
const MAX_MESSAGE_LEN = 4000;
const MAX_SERVICE_LEN = 200;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { name, email, service, customService, message } = req.body || {};
  const trimmedName = String(name || "").trim().slice(0, MAX_NAME_LEN);
  const trimmedEmail = String(email || "").trim().slice(0, 254);
  const trimmedService = String(service || "").trim().slice(0, MAX_SERVICE_LEN);
  const trimmedCustomService = String(customService || "").trim().slice(0, MAX_SERVICE_LEN);
  const trimmedMessage = String(message || "").trim().slice(0, MAX_MESSAGE_LEN);
  const emailPattern = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

  if (!trimmedName || !trimmedEmail || !trimmedService || !trimmedMessage) {
    return res.status(400).json({ error: "Name, email, service, and message are required." });
  }
  if (!emailPattern.test(trimmedEmail)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }
  if (trimmedService === "other" && !trimmedCustomService) {
    return res.status(400).json({ error: "Please specify your service when selecting Other." });
  }
  if (trimmedMessage.length < 10) {
    return res.status(400).json({ error: "Message must be at least 10 characters long." });
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return res.status(500).json({ error: "SMTP is not configured." });
  }

  try {
    const storedService = trimmedService === "other"
      ? `Other: ${trimmedCustomService}`
      : trimmedService;

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        service: storedService,
        company: null,
        message: trimmedMessage,
      },
    });

    const transporter = createTransporter();
    const recipient = process.env.CONTACT_RECEIVER_EMAIL || process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    // Escape all user-supplied values before HTML interpolation
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeService = escapeHtml(trimmedService === "other" ? "Other" : trimmedService);
    const safeCustomService = escapeHtml(trimmedCustomService);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipient,
      replyTo: trimmedEmail,
      subject: `New contact request from ${trimmedName}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Selected Service: ${trimmedService === "other" ? "Other" : trimmedService}`,
        ...(trimmedService === "other" ? [`Please Specify: ${trimmedCustomService}`] : []),
        "",
        "Message:",
        trimmedMessage,
      ].join("\n"),
      html: `
        <h2>New contact request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Selected Service:</strong> ${safeService}</p>
        ${trimmedService === "other" ? `<p><strong>Please Specify:</strong> ${safeCustomService}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return res.status(201).json({ id: contactRequest.id, success: true });
  } catch (error) {
    console.error("Failed to process contact request:", error);
    const detail = process.env.NODE_ENV === "development"
      ? (error?.message || String(error))
      : "Failed to send contact request.";
    return res.status(500).json({ error: detail });
  }
}
