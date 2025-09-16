"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PrivacyPolicyPopup from "./PrivacyPolicy";

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-gray-900 py-16 px-6 sm:px-12 md:px-20 lg:px-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand and Description */}

          <div className="text-center sm:text-left space-y-6 flex flex-col items-center sm:items-start">
            <h3 className="text-2xl font-playfair font-bold text-white">
              Classic Event Planners
            </h3>

            <p className="text-gray-400 leading-relaxed font-inter max-w-sm">
              Celebrating love, family, and togetherness. We craft timeless
              memories where every bond shines brighter. 💍
            </p>

            <div className="space-y-3 text-gray-400 text-sm font-inter max-w-sm w-full">
              <p className="flex items-center space-x-3 justify-center sm:justify-start">
                <FaEnvelope className="inline-block" />
                <span>contact@classiceventplanners.com</span>
              </p>

              <p className="flex items-center space-x-3 justify-center sm:justify-start">
                <FaMapMarkerAlt className="inline-block" />
                <span>Bhopal, India</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          {/* Quick Links */}
          <div className="text-center sm:text-left space-y-4">
            <h4 className="text-lg font-semibold text-white mb-6  text-gray-400 ">
              Quick Links
            </h4>
            <ul className="space-y-3 font-inter text-sm max-w-xs mx-auto sm:mx-0  text-gray-400 ">
              <li>
                <Link
                  href="/"
                  className="hover:text-yellow-400 transition block px-2 py-1  text-gray-400 "
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-yellow-400 transition block px-2 py-1  text-gray-400 "
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-yellow-400 transition block px-2 py-1  text-gray-400 "
                >
                  Contact
                </Link>
              </li>
              <li>
                {/* Privacy Policy triggers modal */}
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="hover:text-yellow-400 transition text-left p-0 m-0 font-inter text-gray-400 w-full text-left block px-2 py-1 bg-transparent border-none"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-yellow-400 transition block px-2 py-1"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left space-y-4">
            <h4 className="text-lg font-semibold text-white mb-6">Follow Us</h4>
            <div className="flex justify-center sm:justify-start space-x-6 text-3xl max-w-xs mx-auto sm:mx-0">
              <a
                href="#"
                aria-label="Facebook"
                className="text-blue-700 hover:text-yellow-400 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-pink-700 hover:text-yellow-400 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-red-500 hover:text-yellow-400 transition"
              >
                <FaYoutube />
              </a>
            </div>
            <div className="flex justify-center sm:justify-start w-full">
              <Image
                src="/assets/logo1.png"
                alt="Classic Event Planners Logo"
                width={150}
                height={150}
                className="rounded-md"
                priority
              />
            </div>
          </div>

          {/* Newsletter / Subscribe Section */}
          <div className="text-center sm:text-left space-y-4 max-w-sm mx-auto sm:mx-0">
            <h4 className="text-lg font-semibold text-white mb-6">
              Stay Connected
            </h4>
            <p className="text-gray-400 font-inter text-sm">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 border-gray-400 text-white">
              <input
                type="email"
                placeholder="Your email address"
                className="p-3 rounded-md text- lex-grow border-amber-50"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md px-6 py-3 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 font-inter text-sm">
          &copy; {new Date().getFullYear()} Classic Event Planners. All Rights
          Reserved.
        </div>
      </footer>

      {/* Privacy Policy Popup Modal */}
      <PrivacyPolicyPopup
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />
    </>
  );
};

export default Footer;
