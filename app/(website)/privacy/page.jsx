import Link from "next/link";
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

/* ---------- SEO ---------- */
export const metadata = {
  title: "Privacy Policy | Your Brand Name",
  description:
    "Read how Your Brand Name collects, uses and protects your personal information. We never sell or share your details with third parties.",
  alternates: { canonical: "/privacy-policy" },
};

/* ---------- Replace with your real details ---------- */
const BRAND = "Your Brand Name";
const EMAIL = "hello@yourbrand.com";
const PHONE_LABEL = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";
const ADDRESS = "Sector 62, Noida, Uttar Pradesh 201301";
const UPDATED = "22 November 2026";

/* ---------- Content (edit freely) ---------- */
const SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    paras: [
      `${BRAND} is an authorized and registered business providing furniture repair and custom furniture services across Delhi NCR. This Privacy Policy explains what information we collect when you use our website, how we use it, and how we keep it safe.`,
      "By using this website or submitting an enquiry, you agree to the practices described on this page.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paras: ["We only collect the information you choose to give us, for example when you fill in our enquiry form or contact us by call or WhatsApp."],
    list: [
      "Your name and phone number",
      "Your email address (only if you provide it)",
      "The service you need and the message you write",
      "Photos of your furniture, if you send them to us on WhatsApp",
      "Basic technical data such as browser type and pages visited, to keep the website working well",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    paras: ["Your details are used only for the purpose you shared them."],
    list: [
      "To call or message you about your enquiry",
      "To give you a quote and schedule an inspection, repair or delivery",
      "To improve our website and our services",
      "To meet legal or regulatory requirements, where applicable",
    ],
  },
  {
    id: "no-sharing",
    title: "We Do Not Share Your Details",
    paras: [
      "We do not sell, rent, trade or provide your personal information to any other person or company. Your details stay with our team.",
      "The only exception is when we are legally required to disclose information, for example under a valid order from a court or government authority.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security and Retention",
    paras: [
      "We take reasonable steps to protect your information from loss, misuse and unauthorized access. No method of online transfer is completely secure, but we work to keep your data safe.",
      "We keep your information only for as long as needed to serve your request or as required by law. You can ask us to delete it at any time.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Analytics",
    paras: [
      "Our website may use cookies or similar tools to understand how visitors use it and to make it work better. These do not identify you personally. You can block or delete cookies in your browser settings.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Copyright and Original Assets",
    paras: [
      `All content on this website is original and belongs to ${BRAND}. This includes our photos and videos of completed work, text, logo, graphics and design.`,
      "You may not copy, reproduce, download for reuse, edit, distribute or use any of our assets for commercial or any other purpose without our written permission.",
      "If anyone uses our assets without authorization, we reserve the right to file a copyright claim and take legal action under the Copyright Act, 1957 and other applicable laws.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    paras: ["You have the right to control your personal information. You can contact us to:"],
    list: [
      "Ask what information we hold about you",
      "Correct anything that is wrong",
      "Ask us to delete your information",
      "Withdraw your consent to us contacting you",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    paras: [
      "Our website may link to other services such as WhatsApp, Instagram, Facebook, LinkedIn or Google Maps. These services have their own privacy policies, and we are not responsible for how they handle your data.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    paras: [
      `We may update this policy from time to time. The latest version will always be on this page with the "Last updated" date at the top.`,
    ],
  },
];

/* ---------- Page ---------- */
export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-[var(--color-background)]">
      {/* ---------- Header (h1) ---------- */}
      <header className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)]/60 px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-bronze)]/10 blur-3xl sm:h-[26rem] sm:w-[26rem]"
        />
        <div className="relative mx-auto w-full max-w-7xl">
          <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]">
            <span className="h-px w-8 bg-[var(--color-bronze)]" />
            Legal
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Privacy <span className="italic text-[var(--color-bronze)]">Policy</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg">
            Your trust matters to us. We keep your details private and we never share them with anyone.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">Last updated: {UPDATED}</p>
        </div>
      </header>

      {/* ---------- Body ---------- */}
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:px-12 lg:py-20">
        {/* Table of contents (sticky on desktop) */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <nav
            aria-label="Privacy policy contents"
            className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:sticky lg:top-28"
          >
            <p className="font-[family-name:var(--font-heading)] text-xl font-medium text-[var(--color-heading)]">
              On this page
            </p>
            <ol className="mt-4 flex flex-col gap-1.5">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-sm text-[var(--color-paragraph)] transition-colors duration-300 hover:bg-[var(--color-background)] hover:text-[var(--color-bronze)]"
                  >
                    <span className="font-[family-name:var(--font-heading)] text-sm tabular-nums text-[var(--color-bronze)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-sm text-[var(--color-paragraph)] transition-colors duration-300 hover:bg-[var(--color-background)] hover:text-[var(--color-bronze)]"
                >
                  <span className="font-[family-name:var(--font-heading)] text-sm tabular-nums text-[var(--color-bronze)]">
                    {String(SECTIONS.length + 1).padStart(2, "0")}
                  </span>
                  Contact Us
                </a>
              </li>
            </ol>
          </nav>
        </aside>

        {/* Policy content */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="flex flex-col gap-10 sm:gap-12">
            {SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-28">
                <h2
                  id={`${s.id}-heading`}
                  className="flex items-baseline gap-4 text-2xl leading-tight tracking-tight sm:text-3xl"
                >
                  <span className="font-[family-name:var(--font-heading)] text-3xl text-[var(--color-bronze)] sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>

                <div className="mt-4 flex flex-col gap-3 border-l border-[var(--color-border)] pl-5 sm:pl-7">
                  {s.paras.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-[var(--color-paragraph)]">
                      {p}
                    </p>
                  ))}

                  {s.list && (
                    <ul className="mt-1 flex flex-col gap-2.5">
                      {s.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base leading-relaxed text-[var(--color-paragraph)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-bronze)]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            {/* ---------- Contact ---------- */}
            <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-28">
              <div className="rounded-[1.75rem] bg-[var(--color-bronze)] p-6 sm:rounded-[2rem] sm:p-8">
                <h2
                  id="contact-heading"
                  className="text-3xl leading-tight tracking-tight !text-[var(--color-background)] sm:text-4xl"
                >
                  Questions about this <span className="italic text-[#F4E3C8]">policy</span>?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-background)]/90 sm:text-base">
                  If you have any question about your data or about this policy, or if you want your information
                  deleted, please get in touch.
                </p>

                <ul className="mt-6 flex flex-col gap-3 text-sm text-[var(--color-background)] sm:text-base">
                  <li>
                    <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 hover:underline">
                      <FiMail aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {EMAIL}
                    </a>
                  </li>
                  <li>
                    <a href={PHONE_HREF} className="inline-flex items-center gap-3 hover:underline">
                      <FiPhone aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {PHONE_LABEL}
                    </a>
                  </li>
                  <li className="inline-flex items-start gap-3">
                    <FiMapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                    {ADDRESS}
                  </li>
                </ul>

                <Link
                  href="/contact"
                  className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-background)] px-6 py-3 text-xs font-medium text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-heading)] hover:text-[var(--color-background)] sm:text-sm"
                >
                  Contact Us
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}