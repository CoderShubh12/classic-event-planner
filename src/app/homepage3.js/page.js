// app/page.js
"use client";

import React, { useRef, Suspense } from "react";
import Image from "next/image";

import { motion, useScroll, useTransform } from "framer-motion";
import TestimonialCarousel from "@/components/TestimonilaCarosel";
import PortfolioGrid from "@/components/PortFolioCard";
import { HiHeart, HiCamera, HiLocationMarker } from "react-icons/hi";
import Link from "next/link";

export default function HomePage3() {
  // Switch between image and video background
  const useVideo = true;
  const videoSrc = "/assets/wed2.mp4";
  const imageSrc = "/assets/couple.jpg";

  // Parallax effect for heading
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 90]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 ">
      <div
        ref={containerRef}
        className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
      >
        {useVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover brightness-80 z-0"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={imageSrc}
            alt="Wedding background"
            fill
            priority
            placeholder="blur"
            className="object-cover brightness-80 z-0"
          />
        )}

        {/* Animated overlay headline and text without backdrop */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 sm:px-8 text-center max-w-[100vw] sm:max-w-3xl mx-auto z-10 select-none">
          <motion.h1
            style={{ y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-20 sm:mb-20 leading-snug sm:leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] whitespace-normal px-4 text-center max-w-full sm:max-w-3xl mx-auto"
          >
            Dream Weddings & Events, Perfectly Planned
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-4 max-w-full sm:max-w-xl mx-auto mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] px-4 text-center leading-relaxed"
          >
            Let us turn your special day or event into a magical, unforgettable
            celebration.
          </motion.p>

          <motion.a
            href="/contact-us"
            whileHover={{ scale: 1.06, boxShadow: "0 2px 20px #D946EF99" }}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded shadow-lg transition-all inline-block"
          >
            Start Your Journey
          </motion.a>
        </div>
      </div>

      {/* Universal container for all sections below video for consistent width and centering */}
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Services Section */}
        {/* Animated Services Section */}
        <section className="min-h-[70vh] flex items-center bg-gray-50 py-8 px-2 sm:p-8 md:p-16 mt-10">
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
                className="bg-white rounded-lg shadow-xl p-4 sm:p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <HiHeart className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-lg sm:text-2xl font-semibold font-inter mb-2">
                  Full-Service Planning
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  From concept to execution, we manage every detail…
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-lg shadow-xl p-4 sm:p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <HiCamera className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 mx-auto mb-4" />
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
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <HiLocationMarker className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 mx-auto mb-4" />
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
        {/* Animated Portfolio Section */}
        <section className="min-h-[60vh] flex items-center py-8 sm:py-16 mt-10 rounded-xl shadow-md bg-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <PortfolioGrid />
          </motion.div>
        </section>

        {/* Testimonials Section with background & border */}
        <section className="relative w-full py-14 px-4 bg-white rounded-xl shadow-md border border-pink-200 mt-10">
          <Suspense
            fallback={
              <div className="w-full h-48 flex items-center justify-center">
                <div className="animate-pulse w-20 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="animate-pulse w-40 h-4 bg-gray-200 rounded"></div>
              </div>
            }
          >
            <TestimonialCarousel />
          </Suspense>
        </section>

        {/* Call to Action with entrance animation */}
        <section className="min-h-[50vh] flex items-center bg-gray-50 py-8 sm:py-16 rounded-xl shadow-md mt-10 mb-20 px-4">
          <div className="container mx-auto text-center">
            <motion.h2
              className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-6 text-pink-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Start Planning?
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg sm:max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Get in touch with us today for a complimentary consultation. We
              would love to hear about your vision.
            </motion.p>
            <Link href="/contact-us" passHref>
              <motion.p
                className="bg-indigo-600 text-white font-inter font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 inline-block text-center cursor-pointer"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Contact Us
              </motion.p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
