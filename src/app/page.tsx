"use client";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Blogs from "./components/Blogs/Blogs";
import Contact from "./components/Contacts/Contact";
import Footer from "./components/Footer/Footer";
import { motion, useScroll } from "motion/react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <div className="bg-gb-bg-light relative selection:bg-black selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black">
        <motion.div
          style={{ scaleX: scrollYProgress, originX: 0 }}
          className="sticky inset-x-0 top-0 z-10 h-0.5 w-full bg-neutral-800 dark:bg-neutral-200"
        ></motion.div>
        <Navbar />
        <Hero />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
