import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Portfolio card data in one variable
const portfolioCards = [
  {
    title: "Autumn Blossom",
    img: "/assets/stage1.jpg",
    desc: "An autumn themed wedding",
  },
  {
    title: "Coastal Ceremony",
    img: "/assets/stage2.jpg",
    desc: "A wedding on a beach",
  },
  {
    title: "Rustic Elegance",
    img: "/assets/stage3.jpg",
    desc: "A rustic and elegant wedding",
  },
  {
    title: "Winter Wonderland",
    img: "/assets/stage4.jpg",
    desc: "A beautiful winter themed wedding",
  },
  {
    title: "Romantic Garden",
    img: "/assets/deco1.jpg",
    desc: "A romantic garden wedding",
  },
  {
    title: "Mountain Escape",
    img: "/assets/deco2.jpg",
    desc: "A mountain retreat wedding",
  },
  {
    title: "Urban Chic",
    img: "/assets/deco3.jpg",
    desc: "A chic urban wedding",
  },
  {
    title: "Sunset Vows",
    img: "/assets/stage5.jpg",
    desc: "A sunset wedding ceremony",
  },
];

// Animated Card Component
const AnimatedCard = ({ title, img, desc }) => (
  <motion.div
    initial={{ y: 0, boxShadow: "0 2px 20px 0 rgba(0,0,0,0.07)" }}
    whileHover={{
      y: -20,
      scale: 1.05,
      boxShadow: "0 10px 32px 0 rgba(0,0,0,0.15)",
      transition: { type: "spring", stiffness: 350, damping: 25 },
    }}
    className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center group"
  >
    <Image
      src={img}
      alt={title}
      className="object-cover w-full aspect-square group-hover:scale-105 transition-transform duration-500"
      width={300}
      height={300}
    />
    <div className="p-4 text-center">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  </motion.div>
);

// Portfolio Card Grid Component
const PortfolioGrid = () => (
  <section className="min-h-[60vh] flex items-center py-8 px-2 sm:p-8 md:p-16 bg-gray-50">
    <div className="container mx-auto">
      <h2 className="text-2xl sm:text-4xl font-playfair font-bold text-center mb-8">
        Our Latest Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {portfolioCards.map((card) => (
          <AnimatedCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioGrid;
