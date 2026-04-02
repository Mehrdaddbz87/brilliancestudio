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
        service: "Custom Home Design & Build",
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
        service: "Custom Home Design & Build",
        company: null,
        message: "I would like to discuss a renovation website redesign.",
      },
    });
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining(
          "Selected Service: Custom Home Design & Build",
        ),
        html: expect.stringContaining(
          "<strong>Selected Service:</strong> Custom Home Design & Build",
        ),
      }),
    );
  });

  it("accepts an other service with a custom value", async () => {
    const req = createMockReq({
      body: {
        name: "Jane Doe",
        email: "jane@example.com",
        service: "other",
        customService: "Commercial Fit-Out",
        message: "We need a tailored consultation for a commercial interior project.",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(201);
    expect(prisma.contactRequest.create).toHaveBeenCalledWith({
      data: {
        name: "Jane Doe",
        email: "jane@example.com",
        service: "Other: Commercial Fit-Out",
        company: null,
        message:
          "We need a tailored consultation for a commercial interior project.",
      },
    });
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("Please Specify: Commercial Fit-Out"),
        html: expect.stringContaining(
          "<strong>Please Specify:</strong> Commercial Fit-Out",
        ),
      }),
    );
  });

  it("returns 400 for invalid submissions", async () => {
    const req = createMockReq({
      body: {
        name: "",
        email: "invalid-email",
        service: "",
        message: "short",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Name, email, service, and message are required.",
    });
    expect(prisma.contactRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 400 when the email format is invalid", async () => {
    const req = createMockReq({
      body: {
        name: "Jane Doe",
        email: "invalid-email",
        service: "Home Additions",
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
      error: "Name, email, service, and message are required.",
    });
    expect(prisma.contactRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("blocks submissions without a selected service", async () => {
    const req = createMockReq({
      body: {
        name: "Jane Doe",
        email: "jane@example.com",
        message: "This message is long enough to pass length validation.",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Name, email, service, and message are required.",
    });
    expect(prisma.contactRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("requires a custom service when other is selected", async () => {
    const req = createMockReq({
      body: {
        name: "Jane Doe",
        email: "jane@example.com",
        service: "other",
        customService: "   ",
        message: "This message is long enough to pass length validation.",
      },
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Please specify your service when selecting Other.",
    });
    expect(prisma.contactRequest.create).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });
});
