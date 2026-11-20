"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";

/* ---------- Types ---------- */
export type HeroData = {
  title: string;
  description: string;
  backgroundImage: string;
  backgroundAlt: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string; // digits only, with country code, e.g. 919876543210
  whatsappMessage: string;
  formTitle: string;
  formDescription: string;
};

export type EnquiryValues = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  details: string;
};

type HeroSectionProps = {
  data?: Partial<HeroData>;
  services?: readonly string[];
  /** Plug your API call in here. Throw an error to show the error message. */
  onSubmit?: (values: EnquiryValues) => Promise<void>;
};

/* ---------- Default (dummy) data, replace with dynamic data ---------- */
export const SERVICES = [
  "Sofa Repair",
  "New Sofa",
  "Recliner Repair",
  "New Recliner",
  "Dining Chair Repair",
  "New Dining Chair",
  "Other",
] as const;

const DEFAULT_DATA: HeroData = {
  title: "Sofa repair and new sofas, made to last",
  description:
    "From frame repair and reupholstery to custom-built sofas, recliners and dining chairs, our craftsmen bring comfort back to your home. Tell us what you need and we will plan the right fix or build the right piece for your space.",
  backgroundImage: "/services/hero-bg.jpg",
  backgroundAlt: "Dark, softly lit living room with a handcrafted sofa",
  phoneDisplay: "+91 00000 00000",
  phoneTel: "+910000000000",
  whatsappNumber: "910000000000",
  whatsappMessage: "Hi, I'd like to talk about a furniture project.",
  formTitle: "Tell us what you need",
  formDescription: "Fill in the details and we will call you back to discuss your project.",
};

const EMPTY_FORM: EnquiryValues = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  details: "",
};

/* ---------- Animation ---------- */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const lineUp = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

/* ---------- Shared input styles (compact from lg so everything fits one screen) ---------- */
const inputClass =
  "w-full rounded-xl border border-[var(--color-border)] bg-white/60 px-4 py-3 text-base text-[var(--color-heading)] placeholder:text-[var(--color-muted)] transition-colors duration-200 hover:border-[var(--color-muted)] focus:border-[var(--color-bronze)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-bronze)]/25 lg:py-2.5 lg:text-[15px]";

function Field({
  id,
  label,
  optional = false,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-[var(--color-heading)]"
      >
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-[var(--color-muted)]">
            (Optional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ---------- Icons ---------- */
function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

/* ---------- Enquiry form ---------- */
function EnquiryForm({
  data,
  services,
  onSubmit,
}: {
  data: HeroData;
  services: readonly string[];
  onSubmit?: (values: EnquiryValues) => Promise<void>;
}) {
  const [values, setValues] = useState<EnquiryValues>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // TODO: replace with your real API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log("Enquiry:", values);
      }
      setValues(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Enquiry form"
      className="grid grid-cols-1 gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] sm:grid-cols-2 sm:p-8 lg:gap-3.5 lg:p-7"
    >
      <div className="sm:col-span-2">
        <h2 className="text-3xl leading-tight tracking-tight sm:text-4xl lg:text-3xl xl:text-4xl">
          {data.formTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-paragraph)] sm:text-base lg:text-sm [@media(min-width:1024px)_and_(max-height:760px)]:hidden">
          {data.formDescription}
        </p>
      </div>

      <Field id="fullName" label="Full name">
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Your full name"
          value={values.fullName}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>

      <Field id="phone" label="Phone number">
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          pattern="[+0-9\s\-]{7,15}"
          title="Enter a valid phone number"
          placeholder="Your phone number"
          value={values.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>

      <Field id="email" label="Email address" optional>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>

      <Field id="service" label="Service you need">
        <div className="relative">
          <select
            id="service"
            name="service"
            required
            value={values.service}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer appearance-none pr-10 ${
              values.service ? "" : "text-[var(--color-muted)]"
            }`}
          >
            <option value="" disabled>
              Select service
            </option>
            {services.map((service) => (
              <option
                key={service}
                value={service}
                className="text-[var(--color-heading)]"
              >
                {service}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
      </Field>

      <Field
        id="details"
        label="Project details & description"
        className="sm:col-span-2"
      >
        <textarea
          id="details"
          name="details"
          placeholder="Tell us about the piece, its condition, size or the look you want"
          value={values.details}
          onChange={handleChange}
          className={`${inputClass} h-28 resize-none lg:h-20`}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-button)] px-6 py-3.5 text-base font-medium text-[var(--color-button-text)] transition-colors duration-300 hover:bg-[var(--color-button-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bronze)] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
      >
        {status === "sending" ? "Sending..." : "Send enquiry"}
      </button>

      <div aria-live="polite" className="sm:col-span-2 empty:hidden">
        {status === "success" && (
          <p className="rounded-xl bg-[var(--color-olive)]/15 px-4 py-2.5 text-sm text-[var(--color-heading)]">
            Thank you. Your enquiry has been sent and we will contact you soon.
          </p>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="rounded-xl bg-[var(--color-bronze)]/15 px-4 py-2.5 text-sm text-[var(--color-heading)]"
          >
            Your enquiry could not be sent. Please try again or call us.
          </p>
        )}
      </div>
    </form>
  );
}

/* ---------- Hero ---------- */
function HeroSection({ data, services = SERVICES, onSubmit }: HeroSectionProps) {
  const content: HeroData = { ...DEFAULT_DATA, ...data };
  const whatsappHref = `https://wa.me/${content.whatsappNumber.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(content.whatsappMessage)}`;

  const ctaBase =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bronze)] sm:text-base";

  return (
    <MotionConfig reducedMotion="user">
      {/*
        Mobile / tablet: grows with its content.
        lg and up: exactly one screen tall, nothing scrolls.
        lg:pt-24 leaves room for a fixed navbar, adjust to your header height.
      */}
      <section
        aria-label="Services"
        className="relative isolate flex min-h-[100svh] w-full items-center bg-[var(--color-heading)] py-28 sm:py-32 lg:h-[100svh] lg:min-h-[600px] lg:pb-8 lg:pt-24"
      >
        {/* Dark background image */}
        <Image
          src={content.backgroundImage}
          alt={content.backgroundAlt}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* Overlays keep the text readable on any image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[var(--color-heading)]/80"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-heading)]/90 via-[var(--color-heading)]/40 to-transparent"
        />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
            {/* Left: content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="lg:col-span-6"
            >
              <h1 className="max-w-3xl text-4xl leading-[1.08] tracking-tight !text-[var(--color-background)] sm:text-5xl xl:text-6xl">
                <span className="block overflow-hidden pb-[0.12em]">
                  <motion.span variants={lineUp} className="block">
                    {content.title}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fade}
                className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-background)]/80 sm:text-lg"
              >
                {content.description}
              </motion.p>

              <motion.div
                variants={fade}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <a
                  href={`tel:${content.phoneTel}`}
                  aria-label={`Call us on ${content.phoneDisplay}`}
                  className={`${ctaBase} bg-[var(--color-background)] text-[var(--color-heading)] hover:bg-[var(--color-bronze)] hover:text-[var(--color-button-text)]`}
                >
                  <PhoneIcon />
                  Call us
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctaBase} border border-[var(--color-background)]/40 text-[var(--color-background)] hover:border-[var(--color-background)] hover:bg-[var(--color-background)]/10`}
                >
                  <ChatIcon />
                  WhatsApp us
                </a>
              </motion.div>
            </motion.div>

            {/* Right: enquiry form */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.35 }}
              className="lg:col-span-6 xl:col-span-5 xl:col-start-8"
            >
              <EnquiryForm
                data={content}
                services={services}
                onSubmit={onSubmit}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default HeroSection;