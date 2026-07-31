"use client";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { House, Mail } from "lucide-react";
import StackIcon from "tech-stack-icons";

type linksInter = {
  id: number;
  title: string;
  href: string;
  icons: React.ReactNode;
};

function Navbar() {
  const links: linksInter[] = [
    { id: 0, title: "Home", href: "#", icons: <House /> },
    { id: 1, title: "Projects", href: "#project", icons: <House /> },
    { id: 2, title: "Contact", href: "#", icons: <Mail /> },
  ];
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = current - previous;
    setHidden(diff > 10);
  });

  return (
    <motion.div
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
      className="sticky top-4 z-10 mx-auto flex h-14 w-full max-w-7xl rounded-4xl bg-black/40 px-2 py-4 backdrop-blur-sm dark:bg-white/40"
    >
      <nav className="grid w-full grid-cols-3">
        <h1 className="col-span-1 px-4 text-white dark:text-black">
          My Portfolio
        </h1>
        <div className="col-span-1 flex justify-center gap-x-2">
          {links.map((x) => {
            return (
              <Link
                className="flex items-center gap-x-0.5 font-semibold text-white dark:text-black"
                key={x.id}
                href={x.href}
              >
                {x.icons}
                {x.title}
              </Link>
            );
          })}
        </div>
        <div className="flex justify-end px-4">
          <a href="https://github.com/4nubhav-v">
            <StackIcon className="h-6 w-6" name="github" />
          </a>
        </div>
      </nav>
    </motion.div>
  );
}

export default Navbar;
