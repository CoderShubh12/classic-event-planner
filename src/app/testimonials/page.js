"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Data for testimonials
const testimonials = [
  {
    name: "Jessica & David",
    text: "Our wedding was everything we dreamed of and more. Flawless Vows handled every detail with grace and professionalism.",
    image: "/assets/hands.jpg",
  },
  {
    name: "Anita & Raj",
    text: "Thanks to Classic Event Planner, our day was magical and stress-free. The team was super supportive and friendly throughout.",
    image: "/assets/bride.jpg",
  },
  {
    name: "Maya & Sam",
    text: "Highly recommend! Attention to detail made our wedding perfect and unforgettable. Fantastic experience from start to finish.",
    image: "/assets/jungle.jpg",
  },
  // Add more testimonials as needed...
];

const TestimonialCard = ({ name, text, video, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className="bg-indigo-50 rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4"
  >
    {image && (
      <Image
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover border-4 border-indigo-200 shadow"
        width={100}
        height={100}
      />
    )}

    {video && (
      <div className="w-full rounded-lg overflow-hidden shadow">
        <iframe
          src={video}
          title={name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-48"
        />
      </div>
    )}

    <p className="text-lg font-inter italic text-indigo-900 text-center">
      {text}
    </p>
    <p className="text-sm font-semibold text-indigo-700 text-center mt-2">
      — {name}
    </p>
  </motion.div>
);

const TestimonialPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 py-16 px-4 font-sans mt-20">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl font-playfair font-bold text-indigo-950 mb-6 text-center"
    >
      Client Testimonials
    </motion.h1>

    {/* Intro content */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-lg md:text-xl text-gray-700 font-inter text-center max-w-3xl mx-auto mb-12"
    >
      Over the years, we’ve been honored to serve countless couples and
      families. Their smiles and happiness are our biggest rewards. Here’s what
      our <span className="font-semibold text-indigo-800">happy clients</span>{" "}
      have to say about their special moments with us. 💖
    </motion.p>

    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {testimonials.map((testimonial, idx) => (
        <TestimonialCard key={idx} {...testimonial} />
      ))}
    </div>
  </div>
);

export default TestimonialPage;
