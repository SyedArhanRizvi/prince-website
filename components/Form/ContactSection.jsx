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
  if (v.message.trim().length < 5) e.message = "Tell us a little more.";
  return e;
}

async function sendMessage(data) {
  await new Promise((resolve) => setTimeout(resolve, 1400));
  return data;
}

/* ---------- Shared styles (Compact Viewport Optimized) ---------- */
const inputBase =
  "w-full rounded-xl border bg-[var(--color-surface)]/40 px-3.5 py-2.5 text-sm sm:text-base text-[var(--color-heading)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[var(--color-muted)] focus:bg-white focus:border-[var(--color-bronze)] focus:ring-2 focus:ring-[var(--color-bronze)]/15";

const inputState = (error) =>
  error ? "border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-400/15" : "border-[var(--color-border)]";

/* ---------- Animation variants ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.03 } },
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const viewport = { once: true, amount: 0.1 };

/* ---------- Field wrapper ---------- */
function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center justify-between text-xs sm:text-sm font-medium text-[var(--color-heading)]"
      >
        {label}
        {optional && (
          <span className="text-[11px] font-normal text-[var(--color-muted)]">Optional</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[11px] text-red-500 font-medium">
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
        className="relative w-full bg-[var(--color-background)] lg:h-[calc(100vh-5rem)] lg:min-h-[680px] lg:max-h-[850px] flex items-center py-12 lg:py-0 overflow-hidden"
      >
        {/* Top subtle decorative divider rule */}
        <div className="absolute top-0 left-5 right-5 sm:left-8 sm:right-8 lg:left-12 lg:right-12 h-px bg-[var(--color-border)] opacity-60" />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ================= LEFT: Info (Cols 1-5) ================= */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="lg:col-span-5 flex flex-col"
            >
              <motion.span
                variants={rise}
                className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              >
                <span className="h-px w-6 bg-[var(--color-bronze)]" />
                Get In Touch
              </motion.span>

              <motion.h2
                id="contact-heading"
                variants={rise}
                className="mt-3 text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-[var(--color-heading)]"
              >
                Let&rsquo;s bring your furniture{" "}
                <span className="italic text-[var(--color-bronze)]">
                  back to life
                </span>
              </motion.h2>

              <motion.p
                variants={rise}
                className="mt-3.5 text-sm sm:text-base leading-relaxed text-[var(--color-paragraph)] max-w-md"
              >
                Tell us what you need—a repair, a custom build, or expert advice. We&rsquo;ll get
                back to you within 24 hours with a free quote.
              </motion.p>

              {/* Contact details */}
              <motion.ul variants={rise} className="mt-6 flex flex-col gap-3.5">
                {DETAILS.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-3.5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-heading)] transition-all duration-300 group-hover:border-[var(--color-bronze)] group-hover:bg-[var(--color-bronze)] group-hover:text-white">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] font-medium">
                          {label}
                        </span>
                        <span className="text-sm sm:text-base text-[var(--color-heading)] font-medium transition-colors duration-300 group-hover:text-[var(--color-bronze)] truncate">
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
                className="mt-6 border-t border-[var(--color-border)] pt-5"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] font-medium mb-2.5">
                  Connect & Socials
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 text-[var(--color-heading)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white"
                      >
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* ================= RIGHT: Form (Cols 6-12) ================= */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="lg:col-span-7 rounded-3xl bg-[var(--color-surface)]/30 border border-[var(--color-border)] p-5 sm:p-8 lg:p-9 shadow-[0_15px_40px_-20px_rgba(51,45,39,0.12)] backdrop-blur-sm"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  /* ---------- Thank you ---------- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    role="status"
                    aria-live="polite"
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-olive)] text-[var(--color-background)]"
                    >
                      <FiCheck aria-hidden="true" className="h-7 w-7" />
                    </motion.span>

                    <h3
                      ref={successRef}
                      tabIndex={-1}
                      className="mt-5 text-2xl sm:text-3xl font-medium outline-none text-[var(--color-heading)] font-[family-name:var(--font-heading)]"
                    >
                      Thank you, {values.name.trim().split(" ")[0]}!
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--color-paragraph)] max-w-xs">
                      Your request for{" "}
                      <span className="font-medium text-[var(--color-heading)]">
                        {values.service}
                      </span>{" "}
                      has been received. We will call you within 24 hours.
                    </p>

                    <button
                      type="button"
                      onClick={reset}
                      className="mt-6 rounded-full border border-[var(--color-heading)]/25 px-6 py-2.5 text-xs sm:text-sm font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-heading)] hover:text-[var(--color-background)]"
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
                    transition={{ duration: 0.3 }}
                    aria-busy={loading}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between pb-1">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-heading)] font-medium text-[var(--color-heading)]">
                          Request a free quote
                        </h3>
                        <p className="text-xs text-[var(--color-muted)] mt-0.5">
                          Takes less than a minute. Free workshop estimate.
                        </p>
                      </div>
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

                    <div className="grid gap-3.5 sm:grid-cols-2">
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

                    <div className="grid gap-3.5 sm:grid-cols-2">
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
                            className={`${inputBase} ${inputState(errors.service)} cursor-pointer appearance-none pr-10 ${
                              values.service ? "" : "text-[var(--color-muted)]"
                            }`}
                          >
                            <option value="" disabled>
                              Select service
                            </option>
                            {SERVICES.map((s) => (
                              <option key={s} value={s} className="text-[var(--color-heading)]">
                                {s}
                              </option>
                            ))}
                          </select>
                          <FiChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-bronze)]"
                          />
                        </div>
                      </Field>
                    </div>

                    <Field id="message" label="Project details & description" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Describe furniture condition or requirements..."
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
                        className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-600 font-medium"
                      >
                        <FiAlertCircle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Something went wrong. Please try calling us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--color-button)] px-6 py-3 text-xs sm:text-sm font-medium tracking-wide text-[var(--color-button-text)] transition-all duration-300 hover:bg-[var(--color-button-hover)] disabled:cursor-not-allowed disabled:opacity-80 shadow-md shadow-[var(--color-button)]/10"
                    >
                      {loading ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-button-text)]/30 border-t-[var(--color-button-text)]"
                          />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          Send Message & Get Quote
                          <FiArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>
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