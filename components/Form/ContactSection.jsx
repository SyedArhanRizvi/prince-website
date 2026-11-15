"use client";

import { useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

/* ---------- Static data ---------- */
const EASE = [0.22, 1, 0.36, 1];

const PHONE_LABEL = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";
const EMAIL = "hello@yourbrand.com";
const ADDRESS = "Sector 62, Noida, Uttar Pradesh 201301";
const MAP_HREF = "https://maps.google.com/?q=Sector+62+Noida";

const DETAILS = [
  { icon: FiPhone, label: "Call us", value: PHONE_LABEL, href: PHONE_HREF },
  { icon: FiMail, label: "Email us", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: FiMapPin, label: "Visit us", value: ADDRESS, href: MAP_HREF, external: true },
];

const SOCIALS = [
  { icon: FiInstagram, label: "Instagram", href: "https://instagram.com/yourbrand" },
  { icon: FiFacebook, label: "Facebook", href: "https://facebook.com/yourbrand" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/919876543210" },
  { icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com/company/yourbrand" },
];

const SERVICES = [
  "Sofa Repair",
  "New Sofa",
  "Recliner Repair",
  "New Recliner",
  "Dining Chair Repair",
  "New Dining Chair",
  "Other",
];

const INITIAL = { name: "", phone: "", email: "", service: "", message: "", company: "" };

/* ---------- Validation ---------- */
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^\+?[\d\s-]{10,15}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (v.email.trim() && !/^\S+@\S+\.\S+$/.test(v.email.trim()))
    e.email = "Enter a valid email address.";
  if (!v.service) e.service = "Please choose a service.";
  if (v.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  return e;
}

async function sendMessage(data) {
  await new Promise((resolve) => setTimeout(resolve, 1600));
  return data;
}

/* ---------- Shared styles ---------- */
const inputBase =
  "w-full rounded-2xl border bg-[var(--color-surface)]/50 px-4 py-4 text-base text-[var(--color-heading)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[var(--color-muted)] focus:bg-white focus:border-[var(--color-bronze)] focus:ring-4 focus:ring-[var(--color-bronze)]/15 sm:text-[0.95rem]";

const inputState = (error) =>
  error ? "border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-400/15" : "border-[var(--color-border)]";

/* ---------- Animation variants ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const viewport = { once: true, amount: 0.2 };

/* ---------- Field wrapper ---------- */
function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 flex items-center justify-between text-sm font-medium text-[var(--color-heading)]"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-[var(--color-muted)]">Optional</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- Section ---------- */
function ContactSection() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const successRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    if (values.company) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("loading");
    try {
      await sendMessage(values);
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
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative w-full bg-[var(--color-background)] py-24 sm:py-32 lg:py-40"
      >
        {/* Top subtle decorative divider rule */}
        <div className="absolute top-0 left-5 right-5 sm:left-8 sm:right-8 lg:left-12 lg:right-12 h-px bg-[var(--color-border)] opacity-60" />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ================= LEFT: Info (Cols 1-5) ================= */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="lg:col-span-5 flex flex-col pt-2"
            >
              <motion.span
                variants={rise}
                className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              >
                <span className="h-px w-8 bg-[var(--color-bronze)]" />
                Get In Touch
              </motion.span>

              <motion.h2
                id="contact-heading"
                variants={rise}
                className="mt-6 text-4xl leading-[1.08] tracking-tight text-[var(--color-heading)] sm:text-5xl lg:text-6xl"
              >
                Let&rsquo;s bring your furniture{" "}
                <span className="italic text-[var(--color-bronze)]">
                  back to life
                </span>
              </motion.h2>

              <motion.p
                variants={rise}
                className="mt-6 text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg"
              >
                Tell us what you need—a repair, a custom build, or expert advice. We&rsquo;ll get
                back to you within 24 hours with a free quote.
              </motion.p>

              {/* Contact details */}
              <motion.ul variants={rise} className="mt-10 flex flex-col gap-6">
                {DETAILS.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-start gap-4"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-heading)] transition-all duration-300 group-hover:border-[var(--color-bronze)] group-hover:bg-[var(--color-bronze)] group-hover:text-white">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className="flex min-w-0 flex-col pt-1">
                        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] font-medium">
                          {label}
                        </span>
                        <span className="mt-1 break-words text-base text-[var(--color-heading)] font-medium transition-colors duration-300 group-hover:text-[var(--color-bronze)] sm:text-lg">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </motion.ul>

              {/* Social icons */}
              <motion.div
                variants={rise}
                className="mt-12 border-t border-[var(--color-border)] pt-8"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] font-medium">
                  Connect & Socials
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 text-[var(--color-heading)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white"
                      >
                        <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* ================= RIGHT: Form (Cols 6-12) ================= */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="lg:col-span-7 rounded-[2.5pax] sm:rounded-[2.5rem] bg-[var(--color-surface)]/40 border border-[var(--color-border)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-30px_rgba(51,45,39,0.15)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  /* ---------- Thank you ---------- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    role="status"
                    aria-live="polite"
                    className="flex min-h-[30rem] flex-col items-center justify-center text-center py-10"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-olive)] text-[var(--color-background)]"
                    >
                      <FiCheck aria-hidden="true" className="h-9 w-9" />
                    </motion.span>

                    <h3
                      ref={successRef}
                      tabIndex={-1}
                      className="mt-7 text-3xl font-medium outline-none sm:text-4xl text-[var(--color-heading)] font-[family-name:var(--font-heading)]"
                    >
                      Thank you, {values.name.trim().split(" ")[0]}!
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-[var(--color-paragraph)]">
                      Your request for{" "}
                      <span className="font-medium text-[var(--color-heading)]">
                        {values.service}
                      </span>{" "}
                      has been received. Our workshop team will call you within 24 hours.
                    </p>

                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 rounded-full border border-[var(--color-heading)]/25 px-7 py-3.5 text-sm font-medium tracking-wide text-[var(--color-heading)] transition-colors duration-300 hover:border-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-[var(--color-background)]"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* ---------- Form ---------- */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    aria-busy={loading}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-[family-name:var(--font-heading)] font-medium text-[var(--color-heading)]">
                        Request a free quote
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-muted)]">
                        Fill in the details below and we&rsquo;ll review your requirements.
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

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field id="name" label="Full name" error={errors.name}>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your name"
                          value={values.name}
                          onChange={handleChange}
                          disabled={loading}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={`${inputBase} ${inputState(errors.name)}`}
                        />
                      </Field>

                      <Field id="phone" label="Phone number" error={errors.phone}>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          value={values.phone}
                          onChange={handleChange}
                          disabled={loading}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={`${inputBase} ${inputState(errors.phone)}`}
                        />
                      </Field>
                    </div>

                    <Field id="email" label="Email address" optional error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange}
                        disabled={loading}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`${inputBase} ${inputState(errors.email)}`}
                      />
                    </Field>

                    <Field id="service" label="Service you need" error={errors.service}>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          value={values.service}
                          onChange={handleChange}
                          disabled={loading}
                          aria-invalid={!!errors.service}
                          aria-describedby={errors.service ? "service-error" : undefined}
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
                    </Field>

                    <Field id="message" label="Project details & description" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder={
                          values.service === "Other"
                            ? "Tell us what you are looking for..."
                            : "Describe the furniture, its current condition, or measurements..."
                        }
                        value={values.message}
                        onChange={handleChange}
                        disabled={loading}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`${inputBase} ${inputState(errors.message)} resize-none`}
                      />
                    </Field>

                    {status === "error" && (
                      <p
                        role="alert"
                        className="flex items-start gap-2 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium"
                      >
                        <FiAlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                        Something went wrong while sending. Please try again or call us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-button)] px-8 py-4 text-sm font-medium tracking-wide text-[var(--color-button-text)] transition-all duration-300 hover:bg-[var(--color-button-hover)] disabled:cursor-not-allowed disabled:opacity-80 sm:text-base shadow-lg shadow-[var(--color-button)]/10"
                    >
                      {loading ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-button-text)]/30 border-t-[var(--color-button-text)]"
                          />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          Send Message & Get Quote
                          <FiArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-[var(--color-muted)]">
                      Your details are secure and used solely to respond to your inquiry.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default ContactSection;