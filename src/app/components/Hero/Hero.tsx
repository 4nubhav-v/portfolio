"use client";
import Image from "next/image";
import Heading from "./Heading";
import TechBadge from "./TechBadge";

function Hero() {
  return (
    <section className="bg-white dark:bg-black">
      <div className="relative h-screen">
        <div className="absolute inset-y-0 left-32 h-full w-px bg-linear-to-b from-neutral-50/20 to-[#311872]/20" />
        <div className="absolute inset-y-0 right-32 h-full w-px bg-linear-to-b from-neutral-50/20 to-[#311872]/20" />
        <div className="absolute inset-x-0 top-32 h-px w-full bg-linear-to-b from-neutral-50/20 to-[#311872]/20" />
        <div className="mx-auto flex h-screen max-w-7xl flex-col items-center justify-center px-4 py-2">
          <div className="flex items-center justify-center">
            <div className="m-4 flex flex-col p-4">
              <Heading />
              <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400">
                I am a software developer with a passion for web development. I
                have a background in computer science and mathematics, and I
                have a strong interest in the intersection of technology and
                art. I am currently completed my Bachlors&apos;s Degree in
                Computer Science I am currently looking for a job.
              </p>

              <div className="flex gap-4">
                <button className="cursor-pointer rounded-sm bg-white px-4 py-2 text-black">
                  <a href="#contacts">Contact</a>
                </button>
                <button className="cursor-pointer rounded-sm bg-none px-4 py-2 text-black outline-1 dark:text-white dark:outline-neutral-50">
                  <a href="/resume/myResume.pdf" target="_blank">
                    View CV
                  </a>
                </button>
              </div>
              <TechBadge />
            </div>
            <div className="border-8 border-white bg-white p-1">
              <Image
                width={400}
                height={400}
                loading="eager"
                src="/test.jpg"
                alt="my profile picture"
                className="rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
