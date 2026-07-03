"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/Section";
import { Github, Linkedin, Mail, ExternalLink, Terminal, Lock, Unlock, ArrowUpRight, FileText, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileDown } from "lucide-react";

import Lanyard from "@/components/Lanyard";

export default function Home() {
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const certScrollRef = useRef(null);

  const scrollCertificates = (direction) => {
    if (certScrollRef.current) {
      const { scrollLeft, clientWidth } = certScrollRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;

      certScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

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
      title: "Lost & Found",
      role: "QA Tester",
      desc: "A web-based platform for reporting and finding lost items.",
      whatIDid: "Performed functional testing, documented bugs, and suggested UI/UX improvements.",
      tech: "TypeScript, JavaScript, HTML, CSS",
      impact: "Improved the efficiency of managing lost and found reports digitally.",
      link: "https://campus-connect-web-sigma.vercel.app/",
      doc: "/docs/President University Lost & Found.pdf",
    },
    {
      title: "President Cupid’s",
      role: "QA Tester, UI/UX Designer, Digital Content Manager",
      desc: "Campus matchmaking platform with anonymous messaging and compatibility algorithms, 100+ active users in first launch.",
      whatIDid: "Developed secure features: anonymous messaging, blind chat, and matchmaking logic.",
      tech: "PHP, MySQL, CSS, JavaScript, HTML",
      impact: "Reached 15,000+ views and 45,000%+ growth within 30 days, with 83% new users from non-followers.",
      link: "https://president-cupid.wuaze.com",
      doc: "/docs/President’s Cupid Report.pdf",
    },
    {
      title: "GRC & Security Audit Platform",
      role: "QA Tester, Technical Documentation, UI/UX Reviewer",
      desc: "A web-based platform for cybersecurity risk assessment and compliance auditing.",
      whatIDid: "Prepared project documentation, evaluated system workflows, and recommended feature improvements to enhance usability and compliance processes.",
      tech: "FastAPI, HTML, CSS, JavaScript, SQLite, NIST CSF",
      impact: "Streamlined security risk assessment and compliance auditing through a centralized GRC platform.",
      doc: "/docs/PROJECT GRC.pdf",
    },
    {
      title: "Kost Management",
      role: "Database Designer",
      desc: "Web-based system for managing boarding houses, tenants, and automated payment tracking.",
      whatIDid: "Designed relational schemas and CRUD logic, including automated payment tracking.",
      tech: "PHP, MySQL",
      impact: "Modernized manual management processes, improving efficiency for over 100 tenants.",
      link: "https://github.com/saoyuhh/Kost-Management-System",
      doc: "/docs/Group 10_Database Project Report.pdf",
    },
    {
      title: "ArenaGo",
      role: "Android Developer",
      desc: "Mobile application for real-time badminton court booking and scheduling system.",
      whatIDid: "Built a real-time booking mobile app using Kotlin and Firebase, implementing automated scheduling to prevent overlaps.",
      tech: "Kotlin, Firebase, Java",
      impact: "Optimized court utilization and achieved zero-error manual booking processes.",
      link: "https://github.com/saoyuhh/Arena-Go",
      doc: "/docs/PROJECT WMP ArenaGo .pdf",
    },
    {
      title: "Emergency Hospital Simulator (Roblox)",
      role: "Game Designer",
      desc: "Multiplayer simulation game with interactive hospital roleplay and custom gameplay mechanics.",
      whatIDid: "Created immersive hospital layouts and built the interactive logic for a better roleplay experience.",
      tech: "Lua, Roblox Studio",
      impact: "Developed a smooth and stable simulation environment that players actually enjoy.",
      link: "https://www.roblox.com/games/80329704015269/Emergency-Hospital-simulator",
      doc: "/docs/REPORT FINAL PROJECT 3D ROBLOX_ANDRI_MICHELLE_ILHAM_NAILA.pdf",
    },
  ];

  const skillCategories = [
    { name: "Backend & Mobile", skills: ["PHP", "MySQL", "Kotlin"] },
    { name: "Frontend", skills: ["HTML", "CSS", "JavaScript"] },
    { name: "Security & Systems", skills: ["Linux", "Network Security", "Digital Forensics"] }
  ];

  const certificates = [
    {
      title: "AWS Security Fundamentals",
      issuer: "Amazon Web Services",
      path: "/certs/AWS Security Fundamentals Second Edition.pdf",
      image: "/certs/AWS Security Fundamentals Second Edition.jpg"
    },
    {
      title: "AWS Core Security Concepts",
      issuer: "Amazon Web Services",
      path: "/certs/AWS core security concept.pdf",
      image: "/certs/AWS core security concept.jpg"
    },
    {
      title: "AWS Shared Responsibility Model",
      issuer: "Amazon Web Services",
      path: "/certs/AWS Shared Responsibility.pdf",
      image: "/certs/AWS Shared Responsibility.jpg"
    },
    {
      title: "AWS Identity and Access Management (IAM)",
      issuer: "Amazon Web Services",
      path: "/certs/Introduction to AWS Identity and Access Management (IAM).pdf",
      image: "/certs/Introduction to AWS Identity and Access Management (IAM).jpg"
    },
    {
      title: "AWS Authentication and Authorization",
      issuer: "Amazon Web Services",
      path: "/certs/aws Authentication and Authorization with AWS Identity and Access Management.pdf",
      image: "/certs/aws Authentication and Authorization with AWS Identity and Access Management.jpg"
    },
    {
      title: "AWS Billing and Cost Management",
      issuer: "Amazon Web Services",
      path: "/certs/AWS Billing and Cost.pdf",
      image: "/certs/AWS Billing and Cost.jpg"
    },
    {
      title: "Dicoding / IDCamp Certification",
      issuer: "Dicoding Indonesia",
      path: "/certs/dicoding sertifikat_course_905_4282503_230326164643.pdf",
      image: "/certs/054d98f0-c04b-43c3-87de-3744a24bfc64-0.jpg"
    },
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
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileTap={{ scale: 0.95 }}
            className="font-black text-xl tracking-tighter hover:opacity-60 transition-opacity"
            style={{ color: isHackerMode ? '#32CD32' : '#000000' }}
          >
            M.
          </motion.button>
          <div className="flex gap-6 items-center text-sm font-black" style={{ color: isHackerMode ? '#32CD32' : '#000000' }}>
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileTap={{ scale: 0.95 }}
              className="hover:opacity-60 transition-opacity"
              style={{ color: isHackerMode ? '#32CD32' : '#000000' }}
            >Projects</motion.button>
            <motion.button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              whileTap={{ scale: 0.95 }}
              className="hover:opacity-60 transition-opacity"
              style={{ color: isHackerMode ? '#32CD32' : '#000000' }}
            >About</motion.button>
            <motion.button
              onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })}
              whileTap={{ scale: 0.95 }}
              className="hover:opacity-60 transition-opacity"
              style={{ color: isHackerMode ? '#32CD32' : '#000000' }}
            >Contact</motion.button>
            <motion.button
              onClick={() => setIsHackerMode(!isHackerMode)}
              whileTap={{ scale: 0.9 }}
              className="ml-2 p-2 rounded-full transition-colors"
              style={{ color: isHackerMode ? '#32CD32' : '#000000' }}
              aria-label="Toggle Hacker Mode"
            >
              {isHackerMode ? <Unlock size={18} /> : <Lock size={18} />}
            </motion.button>
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-20 pointer-events-none pt-16"
        >
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="mt-6"
            >
              <motion.a
                href="/docs/CV Michelle.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -5,
                  boxShadow: isHackerMode
                    ? "0 0 20px rgba(50, 205, 50, 0.4)"
                    : "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background dark:bg-matrix dark:text-black rounded-full font-black text-sm transition-colors duration-300"
              >
                View CV <FileDown size={16} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>


      {/* Projects Section */}
      <Section id="projects">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </Section>

      {/* About & Skills Section */}
      <Section id="about">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
                About Me
              </h2>
              <div className="space-y-4 text-lg leading-relaxed opacity-80 font-medium">
                <p>
                  Hi, I’m Michelle — an Informatics undergraduate focused on web development and cybersecurity.
                </p>
                <p>
                  I build things that work and matter. One of my projects, a campus matchmaking platform, grew to 100+ active users and was recognized by the university rector.
                </p>
                <p>
                  Beyond coding, I take on real responsibilities — managing a 50M+ IDR budget as Senior Treasurer and leading teams. It shapes how I think about building systems that are practical and reliable.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
                Core Skills
              </h2>
              <div className="space-y-6">
                {skillCategories.map((category, i) => (
                  <div key={i}>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 mb-3">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, j) => (
                        <motion.div
                          key={j}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-transparent border-2 border-foreground/10 dark:border-matrix/30 rounded-full font-bold hover:border-foreground dark:hover:border-matrix transition-all duration-300 hover:-translate-y-1 text-sm cursor-default"
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Credentials Section */}
      <Section id="credentials">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="w-8 h-1 bg-foreground rounded-full transition-colors duration-500"></span>
          Certificates
        </h2>

        <div className="relative group/slider">
          {/* Navigation Arrows */}
          <motion.button
            onClick={() => scrollCertificates('left')}
            whileTap={{ scale: 0.9 }}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/80 dark:bg-matrix/20 backdrop-blur-md border-2 border-foreground/10 dark:border-matrix/30 rounded-full shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 hidden md:block"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            onClick={() => scrollCertificates('right')}
            whileTap={{ scale: 0.9 }}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/80 dark:bg-matrix/20 backdrop-blur-md border-2 border-foreground/10 dark:border-matrix/30 rounded-full shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 hidden md:block"
            aria-label="Scroll Right"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Scroll Container */}
          <div
            ref={certScrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-8 snap-x snap-mandatory px-2"
          >
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="min-w-[300px] md:min-w-[400px] snap-center group relative bg-transparent border-2 border-foreground/10 dark:border-matrix/30 rounded-3xl p-6 hover:shadow-xl hover:border-foreground/50 dark:hover:border-matrix/80 transition-all duration-300 flex flex-col h-full"
              >
                <div className="w-full h-48 bg-foreground/5 dark:bg-matrix/5 rounded-2xl mb-5 flex items-center justify-center overflow-hidden border border-foreground/10 dark:border-matrix/20 relative">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
                      <span className="opacity-40 font-bold tracking-tight text-xs block leading-tight">{cert.title}</span>
                    </div>
                  )}
                  {/* Overlay for better readability on hover if needed */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                </div>
                <div className="flex-grow mb-4">
                  <h3 className="text-xl font-bold mb-1 text-foreground transition-colors leading-tight">{cert.title}</h3>
                  <p className="opacity-70 font-medium text-sm">Issued by {cert.issuer}</p>
                </div>
                <div className="mt-auto">
                  <motion.a
                    href={cert.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-foreground opacity-60 hover:opacity-100 transition-all"
                  >
                    View Full PDF <ExternalLink size={12} />
                  </motion.a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section id="connect" className="text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Got an idea? Let's go.</h2>
          <p className="text-xl opacity-70 font-medium">
            Open to internships and collaborations, don't hesitate to say hi.
          </p>
          <div className="pt-8">
            <motion.a
              href="mailto:miiseel122@gmail.com"
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background dark:bg-matrix dark:text-black rounded-full font-black text-xl hover:scale-105 transition-transform"
            >
              Get In Touch <ArrowUpRight size={24} />
            </motion.a>
          </div>
        </div>
      </Section>

      {/* Contact Footer */}
      <footer id="contact" className="py-8 border-t-2 border-foreground/10 dark:border-matrix/20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8"
        >


          <div className="flex justify-center gap-5">
            <motion.a href="https://github.com/saoyuhh" target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.9 }} className="p-4 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
              <Github size={24} />
            </motion.a>
            <motion.a href="https://linkedin.com/in/michelle--/" target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.9 }} className="p-4 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
              <Linkedin size={24} />
            </motion.a>
            <motion.a href="mailto:miiseel122@gmail.com" whileTap={{ scale: 0.9 }} className="p-4 border-2 border-foreground/10 dark:border-matrix/30 rounded-full hover:bg-foreground hover:text-background dark:hover:bg-matrix dark:hover:text-black transition-all">
              <Mail size={24} />
            </motion.a>
          </div>

          <p className="opacity-50 text-sm font-bold">
            © {new Date().getFullYear()} Michelle. System Secured.
          </p>
        </motion.div>
      </footer>
    </main>
  );
}

function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative bg-transparent border-2 border-foreground/10 dark:border-matrix/30 rounded-2xl p-6 hover:shadow-xl hover:border-foreground/50 dark:hover:border-matrix/80 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-foreground transition-colors">{project.title}</h3>
        {project.role && (
          <span className="text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full border border-foreground/20 opacity-60">
            {project.role}
          </span>
        )}
      </div>

      <p className="opacity-60 text-sm mb-4 font-medium italic leading-snug">{project.desc}</p>

      <div className="mb-4">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
        >
          {isOpen ? "Hide Details" : "View Details"}
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 mb-1">What I Did</h4>
                  <p className="text-sm font-bold opacity-80 leading-relaxed">{project.whatIDid}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 mb-1">Result</h4>
                  <p className="text-sm font-bold text-foreground/90 leading-relaxed">{project.impact}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto space-y-4 pt-4 border-t border-foreground/5">
        <div className="flex items-center gap-2 text-sm opacity-60">
          <Terminal size={14} />
          <span className="font-mono text-[10px] bg-foreground/5 dark:bg-matrix/10 px-2 py-1 rounded font-black">{project.tech}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {project.doc && project.doc !== "#" && (
              <motion.a
                href={project.doc}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest hover:text-foreground opacity-60 hover:opacity-100 transition-all group/link"
              >
                Documentation <FileText size={12} className="group-hover/link:scale-110 transition-transform" />
              </motion.a>
            )}
          </div>
          {project.link && project.link !== "#" && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest hover:text-foreground group/view"
            >
              Live View <ArrowUpRight size={12} className="group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5 transition-transform" />
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
}
