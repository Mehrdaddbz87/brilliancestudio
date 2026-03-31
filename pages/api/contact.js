import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";

/**
 * Creates the SMTP transport used for contact request emails.
 */
function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

/**
 * Accepts contact form submissions, validates them, stores the request,
 * and forwards the message to the configured recipient.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { name, email, service, message } = req.body || {};
  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedService = String(service || "").trim();
  const trimmedMessage = String(message || "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedName || !trimmedEmail || !trimmedService || !trimmedMessage) {
    return res
      .status(400)
      .json({ error: "Name, email, service, and message are required." });
  }

  if (!emailPattern.test(trimmedEmail)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  if (trimmedMessage.length < 10) {
    return res
      .status(400)
      .json({ error: "Message must be at least 10 characters long." });
  }

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASSWORD
  ) {
    return res.status(500).json({ error: "SMTP is not configured." });
  }

  try {
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        service: trimmedService,
        company: null,
        message: trimmedMessage,
      },
    });

    const transporter = createTransporter();
    const recipient =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.ADMIN_EMAIL ||
      process.env.SMTP_USER;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipient,
      replyTo: trimmedEmail,
      subject: `New contact request from ${trimmedName}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Selected Service: ${trimmedService}`,
        "",
        "Message:",
        trimmedMessage,
      ].join("\n"),
      html: `
        <h2>New contact request</h2>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Selected Service:</strong> ${trimmedService}</p>
        <p><strong>Message:</strong></p>
        <p>${trimmedMessage.replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.status(201).json({ id: contactRequest.id, success: true });
  } catch (error) {
    console.error("Failed to process contact request:", error);
    return res.status(500).json({ error: "Failed to send contact request." });
  }
}
