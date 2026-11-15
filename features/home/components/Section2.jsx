"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MotionConfig, animate, motion, useInView, useReducedMotion } from "framer-motion";

/* ---------- Static data (outside the component, so nothing is recreated on render) ---------- */
const EASE = [0.22, 1, 0.36, 1];

const CITIES = ["Noida", "Ghaziabad", "Greater Noida", "Delhi", "Gurugram"];

// Alternating image / stat tiles, same checkerboard as the reference design
const TILES = [
  { type: "image", src: "/home/s2/dummy1.jpg", alt: "Warm minimal living room with a low bench and plant" },
  { type: "stat", value: 15, suffix: "+", title: "Years of Experience", desc: "Shaping timeless interiors with unmatched creative expertise." },
  { type: "image", src: "/home/s2/dummy2.jpg", alt: "Open kitchen and lounge with warm ambient lighting" },
  { type: "stat", value: 400, suffix: "+", title: "Satisfied Clients", desc: "Built on exceptional client trust and lasting relationships." },
  { type: "stat", value: 250, suffix: "+", title: "Projects Completed", desc: "Delivering thoughtfully designed spaces for every kind of home." },
  { type: "image", src: "/home/s2/dummy3.jpg", alt: "Double-height living space with lounge chair" },
  { type: "stat", value: 5, suffix: "", title: "Cities Covered", desc: "Serving homes across Delhi NCR with the same care and quality." },
  { type: "image", src: "/home/s2/dummy4.jpg", alt: "Living room with large windows and mountain view" },
];

/* ---------- Animation variants ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const pop = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

const viewport = { once: true, amount: 0.2 };

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
      duration: 2.2,
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

/* ---------- Section ---------- */
function Section2() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="about-heading"
        className="relative w-full overflow-hidden bg-[var(--color-background)] py-16 sm:py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* ---------- Heading ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mx-auto flex max-w-2xl flex-col items-center text-center"
          >
            <motion.span
              variants={rise}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[var(--color-paragraph)] sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bronze)]" />
              Who We Are
            </motion.span>

            <motion.h2
              id="about-heading"
              variants={rise}
              className="mt-6 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Built on trust, <span className="italic text-[var(--color-bronze)]">crafted</span> with care
            </motion.h2>

            <motion.p
              variants={rise}
              className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-paragraph)] sm:text-lg"
            >
              For over a decade we have been designing, repairing and crafting furniture and interiors that
              feel personal, built through honest work and lasting client relationships.
            </motion.p>
          </motion.div>

          {/* ---------- Bento grid ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 sm:mt-16 sm:auto-rows-[260px] sm:gap-4 lg:auto-rows-[290px] lg:grid-cols-4 lg:gap-5"
          >
            {TILES.map((tile, i) =>
              tile.type === "image" ? (
                <motion.div
                  key={tile.src}
                  variants={pop}
                  className="group relative overflow-hidden rounded-2xl bg-[var(--color-surface)] sm:rounded-3xl"
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    quality={75}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-heading)]/15 to-transparent"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={tile.title}
                  variants={pop}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)]/70 bg-white/80 p-4 shadow-[0_10px_30px_-18px_rgba(51,45,39,0.25)] sm:rounded-3xl sm:p-6 lg:p-7"
                >
                  <span className="font-[family-name:var(--font-heading)] text-5xl font-medium leading-none text-[var(--color-heading)] sm:text-6xl lg:text-7xl">
                    <Counter to={tile.value} suffix={tile.suffix} />
                  </span>

                  <div>
                    <h3 className="font-[family-name:var(--font-body)] text-sm font-semibold text-[var(--color-heading)] sm:text-base">
                      {tile.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)] sm:text-sm">
                      {tile.desc}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          {/* ---------- Cities ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-10 flex flex-col items-center gap-5 sm:mt-14"
          >
            <motion.p
              variants={rise}
              className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]"
            >
              Cities We Serve
            </motion.p>

            <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {CITIES.map((city) => (
                <motion.li
                  key={city}
                  variants={rise}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-5 py-2.5 text-sm font-medium text-[var(--color-heading)] transition-colors duration-300 hover:border-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-[var(--color-button-text)] sm:px-6 sm:text-base"
                >
                  {city}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Section2;