import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />

      {/* Footer could go here or in layout */}
      <footer className="py-8 text-center text-black/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Althaf Mohamed Umer.</p>
      </footer>
    </main>
  );
}
