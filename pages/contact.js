"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

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
  errorId,
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
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error && errorId ? errorId : undefined}
        className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06] ${
          error ? "border-red-300/70" : "border-white/10"
        }`}
        required={required}
      />
    </label>
  );
}

function ServiceSelectField({ label, name, value, onChange, options, error = false, errorId }) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) {
      setFocusedIndex(-1);
      return;
    }
    const currentIndex = options.findIndex((o) => o.value === value);
    setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [open, value, options]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && listRef.current && focusedIndex >= 0) {
      const items = listRef.current.querySelectorAll("[role='option']");
      items[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, open]);

  function handleKeyDown(e) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focusedIndex >= 0) {
        selectOption(options[focusedIndex]);
      }
    }
  }

  function selectOption(option) {
    onChange({ target: { name, value: option.value } });
    setOpen(false);
  }

  const listboxId = `${name}-listbox`;
  const activeDescendant =
    open && focusedIndex >= 0 ? `${name}-option-${focusedIndex}` : undefined;

  return (
    <div className="block" ref={containerRef}>
      <span id={`${name}-label`} className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
        {label}
      </span>

      <div className="relative">
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-labelledby={`${name}-label`}
          aria-activedescendant={activeDescendant}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error && errorId ? errorId : undefined}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          className={`flex w-full items-center justify-between rounded-2xl border bg-white/[0.04] px-4 py-3 text-base outline-none transition-all duration-200 hover:border-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/40 ${
            error ? "border-red-300/70" : "border-white/10"
          } ${selected ? "text-text" : "text-text/40"}`}
        >
          <span className="truncate">
            {selected ? selected.label : "Select a service"}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className={`ml-3 h-4 w-4 shrink-0 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isFocused = index === focusedIndex;

              return (
                <li
                  key={option.value}
                  id={`${name}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`flex cursor-pointer items-center justify-between px-4 py-3 text-base transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl ${
                    isFocused
                      ? "bg-accent/10 text-accent"
                      : isSelected
                        ? "bg-white/[0.04] text-accent"
                        : "text-text/80 hover:bg-white/[0.04] hover:text-text"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
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
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
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
    if (!contactData.name.trim()) errors.name = "Name is required.";
    if (!contactData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!contactData.service.trim()) errors.service = "Please choose a service.";
    if (contactData.service === "other" && !contactData.customService.trim()) {
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
    if (contactSubmitLockRef.current) return;
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send contact request.");

      setContactStatus({
        type: "success",
        message: "Your message has been sent. We will be in touch shortly.",
      });
      setContactData({ name: "", email: "", service: "", customService: "", message: "" });
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
  const isSuccess = contactStatus.type === "success";

  return (
    <>
      <Head>
        <title>Contact Brilliance Studio | Request a Renovation Consultation in Canada</title>
        <meta name="description" content="Tell us about your renovation project — custom home, kitchen, bathroom, addition, basement, or structural work. Brilliance Studio serves homeowners across Canada with premium design-build services." />
        <meta property="og:title" content="Contact Brilliance Studio | Request a Renovation Consultation" key="og:title" />
        <meta property="og:description" content="Tell us about your renovation project. Brilliance Studio serves homeowners across Canada with premium design-build services." key="og:description" />
      </Head>
      <main className="pb-20">
        <PageIntro
          eyebrow="Contact Us"
          title="Let us shape your next renovation."
          description="Use the contact form to tell us about your project and choose the service that fits your goals best."
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">

            {isSuccess ? (
              <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-500/[0.06] p-10 text-center shadow-[0_0_80px_rgba(52,211,153,0.06)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
                  <svg className="h-8 w-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-6 font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                  Message sent
                </h2>
                <p className="mt-4 text-lg leading-8 text-text/70">
                  Thank you for reaching out. We have received your inquiry and will
                  be in touch within one to two business days.
                </p>
                <div className="mt-8">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setContactStatus({ type: "", message: "" })}
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)] sm:p-10"
                onSubmit={handleContactSubmit}
                noValidate
              >
                <h2 className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                  Get in touch
                </h2>

                <div className="mt-6 grid gap-5">
                  {/* Name + Email row on larger screens */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Field
                        label="Name"
                        name="name"
                        placeholder="Your full name"
                        value={contactData.name}
                        onChange={updateContactField}
                        error={Boolean(contactErrors.name)}
                        errorId="error-name"
                      />
                      {contactErrors.name ? (
                        <p id="error-name" className="mt-2 text-sm text-red-300" role="alert">
                          {contactErrors.name}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={contactData.email}
                        onChange={updateContactField}
                        error={Boolean(contactErrors.email)}
                        errorId="error-email"
                      />
                      {contactErrors.email ? (
                        <p id="error-email" className="mt-2 text-sm text-red-300" role="alert">
                          {contactErrors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <ServiceSelectField
                      label="Choose Service"
                      name="service"
                      value={contactData.service}
                      onChange={updateContactField}
                      options={serviceOptions}
                      error={Boolean(contactErrors.service)}
                      errorId="error-service"
                    />
                    {contactErrors.service ? (
                      <p id="error-service" className="mt-2 text-sm text-red-300" role="alert">
                        {contactErrors.service}
                      </p>
                    ) : null}
                  </div>

                  {isOtherServiceSelected ? (
                    <div>
                      <Field
                        label="Please Specify"
                        name="customService"
                        placeholder="Tell us which service you need"
                        value={contactData.customService}
                        onChange={updateContactField}
                        error={Boolean(contactErrors.customService)}
                        errorId="error-customService"
                      />
                      {contactErrors.customService ? (
                        <p id="error-customService" className="mt-2 text-sm text-red-300" role="alert">
                          {contactErrors.customService}
                        </p>
                      ) : null}
                    </div>
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
                      aria-invalid={contactErrors.message ? "true" : undefined}
                      aria-describedby={contactErrors.message ? "error-message" : undefined}
                      className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06] ${
                        contactErrors.message ? "border-red-300/70" : "border-white/10"
                      }`}
                      required
                    />
                    {contactErrors.message ? (
                      <p id="error-message" className="mt-2 text-sm text-red-300" role="alert">
                        {contactErrors.message}
                      </p>
                    ) : null}
                  </label>
                </div>

                {contactStatus.message && contactStatus.type === "error" ? (
                  <p className="mt-5 text-sm text-red-300" role="alert">
                    {contactStatus.message}
                  </p>
                ) : null}

                <div className="mt-6">
                  <Button type="submit" disabled={isSubmittingContact}>
                    {isSubmittingContact ? "Sending..." : "Send message"}
                  </Button>
                </div>
              </form>
            )}
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
