"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Component for the hero section
const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl group"
    >
      <motion.div
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full"
      >
        <Image
          src={"/assets/Our-team.jpg"}
          alt="About Us Banner"
          fill
          className="object-cover object-center transform transition duration-500 group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex items-end justify-center p-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-4xl sm:text-6xl font-bold text-center leading-tight drop-shadow-xl font-serif"
        >
          Crafting Your Perfect Moment
        </motion.h1>
      </div>
    </motion.div>
  );
};

// Component for a two-column section with an image and text
const TextWithImage = ({ title, content, imageUrl, altText, isReversed }) => {
  return (
    <div
      className={`grid gap-12 lg:grid-cols-2 items-center ${
        isReversed ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.5 }}
        className={`${isReversed ? "lg:col-start-2" : ""}`}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 font-serif"
        >
          {title}
        </motion.h2>
        {content.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed mb-4"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>

      {/* Next.js Image */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.5 }}
        className="relative w-full h-80 rounded-3xl shadow-xl overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover object-center transform transition duration-500 hover:scale-[1.02]"
        />
      </motion.div>
    </div>
  );
};

// Main App component
const AboutUs = () => {
  const whoWeAreContent = [
    "At Everlasting Events, we believe every celebration should be as unique as the love it honors. We are a team of passionate planners and designers dedicated to bringing your wedding vision to life with creativity, precision, and a personal touch.",
    "Our mission is to remove the stress from planning, allowing you to fully immerse yourselves in the joy of the journey towards your big day. We handle the logistics so you can focus on the memories.",
  ];

  const ourPhilosophyContent = [
    "Our philosophy is simple: authentic design and seamless execution. We begin by listening to your story, understanding your style, and then weaving those details into a cohesive and unforgettable event.",
    "From the grandest gestures to the smallest, most meaningful details, we ensure every element speaks to who you are as a couple.",
  ];

  const teamMembers = [
    {
      name: "Aman Rai",
      title: "Founder & Lead Planner",
      bio: "With over a decade of experience, Elara has a gift for transforming spaces and orchestrating unforgettable moments.",
      image: "/assets/aman.jpg",
    },
    {
      name: "Raj Rai",
      title: "Creative Director",
      bio: "Raj's expertise lies in bringing narratives to life through design. He thrives on finding unique elements and unexpected color palettes.",
      image: "/assets/raj.jpg",
    },
    {
      name: "Maria Santos",
      title: "Logistics Coordinator",
      bio: "The operational backbone of our team, Maria ensures every timeline runs like clockwork.",
      image: "/assets/user.jpg",
    },
  ];

  return (
    <main className="bg-gray-50 text-gray-800 font-sans min-h-screen p-8 md:p-16 mt-20">
      <div className="max-w-7xl mx-auto space-y-24">
        <Hero />
        <TextWithImage
          title="Who We Are"
          content={whoWeAreContent}
          imageUrl="/assets/planning.jpg"
          altText="Wedding planners collaborating in an office setting"
        />
        <TextWithImage
          title="Our Philosophy"
          content={ourPhilosophyContent}
          imageUrl="/assets/destinations.jpg"
          altText="A beautifully set table at a wedding reception"
          isReversed={true}
        />

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center space-y-12"
        >
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-semibold text-gray-800"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-gray-600"
            >
              Our dedicated professionals bring a wealth of experience, passion,
              and creative flair to every event.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover object-center border-4 border-white shadow-lg"
                  />
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-xl font-semibold text-gray-700 font-serif"
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-sm font-medium text-gray-500 mb-4"
                >
                  {member.title}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-sm text-gray-600"
                >
                  {member.bio}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default AboutUs;
