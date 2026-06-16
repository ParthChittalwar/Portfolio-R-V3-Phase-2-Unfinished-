import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Journey from "@/sections/Journey";
import Projects from "@/sections/Projects";
import Certifications from "@/sections/Certifications";
import Achievements from "@/sections/Achievements";
import Contact from "@/sections/Contact";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { useDocumentHead } from "@/hooks/useDocumentHead";

/**
 * Home page — composes every section in order. Certifications and
 * Achievements render `null` internally when their data files are empty,
 * so this list never needs manual conditionals. Each section is wrapped in
 * an ErrorBoundary so a problem in one section can't take down the rest of
 * the page.
 */
export default function Home() {
  useDocumentHead();

  return (
    <>
      <ErrorBoundary sectionName="Hero">
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary sectionName="About">
        <About />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Tech Stack">
        <Skills />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Journey">
        <Journey />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Projects">
        <Projects />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Certifications">
        <Certifications />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Achievements">
        <Achievements />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Contact">
        <Contact />
      </ErrorBoundary>
    </>
  );
}
