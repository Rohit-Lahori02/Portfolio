import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollRevealText from './ScrollRevealText';
import { FiCornerDownRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  icon: string;
}

const techStack: TechItem[][] = [
  [
    { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'PyTorch',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'TensorFlow',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'FastAPI',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'LangChain',   icon: 'https://avatars.githubusercontent.com/u/126733545?v=4' },
    { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'AWS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  ],
  [
    { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
    { name: 'Keras',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg' },
    { name: 'NumPy',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    { name: 'Pandas',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'OpenCV',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
    { name: 'Redis',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    { name: 'GCP',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
    { name: 'Linux',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  ],
  [
    { name: 'Kafka',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
    { name: 'Jupyter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    { name: 'GitHub',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'C++',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Hugging Face', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
    { name: 'VS Code',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  ],
  [
    { name: 'Postman',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    { name: 'Power BI', icon: 'https://img.icons8.com/color/48/power-bi.png' },
    { name: 'HTML',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  ],
  [
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Bash',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  ],
];

const logos = [
  { name: 'Python',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PyTorch',    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'TensorFlow', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'AWS',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB',    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Redis',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'FastAPI',    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'OpenCV',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
  { name: 'Kafka',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
  { name: 'Git',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];
const logos2 = [...logos].reverse();

const Skills: React.FC = () => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const pyramidRef   = useRef<HTMLDivElement>(null);
  const logoCarouselRef  = useRef<HTMLDivElement>(null);
  const logoCarouselRef2 = useRef<HTMLDivElement>(null);
  const ticker1Tween = useRef<gsap.core.Tween | null>(null);
  const ticker2Tween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      });

      // Pyramid stagger — use fromTo so initial state is never stuck
      if (pyramidRef.current) {
        const items = pyramidRef.current.querySelectorAll('.tech-item');
        gsap.fromTo(
          items,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.45, stagger: 0.025, ease: 'power2.out',
            scrollTrigger: { trigger: pyramidRef.current, start: 'top 85%' },
          }
        );
      }

      // Logo carousel
      const animateTicker = (el: HTMLDivElement, reverse: boolean): gsap.core.Tween => {
        const setWidth = el.scrollWidth / 4;
        gsap.set(el, { x: reverse ? -setWidth : 0 });
        return gsap.to(el, { x: reverse ? 0 : -setWidth, duration: 30, ease: 'none', repeat: -1 });
      };
      if (logoCarouselRef.current)  ticker1Tween.current = animateTicker(logoCarouselRef.current, false);
      if (logoCarouselRef2.current) ticker2Tween.current = animateTicker(logoCarouselRef2.current, true);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const skew = self.getVelocity() / 300;
          gsap.to([logoCarouselRef.current, logoCarouselRef2.current], { skewX: skew, overwrite: 'auto', duration: 0.1 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 bg-gray-50 dark:bg-transparent overflow-hidden"
    >
      {/* Header */}
      <div ref={titleRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16 border-b border-black/10 dark:border-white/10 pb-12">
        <div className="flex items-center gap-4 mb-4">
          <FiCornerDownRight className="text-red-500 w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest text-red-500">
            System // Inventory
          </span>
        </div>
        <h2 className="text-[14vw] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter text-transparent text-stroke-responsive opacity-60 select-none pointer-events-none">
          <ScrollRevealText text="TECHNICAL" />
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <span className="text-[14vw] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter text-black dark:text-white block">
            <ScrollRevealText text="STACK_" />
          </span>
          <p className="font-mono text-sm max-w-xs text-gray-500 text-right pb-2">
            // SYSTEM_INVENTORY_V2.2<br />
            OPTIMIZED FOR SCALABILITY & PERFORMANCE
          </p>
        </div>
      </div>

      {/* Pyramid icon grid */}
      <div ref={pyramidRef} className="max-w-5xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col items-center gap-3">
          {techStack.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center flex-wrap gap-3">
              {row.map((tech, techIdx) => (
                <div
                  key={techIdx}
                  className="tech-item group flex flex-col items-center justify-center w-[72px] h-[88px] md:w-[82px] md:h-[98px] p-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-red-500/50 hover:-translate-y-1.5 hover:bg-red-500/5 dark:hover:bg-red-500/5 transition-all duration-300 cursor-default"
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-8 h-8 md:w-9 md:h-9 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <span className="mt-2 font-mono text-[8px] md:text-[9px] uppercase tracking-wide text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white text-center leading-tight transition-colors duration-300 max-w-full px-1 truncate">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Logo carousel */}
      <div
        className="pt-4 pb-12 overflow-hidden relative cursor-crosshair"
        onMouseEnter={() => { ticker1Tween.current?.pause(); ticker2Tween.current?.pause(); }}
        onMouseLeave={() => { ticker1Tween.current?.play();  ticker2Tween.current?.play(); }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-20 pointer-events-none" />

        <div className="ticker-wrapper mb-8">
          <div ref={logoCarouselRef} className="flex gap-8 w-max">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={`r1-${i}`}>
                {logos.map((logo, idx) => (
                  <div key={`r1-${i}-${idx}`} className="group/chip flex items-center gap-3 px-6 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-full transition-all duration-300 hover:border-black/30 dark:hover:border-white/30 hover:scale-105">
                    <img src={logo.src} alt={logo.name} className="h-6 w-6 grayscale group-hover/chip:grayscale-0 transition-all duration-300" />
                    <span className="font-mono text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300 group-hover/chip:text-black dark:group-hover/chip:text-white transition-colors">{logo.name}</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="ticker-wrapper">
          <div ref={logoCarouselRef2} className="flex gap-8 w-max">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={`r2-${i}`}>
                {logos2.map((logo, idx) => (
                  <div key={`r2-${i}-${idx}`} className="group/chip flex items-center gap-3 px-6 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-full transition-all duration-300 hover:border-black/30 dark:hover:border-white/30 hover:scale-105">
                    <img src={logo.src} alt={logo.name} className="h-6 w-6 grayscale group-hover/chip:grayscale-0 transition-all duration-300" />
                    <span className="font-mono text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300 group-hover/chip:text-black dark:group-hover/chip:text-white transition-colors">{logo.name}</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
