"use client";

import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { FiArrowUpRight, FiHome } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function NotFound() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[var(--color-background)] px-5 pb-16 pt-28 sm:px-8">
        {/* Soft decorative glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-[var(--color-bronze)]/10 blur-3xl sm:h-[26rem] sm:w-[26rem]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[var(--color-surface)] blur-3xl sm:h-[26rem] sm:w-[26rem]"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex max-w-2xl flex-col items-center text-center"
        >
          {/* Big decorative 404 (hidden from screen readers, the h1 explains the page) */}
          <motion.span
            aria-hidden="true"
            variants={rise}
            className="select-none font-[family-name:var(--font-heading)] text-[7.5rem] font-medium leading-none tracking-tight text-[var(--color-surface)] [text-shadow:0_0_0_var(--color-border)] sm:text-[11rem] lg:text-[14rem]"
            style={{ WebkitTextStroke: "1.5px var(--color-border)" }}
          >
            4<span className="italic text-[var(--color-bronze)] [-webkit-text-stroke:0]">0</span>4
          </motion.span>

          <motion.span
            variants={rise}
            className="-mt-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)] sm:-mt-8"
          >
            <span className="h-px w-8 bg-[var(--color-bronze)]" />
            Page not found
            <span className="h-px w-8 bg-[var(--color-bronze)]" />
          </motion.span>

          <motion.h1
            variants={rise}
            className="mt-4 text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Looks like this piece is{" "}
            <span className="italic text-[var(--color-bronze)]">missing</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg"
          >
            The page you are looking for may have moved or no longer exists. Go back home, or contact us and
            we will help you find what you need.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-button)] px-6 py-3.5 text-xs font-medium text-[var(--color-button-text)] transition-colors duration-300 hover:bg-[var(--color-button-hover)] sm:text-sm"
            >
              <FiHome aria-hidden="true" className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-heading)]/25 px-6 py-3.5 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-heading)] hover:text-[var(--color-background)] sm:text-sm"
            >
              Contact Us
              <FiArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </MotionConfig>
  );
}