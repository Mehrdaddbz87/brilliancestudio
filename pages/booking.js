import Head from "next/head";
import { useRef, useState } from "react";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";
import { DatePicker } from "@/components/ui/DatePicker";
import { formatIsoDate, isPastCalendarDate } from "@/lib/utils";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    preferredDate: null,
  });
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);

  function updateField(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.service.trim()) {
      nextErrors.service = "Service is required.";
    }

    if (!formData.preferredDate) {
      nextErrors.preferredDate = "Date is required.";
    } else if (isPastCalendarDate(formData.preferredDate)) {
      nextErrors.preferredDate = "Please choose today or a future date.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitLockRef.current) {
      return;
    }
    if (!validateForm()) {
      setStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          preferredDate: formData.preferredDate
            ? formatIsoDate(formData.preferredDate)
            : "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save booking request.");
      }

      setStatus({
        type: "success",
        message: "Your booking request has been saved successfully.",
      });
      setFormData({
        name: "",
        email: "",
        service: "",
        preferredDate: null,
      });
      setErrors({});
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to save booking request.",
      });
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Booking | Brilliance Studio</title>
      </Head>
      <main className="pb-20">
        <PageIntro
          eyebrow="Booking"
          title="Request a consultation."
          description="Share your availability and project frame. We will come back with the next suitable step."
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
            <form
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={updateField}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                    placeholder="Your name"
                    required
                  />
                </label>
                {errors.name ? (
                  <p className="-mt-2 text-sm text-red-300">{errors.name}</p>
                ) : null}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={updateField}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                    placeholder="name@example.com"
                    required
                  />
                </label>
                {errors.email ? (
                  <p className="-mt-2 text-sm text-red-300">{errors.email}</p>
                ) : null}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    Service
                  </span>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={updateField}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                    placeholder="Website design, redesign, brand site..."
                    required
                  />
                </label>
                {errors.service ? (
                  <p className="-mt-2 text-sm text-red-300">{errors.service}</p>
                ) : null}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    Date
                  </span>
                  <DatePicker
                    value={formData.preferredDate}
                    onChange={(nextDate) => {
                      setFormData((current) => ({
                        ...current,
                        preferredDate: nextDate,
                      }));
                      setErrors((current) => ({
                        ...current,
                        preferredDate: "",
                      }));
                    }}
                    placeholder="YYYY-MM-DD"
                    error={Boolean(errors.preferredDate)}
                    disablePastDates
                    name="preferredDate"
                  />
                </label>
                {errors.preferredDate ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {errors.preferredDate}
                  </p>
                ) : null}
              </div>

              {status.message ? (
                <p
                  className={`mt-5 text-sm ${
                    status.type === "success"
                      ? "text-emerald-300"
                      : "text-red-300"
                  }`}
                >
                  {status.message}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send booking"}
                </Button>
                <Button href="/contact" variant="ghost">
                  Contact page
                </Button>
              </div>
            </form>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
