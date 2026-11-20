"use client";

import Link from "next/link";
import { FiArrowUpRight, FiPhone } from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const PHONE_LABEL = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";
const EMAIL = "hello@atelierworkshop.com";

const SERVICES = [
  { title: "Sofa Repair", desc: "Restore comfort and shape", href: "/services/sofa-repair" },
  { title: "New Sofa", desc: "Custom-made, built to last", href: "/services/new-sofa" },
  { title: "Recliner Repair", desc: "Mechanisms, motors and fabric", href: "/services/recliner-repair" },
  { title: "New Recliner", desc: "Plush, smooth-reclining designs", href: "/services/new-recliner" },
  { title: "Dining Chair Repair", desc: "Joints, seats and finishes", href: "/services/dining-chair-repair" },
  { title: "New Dining Chair", desc: "Elegant sets for every table", href: "/services/new-dining-chair" },
];

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy" },
];

const SOCIALS = [
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/919876543210" },
];

function Footer() {
  return (
    <footer className="relative w-full bg-[#332D27] text-[#F4F0E8] border-t border-white/10 pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Direct Actions (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-medium tracking-tight text-[#F4F0E8]">
                Atelier<span className="text-[#9B795B]">.</span>
              </Link>
              <p className="mt-3 text-sm text-[#D6CCBE]/80 leading-relaxed max-w-sm">
                Master furniture repair, restoration, and bespoke custom craftsmanship built to endure across generations.
              </p>
            </div>

            {/* Direct Call & WhatsApp Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#9B795B] px-5 py-2.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-[#F4F0E8] hover:text-[#332D27]"
              >
                <FiPhone className="h-3.5 w-3.5" />
                Call ({PHONE_LABEL})
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-medium text-[#F4F0E8] transition-colors duration-300 hover:bg-white/10 hover:border-[#9B795B]"
              >
                <FaWhatsapp className="h-3.5 w-3.5 text-[#25D366]" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Services Links (Col 5-8) */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9B795B]">
              Our Craft & Services
            </h3>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group flex flex-col transition-colors duration-300 hover:text-[#9B795B]"
                  >
                    <span className="text-sm font-medium text-[#F4F0E8] group-hover:text-[#9B795B] flex items-center gap-1">
                      {service.title}
                      <FiArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-[-2px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </span>
                    <span className="text-[11px] text-[#D6CCBE]/60 truncate">
                      {service.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation & Direct Email (Col 9-12) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9B795B]">
                Navigation & Legal
              </h3>
              <ul className="mt-5 flex flex-col gap-2.5">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-[#F4F0E8]/90 transition-colors duration-300 hover:text-[#9B795B]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email Contact */}
            <div className="mt-8 lg:mt-0">
              <span className="text-[11px] uppercase tracking-wider text-[#D6CCBE]/60 block mb-1">
                 Email
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm font-medium text-[#F4F0E8] hover:text-[#9B795B] transition-colors duration-300 break-all"
              >
                {EMAIL}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Handles */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[#D6CCBE]/70">
            &copy; 2021 Atelier Workshop. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#F4F0E8] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9B795B] hover:bg-[#9B795B] hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;