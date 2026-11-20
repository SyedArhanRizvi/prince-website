"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- Static data ---------- */
const EASE = [0.22, 1, 0.36, 1];

/* TODO: replace with the client's real number (country code, digits only for WhatsApp) */
const PHONE_DISPLAY = "+91 00000 00000";
const PHONE_TEL = "+910000000000";
const WHATSAPP_NUMBER = "910000000000";
const WHATSAPP_TEXT = "Hi, I'd like to talk about an interior project.";

const CHAPTERS = [
  {
    id: "space",
    eyebrow: "The Art of Space",
    lines: ["Room to breathe,", "space to live"],
    text: "A home is not measured by how much it holds, but by how it feels to move through it. Thoughtful spacing lets light travel, gives every piece its own presence and turns a busy room into a calm retreat. Good layout lowers stress, improves flow and makes even a compact home feel generous.",
    points: [
      "Better flow and natural movement",
      "More light and an open feel",
      "A calmer, clutter-free mind",
    ],
    image: {
      src: "/home/s2/dummy1.jpg",
      alt: "Spacious minimal living room with natural light and warm neutral tones",
      caption: "Space with intention",
    },
    flip: false,
  },
  {
    id: "luxury",
    eyebrow: "The Value of Craft",
    lines: ["Luxury that is felt,", "not just seen"],
    text: "Luxury furniture is an investment in comfort and character. Solid frames, fine upholstery and handcrafted detail age gracefully, hold their shape for decades and turn everyday moments into small rituals. One well-made piece can define a whole room and last a lifetime.",
    points: [
      "Premium materials that last decades",
      "Handcrafted detail and lasting comfort",
      "Timeless design that never dates",
    ],
    image: {
      src: "/home/s2/dummy2.jpg",
      alt: "Luxury sofa with fine upholstery and handcrafted detailing",
      caption: "Crafted to last",
    },
    flip: true,
  },
];

/* ---------- Text animation variants ---------- */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

/* Headline lines slide up from behind a mask */
const lineUp = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

/* ---------- Image: GSAP curtain reveal + gentle parallax ---------- */
function StoryImage({ src, alt, caption, className = "" }) {
  const frame = useRef(null);
  const layer = useRef(null);
  const zoom = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: frame.current, start: "top 82%", once: true };

      // Curtain wipe, top to bottom
      gsap.set(frame.current, { clipPath: "inset(0% 0% 100% 0% round 16px)" });
      gsap.to(frame.current, {
        clipPath: "inset(0% 0% 0% 0% round 16px)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: trigger,
      });

      // Photo settles in while the curtain opens
      gsap.fromTo(
        zoom.current,
        { scale: 1.18 },
        { scale: 1, duration: 1.9, ease: "power3.out", scrollTrigger: trigger }
      );

      // Slow parallax tied to scroll
      gsap.fromTo(
        layer.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, frame);

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={frame}
      className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-surface)] sm:aspect-[5/6] lg:aspect-auto lg:min-h-[640px] ${className}`}
    >
      {/* Parallax layer is taller than its frame so edges never show */}
      <div ref={layer} className="absolute -inset-y-[9%] inset-x-0">
        <div ref={zoom} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            quality={80}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-heading)]/35 via-transparent to-transparent"
      />

      <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-background)]/90 px-4 py-2 text-[0.7rem] font-medium tracking-wide text-[var(--color-heading)] backdrop-blur-md sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bronze)]" />
          {caption}
        </span>
      </div>
    </div>
  );
}

/* ---------- Call + WhatsApp buttons ---------- */
function CtaButtons() {
  const base =
    "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bronze)] sm:text-base";

  return (
    <>
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label={`Call us on ${PHONE_DISPLAY}`}
        className={`${base} bg-[var(--color-button)] text-[var(--color-button-text)] hover:bg-[var(--color-button-hover)]`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call us
      </a>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border border-[var(--color-heading)]/25 text-[var(--color-heading)] hover:border-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-[var(--color-button-text)]`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z" />
        </svg>
        WhatsApp us
      </a>
    </>
  );
}

/* ---------- Text panel that overlaps the photo ---------- */
function ChapterPanel({ chapter, className = "" }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative z-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[0_30px_60px_-30px_rgba(51,45,39,0.25)] sm:p-10 lg:p-12 ${className}`}
    >
      <motion.div variants={fade} className="flex items-center gap-4">
        <span className="h-px w-10 bg-[var(--color-bronze)] sm:w-14" />
        <span className="text-xs font-medium tracking-[0.14em] text-[var(--color-bronze)]">
          {chapter.eyebrow}
        </span>
      </motion.div>

      <h2 className="mt-5 text-4xl leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
        {chapter.lines.map((line) => (
          <span key={line} className="block overflow-hidden pb-[0.12em]">
            <motion.span variants={lineUp} className="block">
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.p
        variants={fade}
        className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg"
      >
        {chapter.text}
      </motion.p>

      <motion.ul
        variants={fade}
        className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]"
      >
        {chapter.points.map((point) => (
          <li
            key={point}
            className="flex items-center gap-4 py-3.5 text-sm font-medium text-[var(--color-heading)] sm:text-base"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-bronze)]/50">
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 text-[var(--color-bronze)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 6.5l2.2 2.2L9.5 3.8" />
              </svg>
            </span>
            {point}
          </li>
        ))}
      </motion.ul>

      <motion.div
        variants={fade}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      >
        <CtaButtons />
      </motion.div>
    </motion.div>
  );
}

/* ---------- One chapter = photo + overlapping panel ---------- */
function Chapter({ chapter }) {
  const { flip, image } = chapter;

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 lg:items-center">
      <StoryImage
        {...image}
        className={
          flip
            ? "lg:col-span-7 lg:col-start-6 lg:row-start-1"
            : "lg:col-span-7 lg:col-start-1 lg:row-start-1"
        }
      />

      <ChapterPanel
        chapter={chapter}
        className={`-mt-14 mx-4 sm:-mt-20 sm:mx-8 lg:mx-0 lg:mt-0 lg:row-start-1 lg:col-span-6 ${
          flip ? "lg:col-start-1" : "lg:col-start-7"
        }`}
      />
    </article>
  );
}

/* ---------- Section ---------- */
function Section3() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label="Our design story"
        className="relative w-full overflow-hidden bg-[var(--color-background)] pt-20 sm:pt-28 lg:pt-36"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-24 sm:gap-28 lg:gap-40">
            {CHAPTERS.map((chapter) => (
              <Chapter key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Section3;