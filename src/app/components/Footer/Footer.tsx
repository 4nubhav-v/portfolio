"use client";
import { motion } from "motion/react";

function Footer() {
  return (
    <footer className="bg-gb-bg-light relative bottom-0 mb-4 h-24 w-screen dark:bg-black">
      <motion.div
        initial={{ scale: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileInView={{ scale: 1 }}
        className="absolute inset-x-0 bottom-32 h-px w-full bg-black bg-linear-to-r from-black via-[#b5b5b5] to-black"
      />
      <p className="m-4 text-center">
        Made by Anubhav @{new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
