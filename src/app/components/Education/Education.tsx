import React from "react";
import EducationStats from "./EducationStats";
import PulseConnector from "./PulseConnector";
function Education() {
  return (
    <div
      className="bg-gb-bg-light relative h-screen dark:bg-black"
      id="education"
    >
      <div className="mx-auto mb-16 max-w-7xl px-8 py-4">
        <h1 className="my-36 text-center text-7xl font-bold tracking-tight [text-shadow:0_4px_8px_rgba(0_0_0/0.2)] dark:[text-shadow:0_4px_8px_rgba(255_255_255/0.4)]">
          Education
        </h1>
        <div className="flex flex-col items-center">
          <EducationStats
            school="Manipul University, Jaipur"
            time="2026-2028"
            status="Currently Enrolled"
          />
          <PulseConnector
            orientation="vertical"
            length={90}
            className="rotate-180"
            durationMs={2000}
            showArrow={false}
            streakCount={2}
          />
          <EducationStats
            school="North Bengal University, Siliguri"
            time="2021-2024"
            status="Graduation"
          />
          <PulseConnector
            orientation="vertical"
            length={90}
            className="rotate-180"
            durationMs={2000}
            showArrow={false}
            streakCount={2}
          />
          <EducationStats
            school="St James School, Binnaguri"
            time="2009-2021"
            status="High School Diploma"
          />
        </div>
      </div>
    </div>
  );
}

export default Education;
