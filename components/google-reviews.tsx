"use client";

import { FadeInSection } from "@/components/fade-in-section";

const GOOGLE_BUSINESS_URL =
  "https://www.google.com/search?q=Brilliance+Studio+Toronto+reviews";

const reviews = [
  {
    initials: "M.A.",
    name: "Mohammad Arab",
    date: "4 months ago",
    text: "I had an excellent experience with Brilliance Studio. Shayan was professional, reliable, and very easy to work with from start to finish. The quality of the work was outstanding—clean finishes, great attention to detail, and everything was completed on time. You can tell he really cares about his work and his clients. Highly recommend Brilliance Studio to anyone looking for quality construction and renovation services.",
    rating: 5,
  },
  {
    initials: "A.B.",
    name: "Ahoo Barati",
    date: "6 months ago",
    text: "Brilliance Construction did such a great job on my project. The team was on time, respectful, and really paid attention to detail. Super happy with the final result!",
    rating: 5,
  },
  {
    initials: "A.K.",
    name: "Armita Kharmandar",
    date: "3 months ago",
    text: "Greatest renovation team ever. So friendly, on time and organized. They pay attention to every details and keep the project budget friendly. I loved how trustworthy they are.",
    rating: 5,
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 text-accent"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.643 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function GoogleReviews() {
  return (
    <FadeInSection delay={0.05}>
      <section className="mx-auto mt-20 w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Client Reviews
          </p>

          {/* Google rating summary */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <GoogleIcon />
            <span className="font-classic text-3xl font-bold text-accent">5.0</span>
            <Stars />
            <span className="text-sm text-text/50">Based on Google Reviews</span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex flex-col justify-between rounded-[1.25rem] border border-accent/20 bg-white/[0.03] p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars count={review.rating} />
                  <GoogleIcon />
                </div>
                <p className="mt-5 text-base leading-7 text-text/80">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{review.name}</p>
                  <p className="text-xs text-text/45">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Google */}
        <div className="mt-10 text-center">
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent transition hover:text-text"
          >
            Read all reviews on Google &rarr;
          </a>
        </div>

      </section>
    </FadeInSection>
  );
}
