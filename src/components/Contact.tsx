import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';

import { FiArrowRight, FiCheck, FiLoader } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Header Animation is now handled by distinct ScrollRevealText components!
      // We don't need to manually stagger ".contact-text-char" here anymore.

      // 2. Info Text: Smooth Slide Up
      gsap.from(".contact-info-text", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      // 3. Form: Elastic Stagger
      gsap.from(".contact-form-item", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          subject:    formData.subject || '(no subject)',
          message:    formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError('Failed to send — please email me directly at rohitlahori12@gmail.com');
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen bg-black dark:bg-transparent text-white py-24 md:py-32 px-6 md:px-12 relative overflow-hidden font-sans border-t border-white/10"
    >

      {/* Swiss Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

        {/* Left Column: Context (Title + Info) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12">
          <div>
            <div className="flex flex-col text-6xl md:text-8xl font-bold tracking-tighter leading-[1] md:leading-[1] mb-8">

              {/* "LET'S" */}
              <div className="block">
                <ScrollRevealText text="LET'S" className="text-transparent text-stroke-white opacity-70 block" />
              </div>

              {/* "CONNECT." (with negative margin) */}
              <div className="-mt-2 md:-mt-4 block py-1">
                <span className="block">
                  <ScrollRevealText text="CONNECT" className="inline-block" />
                  <span className="text-red-600 inline-block overflow-hidden align-top">
                    <ScrollRevealText text="." className="text-red-600" />
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-6 max-w-md">
              <p className="contact-info-text text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                I build production AI systems — agentic pipelines, RAG, LLM platforms, and the infrastructure behind them.
              </p>
              <p className="contact-info-text text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                Open to internship and full-time roles, or just a good conversation about something you're building.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Minimalist Form */}
        <div className="lg:col-span-7 pt-4 lg:pt-0">
          <form onSubmit={handleSubmit} className="space-y-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative contact-form-item">
                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/50 py-4 text-xl font-light tracking-wide outline-none focus:border-red-600 transition-colors placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-widest"
                />
              </div>
              <div className="group relative contact-form-item">
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/50 py-4 text-xl font-light tracking-wide outline-none focus:border-red-600 transition-colors placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-widest"
                />
              </div>
            </div>

            <div className="group relative contact-form-item">
              <input
                type="text"
                name="subject"
                placeholder="SUBJECT (E.G. TECHNICAL CONSULTATION, OPPORTUNITY)"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/50 py-4 text-xl font-light tracking-wide outline-none focus:border-red-600 transition-colors placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-widest"
              />
            </div>

            <div className="group relative contact-form-item">
              <textarea
                name="message"
                placeholder="MESSAGE"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/50 py-4 text-xl font-light tracking-wide outline-none focus:border-red-600 transition-colors placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-widest resize-none"
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col items-end gap-3 contact-form-item">
              {error && (
                <p className="text-red-400 font-mono text-xs text-right">{error}</p>
              )}
              <button
                type="submit"
                disabled={sending || submitted}
                className="group flex items-center gap-4 px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? 'Message Sent!' : sending ? 'Sending…' : 'Send Message'}
                {submitted ? <FiCheck size={18} /> : sending ? <FiLoader size={18} className="animate-spin" /> : <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;