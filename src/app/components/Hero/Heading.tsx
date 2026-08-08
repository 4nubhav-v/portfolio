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
            className="pr-2 text-3xl leading-none font-extrabold tracking-tight [text-shadow:0_4px_8px_rgba(0_0_0/0.2)] sm:text-4xl xl:text-6xl dark:text-white dark:[text-shadow:0_4px_8px_rgba(255_255_255/0.4)]"
          >
            {x}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

export default Heading;
