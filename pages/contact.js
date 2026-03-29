import Head from "next/head";
import { useRef, useState } from "react";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";
import { DatePicker } from "@/components/ui/DatePicker";
import { formatIsoDate, isPastCalendarDate } from "@/lib/utils";

function Field({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required = true,
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
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
        required={required}
      />
    </label>
  );
}

export default function ContactPage() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    service: "",
    preferredDate: null,
  });
  const [contactStatus, setContactStatus] = useState({
    type: "",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState({});
  const [bookingStatus, setBookingStatus] = useState({
    type: "",
    message: "",
  });
  const [bookingErrors, setBookingErrors] = useState({});
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const contactSubmitLockRef = useRef(false);
  const bookingSubmitLockRef = useRef(false);

  function updateContactField(event) {
    const { name, value } = event.target;
    setContactData((current) => ({
      ...current,
      [name]: value,
    }));
    setContactErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function updateBookingField(event) {
    const { name, value } = event.target;

    setBookingData((current) => ({
      ...current,
      [name]: value,
    }));
    setBookingErrors((current) => ({
      ...current,
      [name]: "",
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

  function validateBookingForm() {
    const errors = {};

    if (!bookingData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!bookingData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!bookingData.service.trim()) {
      errors.service = "Service is required.";
    }

    if (!bookingData.preferredDate) {
      errors.preferredDate = "Date is required.";
    } else if (isPastCalendarDate(bookingData.preferredDate)) {
      errors.preferredDate = "Please choose today or a future date.";
    }

    setBookingErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleBookingSubmit(event) {
    event.preventDefault();
    if (bookingSubmitLockRef.current) {
      return;
    }
    if (!validateBookingForm()) {
      setBookingStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      return;
    }

    bookingSubmitLockRef.current = true;
    setIsSubmittingBooking(true);
    setBookingStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          service: bookingData.service,
          preferredDate: bookingData.preferredDate
            ? formatIsoDate(bookingData.preferredDate)
            : "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save booking request.");
      }

      setBookingStatus({
        type: "success",
        message: "Your booking request has been saved successfully.",
      });
      setBookingData({
        name: "",
        email: "",
        service: "",
        preferredDate: null,
      });
      setBookingErrors({});
    } catch (error) {
      setBookingStatus({
        type: "error",
        message: error.message || "Failed to save booking request.",
      });
    } finally {
      bookingSubmitLockRef.current = false;
      setIsSubmittingBooking(false);
    }
  }

  return (
    <>
      <Head>
        <title>Contact | Brilliance Studio</title>
      </Head>
      <main className="pb-20">
        <PageIntro
          eyebrow="Contact"
          title="Let us shape your next presence."
          description="Use the contact form for project inquiries or the booking form if you already want to propose a timeline."
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <form
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
              onSubmit={handleContactSubmit}
              noValidate
            >
              <h2 className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                Contact Form
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
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={updateContactField}
                    rows={6}
                    placeholder="Tell us about your goals, audience, and desired timeline."
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

            <form
              className="rounded-[2rem] border border-accent/20 bg-accent/[0.06] p-8"
              onSubmit={handleBookingSubmit}
              noValidate
            >
              <h2 className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                Booking Form
              </h2>
              <div className="mt-6 grid gap-5">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Your full name"
                  value={bookingData.name}
                  onChange={updateBookingField}
                />
                {bookingErrors.name ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {bookingErrors.name}
                  </p>
                ) : null}
                <Field
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={bookingData.email}
                  onChange={updateBookingField}
                />
                {bookingErrors.email ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {bookingErrors.email}
                  </p>
                ) : null}
                <Field
                  label="Service"
                  name="service"
                  placeholder="Website design, redesign, brand site..."
                  value={bookingData.service}
                  onChange={updateBookingField}
                />
                {bookingErrors.service ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {bookingErrors.service}
                  </p>
                ) : null}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    Date
                  </span>
                  <DatePicker
                    value={bookingData.preferredDate}
                    onChange={(nextDate) => {
                      setBookingData((current) => ({
                        ...current,
                        preferredDate: nextDate,
                      }));
                      setBookingErrors((current) => ({
                        ...current,
                        preferredDate: "",
                      }));
                    }}
                    placeholder="YYYY-MM-DD"
                    error={Boolean(bookingErrors.preferredDate)}
                    disablePastDates
                    name="preferredDate"
                  />
                </label>
                {bookingErrors.preferredDate ? (
                  <p className="-mt-2 text-sm text-red-300">
                    {bookingErrors.preferredDate}
                  </p>
                ) : null}
              </div>
              {bookingStatus.message ? (
                <p
                  className={`mt-5 text-sm ${
                    bookingStatus.type === "success"
                      ? "text-emerald-300"
                      : "text-red-300"
                  }`}
                >
                  {bookingStatus.message}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-4">
                <Button type="submit" disabled={isSubmittingBooking}>
                  {isSubmittingBooking ? "Saving..." : "Request booking"}
                </Button>
                <Button href="/booking" variant="ghost">
                  Go to booking page
                </Button>
              </div>
            </form>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
