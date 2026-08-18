"use client";
import { motion } from "motion/react";
import React from "react";
import ProjectsCards from "./ProjectsCards";
function Projects() {
  return (
    <div
      className="bg-gb-bg-light relative min-h-screen dark:bg-black"
      id="projects"
    >
      <motion.div
        initial={{ scale: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileInView={{ scale: 1 }}
        className="absolute left-32 hidden h-full w-px bg-black bg-[linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(181,181,181,1)_53%,rgba(0,0,0,1)_100%)] 2xl:inline"
      />
      <motion.div
        initial={{ scale: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileInView={{ scale: 1 }}
        className="absolute right-32 hidden h-full w-px bg-black bg-[linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(181,181,181,1)_53%,rgba(0,0,0,1)_100%)] 2xl:inline"
      />
      <div className="mx-auto max-w-7xl px-8 py-4">
        <h1
          className="my-16 text-center text-4xl font-bold tracking-tight [text-shadow:0_4px_8px_rgba(0_0_0/0.2)] sm:my-24 sm:text-5xl lg:my-36 lg:text-7xl dark:[text-shadow:0_4px_8px_rgba(255_255_255/0.4)]"
          id="project"
        >
          Projects
        </h1>
        <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-4">
          <ProjectsCards />
        </div>
      </div>
    </div>
  );
}

export default Projects;
