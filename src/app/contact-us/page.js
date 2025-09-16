"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "Engagement Party",
  "Bridal Shower",
  "Baby Shower",
  "Anniversary Celebration",
  "Graduation Party",
  "Holiday Party",
  "Gala / Fundraiser",
  "Product Launch",
  "Conference / Seminar",
  "Festival / Fair",
  "Family Reunion",
  "Other",
];

// Simplified LazyImage Component
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 z-10 bg-gray-300 animate-pulse rounded-lg" />
      )}
      <Image
        src={src || ""}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover"
        width={150}
        height={150}
        loading="lazy"
        unoptimized
      />
    </div>
  );
};

const ContactUsPage = () => {
  const [existingInquiries, setExistingInquiries] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Fetch existing inquiries on mount for duplicate checking
  useEffect(() => {
    async function fetchInquiries() {
      try {
        const res = await fetch("/api/contact-us");
        const json = await res.json();
        if (json.success) {
          setExistingInquiries(json.data);
        }
      } catch (err) {
        // Ignore fetch errors silently or handle as needed
      }
    }
    fetchInquiries();
  }, []);

  // Validation schema with duplicate checks
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required")
      .test(
        "unique-email",
        "This email is already registered.",
        function (value) {
          if (!value) return true;
          const email = value.trim().toLowerCase();
          return !existingInquiries.some(
            (i) => i.email.toLowerCase() === email
          );
        }
      ),
    phone: yup
      .string()
      .trim()
      .matches(
        /^[6-9]\d{9}$/,
        "Enter a valid 10-digit Indian mobile number starting with 6-9"
      )
      .required("Phone is required")
      .test(
        "unique-phone",
        "This phone number is already registered.",
        function (value) {
          if (!value) return true;
          const phone = value.trim();
          return !existingInquiries.some((i) => i.phone === phone);
        }
      ),
    message: yup.string().trim(),
    category: yup
      .string()
      .oneOf(categories)
      .required("Please select a category"),
    notes: yup.string().trim(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit form");
      }
      setSubmitted(true);
      reset();
      // Refresh inquiries list
      const updatedData = await fetch("/api/contact-us").then((r) => r.json());
      if (updatedData.success) setExistingInquiries(updatedData.data);

      // After 4 seconds, hide thank you and allow new submit
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 font-sans py-16 px-6 mt-20">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10 space-y-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-playfair font-bold text-indigo-900 mb-6 text-center"
        >
          Contact Us
        </motion.h1>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-indigo-700 font-inter text-lg max-w-3xl mx-auto leading-relaxed text-center"
        >
          <h2 className="text-3xl font-semibold mb-6">
            Why Should You Contact Us?
          </h2>
          <p>
            Planning a wedding can be overwhelming. With Big Wedding Planners,
            you gain a trusted partner who understands your vision and brings it
            to life with creativity, passion, and meticulous attention to
            detail. Whether you want a grand celebration or an intimate
            gathering, our expert team is here to guide, support, and manage
            every step so you can truly enjoy your special day.
          </p>
          <p className="mt-4">
            Reach out to us for personalized consultations, tailored solutions,
            and to start a seamless journey towards creating unforgettable
            memories.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 space-y-6 bg-indigo-50 p-8 rounded-2xl shadow-lg"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-semibold text-indigo-800"
              >
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                {...register("name")}
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your full name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="name-error"
              />
              {errors.name && (
                <p className="text-red-600 mt-1 text-sm" id="name-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-semibold text-indigo-800"
              >
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                {...register("email")}
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="you@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p className="text-red-600 mt-1 text-sm" id="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 font-semibold text-indigo-800"
              >
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                id="phone"
                {...register("phone")}
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="9876543210"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby="phone-error"
              />
              {errors.phone && (
                <p className="text-red-600 mt-1 text-sm" id="phone-error">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block mb-1 font-semibold text-indigo-800"
              >
                Category <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                {...register("category")}
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.category ? "true" : "false"}
                aria-describedby="category-error"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-600 mt-1 text-sm" id="category-error">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-semibold text-indigo-800"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message")}
                className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700"
                placeholder="Write your message here (optional)"
              />
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block mb-1 font-semibold text-indigo-800"
              >
                Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                {...register("notes")}
                className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700"
                placeholder="Additional notes (optional)"
              />
            </div>

            {/* Submit Button */}
            {!submitted ? (
              <button
                type="submit"
                disabled={isSubmitting || isSubmitSuccessful}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded px-6 py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-green-600 font-semibold text-lg p-4 bg-green-100 rounded-lg"
              >
                🙏 Thank you for contacting us! We will get back to you soon.
              </motion.div>
            )}
          </form>

          {/* Contact Info Section */}
          <div className="flex-1 bg-cover bg-center rounded-2xl shadow-lg font-inter text-indigo-700 text-center lg:text-left flex flex-col justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-400 opacity-30 rounded-2xl"></div>
            <div className="relative z-10 flex flex-col items-center lg:items-center h-full space-y-2">
              <h3 className="text-3xl font-playfair font-bold mb-4">
                Our Contact Info
              </h3>
              <LazyImage
                src="/assets/logo.png"
                alt="Your Logo"
                className="w-40 h-auto object-contain mb-6"
              />
              <p className="mb-2">Bhopal, Madhya Pradesh, India</p>
              <p>Aman Rai - 6266691018</p>
              <p>Raj Rai - 9302323727</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ContactUsPage;
