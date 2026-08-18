"use client";
import Image from "next/image";
import Heading from "./Heading";
import TechBadge from "./TechBadge";

function Hero() {
  return (
    <section
      className="bg-gb-bg-light relative h-screen dark:bg-black"
      id="home"
    >
      <div className="absolute inset-y-0 hidden h-full w-px bg-linear-to-b from-neutral-50/20 to-[#311872]/20 md:left-12 md:inline xl:left-32" />
      <div className="absolute inset-y-0 hidden h-full w-px bg-linear-to-b from-neutral-50/20 to-[#311872]/20 md:right-12 md:inline xl:right-32" />
      <div className="absolute inset-x-0 h-px w-full bg-linear-to-b from-neutral-50/20 to-[#311872]/20 sm:top-12 lg:top-32" />
      <div className="mx-auto flex h-screen max-w-7xl flex-col items-center justify-center px-4 py-2">
        <div className="flex flex-col items-center justify-center lg:flex-row">
          <div className="m-4 flex flex-col p-4">
            <Heading />
            <p className="mb-6 font-light text-gray-500 md:max-w-2xl md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400">
              I am a self learned Frontend developer with a passion for web
              development. I have a background in computer science and
              mathematics, and I have a strong interest in the technology &
              history literature. If u wanna contact, U can click the contact
              button here :)
            </p>

            <div className="flex gap-4">
              <button className="cursor-help rounded-sm bg-black px-4 py-2 text-white outline-1 outline-neutral-50 dark:bg-white dark:text-black">
                <a href="#contacts" className="cursor-help">
                  Contact
                </a>
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
              width={300}
              height={300}
              loading="eager"
              src="/test2.jpg"
              alt="my profile picture"
              className="rounded-sm"
              sizes="(max-width: 400px) 100vw, (max-width: 800px) 150vw, 00px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
