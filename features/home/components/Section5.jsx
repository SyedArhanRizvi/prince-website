"use client";

import { FiMapPin } from "react-icons/fi";

const TESTIMONIALS = [
  {
    id: 1,
    client: "Rohan & Meera Kapoor",
    location: "Sector 50, Noida",
    message:
      "We thought our eight-year-old L-shaped sofa was beyond saving. Their craftsmen stripped it down to the hardwood frame, rebuilt the springs and high-resilience foam, and reupholstered it in textured bouclé. It sits firmer and looks sharper than the day we bought it.",
  },
  {
    id: 2,
    client: "Ananya Sharma",
    location: "Greater Kailash II, New Delhi",
    message:
      "They visited our home with fabric swatches, measured the living room proportions, and delivered our custom three-seater teakwood sofa in eighteen days flat. Zero hidden delays, and the joinery finish is genuinely heirloom quality.",
  },
  {
    id: 3,
    client: "Vikramaditya Nair",
    location: "DLF Phase 4, Gurugram",
    message:
      "Our dual-motor recliner had a jammed footrest and worn leather armrests. Instead of pushing us to buy a new chair, their technician replaced the actuator motor and matched the leather grain seamlessly in just four days.",
  },
  {
    id: 4,
    client: "Siddharth Malhotra",
    location: "Indirapuram, Ghaziabad",
    message:
      "Six ancestral rosewood dining chairs had loose mortise joints and torn cane seats. They reinforced every joint, hand-wove fresh natural cane, and finished the wood in a warm matte polish. Guests always assume they are bespoke designer pieces.",
  },
  {
    id: 5,
    client: "Priya & Karan Verma",
    location: "Sector 137, Noida",
    message:
      "Their team brought scratch-resistant, spill-repellent fabrics right to our apartment so we could test them under our own lighting. Six months later, coffee spills wipe right off and there is not a single snag.",
  },
];

function TestimonialCard({ item, isDark }) {
  return (
    <article
      className={`flex w-[260px] sm:w-[310px] lg:w-[340px] shrink-0 flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1 cursor-pointer ${
        isDark
          ? "bg-[var(--color-heading)] border-[var(--color-heading)] text-[var(--color-background)]"
          : "bg-[var(--color-surface)]/75 border-[var(--color-border)] text-[var(--color-heading)]"
      }`}
    >
      <div>
        <span
          aria-hidden="true"
          className={`block font-[family-name:var(--font-heading)] text-4xl leading-none select-none ${
            isDark
              ? "text-[color-mix(in_srgb,var(--color-bronze),white_30%)]"
              : "text-[var(--color-bronze)]"
          }`}
        >
          &ldquo;
        </span>

        <p
          className={`mt-1.5 text-xs sm:text-sm leading-relaxed line-clamp-4 ${
            isDark ? "text-[var(--color-border)]" : "text-[var(--color-paragraph)]"
          }`}
        >
          {item.message}
        </p>
      </div>

      <div
        className={`mt-4 border-t pt-3 ${
          isDark ? "border-white/15" : "border-[var(--color-border)]"
        }`}
      >
        <p
          className={`font-[family-name:var(--font-heading)] text-base sm:text-lg font-medium ${
            isDark ? "!text-[var(--color-background)]" : "text-[var(--color-heading)]"
          }`}
        >
          {item.client}
        </p>
        <p className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <FiMapPin
            aria-hidden="true"
            className={`h-3 w-3 shrink-0 ${
              isDark
                ? "text-[color-mix(in_srgb,var(--color-bronze),white_30%)]"
                : "text-[var(--color-bronze)]"
            }`}
          />
          <span>{item.location}</span>
        </p>
      </div>
    </article>
  );
}

function Section5() {
  const loopItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative flex w-full flex-col justify-center overflow-hidden bg-[var(--color-background)] py-16 sm:py-20 lg:h-[calc(100vh-5rem)] lg:min-h-[600px] lg:max-h-[820px] lg:py-0"
    >
      {/* Top subtle hairline rule */}
      <div className="absolute top-0 left-5 right-5 sm:left-8 sm:right-8 lg:left-12 lg:right-12 h-px bg-[var(--color-border)] opacity-70" />

      {/* ---------- Section Header ---------- */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[var(--color-border)]">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]">
              <span className="h-px w-8 bg-[var(--color-bronze)]" />
              Client Stories
            </span>
            <h2
              id="testimonials-heading"
              className="mt-3 text-3xl leading-[1.08] tracking-tight text-[var(--color-heading)] sm:text-4xl lg:text-5xl"
            >
              Trusted by{" "}
              <span className="italic text-[var(--color-bronze)]">homes</span>{" "}
              across Delhi NCR
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-[var(--color-paragraph)] sm:text-right">
            Hover over any note to pause and read what homeowners say about our restoration & custom work.
          </p>
        </div>
      </div>

      {/* ---------- Seamless Infinite Marquee Track ---------- */}
      <div className="marquee-wrapper relative mt-8 sm:mt-10 w-full overflow-hidden py-2">
        <div className="marquee-track flex w-max gap-4 sm:gap-5 px-3">
          {loopItems.map((item, idx) => (
            <TestimonialCard
              key={`${item.id}-${idx}`}
              item={item}
              isDark={idx % 2 === 1}
            />
          ))}
        </div>
      </div>

      {/* Scoped Marquee Keyframes & Direct Hover Pause */}
      <style jsx>{`
        .marquee-track {
          animation: marqueeScroll 34s linear infinite;
          will-change: transform;
        }
        .marquee-wrapper:hover .marquee-track,
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            width: 100%;
            overflow-x: auto;
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Section5;