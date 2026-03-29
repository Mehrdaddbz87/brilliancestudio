import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";
import { parseIsoDateString } from "@/lib/utils";

/**
 * Preserves booking dates in the canonical ISO format used by the UI and API.
 */
function formatCanadianDate(dateValue) {
  const trimmedDate = String(dateValue || "").trim();

  if (!trimmedDate) {
    return "";
  }

  // Keep booking dates in the Canadian ISO style everywhere.
  return trimmedDate;
}

/**
 * Creates the SMTP transport used for booking notification emails.
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
 * Accepts booking requests, validates the payload, stores the request,
 * and notifies the admin mailbox.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { name, email, service, preferredDate } = req.body || {};
  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedService = String(service || "").trim();
  const formattedPreferredDate = formatCanadianDate(preferredDate);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const parsedDate = parseIsoDateString(formattedPreferredDate);

  if (!trimmedName || !trimmedEmail || !trimmedService || !preferredDate) {
    return res
      .status(400)
      .json({ error: "Name, email, service, and date are required." });
  }

  if (!emailPattern.test(trimmedEmail)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  if (!parsedDate) {
    return res
      .status(400)
      .json({ error: "Please provide a valid date in YYYY-MM-DD format." });
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
    const booking = await prisma.bookingRequest.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        preferredDate: new Date(parsedDate.toISOString()),
        projectType: trimmedService,
      },
    });

    const transporter = createTransporter();
    const recipient =
      process.env.BOOKING_RECEIVER_EMAIL ||
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.ADMIN_EMAIL ||
      process.env.SMTP_USER;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipient,
      replyTo: trimmedEmail,
      subject: `New booking request from ${trimmedName}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Service: ${trimmedService}`,
        `Date: ${formattedPreferredDate}`,
      ].join("\n"),
      html: `
        <h2>New booking request</h2>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Service:</strong> ${trimmedService}</p>
        <p><strong>Date:</strong> ${formattedPreferredDate}</p>
      `,
    });

    return res.status(201).json({ id: booking.id, success: true });
  } catch (error) {
    console.error("Failed to create booking request:", error);
    return res.status(500).json({ error: "Failed to save booking request." });
  }
}
