import Image from "next/image";
import { Badge } from "@/components/ui/badge";
type ProjectInter = {
  title: string;
  imgUrl: string;
  description: string;
  github: string;
  liveurl: string;
  status: React.ReactNode;
};

function Projects() {
  const projects: ProjectInter[] = [
    {
      title: "Weather app",
      imgUrl: "/Projects/Screenshot 2026-07-25 at 14-35-03 Create Next App.png",
      description: "weather reports",
      github: "https://github.com/4nubhav-v/weatherapp",
      liveurl: "https://weather4pp.vercel.app/",
      status: (
        <Badge>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          Currently working
        </Badge>
      ),
    },
    {
      title: "Music Api",
      imgUrl: "/Projects/Screenshot 2026-07-25 at 14-35-03 Create Next App.png",
      description: "Live Music Status",
      github: "https://github.com/4nubhav-v/musicStatsApi",
      liveurl: "",
      status: (
        <Badge>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
          </span>
          Pending
        </Badge>
      ),
    },
    {
      title: "Startpage app",
      imgUrl: "/Projects/Screenshot 2026-07-27 at 14-25-11 startpage.png",
      description: "Personalized Startpage",
      github: "https://github.com/4nubhav-v/startpage",
      liveurl: "https://4nubhav-startpage.vercel.app/",
      status: (
        <Badge>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          Live
        </Badge>
      ),
    },
  ];
  return (
    <>
      {projects.map((project, index) => {
        return (
          <div className="col-span-1 rounded-xl bg-neutral-400" key={index}>
            <Image
              width={800}
              height={400}
              loading="eager"
              src={project.imgUrl}
              alt="project screenshot"
            />
            <div className="p-4">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {project.title}
                </h2>
                {project.status}
              </div>
              <p> {project.description}</p>
              <div className="m-2 grid grid-cols-2 gap-4 p-4">
                <a
                  className="rounded-sm bg-white p-2 text-center text-black"
                  href={project.github}
                >
                  Github
                </a>
                <a
                  className="rounded-sm bg-white p-2 text-center text-black"
                  href={project.liveurl}
                >
                  Live
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Projects;
