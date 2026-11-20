"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- Types ---------- */
export interface SECTION_DATA {
  eyebrow: string;
  h2_title: string;
  para: string;
  imageSrc: string;
  imageTitleandAlt: string;
  /** Optional: defaults to "Contact now" */
  ctaLabel?: string;
  /** Optional: defaults to "/contact-us" */
  ctaHref?: string;
}

type Section2Props = {
  data?: Partial<SECTION_DATA>;
};

/* ---------- Default (dummy) data, replace with dynamic data ---------- */
const DEFAULT_DATA: SECTION_DATA = {
  eyebrow: "Our workshop",
  h2_title: "Furniture repaired with care, built with purpose",
  para: "Every sofa, recliner and dining chair that reaches our workshop is inspected before any work begins. We repair worn frames, refresh cushions and fabric, and build new pieces to your measurements, so what comes back to you feels comfortable and looks right in your room.",
  imageSrc: "/services/section2.jpg",
  imageTitleandAlt: "Craftsman restoring a sofa frame in the workshop",
  ctaLabel: "Contact now",
  ctaHref: "/contact-us",
};

/* ---------- Animation ---------- */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const lineUp = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

/* ---------- Image: GSAP curtain reveal ---------- */
function SectionImage({ src, alt }: { src: string; alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const zoom = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: frame.current, start: "top 85%", once: true };

      gsap.set(frame.current, { clipPath: "inset(0% 0% 100% 0% round 16px)" });
      gsap.to(frame.current, {
        clipPath: "inset(0% 0% 0% 0% round 16px)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: trigger,
      });
      gsap.fromTo(
        zoom.current,
        { scale: 1.18 },
        { scale: 1, duration: 1.9, ease: "power3.out", scrollTrigger: trigger }
      );
    }, frame);

    return () => mm.revert();
  }, []);

  return (
    <div className="relative mr-3 mb-3 sm:mr-4 sm:mb-4 lg:mr-5 lg:mb-5">
      {/* Offset outline sits behind the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-[var(--color-bronze)]/60 sm:translate-x-4 sm:translate-y-4 lg:translate-x-5 lg:translate-y-5"
      />

      <div
        ref={frame}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-border)] sm:aspect-[5/4] lg:aspect-auto lg:h-[min(calc(100svh-10rem),680px)]"
      >
        <div ref={zoom} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            title={alt}
            fill
            quality={80}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
function Section2({ data }: Section2Props) {
  const content: SECTION_DATA = { ...DEFAULT_DATA, ...data };

  return (
    <MotionConfig reducedMotion="user">
      {/*
        Mobile / tablet: grows with its content.
        lg and up: exactly one screen tall, nothing scrolls.
      */}
      <section
        aria-label={content.eyebrow}
        className="relative flex w-full items-center bg-[var(--color-surface)] py-20 sm:py-24 lg:h-[100svh] lg:min-h-[560px] lg:py-12"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Image */}
            <div className="lg:col-span-6">
              <SectionImage
                src={content.imageSrc}
                alt={content.imageTitleandAlt}
              />
            </div>

            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-5 lg:col-start-8"
            >
              <motion.div variants={fade} className="flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--color-bronze)] sm:w-14" />
                <span className="text-xs font-medium tracking-[0.14em] text-[var(--color-bronze)]">
                  {content.eyebrow}
                </span>
              </motion.div>

              <h2 className="mt-5 text-4xl leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
                <span className="block overflow-hidden pb-[0.12em]">
                  <motion.span variants={lineUp} className="block">
                    {content.h2_title}
                  </motion.span>
                </span>
              </h2>

              <motion.p
                variants={fade}
                className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg"
              >
                {content.para}
              </motion.p>

              <motion.div variants={fade} className="mt-9">
                <Link
                  href={content.ctaHref ?? "/contact-us"}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-button)] px-8 py-3.5 text-sm font-medium text-[var(--color-button-text)] transition-colors duration-300 hover:bg-[var(--color-button-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bronze)] sm:w-auto sm:text-base"
                >
                  {content.ctaLabel ?? "Contact now"}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Section2;