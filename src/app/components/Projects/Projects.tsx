import React from "react";
import ProjectsCards from "./ProjectsCards";
function Projects() {
  return (
    <div className="bg-black">
      <div className="mx-auto h-screen max-w-7xl px-8 py-4">
        <h1
          className="mb-36 text-center text-7xl font-bold tracking-tight"
          id="project"
        >
          Projects
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <ProjectsCards />
        </div>
      </div>
    </div>
  );
}

export default Projects;
