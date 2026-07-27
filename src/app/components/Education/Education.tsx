import React from "react";
import EducationCards from "./EducationCards";

function Education() {
  return (
    <div className="relative h-screen bg-black">
      <div className="absolute inset-y-0 left-32 h-full w-px bg-linear-to-b from-neutral-50/20 to-[#311872]" />
      <div className="absolute inset-y-0 right-32 h-full w-px bg-linear-to-b from-neutral-50/20 to-[#311872]" />
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
