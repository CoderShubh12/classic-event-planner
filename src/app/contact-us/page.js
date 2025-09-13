"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaMapMarkerAlt } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { MdCelebration } from "react-icons/md";
import Image from "next/image";

// Custom Lazy Image Component with Skeleton Loader
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const currentImg = imgRef.current; // ✅ Copy the ref
    if (!currentImg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentImg.src = currentImg.dataset.src;
          observer.unobserve(currentImg);
        }
      },
      {
        rootMargin: "0px 0px 50px 0px",
      }
    );

    observer.observe(currentImg);

    return () => {
      if (currentImg) {
        observer.unobserve(currentImg); // ✅ Use the copied ref
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className} `}>
      {!loaded && (
        <div className="absolute inset-0 z-10 bg-gray-300 animate-pulse rounded-lg" />
      )}
      <Image
        ref={imgRef}
        data-src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        width={100}
        height={100}
      />
    </div>
  );
};

// Main App Component combining the page logic
const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitMessage, setSubmitMessage] = useState(null); // State for success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form Data Submitted:", formData);

    // Show a success message
    setSubmitMessage("Thank you for reaching out! We'll get back to you soon.");

    // Clear the message after a few seconds
    setTimeout(() => {
      setSubmitMessage(null);
    }, 5000);

    // Clear the form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 font-sans py-16 px-6 mt-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap');
            .font-playfair { font-family: 'Playfair Display', serif; }
            .font-inter { font-family: 'Inter', sans-serif; }
          `,
        }}
      />

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10 space-y-16">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-playfair font-bold text-indigo-900 mb-6 text-center"
        >
          Contact Us
        </motion.h1>

        {/* Success Message */}
        <AnimatePresence>
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl shadow-lg bg-green-500 text-white font-semibold"
            >
              {submitMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Why Should You Contact Us Section */}
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

        {/* Form and Contact Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-8 bg-indigo-50 p-8 rounded-2xl shadow-lg"
            noValidate
          >
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                placeholder: "Your full name",
              },
              {
                label: "Email Address",
                name: "email",
                type: "email",
                placeholder: "you@example.com",
              },
              {
                label: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "+91 98765 43210",
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name} className="flex flex-col">
                <label
                  htmlFor={name}
                  className="mb-2 font-semibold text-indigo-800"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700 transition"
                />
              </div>
            ))}

            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="mb-2 font-semibold text-indigo-800"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                className="border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition w-full"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info with Background Image */}
          <div className="flex-1 bg-cover bg-center rounded-2xl shadow-lg font-inter text-indigo-700 text-center lg:text-left flex flex-col justify-center p-8 relative overflow-hidden">
            {/* Optional translucent overlay */}
            <div className="absolute inset-0 bg-neutral-400 opacity-30 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-center lg:items-center h-full space-y-2">
              <h3 className="text-3xl font-playfair font-bold mb-4">
                Our Contact Info
              </h3>
              {/* Logo Image */}
              <LazyImage
                src={"/assets/logo.png"}
                alt="Your Logo"
                className="w-48 h-auto object-contain mb-6"
              />
              <p className="mb-2">Bhopal,Madhya Pradesh, India</p>
              <p>Aman Rai - 6266691018</p>
              <p>Raj Rai - 9302323727</p>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center font-inter mt-16"
        >
          <h2 className="text-3xl font-playfair font-bold mb-6 text-indigo-900">
            Review Us 🍃
          </h2>
          <p className="mb-4 text-indigo-700">
            We’d love your feedback on these platforms:
          </p>
          <div className="space-y-4">
            <a
              href="https://maps.app.goo.gl/7fUJRYrZq6g9HT2d6?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition"
            >
              <FaGoogle size={20} /> Google
            </a>

            <a
              href="https://jsdl.in/DT-17BDLRERUW9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-orange-50 text-orange-500 hover:bg-orange-100 transition"
            >
              <FaMapMarkerAlt size={20} /> Justdial
            </a>

            <a
              href="https://www.wedmegood.com/profile/Big-Wedding-Planners-24851024"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-pink-50 text-pink-500 hover:bg-pink-100 transition"
            >
              <GiBigDiamondRing size={20} /> WedMeGood
            </a>

            <a
              href="https://www.weddingbazaar.com/wedding-planners/bhopal/big-wedding-planners"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-green-50 text-green-600 hover:bg-green-100 transition"
            >
              <MdCelebration size={20} /> WeddingBazaar
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ContactUsPage;
