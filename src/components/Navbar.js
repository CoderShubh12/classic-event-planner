"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-colors duration-500 bg-opacity-30 bg-cyan-950">
      <div className="container mx-auto px-1 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white drop-shadow-md">
          <Image
            src="/assets/logo1.png"
            alt="Classic Event Planners Logo"
            className="h-24 w-50 rounded-md"
            width={150}
            height={60} // 👈 ye add karo
            priority
          />
        </Link>

        {/* Mobile menu button and Desktop menu */}
        <div className="flex items-center">
          {/* Desktop menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-indigo-200 font-inter font-medium transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white hover:text-indigo-200 font-inter font-medium transition duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-indigo-200 font-inter font-medium transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-white hover:text-indigo-200 font-inter font-medium transition duration-300"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-white hover:text-indigo-200 font-inter font-medium transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-white hover:text-indigo-200 focus:outline-none focus:text-indigo-200 md:hidden ml-4"
            aria-label="toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Full-screen Mobile menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden absolute top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-90 flex flex-col justify-center items-center text-center space-y-8`}
        >
          <ul className="flex flex-col space-y-6 text-2xl">
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/"
                className="text-white hover:text-indigo-200 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/services"
                className="text-white hover:text-indigo-200 transition duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/about"
                className="text-white hover:text-indigo-200 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/testimonials"
                className="text-white hover:text-indigo-200 transition duration-300"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/contact-us"
                className="text-white hover:text-indigo-200 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
