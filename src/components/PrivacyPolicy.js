"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const PrivacyPolicyPopup = ({ isOpen, onClose }) => {
  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-policy-title"
            aria-describedby="privacy-policy-description"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl max-h-[80vh] overflow-y-auto p-8 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close privacy policy modal"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
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
              </button>

              <h2
                id="privacy-policy-title"
                className="text-3xl font-bold mb-6 text-indigo-900"
              >
                Privacy Policy
              </h2>

              <div
                id="privacy-policy-description"
                className="space-y-5 text-gray-700 leading-relaxed text-sm sm:text-base"
              >
                <p>
                  Your privacy is important to us. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information
                  when you visit our website.
                </p>
                <p>
                  By using our site, you consent to the practices described in
                  this policy.
                </p>
                <h3 className="font-semibold mt-6 mb-2">
                  Information We Collect
                </h3>
                <p>
                  We may collect personal information such as your name, email,
                  and contact details when you submit forms or subscribe to our
                  newsletter.
                </p>
                <h3 className="font-semibold mt-6 mb-2">
                  How We Use Your Information
                </h3>
                <p>
                  Your information helps us respond to inquiries, improve our
                  services, send updates, and comply with legal obligations.
                </p>
                <h3 className="font-semibold mt-6 mb-2">
                  Cookies and Tracking
                </h3>
                <p>
                  We use cookies to enhance user experience and gather
                  analytics. You can control cookie preferences in your browser
                  settings.
                </p>
                <h3 className="font-semibold mt-6 mb-2">
                  Third-Party Services
                </h3>
                <p>
                  We may share information with trusted third parties for
                  marketing, analytics, and operational purposes, all in
                  compliance with applicable laws.
                </p>
                <h3 className="font-semibold mt-6 mb-2">Your Rights</h3>
                <p>
                  You have the right to access, correct, or delete your personal
                  data. Contact us anytime to exercise these rights.
                </p>

                <p className="mt-8 text-xs text-gray-400 italic">
                  Last updated: September 13, 2025
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicyPopup;
