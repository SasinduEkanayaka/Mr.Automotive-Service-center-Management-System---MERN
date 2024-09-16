// Home.js
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import NavBar from "./../components/NavBar";
import Footer from "./../components/Footer";
import HomeCon from "../components/Home/HomeCon";
import Collection from "../components/Home/Collection";
import Products from "../components/Home/Products";
import Review from "../components/Home/Review";
import CarServiceCarousel from "../components/Home/CarServiceCarousel";

// Animation Variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      staggerChildren: 0.2, // Adds delay between child animations
    },
  },
};

const componentVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div>
      <NavBar />

      {/* Home Section */}
      {/* <motion.div
        id="home"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={componentVariants}>
          <HomeCon />
        </motion.div>
      </motion.div> */}

      <motion.div
        id="home"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={componentVariants}>
          <CarServiceCarousel />
        </motion.div>
      </motion.div>

      {/* Shop Section */}
      {/* <motion.div
        id="shop"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={componentVariants}>
          <Shop />
        </motion.div>
      </motion.div> */}

      {/* Collection Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={componentVariants}>
          <Collection />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      {/* <motion.div
        id="features"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={componentVariants}>
          <Features />
        </motion.div>
      </motion.div> */}

      {/* Products Section */}
      <motion.div
        id="products"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={componentVariants}>
          <Products />
        </motion.div>
      </motion.div>

      {/* Review Section */}
      <motion.div
        id="review"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={componentVariants}>
          <Review />
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={componentVariants}>
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
}
