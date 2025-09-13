"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const serviceData = [
  {
    title: "Full-service Wedding Planning & Coordination",
    desc: "From concept to completion, we ensure your day is flawless and stress-free.",
    img: "/assets/bride.jpg",
  },
  {
    title: "Customized Wedding Decorations",
    desc: "Unique, theme-based décor to match your vision — Royal, Minimalist, Boho, Floral & more.",
    img: "/assets/deco3.jpg",
  },
  {
    title: "Venue Selection & Vendor Management",
    desc: "We find the perfect location and manage trusted vendors to bring your dream wedding to life.",
    img: "/assets/venue.jpg",
  },
  {
    title: "Guest Hospitality & Logistics",
    desc: "Seamless guest management and on-day logistics to keep your event running smoothly.",
    img: "/assets/hospitality1.jpg",
  },
  {
    title: "Destination Wedding ",
    desc: "Stunning wedding destinations across India covered with expert planning and execution.",
    img: "/assets/destinations.jpg",
  },
];

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 font-sans mt-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-indigo-900 mb-6 font-playfair"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-indigo-600 max-w-2xl font-inter leading-relaxed"
        >
          As one of the{" "}
          <span className="font-semibold text-indigo-700">
            top-rated wedding planners in Bhopal
          </span>
          ,Classic Event Planners brings together creativity, organization, and
          passion. Whether you’re looking for{" "}
          <span className="font-semibold text-indigo-700">
            destination wedding planning
          </span>
          , <span className="font-semibold text-indigo-700">luxury décor</span>,
          or{" "}
          <span className="font-semibold text-indigo-700">
            budget-friendly celebrations
          </span>
          , we’ve got it covered.
        </motion.p>
      </section>

      {/* Services Details Section */}
      <section className="py-16 px-6 bg-white rounded-t-3xl shadow-lg max-w-6xl mx-auto mt-10">
        <motion.h2
          className="text-3xl md:text-4xl font-playfair font-bold text-center text-indigo-900 mb-12 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Our Services Include
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {serviceData.map(({ title, desc, img }, idx) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.05 }}
              className="bg-indigo-50 p-6 rounded-2xl shadow-md text-center cursor-pointer flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Image
                src={img}
                alt={title}
                className="w-40 h-32 object-cover rounded-sm mb-2 shadow-lg"
                width={300}
                height={400}
              />
              <h3 className="text-2xl font-semibold text-indigo-800 mb-6 font-inter tracking-wide">
                {title}
              </h3>
              <p className="text-indigo-600 font-inter leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center mt-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8 font-playfair tracking-tight"
        >
          Because you and your family deserve more than services — <br />
          You deserve a bond.
        </motion.h2>
        <p className="text-indigo-600 text-lg max-w-2xl mx-auto font-inter leading-relaxed">
          Our commitment is simple: to strengthen your moments, memories, and
          connections with those who matter the most through care, trust, and
          togetherness.
        </p>
      </section>
    </div>
  );
}
