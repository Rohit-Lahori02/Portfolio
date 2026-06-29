import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCornerDownRight } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: '2026',
    role: 'AI Developer',
    company: 'Kaplan Institute',
    type: 'Full-Time · Chicago, IL',
    description:
      'Shipped a production AI interview platform on AWS with LiveKit + Amazon Nova Sonic for real-time voice interviews. Served 800+ users across 25+ enterprise clients including Grainger and Boeing.',
    tags: ['AWS', 'LiveKit', 'RAG', 'pgvector', 'Amazon Nova Sonic'],
  },
  {
    year: '2025',
    role: 'AI Engineer',
    company: 'PM Accelerator',
    type: 'Contract · Remote',
    description:
      'Launched a 6-stage agentic stock sentiment pipeline ingesting live financial news — slashed false positive alerts by 35% and cut hallucinated RAG responses by ~38% via vector-indexed historical sentiment.',
    tags: ['Agentic AI', 'RAG', 'LangChain', 'Vector Search'],
  },
  {
    year: '2024',
    role: 'Research Author',
    company: 'Springer ICICBDA',
    type: 'Publication · CCIS 2235',
    description:
      'Paper accepted and published in Springer ICICBDA 2024 — built a queryable knowledge graph from Twitter data with 89% sentiment precision, integrated LangChain for automated recommendations.',
    tags: ['LangChain', 'Knowledge Graphs', 'NLP', 'Springer'],
  },
  {
    year: '2023',
    role: 'Data Science Intern',
    company: 'Clootrack',
    type: 'Internship · Kochi, India',
    description:
      'Clustered 5,000+ Q&A records using graph-based (Louvain, networkx) and hierarchical techniques — pushed model accuracy to 90%, outperforming prior org baselines.',
    tags: ['Python', 'NLP', 'Graph Clustering', 'Networkx'],
  },
];

const WorkExperience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        );
      }

      rowRefs.current.forEach((row) => {
        if (!row) return;
        const left = row.querySelector('.exp-left');
        const center = row.querySelector('.exp-center');
        const right = row.querySelector('.exp-right');

        gsap.from([left, center], {
          scrollTrigger: { trigger: row, start: 'top 88%' },
          x: -30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
        });
        gsap.from(right, {
          scrollTrigger: { trigger: row, start: 'top 88%' },
          x: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-white dark:bg-transparent font-sans text-black dark:text-white py-24 md:py-32"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 border-b border-black dark:border-white/40 pb-12">
        <div className="flex items-center gap-4 mb-4">
          <FiCornerDownRight className="text-red-500 w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest text-red-500">
            Career // Log
          </span>
        </div>
        <h2 className="text-[14vw] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter text-transparent text-stroke-responsive opacity-60 select-none pointer-events-none">
          <ScrollRevealText text="WORK" />
        </h2>
        <span className="text-[14vw] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter block">
          <ScrollRevealText text="EXPERIENCE" />
        </span>
      </div>

      {/* Timeline body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Outer wrapper: positions the center line relative to the rows */}
        <div className="relative">
          {/* Center vertical line — desktop only */}
          <div className="hidden md:block absolute left-[42%] top-0 bottom-0 w-px bg-black/10 dark:bg-white/10">
            <div ref={lineRef} className="w-full h-full bg-black dark:bg-white" />
          </div>

          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="relative grid grid-cols-1 md:grid-cols-[2fr_160px_2fr] gap-0 py-14 md:py-20 border-b border-black/10 dark:border-white/10 last:border-0"
            >
              {/* Dot sitting exactly on the vertical line */}
              <div className="hidden md:block absolute left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-black dark:bg-white z-10" />

              {/* LEFT: Role + Company */}
              <div className="exp-left flex flex-col justify-center md:pr-12 mb-4 md:mb-0">
                <h3 className="text-2xl md:text-[2.6rem] font-bold uppercase tracking-tight leading-tight">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest text-red-500 mt-2">
                  {exp.company}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-0.5">
                  {exp.type}
                </span>
              </div>

              {/* CENTER: Year */}
              <div className="exp-center flex md:flex-col items-center justify-start md:justify-center gap-3 md:gap-2 mb-4 md:mb-0">
                {/* Mobile dash */}
                <span className="font-mono text-red-500 text-xs md:hidden">—</span>
                <span className="text-3xl md:text-5xl font-bold tracking-tight text-black/50 dark:text-white/50">
                  {exp.year}
                </span>
              </div>

              {/* RIGHT: Description + tags */}
              <div className="exp-right flex flex-col justify-center md:pl-12">
                <p className="text-sm md:text-base font-light leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider border border-black/20 dark:border-white/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full opacity-70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
