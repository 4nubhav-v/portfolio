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
  Menu,
  CircleX,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = current - previous;
    setHidden(diff > 10);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  });

  const { theme, setTheme } = useTheme();
  return (
    <motion.div
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
      className="absolute inset-x-0 top-4 z-10 flex h-14 items-center rounded-4xl bg-black/40 px-2 py-4 backdrop-blur-sm sm:mx-10 dark:bg-white/80"
    >
      <nav className="grid w-full grid-cols-2">
        <div className="flex items-center justify-start gap-x-4 px-4">
          <div className="col-span-1 hidden justify-center gap-x-4 min-[500px]:flex">
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
          <div className="flex min-[500px]:hidden">
            <button
              className="cursor-pointer text-white dark:text-black"
              onClick={() => {
                setMobileMenuOpen((x) => !x);
              }}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute inset-x-0 flex w-full flex-col justify-center rounded-sm bg-white p-2">
            <p className="text-black" onClick={() => setMobileMenuOpen(false)}>
              <CircleX className="h-6 w-6" />
            </p>
            <div className="flex flex-col items-center">
              {links.map((x) => {
                return (
                  <Link
                    className="font-semibold text-white dark:text-black"
                    key={x.id}
                    href={x.href}
                  >
                    {x.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex cursor-pointer items-center justify-end gap-x-4 px-4">
          <a href="https://github.com/4nubhav-v">
            <StackIcon
              className="mt-1 h-6 w-6"
              name="github"
              variant={theme === "dark" ? "light" : "dark"}
            />
          </a>
          <button
            className="flex cursor-pointer items-center font-semibold text-white dark:text-black"
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
