"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight, FiClock, FiShield, FiTool, FiCheckCircle } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* If you have a fixed navbar, set this to its height in px so cards pin below it */
const PIN_OFFSET = 0;

/* ---------- Data ----------
   Each card = full viewport width + full viewport height (from 768px up).
   Image side alternates automatically: even index = image LEFT, odd = image RIGHT.
   Only the CONTENT panel gets the theme background. The image side has no background.

   imgW      = image width from 768px (content panel takes the rest)
   edge      = [when image is left, when image is right]
               content panel overlap + rounded inner edge (unique per card)
   pad       = content padding
   titleSize = heading size
   meta      = "rows" | "cols"
   (Full class strings on purpose, Tailwind can't read dynamic class names)
*/
const SERVICES = [
  {
    id: "sofa-repair",
    eyebrow: "Repair & Restoration",
    title: ["Give your sofa a", "second", "life"],
    text: "Sagging cushions, worn upholstery and tired frames don't mean replacement. We strip it back, rebuild the structure and high-resilience foam, and re-dress it in fresh fabric or leather.",
    tags: ["Frame repair", "Foam & spring rebuild", "Re-upholstery"],
    turnaround: "5–7 Days",
    warranty: "5-Yr Frame Warranty",
    materials: "Kiln-dried hardwood & HR foam",
    image: "/home/s2/dummy1.jpg",
    alt: "Craftsman restoring a sofa with fresh upholstery",
    href: "/services/sofa-repair",
    imgW: "md:w-[55%]",
    edge: ["md:-ml-12 md:rounded-l-[3rem]", "md:-mr-12 md:rounded-r-[3rem]"],
    pad: "px-6 py-10 sm:px-10 md:px-12 lg:px-20",
    titleSize: "text-3xl sm:text-4xl lg:text-6xl",
    meta: "rows",
    theme: "surface",
  },
  {
    id: "new-sofa",
    eyebrow: "Custom Furniture",
    title: ["A new sofa, made", "exactly", "for you"],
    text: "Built to your room and measurements. Choose frame depth, cushioning, and upholstery handcrafted with solid kiln-dried wood.",
    tags: ["Made to measure", "Solid wood frame"],
    turnaround: "14–21 Days",
    warranty: "10-Yr Craftsmanship",
    materials: "Solid oak/beech & feather down",
    image: "/home/s2/dummy2.jpg",
    alt: "Handcrafted luxury sofa in a warm neutral living room",
    href: "/services/new-sofa",
    imgW: "md:w-[42%]",
    edge: ["md:-ml-6 md:rounded-l-[1.5rem]", "md:-mr-6 md:rounded-r-[1.5rem]"],
    pad: "px-6 py-10 sm:px-10 md:px-12 lg:px-24",
    titleSize: "text-3xl sm:text-4xl lg:text-5xl",
    meta: "cols",
    theme: "dark",
  },
  {
    id: "recliner-repair",
    eyebrow: "Repair & Restoration",
    title: ["Smooth recline,", "restored", "comfort"],
    text: "Stuck footrests, noisy tracks, or failed motors diagnosed and replaced with OEM-grade actuators and fresh cushion refills.",
    tags: ["Mechanism repair", "Motor replacement"],
    turnaround: "3–5 Days",
    warranty: "2-Yr Motor Warranty",
    materials: "OEM actuators & heavy steel springs",
    image: "/home/s2/dummy3.jpg",
    alt: "Recliner chair being repaired in the workshop",
    href: "/services/recliner-repair",
    imgW: "md:w-[50%]",
    edge: ["md:-ml-16 md:rounded-l-[5rem]", "md:-mr-16 md:rounded-r-[5rem]"],
    pad: "px-6 py-10 sm:px-10 md:px-14 lg:px-24",
    titleSize: "text-3xl sm:text-4xl lg:text-6xl",
    meta: "rows",
    theme: "light",
  },
  {
    id: "new-recliner",
    eyebrow: "Custom Furniture",
    title: ["The recliner you", "deserve", "to come home to"],
    text: "Deep seats and whisper-smooth recline in manual, power, or rocking styles, wrapped in plush fabrics or Italian top-grain leather.",
    tags: ["Manual & power", "German tracks", "Top-grain leather"],
    turnaround: "10–14 Days",
    warranty: "5-Yr Mechanism",
    materials: "German steel tracks & Italian leather",
    image: "/home/s2/dummy4.jpg",
    alt: "Plush modern recliner beside a window",
    href: "/services/new-recliner",
    imgW: "md:w-[60%]",
    edge: ["", ""],
    pad: "px-6 py-10 sm:px-10 md:px-10 lg:px-16",
    titleSize: "text-3xl sm:text-4xl lg:text-[2.75rem]",
    meta: "cols",
    theme: "surface",
  },
  {
    id: "dining-chair-repair",
    eyebrow: "Repair & Restoration",
    title: ["Dining chairs,", "steady", "again"],
    text: "We re-glue loose mortise joints, weave fresh natural cane, replace seat pads, and refinish timber so your dining set sits solid.",
    tags: ["Joint reinforcement", "Cane weaving", "Wood refinish"],
    turnaround: "4–6 Days",
    warranty: "3-Yr Joint Stability",
    materials: "Epoxy-reinforced joinery & natural cane",
    image: "/home/s2/dummy1.jpg",
    alt: "Restored wooden dining chairs around a table",
    href: "/services/dining-chair-repair",
    imgW: "md:w-[40%]",
    edge: ["md:-ml-20 md:rounded-l-[7rem]", "md:-mr-20 md:rounded-r-[7rem]"],
    pad: "px-6 py-10 sm:px-10 md:px-16 lg:px-28",
    titleSize: "text-3xl sm:text-4xl lg:text-5xl",
    meta: "rows",
    theme: "olive",
  },
  {
    id: "new-dining-chair",
    eyebrow: "Custom Furniture",
    title: ["Dining chairs worth", "gathering", "around"],
    text: "Crafted in solid walnut or ash timber with upholstered or cane seats, proportioned specifically to your dining table height.",
    tags: ["Solid walnut & ash", "Upholstered or cane", "Custom sets"],
    turnaround: "12–18 Days",
    warranty: "5-Yr Structural",
    materials: "Sustainably sourced walnut & ash",
    image: "/home/s2/dummy2.jpg",
    alt: "Elegant upholstered dining chairs in a bright dining room",
    href: "/services/new-dining-chair",
    imgW: "md:w-[48%]",
    edge: ["md:-ml-8 md:rounded-l-[2rem] md:rounded-tl-[6rem]", "md:-mr-8 md:rounded-r-[2rem] md:rounded-tr-[6rem]"],
    pad: "px-6 py-10 sm:px-10 md:px-12 lg:px-20",
    titleSize: "text-3xl sm:text-4xl lg:text-[3.25rem]",
    meta: "cols",
    theme: "light",
  },
];

/* ---------- Themes (unchanged colours) ---------- */
const CARD_THEMES = {
  surface: {
    wrapper: "bg-[var(--color-surface)] text-[var(--color-heading)]",
    eyebrow: "text-[var(--color-bronze)]",
    heading: "text-[var(--color-heading)]",
    accent: "text-[var(--color-bronze)]",
    text: "text-[var(--color-paragraph)]",
    metaBg: "bg-[var(--color-background)]/70 border-[var(--color-border)] divide-[var(--color-border)]",
    metaLabel: "text-[var(--color-muted)]",
    metaVal: "text-[var(--color-heading)]",
    tag: "bg-[var(--color-background)]/80 border-[var(--color-border)] text-[var(--color-heading)]",
    btnPrimary: "bg-[var(--color-button)] text-[var(--color-button-text)] hover:bg-[var(--color-button-hover)]",
    btnSecondary: "border-[var(--color-heading)]/25 text-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-[var(--color-background)]",
  },
  light: {
    wrapper: "bg-[#FAF8F4] text-[var(--color-heading)]",
    eyebrow: "text-[var(--color-bronze)]",
    heading: "text-[var(--color-heading)]",
    accent: "text-[var(--color-bronze)]",
    text: "text-[var(--color-paragraph)]",
    metaBg: "bg-[var(--color-surface)]/50 border-[var(--color-border)] divide-[var(--color-border)]",
    metaLabel: "text-[var(--color-muted)]",
    metaVal: "text-[var(--color-heading)]",
    tag: "bg-[var(--color-surface)]/60 border-[var(--color-border)] text-[var(--color-heading)]",
    btnPrimary: "bg-[var(--color-button)] text-[var(--color-button-text)] hover:bg-[var(--color-button-hover)]",
    btnSecondary: "border-[var(--color-heading)]/25 text-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-[var(--color-background)]",
  },
  dark: {
    wrapper: "bg-[var(--color-heading)] text-[var(--color-background)]",
    eyebrow: "text-[color-mix(in_srgb,var(--color-bronze),white_30%)]",
    heading: "!text-[var(--color-background)]",
    accent: "text-[color-mix(in_srgb,var(--color-bronze),white_30%)]",
    text: "text-[var(--color-border)]",
    metaBg: "bg-white/5 border-white/15 divide-white/15",
    metaLabel: "text-[var(--color-muted)]",
    metaVal: "text-[var(--color-background)]",
    tag: "bg-white/10 border-white/15 text-[var(--color-background)]",
    btnPrimary: "bg-[var(--color-background)] text-[var(--color-heading)] hover:bg-[var(--color-bronze)] hover:text-[var(--color-button-text)]",
    btnSecondary: "border-white/25 text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-heading)]",
  },
  olive: {
    wrapper: "bg-[var(--color-olive)] text-[var(--color-background)]",
    eyebrow: "text-[var(--color-background)]/80",
    heading: "!text-[var(--color-background)]",
    accent: "text-[#F4E3C8]",
    text: "text-[var(--color-background)]/90",
    metaBg: "bg-black/15 border-white/15 divide-white/15",
    metaLabel: "text-[var(--color-background)]/75",
    metaVal: "text-[var(--color-background)]",
    tag: "bg-black/15 border-white/15 text-[var(--color-background)]",
    btnPrimary: "bg-[var(--color-background)] text-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-[var(--color-background)]",
    btnSecondary: "border-white/30 text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-heading)]",
  },
};

const pad = (n) => String(n).padStart(2, "0");

const SPECS = [
  { key: "turnaround", label: "Turnaround", icon: FiClock },
  { key: "warranty", label: "Warranty", icon: FiShield },
  { key: "materials", label: "Build", icon: FiTool },
];

export default function Section4() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Header reveal */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".head-item", {
          y: 28,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".head", start: "top 82%", once: true },
        });
      });

      /* Pinned card stack: only when the viewport is big enough to fit one card per screen.
         On phones / short screens the cards simply stack normally (no pin). */
      mm.add(
        {
          desktop: "(min-width: 768px) and (min-height: 680px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions;
          if (!desktop) return;

          const cards = gsap.utils.toArray(".stack-card");

          cards.forEach((card, i) => {
            const isLast = i === cards.length - 1;
            if (isLast) return; // last card just scrolls away normally

            // Pin the card at the top until the next card has fully covered it
            ScrollTrigger.create({
              trigger: card,
              start: `top top+=${PIN_OFFSET}`,
              end: () => `+=${card.offsetHeight}`,
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
            });

            if (reduce) return;

            // While the next card slides up, the card underneath shrinks and darkens
            const next = cards[i + 1];
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: `top top+=${PIN_OFFSET}`,
                scrub: true,
              },
            });
            tl.to(card, { scale: 0.93, transformOrigin: "50% 0%" }, 0).to(
              card.querySelector(".stack-shade"),
              { opacity: 0.45 },
              0
            );
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="services-heading"
      className="relative w-full bg-[var(--color-background)] pt-16 sm:pt-24 lg:pt-28"
    >
      {/* ---------- Header ---------- */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="head flex flex-col gap-6 border-b border-[var(--color-border)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="head-item inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]">
              <span className="h-px w-8 bg-[var(--color-bronze)]" />
              What We Do
            </span>

            <h2
              id="services-heading"
              className="head-item mt-3 text-4xl leading-[1.05] tracking-tight text-[var(--color-heading)] sm:text-5xl lg:text-6xl"
            >
              Furniture repair and <span className="italic text-[var(--color-bronze)]">new</span>{" "}
              craftsmanship
            </h2>
          </div>

          <div className="head-item flex max-w-md flex-col items-start gap-3 lg:items-end">
            <p className="text-sm leading-relaxed text-[var(--color-paragraph)] sm:text-base lg:text-right">
              Every piece is restored or built to order in our workshop using kiln-dried hardwoods,
              high-resilience foams, and heirloom joinery.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-[var(--color-heading)]">
              <span className="inline-flex items-center gap-1.5">
                <FiCheckCircle aria-hidden="true" className="h-4 w-4 text-[var(--color-olive)]" /> Free Home Inspection
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiCheckCircle aria-hidden="true" className="h-4 w-4 text-[var(--color-olive)]" /> 500+ Fabrics &amp; Leathers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Full-screen pinned stack (full width, full height) ---------- */}
      <div className="mt-8 w-full">
        {SERVICES.map((service, idx) => {
          const t = CARD_THEMES[service.theme];
          const imageLeft = idx % 2 === 0;
          const isCols = service.meta === "cols";

          return (
            <article
              key={service.id}
              style={{ zIndex: idx + 1 }}
              className={`stack-card relative flex w-full flex-col overflow-hidden will-change-transform md:min-h-[100svh] md:rounded-t-[2.5rem] ${
                imageLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* IMAGE (no background, just the photo) */}
              <div
                className={`relative aspect-[4/3] w-full shrink-0 overflow-hidden md:aspect-auto md:self-stretch ${service.imgW}`}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  quality={85}
                  sizes="(max-width: 767px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </div>

              {/* CONTENT (only this panel carries the theme background) */}
              <div
                className={`relative z-10 flex min-w-0 flex-1 flex-col justify-center ${t.wrapper} ${service.pad} ${
                  service.edge[imageLeft ? 0 : 1]
                }`}
              >
                <div className="mx-auto w-full max-w-2xl">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${t.eyebrow}`}>
                      {service.eyebrow}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-base tabular-nums opacity-70">
                      {pad(idx + 1)}
                    </span>
                  </div>

                  <h3 className={`mt-4 leading-[1.08] tracking-tight ${service.titleSize} ${t.heading}`}>
                    {service.title[0]} <span className={`italic ${t.accent}`}>{service.title[1]}</span>{" "}
                    {service.title[2]}
                  </h3>

                  <p className={`mt-4 max-w-xl text-sm leading-relaxed sm:text-base ${t.text}`}>{service.text}</p>

                  <dl
                    className={`mt-6 rounded-2xl border ${t.metaBg} ${
                      isCols ? "grid grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0" : "divide-y"
                    }`}
                  >
                    {SPECS.map(({ key, label, icon: Icon }) => (
                      <div
                        key={key}
                        className={`flex gap-3 px-4 py-2.5 ${
                          isCols
                            ? "items-center justify-between lg:flex-col lg:items-start lg:justify-start lg:gap-1.5 lg:py-3.5"
                            : "items-center justify-between"
                        }`}
                      >
                        <dt className={`flex shrink-0 items-center gap-2 text-[0.68rem] uppercase tracking-wider ${t.metaLabel}`}>
                          <Icon aria-hidden="true" className={`h-3.5 w-3.5 ${t.accent}`} />
                          {label}
                        </dt>
                        <dd
                          className={`text-xs font-semibold leading-snug sm:text-[0.8rem] ${t.metaVal} ${
                            isCols ? "text-right lg:text-left" : "text-right"
                          }`}
                        >
                          {service[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-[0.72rem] font-medium ${t.tag}`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-2.5 pt-7">
                    <Link
                      href="/contact"
                      className={`group inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-medium transition-colors duration-300 sm:text-sm ${t.btnPrimary}`}
                    >
                      Get Quote
                      <FiArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                    <Link
                      href={service.href}
                      className={`inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-xs font-medium transition-colors duration-300 sm:text-sm ${t.btnSecondary}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dark overlay that fades in while the next card covers this one */}
              <div
                aria-hidden="true"
                className="stack-shade pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
              />
            </article>
          );
        })}
      </div>

      {/* ---------- Bottom Consultation Banner ---------- */}
      <div
        className="relative mx-auto w-full max-w-7xl bg-[var(--color-background)] px-5 py-10 sm:px-8 lg:px-12 lg:py-14"
        style={{ zIndex: SERVICES.length + 1 }}
      >
        <div className="flex flex-col items-center justify-between gap-4 rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-6 py-5 sm:flex-row sm:px-8">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-[var(--color-heading)] sm:text-base">
              Not sure whether to repair or build custom?
            </p>
            <p className="text-xs text-[var(--color-paragraph)] sm:text-sm">
              Send us a photo of your piece on WhatsApp or schedule a home fabric &amp; frame consultation.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-bronze)] px-6 py-3 text-xs font-medium text-[var(--color-button-text)] transition-colors duration-300 hover:bg-[var(--color-heading)] sm:text-sm"
          >
            Book Free Assessment
            <FiArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}