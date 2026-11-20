"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight, FiPhone, FiTool } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------- Static data (outside the component, so nothing is recreated on render) ---------- */
// Replace with your real details
const PHONE_HREF = "tel:+919876543210";
const WHATSAPP_HREF =
  "https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20choosing%20a%20service.";

const pad = (n) => String(n).padStart(2, "0");

/* span = card width on desktop (12 columns), img = image height. Full class strings on purpose. */
const CATEGORIES = [
  {
    title: "Sofa",
    desc: "Fresh new sofas or full restoration of your old one.",
    image: "/photo-gallery/gallery_image2.jpeg",
    alt: "Sofa from our completed work",
    newLabel: "New Sofa",
    newHref: "/new-sofa",
    repairLabel: "Sofa Repair",
    repairHref: "/sofa-repair",
    span: "lg:col-span-7",
    img: "h-60 sm:h-64 lg:h-80",
    theme: "cream",
  },
  {
    title: "Sofa Cum Bed",
    desc: "Two-in-one comfort, built new or repaired.",
    image: "/photo-gallery/gallery_image6.jpeg",
    alt: "Sofa cum bed from our completed work",
    newLabel: "New Sofa Cum Bed",
    newHref: "/new-sofa-cum-bed",
    repairLabel: "Sofa Cum Bed Repair",
    repairHref: "/sofa-cum-bed-repair",
    span: "lg:col-span-5",
    img: "h-60 sm:h-64 lg:h-80",
    theme: "light",
  },
  {
    title: "Bed",
    desc: "Frames, headboards and bases, made or mended.",
    image: "/photo-gallery/gallery_image10.jpeg",
    alt: "Bed from our completed work",
    newLabel: "New Bed",
    newHref: "/new-bed",
    repairLabel: "Bed Repair",
    repairHref: "/bed-repair",
    span: "lg:col-span-4",
    img: "h-60 sm:h-64 lg:h-60",
    theme: "light",
  },
  {
    title: "Highback Chair",
    desc: "Statement chairs made new or restored to their best.",
    image: "/photo-gallery/gallery_image14.jpeg",
    alt: "Highback chair from our completed work",
    newLabel: "New Highback Chair",
    newHref: "/new-highback-chair",
    repairLabel: "Highback Chair Repair",
    repairHref: "/highback-chair-repair",
    span: "lg:col-span-4",
    img: "h-60 sm:h-64 lg:h-60",
    theme: "olive",
  },
  {
    title: "Dining Chair",
    desc: "Matching sets built to order, or steady, polished repairs.",
    image: "/photo-gallery/gallery_image20.jpeg",
    alt: "Dining chairs from our completed work",
    newLabel: "New Dining Chair",
    newHref: "/new-dining-chair",
    repairLabel: "Dining Chair Repair",
    repairHref: "/dining-chair-repair",
    span: "sm:col-span-2 lg:col-span-4",
    img: "h-60 sm:h-72 lg:h-60",
    theme: "cream",
  },
];

/* ---------- Card themes: your colours and your button styles ---------- */
const THEMES = {
  cream: {
    wrapper: "bg-[var(--color-background)]",
    heading: "",
    text: "text-[var(--color-paragraph)]",
    primary: "bg-[var(--color-button)] text-[var(--color-button-text)] hover:bg-[var(--color-button-hover)]",
    secondary:
      "border-[var(--color-heading)]/25 text-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-[var(--color-background)]",
  },
  light: {
    wrapper: "bg-[#FAF8F4]",
    heading: "",
    text: "text-[var(--color-paragraph)]",
    primary: "bg-[var(--color-button)] text-[var(--color-button-text)] hover:bg-[var(--color-button-hover)]",
    secondary:
      "border-[var(--color-heading)]/25 text-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-[var(--color-background)]",
  },
  olive: {
    wrapper: "bg-[var(--color-olive)]",
    heading: "!text-[var(--color-background)]",
    text: "text-[var(--color-background)]/90",
    primary:
      "bg-[var(--color-background)] text-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-[var(--color-background)]",
    secondary:
      "border-white/30 text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-heading)]",
  },
};

/* ---------- Category card ---------- */
function CategoryCard({ cat, index }) {
  const t = THEMES[cat.theme];

  return (
    <li
      className={`reveal group flex flex-col rounded-[1.75rem] p-3 shadow-[0_18px_40px_-28px_rgba(51,45,39,0.35)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(51,45,39,0.45)] sm:rounded-[2rem] ${cat.span} ${t.wrapper}`}
    >
      {/* Image: inset with its own rounded corners, no overlay, so the photo stays clear */}
      <div className={`relative w-full overflow-hidden rounded-[1.25rem] sm:rounded-3xl ${cat.img}`}>
        <Image
          src={cat.image}
          alt={cat.alt}
          fill
          quality={85}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 700px"
          className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--color-background)] px-3 py-1 font-[family-name:var(--font-heading)] text-base tabular-nums text-[var(--color-heading)] shadow-sm">
          {pad(index + 1)}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-[var(--color-background)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-heading)] shadow-sm">
          New &amp; Repair
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
        <h3 className={`text-2xl leading-tight tracking-tight sm:text-[1.75rem] ${t.heading}`}>
          {cat.title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${t.text}`}>{cat.desc}</p>

        {/* Your button style, two equal columns, pinned to the bottom so they line up */}
        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
          <Link
            href={cat.newHref}
            aria-label={cat.newLabel}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium transition-colors duration-300 sm:text-sm ${t.primary}`}
          >
            New
            <FiArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href={cat.repairHref}
            aria-label={cat.repairLabel}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-medium transition-colors duration-300 sm:text-sm ${t.secondary}`}
          >
            <FiTool aria-hidden="true" className="h-3.5 w-3.5" />
            Repair
          </Link>
        </div>
      </div>
    </li>
  );
}

/* ---------- Section ---------- */
function Navigation() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".head-item", {
          y: 24,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".head", start: "top 85%", once: true },
        });

        const items = gsap.utils.toArray(".reveal");
        gsap.set(items, { y: 40, autoAlpha: 0 });

        ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform,opacity,visibility",
            }),
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="quick-links-heading"
      // Light-dark: a mid sand tone between --color-surface and --color-border
      className="relative w-full overflow-hidden bg-[color-mix(in_srgb,var(--color-surface),var(--color-border))] py-16 sm:py-24 lg:py-28"
    >
      {/* Soft decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[var(--color-bronze)]/15 blur-3xl sm:h-[26rem] sm:w-[26rem]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ---------- Heading ---------- */}
        <div className="head flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="head-item inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]">
              <span className="h-px w-8 bg-[var(--color-bronze)]" />
              Our Services
            </span>
            <h2
              id="quick-links-heading"
              className="head-item mt-4 text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Liked our work? <span className="italic text-[var(--color-bronze)]">Explore</span> what we offer
            </h2>
          </div>
          <p className="head-item max-w-sm text-base leading-relaxed text-[var(--color-paragraph)] lg:text-right">
            Pick a category, then choose a brand new piece or a repair.
          </p>
        </div>

        {/* ---------- Quick links ---------- */}
        <nav aria-label="Service quick links" className="mt-10 sm:mt-14">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.title} cat={cat} index={i} />
            ))}

            {/* Help banner: solid bronze, full width, closes the grid */}
            <li className="reveal rounded-[1.75rem] bg-[var(--color-bronze)] p-6 sm:col-span-2 sm:rounded-[2rem] sm:p-8 lg:col-span-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-8">
              <div className="max-w-2xl">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[var(--color-background)]/80">
                  Need help choosing?
                </span>
                <h3 className="mt-2 text-3xl leading-[1.1] tracking-tight !text-[var(--color-background)] sm:text-4xl">
                  Not sure whether to <span className="italic text-[#F4E3C8]">repair</span> or build new?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-background)]/90 sm:text-base">
                  Send us a photo or call us. We&rsquo;ll tell you honestly which option makes more sense.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-0 lg:shrink-0">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-background)] px-6 py-3 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-heading)] hover:text-[var(--color-background)] sm:text-sm"
                >
                  <FiPhone aria-hidden="true" className="h-4 w-4" />
                  Call Us
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-xs font-medium text-[var(--color-background)] transition-colors duration-300 hover:bg-[var(--color-background)] hover:text-[var(--color-heading)] sm:text-sm"
                >
                  <FaWhatsapp aria-hidden="true" className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Navigation;