"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
      title: "Kost Management System",
      desc: "Comprehensive system for managing boarding houses and tenants.",
      tech: "PHP, MySQL",
      impact: "100+ users / real-time tracking",
      link: "#",
    },
    {
      title: "Student Matching Platform (Cupid)",
      desc: "Platform to connect students based on interests and academic goals.",
      tech: "React, Node.js",
      impact: "Enhanced student networking",
      link: "#",
    },
    {
      title: "ArenaGo",
      desc: "Sports venue booking and management application.",
      tech: "Kotlin, Firebase",
      impact: "Streamlined reservation process",
      link: "#",
    },
    {
      title: "Roblox Game (Optional)",
      desc: "Interactive multiplayer game developed on the Roblox platform.",
      tech: "Lua",
      impact: "1000+ plays / community engagement",
      link: "#",
    },
    {
      title: "IRMAS (Risk Management)",
      desc: "Internal Risk Management System for tracking vulnerabilities.",
      tech: "PHP, Bootstrap",
      impact: "Improved security posture",
      link: "https://github.com",
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
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-3 text-foreground transition-colors duration-500">Michelle</h1>
            <p className="text-xl md:text-2xl opacity-80 mb-5 font-semibold transition-colors duration-500">
              Informatics Student | Web & System Developer
            </p>
            <p className="text-lg opacity-70 max-w-lg leading-relaxed font-medium transition-colors duration-500">
              Building structured web systems and internal applications using PHP, MySQL, and Kotlin.
            </p>
          </div>
        </div>
      </section>


      {/* About Section */}
      <Section id="about" className="my-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
            About Me
          </h2>
          <p className="text-lg leading-relaxed opacity-80 font-medium">
            I am an Informatics & Cyber Security student at President University with a strong focus on digital forensics.
            I bridge the gap between building robust software systems and ensuring they remain secure and reliable.
            My passion lies in developing practical applications, from internal management tools to complex web platforms,
            always with an eye on structured, maintainable code.
          </p>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="my-8">
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
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={project.link} className="text-foreground/50 hover:text-foreground">
                  <ExternalLink size={20} />
                </a>
              </div>

              <h3 className="text-xl font-bold mb-2 text-foreground transition-colors">{project.title}</h3>
              <p className="opacity-70 mb-6 flex-grow font-medium">{project.desc}</p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-2 text-sm opacity-60">
                  <Terminal size={14} />
                  <span className="font-mono text-xs bg-foreground/5 dark:bg-matrix/10 px-2 py-1 rounded font-bold">{project.tech}</span>
                </div>
                <div className="text-sm font-bold opacity-90 flex justify-between items-center">
                  <span>Impact: <span className="font-medium opacity-70">{project.impact}</span></span>
                  {(project.title.includes("IRMAS") || project.title.includes("Cupid")) && (
                    <a href={project.link} className="flex items-center gap-1 text-xs uppercase tracking-wider hover:underline">
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
      <Section id="skills" className="my-8">
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
      <Section id="credentials" className="my-8 mb-16">
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

      {/* Contact Footer */}
      <footer id="contact" className="py-10 border-t-2 border-foreground/10 dark:border-matrix/20 text-center">
        <h2 className="text-2xl font-bold mb-5">Let's Connect</h2>
        <div className="flex justify-center gap-5 mb-6">
          <a href="#" className="p-3 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
            <Github size={20} />
          </a>
          <a href="#" className="p-3 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
            <Linkedin size={20} />
          </a>
          <a href="mailto:contact@example.com" className="p-3 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
            <Mail size={20} />
          </a>
        </div>
        <p className="opacity-50 text-sm font-bold">
          © {new Date().getFullYear()} Michelle. System Secured.
        </p>
      </footer>
    </main>
  );
}
