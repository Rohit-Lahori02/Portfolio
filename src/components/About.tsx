import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCornerDownRight } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

const AwardWinningAbout: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    // --- Stats Typing/Counting Animation ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stats animation enabled with once: true for stability
            // Stats Animation
            gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
                const originalText = el.innerText || ""; // Safety fallback

                // Skip if empty to avoid issues
                if (!originalText.trim()) return;

                const isNumber = /^[0-9]/.test(originalText);

                // Set initial state - fully visible but we'll animate content
                // We use a ScrollTrigger to start the "activity"
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 85%",
                    once: true,
                    onEnter: () => {
                        if (isNumber) {
                            // Number Counter
                            // Extract numeric part safely
                            const numericPart = originalText.replace(/[^0-9]/g, '');
                            const val = parseInt(numericPart, 10);
                            const suffix = originalText.replace(/[0-9]/g, ''); // e.g. "+"
                            const proxy = { val: 0 };

                            gsap.to(proxy, {
                                val: val,
                                duration: 2, // Slower for visibility
                                ease: "power3.out",
                                onUpdate: () => {
                                    // Pad with leading zero if original had it (simple heuristic: length of numeric part)
                                    // But user data is "02+", "10+". So padding to 2 is safe.
                                    el.innerText = Math.floor(proxy.val).toString().padStart(2, '0') + suffix;
                                }
                            });
                        } else {
                            // Text Scramble
                            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                            const proxy = { val: 0 };

                            gsap.to(proxy, {
                                val: 1, // Progress 0 to 1
                                duration: 1,
                                ease: "none",
                                onUpdate: () => {
                                    const progress = proxy.val;
                                    const len = originalText.length;
                                    const revealNum = Math.floor(progress * len);

                                    const revealPart = originalText.substring(0, revealNum);
                                    let randomPart = "";

                                    // Only add random chars if not finished
                                    if (revealNum < len) {
                                        for (let i = 0; i < len - revealNum; i++) {
                                            randomPart += chars[Math.floor(Math.random() * chars.length)];
                                        }
                                    }

                                    el.innerText = revealPart + randomPart;
                                },
                                onComplete: () => {
                                    el.innerText = originalText; // Ensure final state is perfect
                                }
                            });
                        }
                    }
                });
            });
        }, sectionRef);

        // Refresh ScrollTrigger to ensure correct positions after layout calculation
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    const stats = [
        { label: "EXP_YRS", value: "02+", desc: "Years Experience" },
        { label: "PRJ_CMP", value: "10+", desc: "Projects Completed" },
        { label: "CLOUD", value: "AWS", desc: "Native Solutions" },
        { label: "AVAIL", value: "OPEN", desc: "For New Opportunities", active: true },
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative font-sans py-24 md:py-32 overflow-visible min-h-75vh flex flex-col justify-center bg-white dark:bg-transparent"
        >
            {/* --- Swiss Grid Background --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Vertical Lines */}
                <div className="absolute inset-0 flex justify-between px-6 md:px-12 max-w-[1800px] mx-auto w-full h-full">
                    {[...Array(6)].map((_, i) => (
                        <div key={`v-${i}`} className="relative h-full">
                            <div className="grid-line w-px h-full bg-black/5 dark:bg-white/10"></div>
                            {/* Crosshairs at intersections */}
                            {[...Array(5)].map((_, j) => (
                                <div key={`ch-${i}-${j}`} className="grid-crosshair absolute -left-[3px] w-[7px] h-[7px] border-l border-t border-black/20 dark:border-white/20" style={{ top: `${(j + 1) * 20}%` }}></div>
                            ))}
                        </div>
                    ))}
                </div>
                {/* Horizontal Lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-24 h-full">
                    {[...Array(5)].map((_, i) => (
                        <div key={`h-${i}`} className="grid-line h-px w-full bg-black/5 dark:bg-white/5"></div>
                    ))}
                </div>
            </div>

            {/* --- Main Content --- */}
            <div ref={contentRef} className="relative z-10 max-w-[1800px] mx-auto w-full px-6 md:px-12">

                {/* Header: Monumental Outline Text */}
                <div className="mb-16 md:mb-24 relative">
                    <div className="flex items-center gap-4 mb-4">
                        <FiCornerDownRight className="text-red-500 w-6 h-6" />
                        <span className="font-mono text-xs uppercase tracking-widest text-red-500">Identity</span>
                    </div>
                    <h2 ref={titleRef} className="text-[25vw] md:text-[10vw] leading-[0.8] font-bold uppercase tracking-tighter text-transparent text-stroke-responsive opacity-60 select-none pointer-events-none break-words">
                        <ScrollRevealText text="WHO" />
                    </h2>
                    <div className="about-content-item relative md:absolute md:top-1/2 left-0 md:left-1/4 mt-12 md:mt-0 ml-0 md:ml-20 transform md:-translate-y-1/2 w-full md:w-2/3 pl-6 border-l-2 border-red-500">
                        <p className="text-lg md:text-2xl font-light leading-relaxed text-black dark:text-white">
                            I'm an <span className="font-bold">AI Engineer</span> who builds <span className="font-bold">production AI systems</span>, not demos. Most recently I shipped an <span className="font-bold">AI-powered interview hiring platform</span> at <span className="font-bold text-red-500">Kaplan Institute</span> — serving <span className="font-bold">800+ users</span> across <span className="font-bold">25+ enterprise clients</span>, with <span className="font-bold">agentic pipelines</span>, <span className="font-bold">RAG</span>, and full-stack ownership from architecture to deployment.
                        </p>
                        <p className="text-lg md:text-2xl font-light leading-relaxed text-black dark:text-white mix-blend-difference mt-6">
                            I just graduated with an <span className="font-bold">M.S. in Computer Science (AI Specialization)</span> at <span className="font-bold text-red-500">Illinois Tech</span>, Chicago and I'm always building something on the side.
                        </p>
                    </div>
                </div>

                {/* --- Stats Section: Datasheet Grid --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-black/10 dark:border-white/10">
                    {stats.map((stat, index) => (
                        <div key={index} className="about-content-item border-r border-b border-black/10 dark:border-white/10 p-6 md:p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-red-500 transition-colors">{stat.label}</span>
                                {stat.active && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
                            </div>
                            <div className="stat-value text-4xl md:text-5xl font-mono font-light mb-2 text-black dark:text-white" data-value={stat.value}>{stat.value}</div>
                            <div className="text-xs font-mono uppercase text-gray-400">{stat.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                 .text-stroke-responsive {
                    -webkit-text-stroke: 1px black;
                 }
                 .dark .text-stroke-responsive {
                    -webkit-text-stroke: 1px white;
                 }
            `}</style>
        </section>
    );
};

export default AwardWinningAbout;