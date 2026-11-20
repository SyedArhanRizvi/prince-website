"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- Types ---------- */
export interface MATERIAL {
  id: string | number;
  title: string;
  para: string;
  imageSrc: string;
  /** Optional: falls back to the material title */
  imageAlt?: string;
  /** Optional short points shown as chips */
  highlights?: string[];
}

export interface GUARANTEE {
  value: string; // e.g. "5"
  unit: string; // e.g. "Years"
  label: string; // e.g. "Guarantee"
  note: string;
}

export interface SECTION_DATA {
  eyebrow: string;
  h2_title: string;
  para: string;
  materials: MATERIAL[];
  guarantee: GUARANTEE;
  /** Optional: defaults to "Contact now" */
  ctaLabel?: string;
  /** Optional: defaults to "/contact-us" */
  ctaHref?: string;
}

type Section4Props = {
  data?: Partial<SECTION_DATA>;
};

/* ---------- Default (dummy) data, replace with dynamic data ---------- */
const DEFAULT_DATA: SECTION_DATA = {
  eyebrow: "Materials and guarantee",
  h2_title: "Built from materials chosen to last",
  para: "A good sofa is only as good as what is inside it. We select every fabric, foam and timber for strength and comfort, and we stand behind the result.",
  materials: [
    {
      id: "fabric",
      title: "Fabric",
      para: "Hard-wearing upholstery in a wide range of textures and colours, chosen to resist fading, wear and everyday spills.",
      imageSrc: "/home/s2/dummy1.jpg",
      highlights: ["Colour-fast", "Easy to clean", "Many textures"],
    },
    {
      id: "foam",
      title: "Foam",
      para: "High-density foam cut to your sofa's shape, so seats stay supportive and cushions hold their form year after year.",
      imageSrc: "/home/s2/dummy2.jpg",
      highlights: ["Holds its shape", "Firm or soft feel", "Lasting comfort"],
    },
    {
      id: "wood",
      title: "Wood",
      para: "Seasoned solid timber for frames and legs, joined carefully and finished smooth for a structure you can trust.",
      imageSrc: "/home/s2/dummy3.jpg",
      highlights: ["Strong joints", "Smooth finish", "Built for decades"],
    },
  ],
  guarantee: {
    value: "5",
    unit: "Years",
    label: "Guarantee",
    note: "Every repair and every new piece comes with a written 5 year guarantee.",
  },
  ctaLabel: "Contact now",
  ctaHref: "/contact-us",
};

/* ---------- Animation ---------- */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
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

const rowIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/* ---------- Guarantee seal ---------- */
function Seal({
  guarantee,
  className = "",
}: {
  guarantee: GUARANTEE;
  className?: string;
}) {
  const pathId = useId().replace(/:/g, "");
  const label = guarantee.label.toUpperCase();
  const ring = `${label} • ${label} • `;

  return (
    <div
      className={`relative shrink-0 rounded-full bg-[var(--color-background)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full motion-safe:animate-[spin_40s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
          />
        </defs>
        <text
          className="fill-[var(--color-bronze)]"
          fontSize="8"
          fontWeight="500"
        >
          <textPath
            href={`#${pathId}`}
            textLength="292"
            lengthAdjust="spacing"
          >
            {ring}
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-[var(--color-bronze)]/40">
        <span className="font-[family-name:var(--font-heading)] text-4xl font-medium leading-none text-[var(--color-heading)] md:text-3xl lg:text-4xl">
          {guarantee.value}
        </span>
        <span className="mt-1 text-[0.65rem] font-medium tracking-wide text-[var(--color-paragraph)] sm:text-xs">
          {guarantee.unit}
        </span>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
function Section4({ data }: Section4Props) {
  const content: SECTION_DATA = { ...DEFAULT_DATA, ...data };
  const [activeId, setActiveId] = useState<string | number>(
    content.materials[0]?.id ?? ""
  );
  const active =
    content.materials.find((m) => m.id === activeId) ?? content.materials[0];

  /* GSAP curtain reveal for the big image frame (md and up) */
  const frame = useRef<HTMLDivElement>(null);
  const zoom = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!frame.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: frame.current, start: "top 90%", once: true };

      gsap.set(frame.current, { clipPath: "inset(0% 0% 100% 0% round 24px)" });
      gsap.to(frame.current, {
        clipPath: "inset(0% 0% 0% 0% round 24px)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: trigger,
      });
      gsap.fromTo(
        zoom.current,
        { scale: 1.16 },
        { scale: 1, duration: 1.9, ease: "power3.out", scrollTrigger: trigger }
      );
    }, frame);

    return () => mm.revert();
  }, []);

  const ctaHref = content.ctaHref ?? "/contact-us";

  return (
    <MotionConfig reducedMotion="user">
      {/*
        Below md: grows with its content (accordion layout, user scrolls).
        md and up: exactly one screen tall, nothing scrolls.
        Heights use svh so the layout adapts to short laptop screens.
      */}
      <section
        aria-label={content.eyebrow}
        className="relative flex w-full items-center bg-[var(--color-heading)] py-20 sm:py-28 md:min-h-[100svh] md:py-0"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:py-[clamp(1.5rem,5svh,3.5rem)] lg:px-12">
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-10 md:gap-y-[clamp(1.25rem,4svh,2rem)] lg:gap-x-14 xl:gap-x-20">
            {/* ---------- Title ---------- */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="md:col-span-7 md:self-end"
            >
              <motion.div variants={fade} className="flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--color-bronze)] sm:w-14" />
                <span className="text-xs font-medium tracking-[0.14em] text-[var(--color-background)]/70">
                  {content.eyebrow}
                </span>
              </motion.div>

              <h2 className="mt-5 text-4xl leading-[1.08] tracking-tight !text-[var(--color-background)] sm:text-5xl md:text-4xl lg:text-5xl 2xl:text-6xl">
                <span className="block overflow-hidden pb-[0.12em]">
                  <motion.span variants={lineUp} className="block">
                    {content.h2_title}
                  </motion.span>
                </span>
              </h2>
            </motion.div>

            {/* ---------- Intro paragraph ---------- */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { duration: 0.9, ease: EASE, delay: 0.25 },
              }}
              viewport={{ once: true, amount: 0.4 }}
              className="max-w-xl text-base leading-relaxed text-[var(--color-background)]/75 sm:text-lg md:col-span-5 md:self-end md:text-sm lg:text-base"
            >
              {content.para}
            </motion.p>

            {/* ---------- Materials list + guarantee + CTA ---------- */}
            <div className="md:col-span-6 md:flex md:h-[min(58svh,500px)] md:flex-col md:justify-between lg:col-span-5">
              <motion.ul
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="border-b border-[var(--color-background)]/15"
              >
                {content.materials.map((m) => {
                  const isActive = m.id === active?.id;
                  const panelId = `material-${m.id}`;
                  return (
                    <motion.li
                      key={m.id}
                      variants={rowIn}
                      className="border-t border-[var(--color-background)]/15"
                    >
                      <button
                        type="button"
                        aria-expanded={isActive}
                        aria-controls={panelId}
                        onClick={() => setActiveId(m.id)}
                        onMouseEnter={() => setActiveId(m.id)}
                        className="group flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bronze)] sm:py-6 md:py-3.5"
                      >
                        <span
                          className={`font-[family-name:var(--font-heading)] text-2xl font-medium transition-colors duration-500 sm:text-[1.75rem] md:text-2xl lg:text-[1.75rem] ${
                            isActive
                              ? "text-[var(--color-background)]"
                              : "text-[var(--color-background)]/55 group-hover:text-[var(--color-background)]/80"
                          }`}
                        >
                          {m.title}
                        </span>

                        <span
                          aria-hidden="true"
                          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 md:h-9 md:w-9 ${
                            isActive
                              ? "border-[var(--color-bronze)] text-[var(--color-bronze)]"
                              : "border-[var(--color-background)]/25 text-[var(--color-background)]/60"
                          }`}
                        >
                          <span className="absolute h-px w-3.5 bg-current" />
                          <span
                            className={`absolute h-3.5 w-px bg-current transition-transform duration-500 ${
                              isActive ? "scale-y-0" : "scale-y-100"
                            }`}
                          />
                        </span>
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-label={m.title}
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-6 sm:pr-14 md:pb-4 md:pr-10">
                            <p className="text-sm leading-relaxed text-[var(--color-background)]/75 sm:text-base md:text-sm lg:text-base">
                              {m.para}
                            </p>

                            {/* Below md: image and chips live inside the row */}
                            <div className="md:hidden">
                              <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--color-surface)]">
                                <Image
                                  src={m.imageSrc}
                                  alt={m.imageAlt ?? m.title}
                                  fill
                                  quality={80}
                                  sizes="(max-width: 768px) 100vw, 0px"
                                  className="object-cover"
                                />
                              </div>
                              {m.highlights && m.highlights.length > 0 && (
                                <ul className="mt-4 flex flex-wrap gap-2">
                                  {m.highlights.map((h) => (
                                    <li
                                      key={h}
                                      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-background)]/25 px-3 py-1.5 text-xs font-medium text-[var(--color-background)]"
                                    >
                                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bronze)]" />
                                      {h}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Guarantee note + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: EASE },
                }}
                viewport={{ once: true, amount: 0.5 }}
                className="mt-8 flex flex-col gap-5 md:mt-4 md:gap-4"
              >
                <div className="flex items-center gap-5">
                  {/* Seal appears here on small screens only */}
                  <Seal
                    guarantee={content.guarantee}
                    className="h-28 w-28 md:hidden"
                  />
                  <p className="max-w-sm text-sm leading-relaxed text-[var(--color-background)]/75 sm:text-base md:text-sm [@media(min-width:768px)_and_(max-height:720px)]:hidden">
                    {content.guarantee.note}
                  </p>
                </div>

                <Link
                  href={ctaHref}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-background)] px-8 py-3.5 text-sm font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-bronze)] hover:text-[var(--color-button-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bronze)] sm:w-fit sm:text-base md:py-3"
                >
                  {content.ctaLabel ?? "Contact now"}
                </Link>
              </motion.div>
            </div>

            {/* ---------- Big image (md and up) ---------- */}
            <div className="relative hidden md:col-span-6 md:block md:h-[min(58svh,500px)] lg:col-span-7">
              <div
                ref={frame}
                className="relative h-full overflow-hidden rounded-3xl bg-[var(--color-surface)]"
              >
                <div ref={zoom} className="absolute inset-0">
                  {content.materials.map((m) => {
                    const isActive = m.id === active?.id;
                    return (
                      <motion.div
                        key={m.id}
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 1.07,
                        }}
                        transition={{ duration: 1, ease: EASE }}
                        aria-hidden={!isActive}
                        className="absolute inset-0"
                      >
                        <Image
                          src={m.imageSrc}
                          alt={m.imageAlt ?? m.title}
                          fill
                          quality={80}
                          sizes="(max-width: 1024px) 50vw, 700px"
                          className="object-cover"
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-heading)]/45 via-transparent to-transparent"
                />

                {/* Caption card follows the active material */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-sm">
                  <AnimatePresence mode="wait">
                    {active && (
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: EASE },
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="rounded-2xl bg-[var(--color-background)]/92 p-4 backdrop-blur-md lg:p-5"
                      >
                        <p className="font-[family-name:var(--font-heading)] text-xl font-medium text-[var(--color-heading)] lg:text-2xl">
                          {active.title}
                        </p>
                        {active.highlights && active.highlights.length > 0 && (
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {active.highlights.map((h) => (
                              <li
                                key={h}
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-heading)]"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bronze)]" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Guarantee seal overlaps the top left corner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: { duration: 1, ease: EASE, delay: 0.5 },
                }}
                viewport={{ once: true, amount: 0.5 }}
                className="absolute -left-8 top-6 z-10 lg:-left-10"
              >
                <Seal
                  guarantee={content.guarantee}
                  className="h-28 w-28 lg:h-36 lg:w-36"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Section4;