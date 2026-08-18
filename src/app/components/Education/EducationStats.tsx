import React from "react";

interface educationInterface {
  school?: string;
  time?: string;
  status?: string;
}

function EducationStats({
  school = "",
  time = "",
  status = "",
}: educationInterface) {
  return (
    <div className="w-sm rounded-xl bg-none p-3 outline-1 sm:max-w-2xl lg:w-4xl dark:bg-neutral-800">
      <h2 className="font-semibold tracking-tight sm:text-xl md:text-2xl">
        {school}
      </h2>
      <p className="sm:text-2xl md:text-xl"> {status} </p>
      <p className="text-sm text-neutral-500 italic dark:text-neutral-200">
        {time}
      </p>
    </div>
  );
}

export default EducationStats;
