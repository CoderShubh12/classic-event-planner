// app/components/AnimatedSection.js
"use client";
import { motion } from "framer-motion";

export default function AnimatedSection() {
  return (
    <section className="min-h-[50vh] flex items-center bg-gray-50 py-8 px-2 sm:p-8 md:p-16">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Start Planning?
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg sm:max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Get in touch with us today for a complimentary consultation. We would
          love to hear about your vision.
        </motion.p>
        {/* Button code here */}
      </div>
    </section>
  );
}
