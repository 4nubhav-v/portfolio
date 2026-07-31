import React from "react";
import EducationCards from "./EducationCards";

function Education() {
  return (
    <div className="relative h-screen bg-black">
      <div className="mx-auto max-w-7xl px-8 py-4">
        <h1 className="my-36 text-center text-7xl font-bold tracking-tight">
          Education
        </h1>
        <EducationCards />
      </div>
    </div>
  );
}

export default Education;
