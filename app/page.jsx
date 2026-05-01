"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Github, Linkedin, Mail, ExternalLink, Terminal, Lock, Unlock, ArrowUpRight } from "lucide-react";

import Lanyard from "@/components/Lanyard";

export default function Home() {
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Always start at the very top, ignore any URL hash
    window.history.replaceState(null, '', window.location.pathname);
    window.scrollTo(0, 0);

    setMounted(true);
    if (isHackerMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isHackerMode]);

  const projects = [
    {
      title: "President Cupid’s",
      desc: "Campus-based matchmaking platform that connects students across majors and organizations based on shared interests.",
      tech: "PHP, MySQL",
      impact: "Achieved 100+ active users and university-level recognition",
      link: "president-cupid.wuaze.com",

    },
    {
      title: "Kost Management System",
      desc: "Web-based system for managing boarding houses, tenants, rooms, and payment records in an organized structure.",
      tech: "PHP, MySQL",
      impact: "Improved operational efficiency for 100+ tenants through structured data management",
      link: "https://github.com/saoyuhh/Kost-Management-System",
    },
    {
      title: "ArenaGo",
      desc: "Mobile application for real-time badminton court booking and scheduling system.",
      tech: "Kotlin, Firebase",
      impact: "Reduced double-booking issues and improved reservation efficiency",
      link: "https://github.com/saoyuhh/Arena-Go",

    },
    {
      title: "Emergency Hospital Simulator (Roblox)",
      desc: "Multiplayer simulation game with interactive hospital roleplay and custom gameplay mechanics.",
      tech: "Lua, Roblox Studio",
      impact: "Enhanced multiplayer experience through optimized server-side logic",
      link: "#",

    },
  ];

  const skills = [
    "C++",
    "Java",
    "Python",
    "PHP",
    "MySQL",
    "Linux",
    "Network Security",
    "Digital Forensics",
    "hello",
  ];

  return (
    <main
      className="min-h-screen font-sans transition-colors duration-500"
      style={{
        backgroundColor: 'var(--background, #FFF9C4)',
        color: 'var(--foreground, #171717)'
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <div className="font-black text-xl tracking-tighter" style={{ color: isHackerMode ? '#32CD32' : '#000000' }}>M.</div>
          <div className="flex gap-6 items-center text-sm font-black" style={{ color: isHackerMode ? '#32CD32' : '#000000' }}>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:opacity-60 transition-opacity"
              style={{ color: isHackerMode ? '#32CD32' : '#000000' }}
            >About</button>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:opacity-60 transition-opacity"
              style={{ color: isHackerMode ? '#32CD32' : '#000000' }}
            >Projects</button>
            <button
              onClick={() => setIsHackerMode(!isHackerMode)}
              className="ml-2 p-2 rounded-full transition-colors"
              style={{ color: isHackerMode ? '#32CD32' : '#000000' }}
              aria-label="Toggle Hacker Mode"
            >
              {isHackerMode ? <Unlock size={18} /> : <Lock size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-start justify-start pt-24 overflow-hidden">

        {/* Full-screen 3D Canvas - fills entire hero, behind text */}
        <div
          className="absolute inset-0 z-10"
          style={{ pointerEvents: 'none' }}
        >
          <div style={{ width: '100%', height: '100%', pointerEvents: 'all' }}>
            {mounted && <Lanyard isHackerMode={isHackerMode} />}
          </div>
        </div>

        {/* Text Content - above canvas */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-20 pointer-events-none pt-16">
          <div className="w-full md:w-1/2 text-left pointer-events-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 text-foreground transition-colors duration-500"
            >
              Michelle.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl opacity-80 mb-6 font-bold transition-colors duration-500 leading-tight"
            >
              Tech Enthusiast <span className="text-foreground/30 px-2">&</span> Undergraduate Student
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-lg md:text-xl opacity-70 max-w-md leading-relaxed font-medium transition-colors duration-500"
            >
              Passionate about turning ideas into practical digital solutions through technology and constant learning.
            </motion.p>
          </div>
        </div>
      </section>


      {/* About Section */}
      <Section id="about">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
            About Me
          </h2>
          <p className="text-lg leading-relaxed opacity-80 font-medium">
            Undergraduate Informatics student interested in web development and cybersecurity.
          </p>
          <p className="text-lg leading-relaxed opacity-80 font-medium">
            I enjoy building simple, functional web applications and exploring how systems work behind the scenes.
            I focus on strengthening my fundamentals in development, clean code, and basic security practices.
            Currently, I’m continuing to build my foundation in web development, security, and software testing.
          </p>

        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
          Cyber Lab (Projects)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-transparent border-2 border-foreground/10 dark:border-matrix/30 rounded-2xl p-6 hover:shadow-xl hover:border-foreground/50 dark:hover:border-matrix/80 transition-all duration-300 flex flex-col h-full"
            >


              <h3 className="text-xl font-bold mb-2 text-foreground transition-colors">{project.title}</h3>
              <p className="opacity-70 mb-6 flex-grow font-medium">{project.desc}</p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-2 text-sm opacity-60">
                  <Terminal size={14} />
                  <span className="font-mono text-xs bg-foreground/5 dark:bg-matrix/10 px-2 py-1 rounded font-bold">{project.tech}</span>
                </div>
                <div className="text-sm font-bold opacity-90 flex justify-between items-center">
                  <span>Impact: <span className="font-medium opacity-70">{project.impact}</span></span>
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      className="flex items-center gap-1 text-xs uppercase tracking-wider hover:underline"
                    >
                      View <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
            Core Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="px-5 py-2.5 bg-transparent border-2 border-foreground/10 dark:border-matrix/30 rounded-full font-bold hover:border-foreground dark:hover:border-matrix transition-all duration-300 hover:-translate-y-1"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Credentials Section */}
      <Section id="credentials">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
          Professional Credentials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Certificate 1 */}
          <div className="group relative bg-transparent border-2 border-foreground/10 dark:border-matrix/30 rounded-3xl p-6 hover:shadow-xl hover:border-foreground/50 dark:hover:border-matrix/80 transition-all duration-300">
            <div className="w-full h-40 bg-foreground/5 dark:bg-matrix/5 rounded-2xl mb-5 flex items-center justify-center overflow-hidden border border-foreground/10 dark:border-matrix/20">
              <span className="opacity-80 font-bold text-xl tracking-wider">IDCamp</span>
            </div>
            <h3 className="text-xl font-bold mb-1 text-foreground transition-colors">IDCamp Data Scientist</h3>
            <p className="opacity-70 font-medium">Issued by IDCamp</p>
          </div>

          {/* Certificate 2 (Placeholder) */}
          <div className="group relative bg-transparent border-2 border-foreground/10 dark:border-matrix/30 rounded-3xl p-6 hover:shadow-xl hover:border-foreground/50 dark:hover:border-matrix/80 transition-all duration-300">
            <div className="w-full h-40 bg-foreground/5 dark:bg-matrix/5 rounded-2xl mb-5 flex items-center justify-center overflow-hidden border-2 border-foreground/10 border-dashed dark:border-matrix/30">
              <span className="opacity-40 font-bold">CEH / CompTIA Image</span>
            </div>
            <h3 className="text-xl font-bold mb-1 text-foreground transition-colors">CEH / CompTIA</h3>
            <p className="opacity-70 font-medium">Pending Certification</p>
          </div>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section id="connect" className="text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ready to secure the future?</h2>
          <p className="text-xl opacity-70 font-medium">
            Currently looking for new opportunities and collaborations in web development and cyber security.
          </p>
          <div className="pt-8">
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background dark:bg-matrix dark:text-black rounded-full font-black text-xl hover:scale-105 transition-transform"
            >
              Get In Touch <ArrowUpRight size={24} />
            </a>
          </div>
        </div>
      </Section>

      {/* Contact Footer */}
      <footer id="contact" className="py-20 border-t-2 border-foreground/10 dark:border-matrix/20 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-black text-2xl tracking-tighter">M.</div>

          <div className="flex justify-center gap-5">
            <a href="#" className="p-4 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
              <Github size={24} />
            </a>
            <a href="#" className="p-4 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
              <Linkedin size={24} />
            </a>
            <a href="mailto:contact@example.com" className="p-4 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
              <Mail size={24} />
            </a>
          </div>

          <p className="opacity-50 text-sm font-bold">
            © {new Date().getFullYear()} Michelle. System Secured.
          </p>
        </div>
      </footer>
    </main>
  );
}
