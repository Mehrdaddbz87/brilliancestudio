/** @jest-environment node */

import nodemailer from "nodemailer";

import handler from "@/pages/api/booking";
import { prisma } from "@/lib/prisma";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    bookingRequest: {
      create: jest.fn(),
    },
  },
}));

function createMockReq(overrides = {}) {
  return {
    method: "POST",
    body: {},
    ...overrides,
  };
}

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

describe("/api/booking", () => {
  const sendMail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "admin@example.com";
    process.env.SMTP_PASSWORD = "secret";
    process.env.BOOKING_RECEIVER_EMAIL = "owner@example.com";

    nodemailer.createTransport.mockReturnValue({ sendMail });
    prisma.bookingRequest.create.mockResolvedValue({ id: "booking_123" });
    sendMail.mockResolvedValue({ messageId: "message_456" });
  });

  it("saves valid booking data and returns success", async () => {
    const req = createMockReq({
      body: {
        name: "John Smith",
        email: "john@example.com",
        service: "Full website redesign",
        preferredDate: "2026-04-10",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: "booking_123", success: true });
    expect(prisma.bookingRequest.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: "John Smith",
        email: "john@example.com",
        projectType: "Full website redesign",
        preferredDate: expect.any(Date),
      }),
    });
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("returns 400 for invalid booking payloads", async () => {
    const req = createMockReq({
      body: {
        name: "John Smith",
        email: "john@example.com",
        service: "Full website redesign",
        preferredDate: "2026-02-31",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Please provide a valid date in YYYY-MM-DD format.",
    });
    expect(prisma.bookingRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 400 when the booking date string is not valid ISO", async () => {
    const req = createMockReq({
      body: {
        name: "John Smith",
        email: "john@example.com",
        service: "Full website redesign",
        preferredDate: "03/15/2026",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Please provide a valid date in YYYY-MM-DD format.",
    });
    expect(prisma.bookingRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 400 when the booking email format is invalid", async () => {
    const req = createMockReq({
      body: {
        name: "John Smith",
        email: "invalid-email",
        service: "Full website redesign",
        preferredDate: "2026-04-10",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Please provide a valid email address.",
    });
    expect(prisma.bookingRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("blocks empty booking submissions", async () => {
    const req = createMockReq({
      body: {},
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Name, email, service, and date are required.",
    });
    expect(prisma.bookingRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });
});
