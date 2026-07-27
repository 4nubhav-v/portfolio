import Hero from "./components/Hero/Hero";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Blogs from "./components/Blogs/Blogs";
import Contact from "./components/Contacts/Contact";

export default function Home() {
  return (
    <>
      <div className="relative selection:bg-black selection:text-white dark:selection:bg-black dark:selection:text-white">
        <Hero />
        <Education />
        <Projects />
        <Blogs />
        <Contact />
      </div>
    </>
  );
}
