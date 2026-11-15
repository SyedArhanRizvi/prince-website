"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const default_faqs = [
  {
    id: 1,
    quetion: "How do I know if my old sofa is worth repairing or buying new?",
    ans: "If your kiln-dried hardwood frame is solid, repairing is more sustainable and cost-effective. We rebuild springs, foam, and upholstery to better-than-new condition.",
  },
  {
    id: 2,
    quetion: "What is the typical turnaround time for sofa restoration?",
    ans: "Standard sofa repair and reupholstery takes between 5 to 7 business days from pickup to delivery.",
  },
  {
    id: 3,
    quetion: "Do you offer home pickup and delivery across Delhi NCR?",
    ans: "Yes, complimentary home inspection, pickup, and redelivery across Delhi, Noida, Greater Noida, Gurugram, and Ghaziabad.",
  },
  {
    id: 4,
    quetion: "Can I choose my own fabrics and leathers?",
    ans: "We bring a catalog of over 500+ performance options—including spill-resistant velvet and Italian top-grain leathers—directly to your home.",
  },
  {
    id: 5,
    quetion: "How long to handcraft a custom sofa from scratch?",
    ans: "Custom furniture built strictly to your room dimensions takes between 14 to 21 business days.",
  },
  {
    id: 6,
    quetion: "Can you fix jammed motors on motorized recliners?",
    ans: "Yes, we diagnose and replace faulty actuators and mechanisms using heavy-duty OEM parts.",
  },
  {
    id: 7,
    quetion: "What warranty do you provide on custom builds and repairs?",
    ans: "We offer a 5 to 10-year structural warranty on wooden frames and 2 to 5 years on foam resilience and mechanisms.",
  },
  {
    id: 8,
    quetion: "Can wobbly dining chairs and split cane seats be restored?",
    ans: "Yes, we reinforce mortise joints with industrial epoxy and hand-weave fresh natural cane.",
  },
  {
    id: 9,
    quetion: "Is the initial home inspection and quote free?",
    ans: "Yes, home inspection, fabric presentation, and workshop quotations are 100% free with zero obligation.",
  },
  {
    id: 10,
    quetion: "What payment methods and deposit structures do you accept?",
    ans: "We accept all digital payments, UPI, and cards. Custom orders require a modest advance, with the balance due upon delivery.",
  },
  {
    id: 11,
    quetion: "Are your upholstery fabrics pet-friendly?",
    ans: "Yes, tight-weave performance fabrics resist pet claws and feature nanotechnology spill protection.",
  },
  {
    id: 12,
    quetion: "How can I share photos for a quick preliminary estimate?",
    ans: "Send photos or video clips directly via WhatsApp, and our workshop lead will give you an immediate rough quote.",
  },
];

function FaqCard({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-[#3E372F] border-[var(--color-bronze)] shadow-lg"
          : "bg-white/[0.03] border-white/10 hover:border-[var(--color-bronze)]/50"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
      >
        <span className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-medium text-[#F4F0E8] leading-snug">
          {faq.quetion}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
            isOpen
              ? "rotate-180 border-[var(--color-bronze)] bg-[var(--color-bronze)] text-white"
              : "border-white/20 bg-white/5 text-[#F4F0E8]"
          }`}
        >
          <FiChevronDown className="h-3.5 w-3.5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm leading-relaxed text-[#D6CCBE] border-t border-white/10 pt-3">
              {faq.ans}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faqs({ faqs = default_faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="relative w-full bg-[#332D27] py-16 sm:py-24 text-[#F4F0E8]"
    >
      {/* Top subtle hairline rule */}
      <div className="absolute top-0 left-5 right-5 sm:left-8 sm:right-8 lg:left-12 lg:right-12 h-px bg-white/15 opacity-70" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#9B795B]">
            <span className="h-px w-6 bg-[#9B795B]" />
            Frequently Asked Questions
            <span className="h-px w-6 bg-[#9B795B]" />
          </span>

          <h2
            id="faqs-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight !text-[#F4F0E8] leading-[1.12]"
          >
            Everything you need to know about our{" "}
            <span className="italic text-[#9B795B]">workshop</span>
          </h2>
        </div>

        {/* Compact 2-Column Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {faqs.map((faq, index) => (
            <FaqCard
              key={faq.id || index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faqs;