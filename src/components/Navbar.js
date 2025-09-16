// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to toggle navbar background opacity and shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 backdrop-blur-md
        ${
          scrolled
            ? "bg-cyan-950 bg-opacity-20 shadow-lg"
            : "bg-transparent bg-opacity-30"
        }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center text-white drop-shadow-md">
          <Image
            src="/assets/logo1.png"
            alt="Classic Event Planners Logo"
            width={80}
            height={50}
            priority
            className="object-contain rounded-md"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-10 text-white font-semibold">
          {[
            { href: "/", text: "Home" },
            { href: "/services", text: "Services" },
            { href: "/about", text: "About" },
            { href: "/testimonials", text: "Testimonials" },
            { href: "/contact-us", text: "Contact" },
          ].map(({ href, text }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-indigo-300 transition-colors duration-300"
            >
              {text}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden text-white hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.364 5.636a1 1 0 010 1.414L13.414 12l4.95 4.95a1 1 0 01-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 01-1.414-1.414L10.586 12 5.636 7.05a1 1 0 011.414-1.414l4.95 4.95 4.95-4.95a1 1 0 011.414 0z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 text-2xl font-semibold text-white transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {[
          { href: "/", text: "Home" },
          { href: "/services", text: "Services" },
          { href: "/about", text: "About" },
          { href: "/testimonials", text: "Testimonials" },
          { href: "/contact-us", text: "Contact" },
        ].map(({ href, text }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className="hover:text-indigo-300 px-4 py-2 rounded transition-colors duration-300"
          >
            {text}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
