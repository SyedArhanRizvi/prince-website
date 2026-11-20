"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

function HeroSection() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--color-heading)] pt-28 pb-16 sm:pt-32 lg:pt-36">
      {/* Background image with slow zoom-in */}
      <motion.div
        initial={{ scale: reduceMotion ? 1 : 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src="/home/s1/hero.jpg"
          alt="Elegant modern living room with warm neutral tones"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlays for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--color-heading)]/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-heading)]/70 via-transparent to-[var(--color-heading)]/40"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center sm:px-8 lg:px-12"
      >
        <motion.span
          variants={fadeUp}
          className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-surface)] sm:text-sm"
        >
          Interior Design Studio
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-[2.5rem] leading-[1.05] tracking-tight !text-[var(--color-background)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Spaces designed to{" "}
          <span className="italic text-[var(--color-surface)]">feel</span> like
          home
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-border)] sm:max-w-2xl sm:text-lg"
        >
          We craft timeless, thoughtfully designed interiors that balance
          elegance, comfort and function, tailored to the way you live.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9">
          <Link href="/contact-us" className="inline-block">
            <motion.span
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-background)] px-8 py-4 text-sm font-medium tracking-wide text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-button-hover)] hover:text-[var(--color-button-text)] sm:text-base"
            >
              Book a Consultation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;