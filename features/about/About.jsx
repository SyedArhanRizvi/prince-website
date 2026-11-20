"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiAward,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiHome,
  FiMapPin,
  FiPhone,
  FiShield,
  FiThumbsUp,
  FiTool,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import ContactSection from "@/components/Form/ContactSection";
import Faqs from "../services/components/Faqs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------- Static data (outside the components, so nothing is recreated on render) ---------- */
const EASE = [0.22, 1, 0.36, 1];

// Replace with your real details
const PHONE_LABEL = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";
const WHATSAPP_HREF =
  "https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.";

const HERO_IMAGE = "/photo-gallery/gallery_image3.jpeg";
const DIFFERENT_IMAGE = "/photo-gallery/gallery_image8.jpeg";

const SERVICES = [
  "Sofa Repair",
  "New Sofa",
  "Sofa Cum Bed Repair",
  "New Sofa Cum Bed",
  "Bed Repair",
  "New Bed",
  "Highback Chair Repair",
  "New Highback Chair",
  "Dining Chair Repair",
  "New Dining Chair",
  "Other",
];

const STATS = [
  {
    value: 15,
    suffix: "+",
    title: "Years of Experience",
    desc: "Shaping timeless interiors with unmatched creative expertise.",
  },
  {
    value: 400,
    suffix: "+",
    title: "Satisfied Clients",
    desc: "Built on exceptional client trust and lasting relationships.",
  },
  {
    value: 250,
    suffix: "+",
    title: "Projects Completed",
    desc: "Delivering thoughtfully designed spaces for every kind of home.",
  },
  {
    value: 5,
    suffix: "",
    title: "Cities Covered",
    desc: "Serving homes across Delhi NCR with the same care and quality.",
  },
];

const CITIES = ["Noida", "Ghaziabad", "Greater Noida", "Delhi", "Gurugram"];

// "What makes us different": typical shop vs us (edit to match your real strengths)
const DIFFERENCES = [
  {
    label: "Quotes",
    others: "A rough estimate over the phone that changes later.",
    us: "A free home inspection and a clear, fixed quote.",
  },
  {
    label: "Workmanship",
    others: "Work sent out to unknown third parties.",
    us: "Every piece made or restored in our own workshop.",
  },
  {
    label: "Advice",
    others: "Pushes you to buy new even when repair is enough.",
    us: "Honest advice on whether to repair or build new.",
  },
  {
    label: "Warranty",
    others: "Little or no guarantee on the work.",
    us: "A written warranty on every job.",
  },
  {
    label: "Convenience",
    others: "You arrange transport and wait for updates.",
    us: "Free pickup and delivery, with regular updates.",
  },
];

// "Why choose us"
const REASONS = [
  {
    icon: FiAward,
    title: "15+ Years of Craft",
    desc: "Skilled hands that have handled every kind of sofa, bed and chair.",
  },
  {
    icon: FiTool,
    title: "Own Workshop",
    desc: "Quality is controlled start to finish, with no middlemen.",
  },
  {
    icon: FiShield,
    title: "Written Warranty",
    desc: "Every repair and new build is backed by a clear warranty.",
  },
  {
    icon: FiHome,
    title: "Free Home Inspection",
    desc: "We visit, measure and quote at your doorstep, at no cost.",
  },
  {
    icon: FiClock,
    title: "On-Time Delivery",
    desc: "Clear timelines that we stick to, so you are never left waiting.",
  },
  {
    icon: FiThumbsUp,
    title: "400+ Happy Clients",
    desc: "Homes across Delhi NCR trust us, and most come back or refer a friend.",
  },
];

// "Services we provide"
const OFFERINGS = [
  {
    title: "Sofa",
    desc: "Brand new made-to-measure sofas, or a full restoration of the one you love.",
    image: "/photo-gallery/gallery_image2.jpeg",
    alt: "Sofa from our completed work",
    newLabel: "New Sofa",
    newHref: "/new-sofa",
    repairLabel: "Sofa Repair",
    repairHref: "/sofa-repair",
  },
  {
    title: "Sofa Cum Bed",
    desc: "Two-in-one comfort, built new or repaired to work smoothly again.",
    image: "/photo-gallery/gallery_image6.jpeg",
    alt: "Sofa cum bed from our completed work",
    newLabel: "New Sofa Cum Bed",
    newHref: "/new-sofa-cum-bed",
    repairLabel: "Sofa Cum Bed Repair",
    repairHref: "/sofa-cum-bed-repair",
  },
  {
    title: "Bed",
    desc: "Custom beds, plus repairs for frames, headboards and bases.",
    image: "/photo-gallery/gallery_image10.jpeg",
    alt: "Bed from our completed work",
    newLabel: "New Bed",
    newHref: "/new-bed",
    repairLabel: "Bed Repair",
    repairHref: "/bed-repair",
  },
  {
    title: "Highback Chair",
    desc: "Statement chairs, made new or restored to their best.",
    image: "/photo-gallery/gallery_image14.jpeg",
    alt: "Highback chair from our completed work",
    newLabel: "New Highback Chair",
    newHref: "/new-highback-chair",
    repairLabel: "Highback Chair Repair",
    repairHref: "/highback-chair-repair",
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
  },
];

/* ---------- Animation variants ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const viewport = { once: true, amount: 0.2 };

/* ---------- Form helpers ---------- */
const INITIAL = { name: "", phone: "", service: "", message: "", company: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^\+?[\d\s-]{10,15}$/.test(v.phone.trim()))
    e.phone = "Enter a valid phone number.";
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
  error
    ? "border-red-400 focus:border-red-400 focus:ring-red-400/15"
    : "border-[var(--color-border)]";

// Styled like a heading but NOT a heading tag, so the page keeps one clean h1 > h2 > h3 outline for SEO
const formTitle =
  "font-[family-name:var(--font-heading)] font-medium text-[var(--color-heading)]";

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
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 14,
              delay: 0.1,
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-olive)] text-[var(--color-background)]"
          >
            <FiCheck aria-hidden="true" className="h-8 w-8" />
          </motion.span>
          <p
            ref={successRef}
            tabIndex={-1}
            className={`${formTitle} mt-6 text-3xl outline-none`}
          >
            Thank you, {values.name.trim().split(" ")[0]}!
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-paragraph)]">
            We received your enquiry for{" "}
            <span className="font-medium text-[var(--color-heading)]">
              {values.service}
            </span>
            . Our team will call you within 24 hours.
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
          aria-label="Enquiry form"
          aria-busy={loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4"
        >
          <div>
            <p className={`${formTitle} text-3xl sm:text-[2rem]`}>
              Get a free quote
            </p>
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
              <label
                htmlFor="about-name"
                className="mb-1.5 block text-sm font-medium text-[var(--color-heading)]"
              >
                Full name
              </label>
              <input
                id="about-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.name}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "about-name-error" : undefined}
                className={`${inputBase} ${inputState(errors.name)}`}
              />
              {errors.name && (
                <p
                  id="about-name-error"
                  role="alert"
                  className="mt-1 text-xs text-red-500"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="about-phone"
                className="mb-1.5 block text-sm font-medium text-[var(--color-heading)]"
              >
                Phone number
              </label>
              <input
                id="about-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={values.phone}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.phone}
                aria-describedby={
                  errors.phone ? "about-phone-error" : undefined
                }
                className={`${inputBase} ${inputState(errors.phone)}`}
              />
              {errors.phone && (
                <p
                  id="about-phone-error"
                  role="alert"
                  className="mt-1 text-xs text-red-500"
                >
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="about-service"
              className="mb-1.5 block text-sm font-medium text-[var(--color-heading)]"
            >
              Service you need
            </label>
            <div className="relative">
              <select
                id="about-service"
                name="service"
                value={values.service}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.service}
                aria-describedby={
                  errors.service ? "about-service-error" : undefined
                }
                className={`${inputBase} ${inputState(errors.service)} cursor-pointer appearance-none pr-11 ${
                  values.service ? "" : "text-[var(--color-muted)]"
                }`}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICES.map((s) => (
                  <option
                    key={s}
                    value={s}
                    className="text-[var(--color-heading)]"
                  >
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
              <p
                id="about-service-error"
                role="alert"
                className="mt-1 text-xs text-red-500"
              >
                {errors.service}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="about-message"
              className="mb-1.5 flex items-center justify-between text-sm font-medium text-[var(--color-heading)]"
            >
              Message
              <span className="text-xs font-normal text-[var(--color-muted)]">
                Optional
              </span>
            </label>
            <textarea
              id="about-message"
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
              <FiAlertCircle
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0"
              />
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

/* ---------- SECTION 1: Hero (h1) ---------- */
function Hero() {
  const root = useRef(null);

  // Slow parallax on the background (skipped for reduced motion)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-bg", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="about-hero-heading"
      className="relative isolate w-full overflow-hidden bg-[var(--color-heading)]"
    >
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
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--color-heading)]/55"
      />
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
            About Us
          </motion.span>

          <motion.h1
            id="about-hero-heading"
            variants={rise}
            className="mt-5 text-4xl leading-[1.05] tracking-tight !text-[var(--color-background)] sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            Crafting furniture and interiors with{" "}
            <span className="italic text-[color-mix(in_srgb,var(--color-bronze),white_35%)]">
              heart
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-border)] sm:text-lg"
          >
            For over 15 years we have been repairing and building sofas, beds
            and chairs for homes across Delhi NCR. Talk to our team and get a
            free quote.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-background)] px-6 py-3.5 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-bronze)] hover:text-[var(--color-button-text)] sm:text-sm"
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

/* ---------- Count-up: writes straight to the DOM, so zero re-renders ---------- */
function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;

    if (reduceMotion) {
      node.textContent = to;
      return;
    }

    const controls = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = Math.round(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/* ---------- Shared section heading (eyebrow + h2 + optional paragraph) ---------- */
function SectionHead({ id, eyebrow, children, text, center = true }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`flex max-w-3xl flex-col ${center ? "mx-auto items-center text-center" : "items-start"}`}
    >
      <motion.span
        variants={rise}
        className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]"
      >
        <span className="h-px w-8 bg-[var(--color-bronze)]" />
        {eyebrow}
        {center && <span className="h-px w-8 bg-[var(--color-bronze)]" />}
      </motion.span>

      <motion.h2
        id={id}
        variants={rise}
        className="mt-4 text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      >
        {children}
      </motion.h2>

      {text && (
        <motion.p
          variants={rise}
          className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ---------- SECTION 2: Experience + Cities (h2 > h3) ---------- */
function Experience() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="relative w-full overflow-hidden bg-[var(--color-background)] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHead
          id="experience-heading"
          eyebrow="Our Experience"
          text="Our numbers come from years of honest work and happy homes."
        >
          Built on trust,{" "}
          <span className="italic text-[var(--color-bronze)]">crafted</span>{" "}
          with care
        </SectionHead>

        {/* Stats: each title is an h3 */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.li
              key={s.title}
              variants={rise}
              className="flex flex-col rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(51,45,39,0.35)] sm:rounded-[2rem] sm:p-7"
            >
              <span className="font-[family-name:var(--font-heading)] text-6xl font-medium leading-none text-[var(--color-heading)] sm:text-7xl">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
              <h3 className="mt-6 font-[family-name:var(--font-body)] text-base font-semibold text-[var(--color-heading)]">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-paragraph)]">
                {s.desc}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Cities */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 flex flex-col items-center text-center sm:mt-20"
        >
          <motion.h2
            variants={rise}
            className="text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Cities We{" "}
            <span className="italic text-[var(--color-bronze)]">Serve</span>
          </motion.h2>

          <ul className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {CITIES.map((city) => (
              <motion.li
                key={city}
                variants={rise}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-5 py-2.5 text-sm font-medium text-[var(--color-heading)] transition-colors duration-300 hover:border-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-[var(--color-button-text)] sm:px-6 sm:text-base"
              >
                <FiMapPin aria-hidden="true" className="h-4 w-4" />
                {city}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- SECTION 3: What makes us different (fits one screen) ---------- */
function Different() {
  return (
    <section
      aria-labelledby="different-heading"
      className="relative flex w-full items-center overflow-hidden bg-[var(--color-surface)]/60 py-12 sm:py-16 md:min-h-[100svh] md:py-10 lg:h-[100svh] lg:min-h-[34rem] lg:py-0"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 md:gap-6 lg:grid-cols-12 lg:gap-14 lg:px-12">
        {/* LEFT: image (height shrinks from md and up, based on screen height) */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 1, ease: EASE }}
          className="relative lg:col-span-6"
        >
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 hidden h-full w-full rounded-[2rem] border border-[var(--color-bronze)]/40 sm:block"
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-[var(--color-surface)] sm:rounded-[2rem] md:aspect-auto md:h-[34svh] lg:h-[68svh] lg:max-h-[38rem]">
            <Image
              src={DIFFERENT_IMAGE}
              alt="A finished sofa from our own workshop"
              fill
              quality={85}
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-background)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-heading)] shadow-sm sm:bottom-5 sm:left-5 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bronze)]" />
              Made in our workshop
            </span>
          </div>
        </motion.div>

        {/* RIGHT: eyebrow, h2, paragraph, CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col items-start lg:col-span-6"
        >
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]"
          >
            <span className="h-px w-8 bg-[var(--color-bronze)]" />
            What Makes Us Different
          </motion.span>

          <motion.h2
            id="different-heading"
            variants={rise}
            className="mt-3 text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            Not just another{" "}
            <span className="italic text-[var(--color-bronze)]">furniture</span>{" "}
            shop
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-paragraph)] lg:text-[1.05rem]"
          >
            Plenty of shops repair and sell furniture. We do it differently:
            every piece is made or restored in our own workshop, you get a free
            home inspection with a clear fixed quote, and we give honest advice
            on whether to repair or build new. Every job comes with a written
            warranty and free pickup and delivery.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-button)] px-6 py-3 text-xs font-medium text-[var(--color-button-text)] transition-colors duration-300 hover:bg-[var(--color-button-hover)] sm:text-sm"
            >
              <FiPhone aria-hidden="true" className="h-4 w-4" />
              Call Us
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-heading)]/25 px-6 py-3 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-heading)] hover:text-[var(--color-background)] sm:text-sm"
            >
              <FaWhatsapp aria-hidden="true" className="h-4 w-4" />
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- SECTION 4: Why choose us (h2 > h3) ---------- */
function WhyChoose() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative w-full overflow-hidden bg-[var(--color-background)] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHead
          id="why-heading"
          eyebrow="Why Choose Us"
          text="Six reasons homes across Delhi NCR trust us with their furniture."
        >
          Why you should{" "}
          <span className="italic text-[var(--color-bronze)]">choose</span> us
        </SectionHead>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {REASONS.map(({ icon: Icon, title, desc }) => (
            <motion.li
              key={title}
              variants={rise}
              className="group flex flex-col rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-[translate,box-shadow,background-color] duration-500 hover:-translate-y-1 hover:bg-[#FAF8F4] hover:shadow-[0_24px_50px_-28px_rgba(51,45,39,0.35)] sm:rounded-[2rem] sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-background)] text-[var(--color-bronze)] transition-colors duration-300 group-hover:bg-[var(--color-bronze)] group-hover:text-[var(--color-button-text)]">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-2xl leading-tight tracking-tight sm:text-[1.65rem]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-paragraph)]">
                {desc}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------- SECTION 5: Services we provide (h2 > h3) ---------- */
function ServicesProvided() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative w-full overflow-hidden bg-[color-mix(in_srgb,var(--color-surface),var(--color-border))] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHead
          id="services-heading"
          eyebrow="What We Do"
          text="Choose a category, then pick a brand new piece or a repair. Every job comes with a free quote."
        >
          Services we{" "}
          <span className="italic text-[var(--color-bronze)]">provide</span>
        </SectionHead>

        <motion.nav
          aria-label="Services we provide"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-12 sm:mt-14"
        >
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {OFFERINGS.map((o) => (
              <motion.li
                key={o.title}
                variants={rise}
                className="group flex flex-col rounded-[1.75rem] bg-[var(--color-background)] p-3 shadow-[0_18px_40px_-28px_rgba(51,45,39,0.35)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(51,45,39,0.45)] sm:rounded-[2rem]"
              >
                <div className="relative h-52 w-full overflow-hidden rounded-[1.25rem] sm:h-56 sm:rounded-3xl">
                  <Image
                    src={o.image}
                    alt={o.alt}
                    fill
                    quality={80}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                  <h3 className="text-2xl leading-tight tracking-tight sm:text-[1.75rem]">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-paragraph)]">
                    {o.desc}
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
                    <Link
                      href={o.newHref}
                      aria-label={o.newLabel}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-button)] px-4 py-2.5 text-xs font-medium text-[var(--color-button-text)] transition-colors duration-300 hover:bg-[var(--color-button-hover)] sm:text-sm"
                    >
                      New
                      <FiArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                    <Link
                      href={o.repairHref}
                      aria-label={o.repairLabel}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-heading)]/25 px-4 py-2.5 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-heading)] hover:text-[var(--color-background)] sm:text-sm"
                    >
                      <FiTool aria-hidden="true" className="h-3.5 w-3.5" />
                      Repair
                    </Link>
                  </div>
                </div>
              </motion.li>
            ))}

            {/* 6th tile: call / WhatsApp, so the grid ends evenly */}
            <motion.li
              variants={rise}
              className="flex flex-col justify-between rounded-[1.75rem] bg-[var(--color-bronze)] p-6 sm:rounded-[2rem] sm:p-8"
            >
              <div>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[var(--color-background)]/80">
                  Need help choosing?
                </span>
                <h3 className="mt-3 text-3xl leading-[1.1] tracking-tight !text-[var(--color-background)] sm:text-4xl">
                  Not sure what you{" "}
                  <span className="italic text-[#F4E3C8]">need</span>?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-background)]/90">
                  Send us a photo or call us. We will tell you honestly whether
                  to repair or build new.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-background)] px-5 py-2.5 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-heading)] hover:text-[var(--color-background)] sm:text-sm"
                >
                  <FiPhone aria-hidden="true" className="h-4 w-4" />
                  Call Us
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-xs font-medium text-[var(--color-background)] transition-colors duration-300 hover:bg-[var(--color-background)] hover:text-[var(--color-heading)] sm:text-sm"
                >
                  <FaWhatsapp aria-hidden="true" className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </motion.li>
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
function About() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <Experience />
        <Different />
        <WhyChoose />
        <ServicesProvided />
        <ContactSection />
        <Faqs />
      </main>
    </MotionConfig>
  );
}

export default About;
