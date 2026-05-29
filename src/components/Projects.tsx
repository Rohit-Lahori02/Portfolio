import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiArrowUpRight, FiArrowRight, FiGithub, FiExternalLink, FiCornerDownRight, FiFileText } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';
import PDFViewer from './PDFViewer';

const projects = [
  {
    id: '01',
    title: 'GUIDERA',
    category: 'AI Orchestration',
    tags: ['PyTorch', 'LLMs', 'FastAPI', 'Docker'],
    description:
      'Production-grade LLM routing platform for 50+ models. A custom PyTorch 3-layer attention transformer classifies prompts and routes to the optimal model — achieving 70% inference cost reduction at 95% accuracy, with a full multimodal pipeline and GDPR/HIPAA compliance engine.',
    github: 'https://github.com/Rohit-Lahori02',
    live: null,
    gradientFrom: '#1e1b4b',
    gradientTo: '#312e81',
    accentColor: '#818cf8',
    label: 'LLM ROUTING PLATFORM',
    isResearch: false,
    image: '/guidera-viz.png',
  },
  {
    id: '02',
    title: 'CAPSULE HUB',
    category: 'Developer Tool',
    tags: ['Chrome Extension', 'FastAPI', 'MongoDB', 'OAuth2'],
    description:
      'Cross-platform AI context manager shipped as a Chrome extension. Captures and injects conversation context across ChatGPT, Claude, Gemini, and Gmail with zero copy-paste. FastAPI + MongoDB backend with JWT/OAuth2 and team-scoped RBAC.',
    github: 'https://github.com/Rohit-Lahori02',
    live: null,
    gradientFrom: '#431407',
    gradientTo: '#7c2d12',
    accentColor: '#fb923c',
    label: 'AI CONTEXT MANAGER',
    isResearch: false,
    image: '/capsule-hub-viz.png',
  },
  {
    id: '03',
    title: 'PLANT DISEASE DETECTOR',
    category: 'ML / Computer Vision',
    tags: ['TensorFlow', 'Keras', 'AWS EC2', 'Streamlit'],
    description:
      'CNN model classifying 38 plant disease categories at 94% accuracy. Built with Conv2D and MaxPooling, trained with aggressive augmentation to handle class imbalance, and deployed on AWS EC2 with a Streamlit frontend for real-time image uploads and predictions.',
    github: 'https://github.com/Rohit-Lahori02/Plant_Disease_Detection',
    live: null,
    gradientFrom: '#052e16',
    gradientTo: '#14532d',
    accentColor: '#4ade80',
    label: 'CV CLASSIFICATION MODEL',
    isResearch: false,
    image: '/plant-disease-viz.png',
  },
  {
    id: '04',
    title: 'QUERYABLE KNOWLEDGE GRAPH',
    category: 'Research Publication',
    tags: ['LangChain', 'Knowledge Graphs', 'NLP', 'Springer'],
    description:
      'Published in Springer ICICBDA 2024 (CCIS 2235). Built a queryable knowledge graph from Twitter data achieving 89% sentiment precision. Integrated LangChain for automated trend-based recommendations. Accepted and presented at the international conference.',
    github: 'https://github.com/Rohit-Lahori02/Knowledge_Graph',
    live: null,
    gradientFrom: '#1c1917',
    gradientTo: '#44403c',
    accentColor: '#f59e0b',
    label: 'SPRINGER ICICBDA 2024',
    isResearch: true,
    paper: '/knowledge-graph-paper.pdf',
    image: '/knowledge-graph-viz.png',
  },
];

const panelVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const Projects: React.FC = () => {
  const [active, setActive] = useState(0);
  const [pdfOpen, setPdfOpen] = useState(false);

  const current = projects[active];

  return (
    <section
      id="projects"
      className="bg-white dark:bg-transparent text-black dark:text-white font-sans py-24 md:py-32"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 border-b border-black dark:border-white/40 pb-12">
        <div className="flex items-center gap-4 mb-4">
          <FiCornerDownRight className="text-red-500 w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest text-red-500">
            Selected // Works
          </span>
        </div>
        <h2 className="text-[14vw] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter text-transparent text-stroke-responsive opacity-60 select-none pointer-events-none">
          <ScrollRevealText text="SELECTED" />
        </h2>
        <span className="text-[14vw] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter block">
          <ScrollRevealText text="WORKS_" />
        </span>
      </div>

      {/* Body: list + detail panel */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-[5fr_6fr] gap-0 lg:min-h-[560px]">

          {/* LEFT: Project list */}
          <div className="relative z-10 lg:border-r border-black/10 dark:border-white/10">
            {projects.map((p, i) => {
              const isActive = active === i;
              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setActive(i)}
                  className={`group flex items-center justify-between px-0 lg:pr-12 py-8 md:py-10 border-b border-black/10 dark:border-white/10 cursor-default transition-all duration-300 ${
                    isActive ? '' : 'opacity-35 hover:opacity-60'
                  }`}
                >
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs text-red-500 shrink-0">/{p.id}</span>
                    <h3
                      className={`text-2xl md:text-4xl uppercase tracking-tight transition-all duration-300 ${
                        isActive ? 'font-bold' : 'font-normal'
                      }`}
                    >
                      {p.title}
                    </h3>
                    {p.isResearch && (
                      <span className="hidden md:inline-block font-mono text-[9px] uppercase tracking-widest border border-amber-500/50 text-amber-500 px-1.5 py-0.5 translate-y-[-2px]">
                        Research
                      </span>
                    )}
                  </div>
                  {isActive ? (
                    <FiArrowUpRight className="w-5 h-5 shrink-0 text-red-500 transition-all duration-300" />
                  ) : (
                    <FiArrowRight className="w-4 h-4 shrink-0 opacity-30 transition-all duration-300" />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Sticky detail panel */}
          <div className="hidden lg:block lg:pl-12 lg:sticky lg:top-8 lg:h-fit mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="border border-black/10 dark:border-white/10 overflow-hidden"
              >
                {/* Preview: image or gradient */}
                <div
                  className="relative h-56 flex flex-col justify-between p-6 overflow-hidden"
                  style={
                    current.image
                      ? { background: '#000' }
                      : { background: `linear-gradient(135deg, ${current.gradientFrom}, ${current.gradientTo})` }
                  }
                >
                  {current.image && (
                    <img
                      src={current.image}
                      alt={current.title}
                      className="absolute inset-0 w-full h-full object-contain object-center opacity-90"
                    />
                  )}
                  {/* Overlay so text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top-right label */}
                  <div className="relative flex justify-end">
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border"
                      style={{ color: current.accentColor, borderColor: current.accentColor + '55' }}
                    >
                      {current.label}
                    </span>
                  </div>
                  {/* Bottom: tech tags */}
                  <div className="relative flex flex-wrap gap-2">
                    {current.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-white/10 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project details */}
                <div className="p-6 md:p-8 bg-white dark:bg-zinc-950/80">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                      {current.title}
                    </h3>
                    {current.isResearch && (
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest border border-amber-500/60 text-amber-500 px-2 py-0.5">
                        Research
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-red-500 mb-4">
                    {current.category}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-zinc-600 dark:text-zinc-400 mb-6">
                    {current.description}
                  </p>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    {current.paper ? (
                      <button
                        onClick={() => setPdfOpen(true)}
                        className="flex items-center justify-center gap-2 py-3 border border-black/20 dark:border-white/20 text-xs font-mono uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
                        style={{ cursor: 'default' }}
                      >
                        Research Paper <FiFileText size={11} />
                      </button>
                    ) : current.live ? (
                      <a
                        href={current.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 border border-black/20 dark:border-white/20 text-xs font-mono uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
                      >
                        Live Demo <FiExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="flex items-center justify-center gap-2 py-3 border border-black/10 dark:border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 dark:text-zinc-600 cursor-not-allowed select-none">
                        Live Demo
                      </span>
                    )}
                    <a
                      href={current.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-mono uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
                    >
                      GitHub <FiGithub size={11} />
                    </a>
                  </div>

                  {current.paper && (
                    <PDFViewer
                      url={current.paper}
                      title="Data Analysis and Insight Generation with Queryable Knowledge Graphs"
                      isOpen={pdfOpen}
                      onClose={() => setPdfOpen(false)}
                      downloadName="knowledge-graph-paper.pdf"
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE: show all project cards stacked */}
          <div className="lg:hidden flex flex-col gap-6 mt-8">
            {projects.map((p) => (
              <div key={p.id} className="border border-black/10 dark:border-white/10 overflow-hidden">
                <div
                  className="h-32 flex items-end p-4"
                  style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                >
                  <div className="flex flex-wrap gap-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-white/10 text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-white dark:bg-zinc-950/80">
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-0.5">{p.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-3">{p.category}</p>
                  <p className="text-xs font-light leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">{p.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="flex items-center justify-center py-2.5 border border-black/10 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest text-zinc-300 dark:text-zinc-600 cursor-not-allowed">
                      Live Demo
                    </span>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-mono uppercase tracking-widest"
                    >
                      GitHub <FiGithub size={10} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
