import React from "react";
import PulseConnector from "./PulseConnector";

function EducationCards() {
  return (
    <div className="flex flex-col items-center">
      <div className="dark:bg-neutral-800:w w-2xl rounded-xl bg-none p-4 outline-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Manipul University, Jaipur
        </h2>
        <p> Currently Enrolled </p>
        <p className="text-neutral-500 italic dark:text-neutral-200">
          2026-2028
        </p>
      </div>
      <PulseConnector
        orientation="vertical"
        length={90}
        className="rotate-180"
        durationMs={2000}
        showArrow={false}
        streakCount={2}
      />
      <div className="w-2xl rounded-xl bg-none p-4 outline-1 dark:bg-neutral-800">
        <h2 className="text-2xl font-semibold tracking-tight">
          North Bengal University, Siliguri
        </h2>
        <p> Graduation</p>
        <p className="text-neutral-500 italic dark:text-neutral-200">
          2021-2024
        </p>
      </div>
      <PulseConnector
        orientation="vertical"
        length={90}
        className="rotate-180"
        durationMs={2000}
        showArrow={false}
        streakCount={2}
      />
      <div className="w-2xl rounded-xl bg-none p-4 outline-1 dark:bg-neutral-800">
        <h2 className="text-2xl font-semibold tracking-tight">
          St James School, Binnaguri
        </h2>
        <p> High School Diploma</p>
        <p className="text-neutral-500 italic dark:text-neutral-200">
          2009-2021
        </p>
      </div>
    </div>
  );
}

export default EducationCards;
