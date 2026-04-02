import Head from "next/head";
import { useRef, useState } from "react";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";
import { serviceOptions } from "@/lib/service-pages";

function Field({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required = true,
  error = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06] ${
          error ? "border-red-300/70" : "border-white/10"
        }`}
        required={required}
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, options, error = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
        {label}
      </span>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-xl border bg-black px-4 py-3 pr-12 text-base tracking-wide text-white outline-none transition-all duration-200 ease-in-out hover:border-accent/40 focus:border-accent focus:ring-2 focus:ring-[#b99a45]/60 ${
            error ? "border-red-300/70" : "border-gray-700"
          }`}
          required
        >
          <option value="">Select a service</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-accent">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </label>
  );
}

export default function ContactPage() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    service: "",
    customService: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState({
    type: "",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState({});
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const contactSubmitLockRef = useRef(false);

  function updateContactField(event) {
    const { name, value } = event.target;
    setContactData((current) => ({
      ...current,
      [name]: value,
      ...(name === "service" && value !== "other" ? { customService: "" } : {}),
    }));
    setContactErrors((current) => ({
      ...current,
      [name]: "",
      ...(name === "service" && value !== "other" ? { customService: "" } : {}),
    }));
  }

  function validateContactForm() {
    const errors = {};

    if (!contactData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!contactData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!contactData.service.trim()) {
      errors.service = "Please choose a service.";
    }

    if (
      contactData.service === "other" &&
      !contactData.customService.trim()
    ) {
      errors.customService = "Please specify your service.";
    }

    if (!contactData.message.trim()) {
      errors.message = "Message is required.";
    } else if (contactData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleContactSubmit(event) {
    event.preventDefault();
    if (contactSubmitLockRef.current) {
      return;
    }
    if (!validateContactForm()) {
      setContactStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      return;
    }

    contactSubmitLockRef.current = true;
    setIsSubmittingContact(true);
    setContactStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send contact request.");
      }

      setContactStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });
      setContactData({
        name: "",
        email: "",
        service: "",
        customService: "",
        message: "",
      });
      setContactErrors({});
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error.message || "Failed to send contact request.",
      });
    } finally {
      contactSubmitLockRef.current = false;
      setIsSubmittingContact(false);
    }
  }

  const isOtherServiceSelected = contactData.service === "other";

  return (
    <>
      <Head>
        <title>Contact Us | Brilliance Studio</title>
      </Head>
      <main className="pb-20">
        <PageIntro
          eyebrow="Contact Us"
          title="Let us shape your next renovation."
          description="Use the contact form to tell us about your project and choose the service that fits your goals best."
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
            <form
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)] sm:p-10"
              onSubmit={handleContactSubmit}
              noValidate
            >
              <h2 className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                Contact Us
              </h2>
              <div className="mt-6 grid gap-5">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Your full name"
                  value={contactData.name}
                  onChange={updateContactField}
                />
                {contactErrors.name ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {contactErrors.name}
                  </p>
                ) : null}
                <Field
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={contactData.email}
                  onChange={updateContactField}
                />
                {contactErrors.email ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {contactErrors.email}
                  </p>
                ) : null}
                <SelectField
                  label="Choose Service"
                  name="service"
                  value={contactData.service}
                  onChange={updateContactField}
                  options={serviceOptions}
                  error={Boolean(contactErrors.service)}
                />
                {contactErrors.service ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {contactErrors.service}
                  </p>
                ) : null}
                {isOtherServiceSelected ? (
                  <>
                    <Field
                      label="Please Specify"
                      name="customService"
                      placeholder="Tell us which service you need"
                      value={contactData.customService}
                      onChange={updateContactField}
                      error={Boolean(contactErrors.customService)}
                    />
                    {contactErrors.customService ? (
                      <p className="-mt-2 text-sm text-red-300">
                        {contactErrors.customService}
                      </p>
                    ) : null}
                  </>
                ) : null}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={updateContactField}
                    rows={6}
                    placeholder="Tell us about your goals, timeline, and what kind of transformation you are planning."
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                    required
                  />
                </label>
                {contactErrors.message ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {contactErrors.message}
                  </p>
                ) : null}
              </div>
              {contactStatus.message ? (
                <p
                  className={`mt-5 text-sm ${
                    contactStatus.type === "success"
                      ? "text-emerald-300"
                      : "text-red-300"
                  }`}
                >
                  {contactStatus.message}
                </p>
              ) : null}
              <div className="mt-6">
                <Button type="submit" disabled={isSubmittingContact}>
                  {isSubmittingContact ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
