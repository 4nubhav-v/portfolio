import Link from "next/link";
import { House, Mail } from "lucide-react";
function Navbar() {
  const links = [
    { id: 0, title: "Home", href: "#", icons: <House /> },
    { id: 1, title: "Projects", href: "#project", icons: <House /> },
    { id: 2, title: "Contact", href: "#", icons: <Mail /> },
  ];
  return (
    <div className="sticky top-4 z-10 mx-auto flex h-12 w-full max-w-7xl items-center rounded-4xl bg-black/40 px-2 py-4 backdrop-blur-sm dark:bg-white/40">
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
          <a href="#">Github</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
