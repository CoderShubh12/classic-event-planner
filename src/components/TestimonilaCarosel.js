"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonialData = [
  {
    videoUrl: "/assets/vid4.mp4",
    quote:
      "Our wedding was everything we dreamed of and more. Flawless Vows handled every detail with such grace and professionalism.",
    author: "Jessica & David",
  },
  {
    videoUrl: "/assets/vid3.mp4",
    quote:
      "Thanks to Flawless Vows, our day was magical and stress-free. The team was super supportive and professional.",
    author: "Anita & Raj",
  },
  {
    videoUrl: "/assets/wed2.mp4",
    quote:
      "Highly recommend Flawless Vows! Their attention to detail made our wedding perfect and unforgettable.",
    author: "Maya & Sam",
  },
];

const AUTO_PLAY_INTERVAL = 6000;
const FADE_DURATION = 500; // fade duration in ms

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const timeoutRef = useRef();

  const length = testimonialData.length;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        const nextIndex = (index + 1) % length;
        setIndex(nextIndex);
        setFadeOut(false);
      }, FADE_DURATION);
    }, AUTO_PLAY_INTERVAL);

    return () => clearTimeout(timeoutRef.current);
  }, [index, length]);

  const nextSlide = () => {
    clearTimeout(timeoutRef.current);
    setFadeOut(true);
    setTimeout(() => {
      setIndex((index + 1) % length);
      setFadeOut(false);
    }, FADE_DURATION);
  };

  const prevSlide = () => {
    clearTimeout(timeoutRef.current);
    setFadeOut(true);
    setTimeout(() => {
      setIndex((index - 1 + length) % length);
      setFadeOut(false);
    }, FADE_DURATION);
  };

  const { videoUrl, quote, author } = testimonialData[index];

  return (
    <section
      className="relative bg-indigo-900 text-white flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden"
      style={{
        width: "100%",
        maxWidth: 900,
        margin: "auto",
        minHeight: 350,
        maxHeight: 400,
      }}
    >
      {/* Video Section with fixed aspect ratio */}
      <div
        className="w-full md:w-2/5 rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-indigo-800 relative"
        style={{ aspectRatio: "16 / 9", minHeight: 200 }}
      >
        <motion.video
          key={videoUrl}
          src={videoUrl}
          className={`w-full h-full object-cover rounded-lg absolute top-0 left-0 transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Testimonial Content */}
      <div
        className="w-full md:w-3/5 flex flex-col justify-center px-0 md:pl-10 mt-6 md:mt-0"
        style={{ minWidth: 0 }}
      >
        <div className="relative w-full h-36 md:h-40">
          {" "}
          {/* Fixed height container and relative positioning */}
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center md:items-start justify-center"
              style={{
                transformOrigin: "center center",
                willChange: "opacity",
              }}
            >
              <p className="text-lg md:text-xl font-playfair italic leading-relaxed drop-shadow-lg text-center md:text-left">
                “{quote}”
              </p>
              <p className="text-md md:text-lg font-semibold font-inter mt-4 text-center md:text-left">
                — {author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {/* <div className="flex justify-center md:justify-start mt-8 space-x-6">
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="bg-indigo-700 hover:bg-indigo-800 rounded-full p-3 transition"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="bg-indigo-700 hover:bg-indigo-800 rounded-full p-3 transition"
          >
            &gt;
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
