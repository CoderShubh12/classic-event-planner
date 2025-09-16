import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => (
  <motion.section
    className="relative flex items-center justify-center text-white text-center min-h-screen overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
  >
    {/* Image background */}
    <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/wed2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-[#1A2540] opacity-60"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-8 md:p-12 bg-opacity-90 rounded-3xl shadow-2xl max-w-5xl mx-auto backdrop-blur-sm"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#F8F4E3] leading-tight"
        >
          Your Ultimate Event Planning Companion
        </motion.h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#D4C9A2] max-w-3xl mx-auto">
          Discover and book the best vendors for your events, all in one
          seamless platform.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <Link
              href="/vendors"
              className="inline-block w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-[#1A2540] bg-[#E5A84F] hover:bg-[#D49841] transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Explore Vendors
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <Link
              href="/blog"
              className="inline-block w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-[#F8F4E3] border-2 border-[#F8F4E3] hover:bg-[#F8F4E3] hover:text-[#2D3A5F] transition-all duration-300 transform hover:scale-105"
            >
              Read Our Blog
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>

    {/* Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-40" />

    {/* Content */}
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
        We handle every detail so you can focus on the moments that matter most.
      </motion.p>

      <motion.a
        href="#contact"
        className="bg-white text-gray-800 font-inter font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg hover:bg-opacity-90 transition"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        Plan Your Big Day
      </motion.a>
    </div>
  </motion.section>
);

export default HeroSection;
