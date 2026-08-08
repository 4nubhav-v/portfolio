import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Blogs from "./components/Blogs/Blogs";
import Contact from "./components/Contacts/Contact";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-gb-bg-light relative selection:bg-black selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black">
        <Navbar />
        <Hero />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
