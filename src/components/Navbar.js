"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    setIsOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
    { href: "/about", text: "About" },
    { href: "/testimonials", text: "Testimonials" },
    { href: "/contact-us", text: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 backdrop-blur-md ${
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
          {navItems.map(({ href, text }) => (
            <Link
              key={href}
              href={href}
              // className="hover:text-indigo-300 transition-colors duration-300"
              className="w-full md:w-auto text-center px-6 py-3 rounded-lg text-lg md:text-base font-semibold
  bg-indigo-900 bg-opacity-85 backdrop-blur-lg text-white shadow-lg
  hover:bg-cyan-700 hover:text-yellow-300 transition-colors duration-200"
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
      {/* Improved mobile menu with custom background */}
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 flex flex-col items-center justify-center
    transition-all duration-300 z-40
    ${
      isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
        style={{
          background:
            "linear-gradient(145deg, rgba(10,36,99,0.95) 70%, rgba(25,192,212,0.92) 100%)",
          backdropFilter: "blur(6px)",
          paddingTop: "64px",
        }}
        ref={mobileMenuRef}
      >
        {/* Close button at top-right inside menu */}
        {/* <button
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          className="absolute top-4 right-4 text-white hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}

        {isOpen &&
          navItems.map(({ href, text }) => (
            <Link
              key={href}
              href={href}
              onClick={handleLinkClick}
              className="w-full max-w-xs text-center px-4 py-2 my-1 rounded text-lg font-medium hover:bg-cyan-800 hover:text-indigo-300 transition-colors duration-200 bg-gray-800 bg-opacity-40 text-white"
            >
              {text}
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
