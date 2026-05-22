import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import TransitionLink from './TransitionLink';
import { FiSun, FiMoon, FiMenu, FiX, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { useMusic } from '../context/MusicContext';
import PDFViewer from './PDFViewer';

const navItems = [
  { name: 'About',      id: 'about' },
  { name: 'Skills',     id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects',   id: 'projects' },
  { name: 'Contact',    id: 'contact' },
];

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [resumeOpen, setResumeOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useMusic();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Track active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3,
        ease: 'power2.out',
      });

      const menuItems = mobileMenuRef.current?.querySelectorAll('.menu-item');
      if (menuItems && menuItems.length > 0) {
        gsap.fromTo(
          menuItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.1 }
        );
      }
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isMenuOpen]);


  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10"
        style={{ cursor: 'none' }}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <TransitionLink
            to="/"
            className="text-xl font-light tracking-wider"
            style={{ cursor: 'none' }}
          >
            <div className="flex items-center tracking-tighter text-xl">
              <span className="text-red-600 font-bold">ROHIT</span>
              <span className="font-light ml-1 dark:text-white">LAHORI</span>
              <span className="text-red-600 font-bold ml-0.5">.</span>
            </div>
          </TransitionLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 group overflow-hidden ${
                    isActive ? 'text-black dark:text-white font-bold' : 'text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                  style={{ cursor: 'none' }}
                >
                  <div className={`absolute inset-0 bg-black/5 dark:bg-white/5 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && <span className="w-1 h-1 bg-red-500 rounded-full" />}
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {/* Resume Button */}
            <button
              onClick={() => setResumeOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              style={{ cursor: 'none' }}
            >
              <span>Resume</span>
            </button>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-black/10 dark:bg-white/10"></div>

            {/* Utility Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="hidden md:flex w-8 h-8 items-center justify-center border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
                aria-label="Toggle music"
                style={{ cursor: 'none' }}
              >
                {isMuted ? <FiVolumeX size={14} className="opacity-50" /> : <FiVolume2 size={14} />}
              </button>

              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
                aria-label="Toggle theme"
                style={{ cursor: 'none' }}
              >
                {isDark ? <FiSun size={14} /> : <FiMoon size={14} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
              aria-label="Toggle menu"
              style={{ cursor: 'none' }}
            >
              {isMenuOpen ? <FiX size={14} /> : <FiMenu size={14} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl opacity-0 invisible md:hidden"
        style={{ cursor: 'none' }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 relative">
          {/* Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>

          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="menu-item text-4xl font-mono uppercase font-light tracking-tighter hover:text-red-500 transition-colors duration-300 flex items-center gap-4 group"
              style={{ cursor: 'none' }}
            >
              <span className="text-xs text-gray-400 font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">0{index + 1}</span>
              {item.name}
            </button>
          ))}

          <div className="w-12 h-px bg-black/10 dark:bg-white/10 my-8"></div>

          <button
            onClick={() => { setResumeOpen(true); setIsMenuOpen(false); }}
            className="menu-item flex items-center gap-2 text-sm font-mono uppercase tracking-widest border border-black/10 dark:border-white/10 px-6 py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            style={{ cursor: 'none' }}
          >
            <span>View Resume</span>
          </button>

          <button
            onClick={toggleMute}
            className="menu-item flex items-center gap-2 text-sm font-mono uppercase tracking-widest border border-black/10 dark:border-white/10 px-6 py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            style={{ cursor: 'none' }}
          >
            {isMuted ? <FiVolumeX size={14} /> : <FiVolume2 size={14} />}
            <span>{isMuted ? 'Unmute Audio' : 'Mute Audio'}</span>
          </button>
        </div>
      </div>
      <PDFViewer
        url="/Rohit_Lahori_Resume.pdf"
        title="Rohit Lahori — Resume"
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        downloadName="Rohit_Lahori_Resume.pdf"
      />
    </>
  );
};

export default Navigation;