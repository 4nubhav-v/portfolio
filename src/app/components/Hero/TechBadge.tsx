import React from "react";
import StackIcon from "tech-stack-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
  return (
    <div className="mt-4 flex h-12 w-56 items-center gap-2">
      <TooltipProvider>
        {techicons.map((tech, index) => {
          return (
            <Tooltip key={index}>
              <TooltipTrigger>
                <span className="inline dark:hidden">
                  <StackIcon
                    className="py-2"
                    variant="light"
                    name={tech.icon}
                  />
                </span>
                <span className="hidden dark:inline">
                  <StackIcon className="py-2" variant="dark" name={tech.icon} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tech.title}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}

export default TechBadge;
