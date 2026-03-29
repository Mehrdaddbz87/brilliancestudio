/** @jest-environment node */

import nodemailer from "nodemailer";

import handler from "@/pages/api/contact";
import { prisma } from "@/lib/prisma";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    contactRequest: {
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

describe("/api/contact", () => {
  const sendMail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "admin@example.com";
    process.env.SMTP_PASSWORD = "secret";
    process.env.CONTACT_RECEIVER_EMAIL = "owner@example.com";

    nodemailer.createTransport.mockReturnValue({ sendMail });
    prisma.contactRequest.create.mockResolvedValue({ id: "contact_123" });
    sendMail.mockResolvedValue({ messageId: "message_123" });
  });

  it("returns a success response for valid submissions", async () => {
    const req = createMockReq({
      body: {
        name: "Jane Doe",
        email: "jane@example.com",
        message: "I would like to discuss a renovation website redesign.",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: "contact_123", success: true });
    expect(prisma.contactRequest.create).toHaveBeenCalledWith({
      data: {
        name: "Jane Doe",
        email: "jane@example.com",
        company: null,
        message: "I would like to discuss a renovation website redesign.",
      },
    });
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("returns 400 for invalid submissions", async () => {
    const req = createMockReq({
      body: {
        name: "",
        email: "invalid-email",
        message: "short",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Name, email, and message are required.",
    });
    expect(prisma.contactRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 400 when the email format is invalid", async () => {
    const req = createMockReq({
      body: {
        name: "Jane Doe",
        email: "invalid-email",
        message: "This message is long enough to pass length validation.",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Please provide a valid email address.",
    });
    expect(prisma.contactRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("blocks empty submissions", async () => {
    const req = createMockReq({
      body: {},
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Name, email, and message are required.",
    });
    expect(prisma.contactRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });
});
