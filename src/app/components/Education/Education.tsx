import React from "react";
import EducationCards from "./EducationCards";

function Education() {
  return (
    <div
      className="bg-gb-bg-light relative h-screen dark:bg-black"
      id="education"
    >
      <div className="mx-auto max-w-7xl px-8 py-4">
        <h1 className="my-36 text-center text-7xl font-bold tracking-tight [text-shadow:0_4px_8px_rgba(0_0_0/0.2)] dark:[text-shadow:0_4px_8px_rgba(255_255_255/0.4)]">
          Education
        </h1>
        <EducationCards />
      </div>
    </div>
  );
}

export default Education;
