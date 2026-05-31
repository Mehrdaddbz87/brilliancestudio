"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { serviceOptions } from "@/lib/service-pages";

function Field({ label, type = "text", placeholder, name, value, onChange, required = true, error = false, errorId }) {
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
        className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 font-raleway text-base font-light tracking-wide text-text outline-none transition placeholder:font-raleway placeholder:font-light placeholder:tracking-wide placeholder:text-text/35 focus:border-accent focus:bg-white/[0.06] ${
          error ? "border-rose-400/40" : "border-white/10"
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
    if (!open) { setFocusedIndex(-1); return; }
    const currentIndex = options.findIndex((o) => o.value === value);
    setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [open, value, options]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
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
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") { e.preventDefault(); setOpen(true); }
      return;
    }
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") { e.preventDefault(); setFocusedIndex((i) => Math.min(i + 1, options.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setFocusedIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (focusedIndex >= 0) selectOption(options[focusedIndex]); }
  }

  function selectOption(option) {
    onChange({ target: { name, value: option.value } });
    setOpen(false);
  }

  const listboxId = `${name}-listbox`;
  const activeDescendant = open && focusedIndex >= 0 ? `${name}-option-${focusedIndex}` : undefined;

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
          className={`flex w-full items-center justify-between rounded-2xl border bg-white/[0.04] px-4 py-3 font-raleway text-base font-light tracking-wide outline-none transition-all duration-200 hover:border-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/40 ${
            error ? "border-rose-400/40" : "border-white/10"
          } ${selected ? "text-text" : "text-text/40"}`}
        >
          <span className="truncate font-raleway font-light tracking-wide text-text/35">{selected ? <span className="text-text">{selected.label}</span> : "Select a service"}</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`ml-3 h-4 w-4 shrink-0 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <ul ref={listRef} id={listboxId} role="listbox" aria-label={label}
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isFocused = index === focusedIndex;
              return (
                <li key={option.value} id={`${name}-option-${index}`} role="option" aria-selected={isSelected}
                  onClick={() => selectOption(option)} onMouseEnter={() => setFocusedIndex(index)}
                  className={`flex cursor-pointer items-center justify-between px-4 py-3 font-raleway text-base font-light tracking-wide transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl ${
                    isFocused ? "bg-accent/10 text-accent" : isSelected ? "bg-white/[0.04] text-accent" : "text-text/80 hover:bg-white/[0.04] hover:text-text"
                  }`}>
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
  const [contactData, setContactData] = useState({ name: "", email: "", service: "", customService: "", message: "" });
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [contactErrors, setContactErrors] = useState({});
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const contactSubmitLockRef = useRef(false);

  function updateContactField(event) {
    const { name, value } = event.target;
    setContactData((current) => ({ ...current, [name]: value, ...(name === "service" && value !== "other" ? { customService: "" } : {}) }));
    setContactErrors((current) => ({ ...current, [name]: "", ...(name === "service" && value !== "other" ? { customService: "" } : {}) }));
  }

  function validateContactForm() {
    const errors = {};
    if (!contactData.name.trim()) errors.name = "Please enter your full name";
    if (!contactData.email.trim()) errors.email = "A valid email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) errors.email = "A valid email address is required";
    if (!contactData.service.trim()) errors.service = "Please select a service to continue";
    if (contactData.service === "other" && !contactData.customService.trim()) errors.customService = "Please describe the service you need";
    if (!contactData.message.trim()) errors.message = "Tell us a bit about your project first";
    else if (contactData.message.trim().length < 10) errors.message = "Tell us a bit about your project first";
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleContactSubmit(event) {
    event.preventDefault();
    if (contactSubmitLockRef.current) return;
    if (!validateContactForm()) {
      setContactStatus({ type: "error", message: "Please review the fields above before sending." });
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
      setContactStatus({ type: "success", message: "Your message has been sent. We will be in touch shortly." });
      setContactData({ name: "", email: "", service: "", customService: "", message: "" });
      setContactErrors({});
    } catch (error) {
      setContactStatus({ type: "error", message: error.message || "Failed to send contact request." });
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
        <meta name="description" content="Tell us about your renovation project. Brilliance Studio serves homeowners across Canada with premium design-build services." />
        <meta property="og:title" content="Contact Brilliance Studio | Request a Renovation Consultation" key="og:title" />
        <meta property="og:description" content="Tell us about your renovation project. Brilliance Studio serves homeowners across Canada with premium design-build services." key="og:description" />
      </Head>
      <main className="overflow-x-clip pb-24">

        {/* Page Header */}
        <FadeInSection>
          <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Contact Us
            </p>
            <h1 className="mt-3 font-raleway text-3xl font-semibold uppercase tracking-[0.1em] text-text sm:text-4xl">
              Let us shape your next renovation.
            </h1>
            <p className="mt-4 max-w-xl font-raleway text-base font-light leading-relaxed tracking-wide text-text/55">
              Tell us about your project and we&apos;ll be in touch within one business day.
            </p>
          </section>
        </FadeInSection>

        {/* Gold divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-accent/20" />
        </div>

        {/* Two-column layout */}
        <FadeInSection delay={0.08}>
          <section className="mx-auto grid max-w-7xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">

            {/* Left — contact info */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Get in Touch
              </p>
              <h2 className="mt-4 font-raleway text-2xl font-semibold leading-snug tracking-[0.08em] text-text">
                We&apos;d love to hear about your project.
              </h2>
              <p className="mt-4 font-raleway text-sm font-light leading-relaxed tracking-wide text-text/55">
                Whether you&apos;re planning a whole-home renovation or a refined update,
                our team is here to bring your vision to life with precision and care.
              </p>
              <div className="mt-8 space-y-4">
                <a href="mailto:info@brilliancestudio.ca"
                  className="flex items-center gap-3 text-sm text-text/60 transition hover:text-accent">
                  <svg className="h-4 w-4 shrink-0 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                  </svg>
                  info@brilliancestudio.ca
                </a>
                <p className="flex items-center gap-3 text-sm text-text/60">
                  <svg className="h-4 w-4 shrink-0 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11z" /><circle cx="12" cy="10" r="2.5" />
                  </svg>
                  Toronto, Canada
                </p>
                <p className="flex items-center gap-3 text-sm text-text/60">
                  <svg className="h-4 w-4 shrink-0 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                  </svg>
                  Mon&ndash;Fri, 9am&ndash;6pm
                </p>
              </div>
              <div className="mt-8 h-px w-32 bg-accent/20" />
              <p className="mt-5 text-xs text-text/40">
                Free initial consultation. No commitment.
              </p>
            </div>

            {/* Right — form */}
            <div>
              {isSuccess ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
                    <svg className="h-8 w-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mt-6 font-raleway text-2xl font-semibold tracking-[0.08em] text-text">Your message has been sent.</h2>
                  <p className="mt-4 max-w-sm font-raleway text-base font-light leading-relaxed tracking-wide text-text/60">
                    Thank you for reaching out. We have received your inquiry and will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Field label="Name" name="name" placeholder="Your full name" value={contactData.name} onChange={updateContactField} error={Boolean(contactErrors.name)} errorId="error-name" />
                      {contactErrors.name ? <p id="error-name" className="mt-2 text-sm text-rose-400/80" role="alert">{contactErrors.name}</p> : null}
                    </div>
                    <div>
                      <Field label="Email" type="email" name="email" placeholder="name@example.com" value={contactData.email} onChange={updateContactField} error={Boolean(contactErrors.email)} errorId="error-email" />
                      {contactErrors.email ? <p id="error-email" className="mt-2 text-sm text-rose-400/80" role="alert">{contactErrors.email}</p> : null}
                    </div>
                  </div>

                  <div>
                    <ServiceSelectField label="Choose Service" name="service" value={contactData.service} onChange={updateContactField} options={serviceOptions} error={Boolean(contactErrors.service)} errorId="error-service" />
                    {contactErrors.service ? <p id="error-service" className="mt-2 text-sm text-rose-400/80" role="alert">{contactErrors.service}</p> : null}
                  </div>

                  {isOtherServiceSelected ? (
                    <div>
                      <Field label="Please Specify" name="customService" placeholder="Tell us which service you need" value={contactData.customService} onChange={updateContactField} error={Boolean(contactErrors.customService)} errorId="error-customService" />
                      {contactErrors.customService ? <p id="error-customService" className="mt-2 text-sm text-rose-400/80" role="alert">{contactErrors.customService}</p> : null}
                    </div>
                  ) : null}

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">Message</span>
                    <textarea name="message" value={contactData.message} onChange={updateContactField} rows={6}
                      placeholder="Tell us about your goals, timeline, and what kind of transformation you are planning."
                      aria-invalid={contactErrors.message ? "true" : undefined}
                      aria-describedby={contactErrors.message ? "error-message" : undefined}
                      className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 font-raleway text-base font-light tracking-wide text-text outline-none transition placeholder:font-raleway placeholder:font-light placeholder:tracking-wide placeholder:text-text/35 focus:border-accent focus:bg-white/[0.06] ${contactErrors.message ? "border-rose-400/40" : "border-white/10"}`}
                      required />
                    {contactErrors.message ? <p id="error-message" className="mt-2 text-sm text-rose-400/80" role="alert">{contactErrors.message}</p> : null}
                  </label>

                  {contactStatus.message && contactStatus.type === "error" ? (
                    <p className="text-center text-sm text-rose-400/80" role="alert">{contactStatus.message}</p>
                  ) : null}

                  <div className="pt-1">
                    <Button type="submit" disabled={isSubmittingContact} className="w-full">
                      {isSubmittingContact ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
            </div>

          </section>
        </FadeInSection>
      </main>
    </>
  );
}
