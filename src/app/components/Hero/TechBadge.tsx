import React from "react";
import { useTheme } from "next-themes";

import StackIcon from "tech-stack-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function TechBadge() {
  const techicons = [
    { title: "Javascript", icon: "js" },
    { title: "Node.js", icon: "nodejs" },
    { title: "React", icon: "react" },
    { title: "Tailwind CSS", icon: "tailwindcss" },
    { title: "TypeScript", icon: "typescript" },
    { title: "Vite", icon: "vitejs" },
    { title: "Next.js", icon: "nextjs2" },
  ];
  const { theme } = useTheme();
  return (
    <div className="mt-4 flex h-12 w-56 items-center gap-2">
      {techicons.map((tech, index) => {
        return (
          <Tooltip key={index}>
            <TooltipTrigger>
              <StackIcon
                className="py-2"
                variant={theme === "dark" ? "dark" : "light"}
                name={tech.icon}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tech.title}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

export default TechBadge;
