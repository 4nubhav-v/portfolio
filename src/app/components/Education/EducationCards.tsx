import React from "react";

function EducationCards() {
  return (
    <div className="flex flex-col items-center gap-20">
      <div className="w-2xl rounded-xl bg-neutral-400 p-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          North Bengal University, Siliguri
        </h2>
        <p> Graduation</p>
        <p className="text-neutral-200 italic">2009-2021</p>
      </div>
      <div className="w-2xl rounded-xl bg-neutral-400 p-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          St James School, Binnaguri
        </h2>
        <p> High School Dilopma</p>
        <p className="text-neutral-200 italic">2009-2021</p>
      </div>
    </div>
  );
}

export default EducationCards;
