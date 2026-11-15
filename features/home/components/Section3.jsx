"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

/* ---------- Static data (outside the component, so nothing is recreated on render) ---------- */
const EASE = [0.22, 1, 0.36, 1];

const CHAPTERS = {
  space: {
    number: "01",
    eyebrow: "The Art of Space",
    title: (
      <>
        Room to <span className="italic text-[var(--color-bronze)]">breathe</span>,
        space to live
      </>
    ),
    text: "A home is not measured by how much it holds, but by how it feels to move through it. Thoughtful spacing lets light travel, gives every piece its own presence and turns a busy room into a calm retreat. Good layout lowers stress, improves flow and makes even a compact home feel generous.",
    points: [
      "Better flow and natural movement",
      "More light and an open feel",
      "A calmer, clutter-free mind",
    ],
  },
  luxury: {
    number: "02",
    eyebrow: "The Value of Craft",
    title: (
      <>
        Luxury that is{" "}
        <span className="italic text-[var(--color-bronze)]">felt</span>, not just
        seen
      </>
    ),
    text: "Luxury furniture is an investment in comfort and character. Solid frames, fine upholstery and handcrafted detail age gracefully, hold their shape for decades and turn everyday moments into small rituals. One well-made piece can define a whole room and last a lifetime.",
    points: [
      "Premium materials that last decades",
      "Handcrafted detail and lasting comfort",
      "Timeless design that never dates",
    ],
  },
};

/* ---------- Animation variants ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const viewport = { once: true, amount: 0.25 };

/* ---------- Text block (heading + paragraph) ---------- */
function Chapter({ data, className = "" }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`relative flex flex-col justify-center ${className}`}
    >
      {/* Big faded chapter number */}
      <motion.span
        aria-hidden="true"
        variants={rise}
        className="pointer-events-none absolute -top-6 right-0 select-none font-[family-name:var(--font-heading)] text-[7rem] font-medium leading-none text-[var(--color-border)]/70 sm:-top-10 sm:text-[9rem] lg:text-[11rem]"
      >
        {data.number}
      </motion.span>

      <motion.div variants={rise} className="relative flex items-center gap-4">
        <span className="h-px w-10 bg-[var(--color-bronze)] sm:w-14" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]">
          {data.eyebrow}
        </span>
      </motion.div>

      <motion.h2
        variants={rise}
        className="relative mt-5 text-4xl leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl"
      >
        {data.title}
      </motion.h2>

      <motion.p
        variants={rise}
        className="relative mt-5 max-w-xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg"
      >
        {data.text}
      </motion.p>

      <motion.ul variants={rise} className="relative mt-7 flex flex-col gap-3">
        {data.points.map((p) => (
          <li
            key={p}
            className="flex items-center gap-3 text-sm font-medium text-[var(--color-heading)] sm:text-base"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-bronze)]" />
            {p}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

/* ---------- Image with reveal + parallax (no state, no re-renders) ---------- */
function StoryImage({ src, alt, shape, caption, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: "inset(12% 8% 12% 8% round 40px)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.3, ease: EASE }}
      className={`group relative overflow-hidden bg-[var(--color-surface)] ${shape} ${className}`}
    >
      {/* Parallax layer is taller than its frame so edges never show */}
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          quality={80}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-heading)]/30 via-transparent to-transparent"
      />

      {caption && (
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-background)]/85 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--color-heading)] backdrop-blur-md sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bronze)]" />
            {caption}
          </span>
        </div>
      )}
    </motion.div>
  );
}

/* ---------- Section ---------- */
function Section3() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label="Our design story"
        className="relative w-full overflow-hidden bg-[var(--color-surface)]/50 py-20 sm:py-28 lg:py-36"
      >
        {/* Soft decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-[var(--color-bronze)]/10 blur-3xl sm:h-[28rem] sm:w-[28rem]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          {/*
            Desktop (2 x 2):
              left  top: text 1   | right top: image 2
              left  bot: image 1  | right bot: text 2
            Mobile order: text 1, image 1, text 2, image 2
          */}
          <div className="grid grid-cols-1 gap-y-12 sm:gap-y-16 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-24 xl:gap-x-28">
            {/* LEFT TOP: heading + paragraph */}
            <Chapter
              data={CHAPTERS.space}
              className="lg:col-start-1 lg:row-start-1"
            />

            {/* LEFT BOTTOM: image */}
            <StoryImage
              src="/home/s2/dummy1.jpg"
              alt="Spacious minimal living room with natural light and warm neutral tones"
              caption="Space with intention"
              shape="aspect-[4/5] rounded-t-[999px] rounded-b-3xl sm:aspect-[5/6] lg:col-start-1 lg:row-start-2 lg:aspect-auto lg:min-h-[560px]"
            />

            {/* RIGHT TOP: image (shown after chapter 2 text on mobile) */}
            <StoryImage
              src="/home/s2/dummy2.jpg"
              alt="Luxury sofa with fine upholstery and handcrafted detailing"
              caption="Crafted to last"
              shape="order-4 aspect-[4/5] rounded-3xl rounded-bl-[999px] sm:aspect-[5/6] lg:order-none lg:col-start-2 lg:row-start-1 lg:aspect-auto lg:min-h-[560px]"
            />

            {/* RIGHT BOTTOM: heading + paragraph */}
            <Chapter
              data={CHAPTERS.luxury}
              className="order-3 lg:order-none lg:col-start-2 lg:row-start-2"
            />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Section3;