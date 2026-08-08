"use client";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import {
  ChartNoAxesGantt,
  House,
  Mail,
  BookOpenText,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
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
    { id: 1, title: "Education", href: "#education", icons: <BookOpenText /> },
    {
      id: 2,
      title: "Projects",
      href: "#projects",
      icons: <ChartNoAxesGantt />,
    },
    { id: 3, title: "Contact", href: "#contact", icons: <Mail /> },
  ];
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = current - previous;
    setHidden(diff > 10);
  });

  const { theme, setTheme } = useTheme();
  return (
    <motion.div
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
      className="sticky top-4 z-10 mx-auto flex h-14 w-full max-w-7xl items-center rounded-4xl bg-black/40 px-2 py-4 backdrop-blur-sm dark:bg-white/80"
    >
      <nav className="grid w-full grid-cols-2">
        <div className="flex items-center justify-start gap-x-4 px-4">
          <div className="col-span-1 flex justify-center gap-x-4">
            {links.map((x) => {
              return (
                <Link
                  className="flex items-center gap-x-0.5 font-semibold text-white dark:text-black"
                  key={x.id}
                  href={x.href}
                >
                  {x.title}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-4 px-4">
          <a href="https://github.com/4nubhav-v">
            <StackIcon
              className="mt-1 h-6 w-6"
              name="github"
              variant={theme === "dark" ? "light" : "dark"}
            />
          </a>
          <button
            className="flex items-center font-semibold text-white dark:text-black"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
    </motion.div>
  );
}

export default Navbar;
