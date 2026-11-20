"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiPhone,
  FiPlay,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------- Static data (outside the components, so nothing is recreated on render) ---------- */
const EASE = [0.22, 1, 0.36, 1];

// Replace with your real details
const PHONE_LABEL = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";
const WHATSAPP_HREF =
  "https://wa.me/919876543210?text=Hi%2C%20I%20saw%20your%20work%20and%20would%20like%20to%20enquire.";

// Hero background (any file from public/photo-gallery)
const HERO_IMAGE = "/photo-gallery/gallery_image1.jpeg";

const SERVICES = [
  "Sofa Repair",
  "New Sofa",
  "Recliner Repair",
  "New Recliner",
  "Dining Chair Repair",
  "New Dining Chair",
  "Other",
];

/* ---------- Gallery items: 28 images + 2 videos, built once ---------- */
const IMAGE_COUNT = 28;
const VIDEO_SLOTS = { 5: "/photo-gallery/gallery_video1.mp4", 17: "/photo-gallery/gallery_video2.mp4" };

// Cycled heights give the masonry look. Real orientation is shown in the popup.
const RATIOS = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[5/4]",
];

const ITEMS = (() => {
  const list = [];
  let img = 1;
  for (let i = 0; img <= IMAGE_COUNT || VIDEO_SLOTS[i]; i++) {
    if (VIDEO_SLOTS[i]) {
      list.push({ type: "video", src: VIDEO_SLOTS[i], ratio: "aspect-[4/5]" });
    } else {
      list.push({
        type: "image",
        src: `/photo-gallery/gallery_image${img}.jpeg`,
        ratio: RATIOS[i % RATIOS.length],
      });
      img++;
    }
  }
  return list;
})();

const pad = (n) => String(n).padStart(2, "0");

/* ---------- Animation variants ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/* ---------- Form helpers ---------- */
const INITIAL = { name: "", phone: "", service: "", message: "", company: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^\+?[\d\s-]{10,15}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!v.service) e.service = "Please choose a service.";
  return e;
}

// Replace with your real submit logic (API route, Formspree, etc.)
async function sendEnquiry(data) {
  // const res = await fetch("/api/contact", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Request failed");
  await new Promise((r) => setTimeout(r, 1600)); // demo delay
  return data;
}

const inputBase =
  "w-full rounded-xl border bg-[var(--color-background)] px-4 py-3 text-base text-[var(--color-heading)] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[var(--color-muted)] focus:border-[var(--color-bronze)] focus:ring-4 focus:ring-[var(--color-bronze)]/15 sm:text-[0.95rem]";

const inputState = (error) =>
  error ? "border-red-400 focus:border-red-400 focus:ring-red-400/15" : "border-[var(--color-border)]";

/* ---------- Enquiry form (own state, so typing never re-renders the page) ---------- */
function EnquiryForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const successRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading" || values.company) return; // honeypot

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("loading");
    try {
      await sendEnquiry(values);
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setStatus("idle");
  };

  const loading = status === "loading";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          role="status"
          aria-live="polite"
          className="flex min-h-[24rem] flex-col items-center justify-center text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-olive)] text-[var(--color-background)]"
          >
            <FiCheck aria-hidden="true" className="h-8 w-8" />
          </motion.span>
          <h2 ref={successRef} tabIndex={-1} className="mt-6 text-3xl outline-none">
            Thank you, {values.name.trim().split(" ")[0]}!
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-paragraph)]">
            We received your enquiry for{" "}
            <span className="font-medium text-[var(--color-heading)]">{values.service}</span>. Our team will call
            you within 24 hours.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 rounded-full border border-[var(--color-heading)]/25 px-6 py-2.5 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-heading)] hover:text-[var(--color-background)] sm:text-sm"
          >
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-[2rem]">Get a free quote</h2>
            <p className="mt-1.5 text-sm text-[var(--color-muted)]">
              Tell us what you need. We reply within 24 hours.
            </p>
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="company"
            value={values.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="enq-name" className="mb-1.5 block text-sm font-medium text-[var(--color-heading)]">
                Full name
              </label>
              <input
                id="enq-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.name}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "enq-name-error" : undefined}
                className={`${inputBase} ${inputState(errors.name)}`}
              />
              {errors.name && (
                <p id="enq-name-error" role="alert" className="mt-1 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="enq-phone" className="mb-1.5 block text-sm font-medium text-[var(--color-heading)]">
                Phone number
              </label>
              <input
                id="enq-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={values.phone}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "enq-phone-error" : undefined}
                className={`${inputBase} ${inputState(errors.phone)}`}
              />
              {errors.phone && (
                <p id="enq-phone-error" role="alert" className="mt-1 text-xs text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="enq-service" className="mb-1.5 block text-sm font-medium text-[var(--color-heading)]">
              Service you need
            </label>
            <div className="relative">
              <select
                id="enq-service"
                name="service"
                value={values.service}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "enq-service-error" : undefined}
                className={`${inputBase} ${inputState(errors.service)} cursor-pointer appearance-none pr-11 ${
                  values.service ? "" : "text-[var(--color-muted)]"
                }`}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="text-[var(--color-heading)]">
                    {s}
                  </option>
                ))}
              </select>
              <FiChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-bronze)]"
              />
            </div>
            {errors.service && (
              <p id="enq-service-error" role="alert" className="mt-1 text-xs text-red-500">
                {errors.service}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="enq-message"
              className="mb-1.5 flex items-center justify-between text-sm font-medium text-[var(--color-heading)]"
            >
              Message
              <span className="text-xs font-normal text-[var(--color-muted)]">Optional</span>
            </label>
            <textarea
              id="enq-message"
              name="message"
              rows={3}
              placeholder="Describe your furniture or what you want built..."
              value={values.message}
              onChange={handleChange}
              disabled={loading}
              className={`${inputBase} ${inputState(false)} resize-none`}
            />
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              <FiAlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              Something went wrong. Please try again or call us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--color-button)] px-6 py-3.5 text-sm font-medium text-[var(--color-button-text)] transition-colors duration-300 hover:bg-[var(--color-button-hover)] disabled:cursor-not-allowed disabled:opacity-80"
          >
            {loading ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-button-text)]/30 border-t-[var(--color-button-text)]"
                />
                Sending...
              </>
            ) : (
              <>
                Send Enquiry
                <FiArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ---------- SECTION 1: Hero ---------- */
function Hero() {
  const root = useRef(null);

  // Slow parallax on the background (desktop and mobile, skipped for reduced motion)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-bg", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="work-hero-heading"
      className="relative isolate w-full overflow-hidden bg-[var(--color-heading)]"
    >
      {/* Background image (taller than the section so parallax never shows edges) */}
      <div className="hero-bg absolute inset-x-0 -top-[15%] -z-20 h-[130%] will-change-transform">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--color-heading)]/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-heading)]/80 via-[var(--color-heading)]/30 to-transparent"
      />

      <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-10 px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-12 lg:pb-20">
        {/* LEFT: title, paragraph, 2 CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-2xl flex-col items-start"
        >
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[color-mix(in_srgb,var(--color-bronze),white_35%)]"
          >
            <span className="h-px w-8 bg-current" />
            Our Work
          </motion.span>

          <motion.h1
            variants={rise}
            className="mt-5 text-4xl leading-[1.05] tracking-tight !text-[var(--color-background)] sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            Furniture and interiors we&rsquo;ve{" "}
            <span className="italic text-[color-mix(in_srgb,var(--color-bronze),white_35%)]">crafted</span> with
            care
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-border)] sm:text-lg"
          >
            Browse real projects from homes across Delhi NCR, from restored sofas to custom dining sets. Like what
            you see? Call us or send an enquiry and get a free quote.
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={PHONE_HREF}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-background)] px-6 py-3.5 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-bronze)] hover:text-[var(--color-button-text)] sm:text-sm"
            >
              <FiPhone aria-hidden="true" className="h-4 w-4" />
              Call {PHONE_LABEL}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-xs font-medium text-[var(--color-background)] transition-colors duration-300 hover:bg-[var(--color-background)] hover:text-[var(--color-heading)] sm:text-sm"
            >
              <FaWhatsapp aria-hidden="true" className="h-4 w-4" />
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT: enquiry form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="relative w-full rounded-[1.75rem] border border-white/20 bg-[var(--color-background)]/95 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md sm:rounded-[2rem] sm:p-8 lg:ml-auto lg:max-w-[28rem]"
        >
          <EnquiryForm />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Lightbox slide variants ---------- */
const slide = {
  enter: (d) => ({ opacity: 0, x: d === 0 ? 0 : d > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
};

const MEDIA_SIZES = "(max-width: 1152px) 92vw, 1152px";

const navBtn =
  "absolute z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[var(--color-background)] backdrop-blur-md transition-colors duration-300 hover:bg-[var(--color-bronze)] hover:border-[var(--color-bronze)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-background)]";

/* ---------- Popup slider ---------- */
function Lightbox({ index, dir, onClose, onStep }) {
  const total = ITEMS.length;
  const item = ITEMS[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Work gallery viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-heading)]/95 backdrop-blur-sm"
    >
      {/* Counter */}
      <span className="absolute left-4 top-[max(1rem,env(safe-area-inset-top))] z-20 rounded-full bg-white/10 px-4 py-2 font-[family-name:var(--font-heading)] text-base tabular-nums text-[var(--color-background)] backdrop-blur-md sm:left-6 sm:top-6">
        {pad(index + 1)} / {pad(total)}
      </span>

      {/* Close */}
      <button
        type="button"
        autoFocus
        aria-label="Close viewer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`${navBtn} right-4 top-[max(1rem,env(safe-area-inset-top))] sm:right-6 sm:top-6`}
      >
        <FiX aria-hidden="true" className="h-5 w-5" />
      </button>

      {/* Previous / Next: bottom corners on mobile, centered on the sides from 640px */}
      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        className={`${navBtn} bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-4 sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2`}
      >
        <FiChevronLeft aria-hidden="true" className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        className={`${navBtn} bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-4 sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2`}
      >
        <FiChevronRight aria-hidden="true" className="h-6 w-6" />
      </button>

      {/* Stage */}
      <div className="flex h-full w-full items-center justify-center px-4 pb-24 pt-20 sm:px-24 sm:pb-8 sm:pt-8">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE }}
            // Swipe left / right on touch screens (images only, so video controls stay usable)
            drag={item.type === "image" ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.x < -80 || velocity.x < -500) onStep(1);
              else if (offset.x > 80 || velocity.x > 500) onStep(-1);
            }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-6xl items-center justify-center"
          >
            {item.type === "image" ? (
              <div className="relative h-[68svh] w-full sm:h-[84svh]">
                <Image
                  src={item.src}
                  alt={`Completed project photo ${index + 1}`}
                  fill
                  quality={85}
                  sizes={MEDIA_SIZES}
                  className="select-none object-contain"
                  draggable={false}
                />
              </div>
            ) : (
              <video
                src={item.src}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="max-h-[68svh] max-w-full rounded-2xl bg-black sm:max-h-[84svh]"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quietly warm the cache for the next and previous photos */}
      {[1, -1].map((d) => {
        const n = ITEMS[(index + d + total) % total];
        return n.type === "image" ? (
          <div
            key={n.src}
            aria-hidden="true"
            className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
          >
            <Image src={n.src} alt="" fill sizes={MEDIA_SIZES} quality={85} loading="eager" />
          </div>
        ) : null;
      })}
    </motion.div>
  );
}

/* ---------- SECTION 2: Gallery (no text) ---------- */
function Gallery() {
  const root = useRef(null);
  const triggerRef = useRef(null);
  const [active, setActive] = useState(null);
  const [dir, setDir] = useState(0);
  const isOpen = active !== null;

  const open = (i, el) => {
    triggerRef.current = el;
    setDir(0);
    setActive(i);
  };

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback((d) => {
    setDir(d);
    setActive((i) => (i === null ? i : (i + d + ITEMS.length) % ITEMS.length));
  }, []);

  /* Keyboard + body scroll lock while the popup is open */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, step]);

  /* Tiles fade up as they enter the screen, in small batches */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tiles = gsap.utils.toArray(".tile");
        gsap.set(tiles, { y: 40, autoAlpha: 0, scale: 0.97 });

        ScrollTrigger.batch(tiles, {
          start: "top 93%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              clearProps: "transform,opacity,visibility",
            }),
        });
      });
    },
    { scope: root }
  );

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={root}
        aria-labelledby="gallery-heading"
        className="w-full bg-[var(--color-background)] py-12 sm:py-16 lg:py-20"
      >
        <h2 id="gallery-heading" className="sr-only">
          Gallery of our completed work
        </h2>

        <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8 lg:px-12">
          <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 lg:gap-5">
            {ITEMS.map((item, i) => (
              <li key={item.src} className="tile mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
                <button
                  type="button"
                  onClick={(e) => open(i, e.currentTarget)}
                  aria-label={`Open ${item.type === "video" ? "video" : "photo"} ${i + 1} of ${ITEMS.length}`}
                  className={`group relative block w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bronze)] sm:rounded-3xl ${item.ratio}`}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={`Completed project photo ${i + 1}`}
                      fill
                      quality={75}
                      sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                  ) : (
                    <>
                      {/* First frame only (preload="metadata"), so videos don't slow the page */}
                      <video
                        src={`${item.src}#t=0.1`}
                        muted
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        tabIndex={-1}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      />
                      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-background)]/90 text-[var(--color-heading)] shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                        <FiPlay aria-hidden="true" className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                    </>
                  )}

                  {/* Hover veil + expand icon (images) */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[var(--color-heading)]/0 transition-colors duration-500 group-hover:bg-[var(--color-heading)]/25"
                  />
                  {item.type === "image" && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[var(--color-background)]/90 text-[var(--color-heading)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <FiMaximize2 className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <AnimatePresence>
          {isOpen && <Lightbox index={active} dir={dir} onClose={close} onStep={step} />}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}

/* ---------- Page ---------- */
function Work() {
  return (
    <main>
      <Hero />
      <Gallery />
    </main>
  );
}

export default Work;