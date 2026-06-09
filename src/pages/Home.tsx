import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Projects from '../components/Projects';



const Home: React.FC = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed Miami gradient — visible in dark mode only, stays still as you scroll */}
      <div
        className="fixed inset-0 pointer-events-none z-0 hidden dark:block"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 92% 5%,  rgba(170, 25, 25, 0.40) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 8%  88%, rgba(18,  85, 22, 0.34) 0%, transparent 58%),
            radial-gradient(ellipse 40% 35% at 70% 92%, rgba(130, 20, 20, 0.20) 0%, transparent 50%),
            radial-gradient(ellipse 35% 30% at 18% 8%,  rgba(15,  65, 18, 0.20) 0%, transparent 50%),
            #050505
          `
        }}
      />
      <Hero />
      <About />
      <Skills />
      <WorkExperience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;