"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PortfolioGrid from "@/components/PortFolioCard";
import TestimonialCarousel from "@/components/TestimonilaCarosel";
import Link from "next/link";
import Image from "next/image";

// Inline SVG Icons for a self-contained file
const HeartIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);
const CameraIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9a2 2 0 012-2h.931a2 2 0 001.664-.897l.865-1.536A2 2 0 0110.156 3h3.688a2 2 0 011.664.897l.865 1.536A2 2 0 0018.069 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const LocationIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// Custom Lazy Image Component with Skeleton Loader
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const currentImg = imgRef.current;
    if (!currentImg) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        currentImg.src = currentImg.dataset.src;
        observer.unobserve(currentImg);
      }
    });
    observer.observe(currentImg);

    return () => {
      if (currentImg) observer.unobserve(currentImg);
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
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
        width={500}
        height={300}
      />
    </div>
  );
};

// Main Homepage Component
const Homepage = () => {
  const testimonialsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);

  return (
    <div className="bg-white text-gray-800 font-sans overflow-x-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap");
            .font-playfair { font-family: 'Playfair Display', serif; }
            .font-inter { font-family: 'Inter', sans-serif; }
            body { overflow-x: hidden; }
          `,
        }}
      />

      {/* Hero Section */}
      <motion.section
        className="relative flex items-center justify-center text-white text-center min-h-screen sm:min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className=" absolute inset-0  w-auto min-w-full min-h-full max-w-none object-contain /* Mobile: fit inside without cropping */sm:object-cover     /* sm+ screens: cover entire area */"
        >
          <source src={"/assets/wed2.mp4"} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 w-full max-w-2xl sm:max-w-4xl mx-auto px-2">
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 drop-shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Your Dream Wedding, Flawlessly Planned
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl font-inter mb-4 sm:mb-8 drop-shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            We handle every detail so you can focus on the moments that matter
            most.
          </motion.p>
          <motion.button
            className="bg-white text-gray-800 font-inter font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg hover:bg-opacity-90 transition"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Plan Your Big Day
          </motion.button>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="min-h-[70vh] flex items-center bg-gray-50 py-8 px-2 sm:p-8 md:p-16">
        <div className="container mx-auto">
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-xl p-4 sm:p-8 mb-4 sm:mb-0 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeartIcon className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-2xl font-semibold font-inter mb-2">
                Full-Service Planning
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                From concept to execution, we manage every detail…
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-xl p-4 sm:p-8 mb-4 sm:mb-0 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <CameraIcon className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-2xl font-semibold font-inter mb-2">
                Day-Of Coordination
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Relax and enjoy your day. We will handle all logistics…
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-xl p-4 sm:p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <LocationIcon className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-2xl font-semibold font-inter mb-2">
                Destination Weddings
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Dreaming of a wedding abroad? We have the expertise…
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section with Lazy Loading */}
      <section className="min-h-[60vh] flex items-center py-8 px-2 sm:p-8 md:p-16">
        <PortfolioGrid />
      </section>

      {/* Testimonials Section with Parallax */}
      <section
        ref={testimonialsRef}
        className="relative min-h-[60vh] flex items-center justify-center py-8 px-2 sm:p-8 md:p-16 overflow-x-hidden bg-indigo-900 text-white"
      >
        <div className="absolute inset-0 z-0 bg-indigo-950" />
        <TestimonialCarousel />
        {/* <motion.div
          style={{ y }}
          className="absolute z-10 w-full max-w-lg sm:max-w-2xl text-center px-2 sm:px-0"
        > */}
        {/* <motion.p
            className="text-lg sm:text-2xl md:text-3xl font-playfair italic font-light mb-6 sm:mb-8 leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
          >
            “Our wedding was everything we dreamed of and more. Flawless Vows
            handled every detail with such grace and professionalism. It was
            truly the best day of our lives.”
          </motion.p>
          <motion.p
            className="text-base sm:text-lg md:text-xl font-semibold font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            — Jessica & David
          </motion.p>
        </motion.div> */}
      </section>

      {/* Call to Action Section */}
      <section className="min-h-[50vh] flex items-center bg-gray-50 py-8 px-2 sm:p-8 md:p-16">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Start Planning?
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg sm:max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in touch with us today for a complimentary consultation. We
            would love to hear about your vision.
          </motion.p>
          <Link href="/contact-us" passHref>
            <motion.p
              className="bg-indigo-600 text-white font-inter font-semibold py-2 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 inline-block text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Contact Us
            </motion.p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
