"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";

/* ---------- Types ---------- */
export interface SERVICE_CARD {
  id: string | number;
  title: string;
  para: string;
  imageSrc: string;
  /** Optional: falls back to the card title */
  imageAlt?: string;
  /** Optional small label on the image, e.g. "Repair" */
  tag?: string;
  /** Optional: defaults to "Enquire now" */
  ctaLabel?: string;
  /** Optional: defaults to "/contact-us" */
  ctaHref?: string;
}

export interface SECTION_DATA {
  eyebrow: string;
  h2_title: string;
  para: string;
  cards: SERVICE_CARD[];
}

type Section3Props = {
  data?: Partial<SECTION_DATA>;
};

/* ---------- Default (dummy) data, replace with dynamic data ---------- */
const DEFAULT_DATA: SECTION_DATA = {
  eyebrow: "Sofa repair services",
  h2_title: "Every kind of sofa, restored properly",
  para: "Different sofas fail in different ways. Here are the types we repair most often, each handled by a craftsman who knows its frame, padding and finish.",
  cards: [
    {
      id: 1,
      title: "High Back Sofa Repair",
      para: "Sagging backrests, loose joints and worn padding restored so tall sofas regain their shape and support.",
      imageSrc: "/home/s2/dummy1.jpg",
      tag: "Repair",
    },
    {
      id: 2,
      title: "Carving Sofa Repair",
      para: "Hand-carved wooden frames repaired and polished with a matching finish, so every detail keeps its character.",
      imageSrc: "/home/s2/dummy2.jpg",
      tag: "Repair",
    },
    {
      id: 3,
      title: "Chesterfield Sofa Repair",
      para: "Deep-button tufting, rolled arms and upholstery refreshed with careful hand finishing.",
      imageSrc: "/home/s2/dummy3.jpg",
      tag: "Repair",
    },
    {
      id: 4,
      title: "L-Shape Sofa Repair",
      para: "Corner joints, frames and cushions strengthened so large sectional sofas feel solid again.",
      imageSrc: "/home/s2/dummy4.jpg",
      tag: "Repair",
    },
    {
      id: 5,
      title: "Cushion & Fabric Replacement",
      para: "Fresh high-density foam and upholstery fabric, chosen to match your room and your daily use.",
      imageSrc: "/home/s2/dummy1.jpg",
      tag: "Refresh",
    },
    {
      id: 6,
      title: "Leather Sofa Repair",
      para: "Cracks, scuffs and worn seats treated and re-coloured for a smooth, even finish.",
      imageSrc: "/home/s2/dummy2.jpg",
      tag: "Repair",
    },
  ],
};

/* ---------- Animation ---------- */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const lineUp = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

const cardIn = {
  hidden: { opacity: 0, y: 48, clipPath: "inset(0% 0% 12% 0% round 28px)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    transition: { duration: 1.1, ease: EASE },
  },
};

const photoIn = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
};

/* ---------- Icons ---------- */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-[18px] w-[18px] transition-transform duration-500 group-hover:-rotate-45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5" />
    </svg>
  );
}

/* ---------- Card ---------- */
function ServiceCard({ card }: { card: SERVICE_CARD }) {
  return (
    /* Plain wrapper carries the staggered offset so it never fights the animation */
    <div className="sm:max-lg:[&:nth-child(even)]:mt-10 lg:[&:nth-child(3n+2)]:mt-14">
      <motion.article
        variants={cardIn}
        className="group relative isolate aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[var(--color-surface)] sm:aspect-[3/4]"
      >
        {/* Photo */}
        <motion.div variants={photoIn} className="absolute inset-0 -z-10">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt ?? card.title}
            fill
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
          />
        </motion.div>

        {/* Shading for readable text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-heading)]/95 via-[var(--color-heading)]/45 to-[var(--color-heading)]/5"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--color-heading)]/35 to-transparent"
        />

        {/* Thin inner frame that tightens on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-[var(--color-background)]/20 transition-all duration-700 group-hover:inset-2.5 group-hover:border-[var(--color-background)]/55"
        />

        {/* Tag */}
        {card.tag && (
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-background)]/90 px-3.5 py-1.5 text-[0.7rem] font-medium tracking-wide text-[var(--color-heading)] backdrop-blur-md sm:left-6 sm:top-6 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bronze)]" />
            {card.tag}
          </span>
        )}

        {/* Arrow button */}
        <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-background)]/35 bg-[var(--color-background)]/10 text-[var(--color-background)] backdrop-blur-md transition-colors duration-500 group-hover:border-[var(--color-background)] group-hover:bg-[var(--color-background)] group-hover:text-[var(--color-heading)] sm:right-6 sm:top-6">
          <ArrowIcon />
        </span>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <h3 className="text-2xl leading-[1.15] tracking-tight !text-[var(--color-background)]">
            {card.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-background)]/80">
            {card.para}
          </p>

          {/* Stretched link makes the whole card clickable */}
          <Link
            href={card.ctaHref ?? "/contact-us"}
            className="mt-5 inline-flex text-sm font-medium text-[var(--color-background)] after:absolute after:inset-0 after:rounded-[1.75rem] after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[var(--color-bronze)]"
          >
            <span className="relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-8 after:bg-[var(--color-background)] after:transition-all after:duration-500 group-hover:after:w-full">
              {card.ctaLabel ?? "Enquire now"}
            </span>
          </Link>
        </div>
      </motion.article>
    </div>
  );
}

/* ---------- Section ---------- */
function Section3({ data }: Section3Props) {
  const content: SECTION_DATA = { ...DEFAULT_DATA, ...data };

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label={content.eyebrow}
        className="relative w-full bg-[var(--color-background)] py-20 sm:py-28 lg:pb-40 lg:pt-32"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <motion.div
            variants={headerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10"
          >
            <div className="lg:col-span-7">
              <motion.div variants={fade} className="flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--color-bronze)] sm:w-14" />
                <span className="text-xs font-medium tracking-[0.14em] text-[var(--color-bronze)]">
                  {content.eyebrow}
                </span>
              </motion.div>

              <h2 className="mt-5 max-w-2xl text-4xl leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
                <span className="block overflow-hidden pb-[0.12em]">
                  <motion.span variants={lineUp} className="block">
                    {content.h2_title}
                  </motion.span>
                </span>
              </h2>
            </div>

            <motion.p
              variants={fade}
              className="max-w-xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg lg:col-span-5 lg:justify-self-end"
            >
              {content.para}
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.14 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:items-start lg:gap-7"
          >
            {content.cards.map((card) => (
              <ServiceCard key={card.id} card={card} />
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Section3;