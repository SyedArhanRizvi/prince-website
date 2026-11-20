"use client";

import { useState } from "react";
import { MotionConfig, motion } from "framer-motion";

/* ---------- Types ---------- */
export interface FAQ {
  id: string | number;
  question: string;
  answer: string;
}

type FaqsProps = {
  /** Dynamic FAQ items: id, question and answer only */
  faqs?: FAQ[];
  /** Optional section heading text */
  eyebrow?: string;
  title?: string;
  description?: string;
};

/* ---------- Default (dummy) data, replace with dynamic data ---------- */
const DEFAULT_FAQS: FAQ[] = [
  {
    id: 1,
    question: "How do I know if my sofa can be repaired or needs replacing?",
    answer:
      "Most sofas can be repaired as long as the frame is sound. We inspect the frame, foam and fabric first, then tell you honestly whether repair or a new piece makes more sense for your budget and your home.",
  },
  {
    id: 2,
    question: "Do you collect and deliver the furniture?",
    answer:
      "Yes. We can arrange pickup and delivery, and smaller repairs can often be done at your home. Share your location when you enquire and we will confirm the best option for you.",
  },
  {
    id: 3,
    question: "Can I choose the fabric, colour and foam?",
    answer:
      "Absolutely. We show you fabric samples and explain the foam options, from firm to soft, so the finished piece matches both your room and the way you like to sit.",
  },
  {
    id: 4,
    question: "How long does a repair or a new sofa take?",
    answer:
      "It depends on the piece and the work involved. After we inspect your furniture or discuss your requirements, we give you a clear timeline before any work begins.",
  },
  {
    id: 5,
    question: "What does the 5 year guarantee cover?",
    answer:
      "Every repair and every new piece comes with a written guarantee. We explain exactly what is covered before you confirm the order, so there are no surprises later.",
  },
  {
    id: 6,
    question: "Do you also repair recliners and dining chairs?",
    answer:
      "Yes. We repair recliner mechanisms, motors and fabric, and dining chair joints, seats and finishes. We also build new recliners and dining chairs to order.",
  },
];

const DEFAULT_HEADING = {
  eyebrow: "FAQs",
  title: "Questions we hear often",
  description:
    "Quick answers about repairs, new furniture, materials and our guarantee. Cannot find yours? Just get in touch.",
};

/* ---------- Animation ---------- */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ---------- Single FAQ row ---------- */
function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonId = `faq-button-${faq.id}`;
  const panelId = `faq-panel-${faq.id}`;

  return (
    <motion.li
      variants={rowIn}
      className="border-b border-[var(--color-border)]"
    >
      <h3 className="text-xl leading-snug tracking-tight sm:text-2xl">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bronze)] sm:py-7"
        >
          <span
            className={`transition-colors duration-300 ${
              isOpen
                ? "text-[var(--color-bronze)]"
                : "text-[var(--color-heading)] group-hover:text-[var(--color-bronze)]"
            }`}
          >
            {faq.question}
          </span>

          {/* Plain plus / minus */}
          <span
            aria-hidden="true"
            className="relative mt-1.5 h-4 w-4 shrink-0 text-[var(--color-bronze)]"
          >
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
            <span
              className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-500 ${
                isOpen ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-xl pb-6 text-base leading-relaxed text-[var(--color-paragraph)] sm:pb-7 sm:pr-10">
            {faq.answer}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

/* ---------- Section ---------- */
function Faqs({
  faqs = DEFAULT_FAQS,
  eyebrow = DEFAULT_HEADING.eyebrow,
  title = DEFAULT_HEADING.title,
  description = DEFAULT_HEADING.description,
}: FaqsProps) {
  // All closed by default, so every row starts with the same height
  const [openIds, setOpenIds] = useState<Array<string | number>>([]);

  if (faqs.length === 0) return null;

  const toggle = (id: string | number) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  /* FAQ structured data helps these answers show up in search results */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label="Frequently asked questions"
        className="relative w-full bg-[var(--color-background)] pt-6 pb-20 sm:pb-28 lg:pb-32"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* ---------- Centered heading ---------- */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto flex max-w-2xl flex-col items-center text-center"
          >
            <motion.div variants={fade} className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--color-bronze)] sm:w-12" />
              <span className="text-xs font-medium tracking-[0.14em] text-[var(--color-bronze)]">
                {eyebrow}
              </span>
              <span className="h-px w-8 bg-[var(--color-bronze)] sm:w-12" />
            </motion.div>

            <h2 className="mt-5 text-4xl leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span variants={lineUp} className="block">
                  {title}
                </motion.span>
              </span>
            </h2>

            <motion.p
              variants={fade}
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg"
            >
              {description}
            </motion.p>
          </motion.div>

          {/*
            One grid, two equal columns. Grid items stretch by default, so both
            rows in a line always share the same height and width.
          */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid grid-cols-1 gap-x-10 sm:mt-14 md:grid-cols-2 lg:mt-16 lg:gap-x-16 xl:gap-x-24"
          >
            {faqs.map((faq) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                isOpen={openIds.includes(faq.id)}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Faqs;