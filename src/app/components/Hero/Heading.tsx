"use client";
import React from "react";
import { motion, stagger } from "motion/react";

function Heading() {
  const headingTitle = ["Hello,", "This", "is", "me", "Anubhav"];
  const headingShow = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.1),
      },
    },
  };
  const items = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <motion.div
      variants={headingShow}
      initial="hidden"
      animate="show"
      className="mb-4"
    >
      {headingTitle.map((x, index) => {
        return (
          <motion.span
            key={index}
            variants={items}
            className="pr-2 leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white"
          >
            {x}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

export default Heading;
