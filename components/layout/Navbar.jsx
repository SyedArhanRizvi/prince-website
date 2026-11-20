"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiMenu,
  FiPhone,
  FiX,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const BRAND = "Elara";
const PHONE_LABEL = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";

/* Scroll behaviour */
const SHOW_ALWAYS_BELOW = 80; // px from top where the navbar is always visible
const SCROLL_THRESHOLD = 8; // ignore tiny scroll movements (trackpad jitter)

const SERVICE_CATEGORIES = [
  {
    category: "New Custom Furniture",
    items: [
      { title: "New Sofa", desc: "Custom-made, built to last", href: "/new-sofa" },
      { title: "New Bed", desc: "Sturdy, custom-crafted bed frames", href: "/new-bed" },
      { title: "New Highback Chair", desc: "Ergonomic and statement seating", href: "/new-highback-chair" },
      { title: "New Dining Chair", desc: "Elegant sets for every table", href: "/new-dining-chair" },
      { title: "New Recliner", desc: "Plush, smooth-reclining designs", href: "/new-recliner" },
    ],
  },
  {
    category: "Repair & Upholstery",
    items: [
      { title: "Sofa Repair", desc: "Restore comfort, foam, and shape", href: "/sofa-repair" },
      { title: "Sofa-Cum-Bed Repair", desc: "Folding frames, hinges, and fabric", href: "/sofa-cum-bed-repair" },
      { title: "Bed Repair", desc: "Frame reinforcement, headboards, and polish", href: "/bed-repair" },
      { title: "Highback Chair Repair", desc: "Cushioning, upholstery, and frame fixes", href: "/highback-chair-repair" },
      { title: "Dining Chair Repair", desc: "Joints, seats, and finishes", href: "/dining-chair-repair" },
      { title: "Recliner Repair", desc: "Mechanisms, motors, and fabric", href: "/recliner-repair" },
    ],
  },
];

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // Transparent only on the home page (over the hero) before scrolling
  const isHome = pathname === "/";
  const solid = scrolled || mobileOpen || !isHome;

  // Never hide while a menu is open
  const hideNav = hidden && !mobileOpen && !dropdownOpen;

  // Highlight "Services" if current path matches any service href
  const isServiceActive =
    pathname.startsWith("/services") ||
    SERVICE_CATEGORIES.some((group) =>
      group.items.some((item) => pathname === item.href)
    );

  /* ---------- Hover dropdown (with small delay so it never flickers) ---------- */
  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  /* ---------- Scroll state: solid background + hide on scroll down / show on scroll up ---------- */
  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 20);

      // Ignore iOS rubber-band overscroll at the top and bottom
      if (y >= 0 && y <= maxY) {
        const delta = y - lastY.current;

        if (y < SHOW_ALWAYS_BELOW) {
          setHidden(false);
          lastY.current = y;
        } else if (delta > SCROLL_THRESHOLD) {
          setHidden(true); // scrolling down
          lastY.current = y;
        } else if (delta < -SCROLL_THRESHOLD) {
          setHidden(false); // scrolling up
          lastY.current = y;
        }
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- Close everything on route change ---------- */
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
    setHidden(false);
  }, [pathname]);

  /* ---------- Lock body scroll when mobile menu is open ---------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---------- Close mobile menu when resizing to desktop ---------- */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ---------- Escape key + outside click ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      clearTimeout(closeTimer.current);
    };
  }, []);

  /* ---------- Shared styles ---------- */
  const linkBase = `relative text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
    solid
      ? "text-[var(--color-heading)] hover:text-[var(--color-bronze)]"
      : "text-[var(--color-background)]"
  }`;

  const iconBtn = `inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 ${
    solid
      ? "border-[var(--color-border)] text-[var(--color-heading)] hover:bg-[var(--color-surface)]"
      : "border-[var(--color-background)]/30 text-[var(--color-background)] hover:bg-[var(--color-background)]/15"
  }`;

  const callBtn = `lg:inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ${
    solid
      ? "border-transparent bg-[var(--color-button)] text-[var(--color-button-text)] hover:bg-[var(--color-button-hover)]"
      : "border-[var(--color-background)]/40 text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-heading)]"
  }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: hideNav ? "-100%" : "0%" }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.55,
        ease: EASE,
      }}
      onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        solid
          ? `border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-md ${
              hideNav ? "shadow-none" : "shadow-[0_1px_30px_rgba(51,45,39,0.06)]"
            }`
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto] items-center px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12"
      >
        {/* ================= LEFT: Brand ================= */}
        <Link
          href="/"
          aria-label={`${BRAND} home`}
          className={`flex items-baseline gap-2 justify-self-start transition-colors duration-300 ${
            solid ? "text-[var(--color-heading)]" : "text-[var(--color-background)]"
          }`}
        >
          <span className="font-[family-name:var(--font-heading)] text-[1.75rem] font-semibold leading-none tracking-tight sm:text-3xl">
            {BRAND}
            <span className="text-[var(--color-bronze)]">.</span>
          </span>
          <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.3em] opacity-80 sm:inline">
            Interiors
          </span>
        </Link>

        {/* ================= CENTER: Links (Desktop) ================= */}
        <ul className="hidden items-center gap-10 lg:flex">
          {/* Services + Categorized Mega Dropdown */}
          <li
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setDropdownOpen(false);
            }}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((v) => !v)}
              className={`${linkBase} inline-flex items-center gap-1.5 ${
                dropdownOpen || isServiceActive ? "after:scale-x-100" : ""
              }`}
            >
              Services
              <FiChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  style={{ x: "-50%" }}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="absolute left-1/2 top-full w-[46rem] max-w-[92vw] pt-5"
                >
                  <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-5 shadow-[0_24px_60px_-20px_rgba(51,45,39,0.35)]">
                    <div className="grid grid-cols-2 divide-x divide-[var(--color-border)]">
                      {SERVICE_CATEGORIES.map((group, idx) => (
                        <div
                          key={group.category}
                          className={idx === 0 ? "pr-4" : "pl-4"}
                        >
                          <p className="mb-2.5 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-bronze)]">
                            {group.category}
                          </p>
                          <ul className="flex flex-col gap-0.5">
                            {group.items.map((s) => (
                              <li key={s.href}>
                                <Link
                                  href={s.href}
                                  onClick={() => setDropdownOpen(false)}
                                  className="group flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-[var(--color-surface)]"
                                >
                                  <span className="flex flex-col">
                                    <span className="font-[family-name:var(--font-heading)] text-lg font-medium leading-snug text-[var(--color-heading)]">
                                      {s.title}
                                    </span>
                                    <span className="mt-0.5 text-xs text-[var(--color-muted)]">
                                      {s.desc}
                                    </span>
                                  </span>
                                  <FiArrowUpRight
                                    aria-hidden="true"
                                    className="mt-1 h-4 w-4 shrink-0 -translate-x-1 translate-y-1 text-[var(--color-bronze)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] px-3 pt-3.5 text-sm">
                      <span className="text-[var(--color-muted)]">
                        Not sure what you need?
                      </span>
                      <Link
                        href="/contact-us"
                        onClick={() => setDropdownOpen(false)}
                        className="font-medium text-[var(--color-bronze)] transition-colors hover:text-[var(--color-heading)]"
                      >
                        Get a free quote
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                className={`${linkBase} ${
                  pathname.startsWith(l.href) ? "after:scale-x-100" : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ================= RIGHT: Call + Hamburger ================= */}
        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          {/* Desktop call button */}
          <a href={PHONE_HREF} className={`${callBtn} hidden lg:inline-flex`}>
            <FiPhone aria-hidden="true" className="h-4 w-4" />
            <span>{PHONE_LABEL}</span>
          </a>

          {/* Mobile/Tablet call icon */}
          <a
            href={PHONE_HREF}
            aria-label={`Call us at ${PHONE_LABEL}`}
            className={`${iconBtn} lg:hidden`}
          >
            <FiPhone aria-hidden="true" className="h-[18px] w-[18px]" />
          </a>

          {/* Hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={`${iconBtn} lg:hidden`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: reduceMotion ? 0 : -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: reduceMotion ? 0 : 90 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {mobileOpen ? (
                  <FiX aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <FiMenu aria-hidden="true" className="h-5 w-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ================= MOBILE & TABLET MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-background)] lg:hidden"
          >
            <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto px-5 pb-8 pt-2 sm:px-8">
              <ul className="flex flex-col">
                {/* Services Accordion */}
                <li className="border-b border-[var(--color-border)]">
                  <button
                    type="button"
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-5 text-left font-[family-name:var(--font-heading)] text-3xl font-medium text-[var(--color-heading)]"
                  >
                    Services
                    <FiChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 text-[var(--color-bronze)] transition-transform duration-300 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        id="mobile-services"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 ml-1 flex flex-col gap-6 border-l border-[var(--color-border)] pl-4 sm:grid sm:grid-cols-2 sm:gap-6">
                          {SERVICE_CATEGORIES.map((group) => (
                            <div key={group.category}>
                              <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-bronze)]">
                                {group.category}
                              </p>
                              <ul className="flex flex-col gap-0.5">
                                {group.items.map((s) => (
                                  <li key={s.href}>
                                    <Link
                                      href={s.href}
                                      className="flex items-center justify-between rounded-lg py-2 pr-2 text-base text-[var(--color-paragraph)] transition-colors hover:text-[var(--color-bronze)]"
                                    >
                                      <span>{s.title}</span>
                                      <FiArrowUpRight
                                        aria-hidden="true"
                                        className="h-4 w-4 shrink-0 text-[var(--color-muted)]"
                                      />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {LINKS.map((l) => (
                  <li key={l.href} className="border-b border-[var(--color-border)]">
                    <Link
                      href={l.href}
                      className="block py-5 font-[family-name:var(--font-heading)] text-3xl font-medium text-[var(--color-heading)] transition-colors hover:text-[var(--color-bronze)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={PHONE_HREF}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-button)] px-6 py-4 text-base font-medium tracking-wide text-[var(--color-button-text)] transition-colors duration-300 hover:bg-[var(--color-button-hover)]"
              >
                <FiPhone aria-hidden="true" className="h-4 w-4" />
                Call {PHONE_LABEL}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;