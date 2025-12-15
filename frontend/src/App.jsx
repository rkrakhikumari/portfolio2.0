import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Send, Code2, Database, Rocket, Zap, Terminal, Cpu } from 'lucide-react';
// NOTE: Don't import photo from public folder. Use src="/profile.png" instead

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Refs for sections
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
      return;
    }

    setLoading(true);
    
    try {
const response = await fetch('https://portfolio2-0-tchb.vercel.app/api/contact', {        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: 'Enterprise Resource Management',
      description: 'Full ERM backend with JWT auth, role-based access, async task processing',
      tech: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
      icon: '⚙️',
    },
    {
      title: 'Document Intelligence Platform',
      description: 'Advanced document processing with semantic search using ChromaDB',
      tech: ['Flask', 'ChromaDB', 'Ollama', 'PostgreSQL', 'Celery'],
      icon: '📄',
    },
    {
      title: 'Shop Rise E-Commerce',
      description: 'Modern e-commerce with product browsing, bidding, and cart functionality',
      tech: ['React', 'FastAPI', 'MongoDB', 'Web Scraping'],
      icon: '🛍️',
    },
    {
      title: 'Flipkart Web Scraper',
      description: 'Intelligent web scraping tool for product data extraction and analytics',
      tech: ['BeautifulSoup', 'Selenium', 'MongoDB', 'Python'],
      icon: '🕷️',
    }
  ];

  const skills = [
    { category: 'Backend', items: ['Python', 'Django', 'FastAPI', 'Flask', 'REST APIs'], icon: Code2 },
    { category: 'Frontend', items: ['React.js', 'HTML', 'CSS', 'UI Design', 'TailwindCSS'], icon: Rocket },
    { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'], icon: Database },
    { category: 'DevOps', items: ['Docker', 'Redis', 'Celery', 'Git', 'Ollama'], icon: Cpu }
  ];

  const experience = [
    {
      company: 'Excellence Technologies',
      role: 'Python Developer Intern',
      period: 'Jun 2025 – Present',
      location: 'Noida',
      highlights: ['ERM backend', 'FastAPI REST APIs', 'Web scraping', 'AI Assistant'],
    },
    {
      company: 'Rounder Labs Pvt. Ltd.',
      role: 'Python Developer Intern',
      period: 'Sep 2024 – Feb 2025',
      location: 'Delhi',
      highlights: ['30% data optimization', '25% faster queries', '99.9% uptime'],
    },
    {
      company: 'XzectLabs Pvt. Ltd.',
      role: 'Backend Developer Intern',
      period: 'Jun 2024 – Aug 2024',
      location: 'Delhi',
      highlights: ['Django REST', 'API reliability', 'CMS management'],
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');

        * {
          font-family: 'Courier Prime', monospace;
          outline: none !important;
        }

        button, a, input, textarea {
          outline: none !important;
          box-shadow: none !important;
        }

        button:focus, a:focus, input:focus, textarea:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        @keyframes float-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-right {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes neon-flicker {
          0%, 100% { text-shadow: 0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.6); }
        }

        .animate-float-up { animation: float-up 0.6s ease-out forwards; }
        .animate-slide-left { animation: slide-left 0.8s ease-out forwards; }
        .animate-slide-right { animation: slide-right 0.8s ease-out forwards; }
        .animate-neon-flicker { animation: neon-flicker 3s ease-in-out infinite; }

        .transition-smooth { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }

        .glow-text {
          background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.5));
        }

        .code-block {
          background: linear-gradient(135deg, rgba(5, 46, 22, 0.9) 0%, rgba(6, 28, 55, 0.9) 100%);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }

        .code-block::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.8), transparent);
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), inset 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .terminal-text {
          color: #10b981;
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
          font-weight: 600;
          letter-spacing: 1px;
        }

        .tech-tag {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #10b981;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          text-shadow: 0 0 5px rgba(16, 185, 129, 0.6);
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .project-card {
          background: linear-gradient(135deg, rgba(5, 30, 24, 0.8) 0%, rgba(6, 28, 55, 0.8) 100%);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 16px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition-smooth;
          cursor: pointer;
        }

        .project-card:hover {
          border-color: rgba(16, 185, 129, 0.6);
          box-shadow: 0 0 40px rgba(16, 185, 129, 0.3), inset 0 0 30px rgba(16, 185, 129, 0.1);
          transform: translateY(-15px);
        }

        .experience-item {
          background: linear-gradient(135deg, rgba(5, 30, 24, 0.6) 0%, rgba(6, 28, 55, 0.6) 100%);
          border-left: 3px solid rgba(16, 185, 129, 0.6);
          border-top: 1px solid rgba(16, 185, 129, 0.2);
          border-right: 1px solid rgba(16, 185, 129, 0.2);
          border-bottom: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          padding: 24px;
          transition-smooth;
        }

        .experience-item:hover {
          border-left-color: rgba(16, 185, 129, 0.9);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.05);
          transform: translateX(10px);
        }

        .nav-underline {
          position: relative;
          transition-smooth;
        }

        .nav-underline::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #10b981;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
          transition-smooth;
        }

        .nav-underline:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-100"></div>

      {/* Animated Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-3xl font-bold glow-text animate-neon-flicker">
              {'<RC />'}
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { label: 'About', ref: aboutRef },
                { label: 'Experience', ref: experienceRef },
                { label: 'Projects', ref: projectsRef },
                { label: 'Contact', ref: contactRef }
              ].map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref)}
                  className="nav-underline text-gray-300 hover:text-emerald-400 outline-none"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden hover:text-emerald-400 transition-smooth">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 w-full z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-left flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-smooth animate-pulse"></div>
                <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border-2 border-emerald-500/60 code-block">
                  <img 
                    src="/profile.png" 
                    alt="Rakhi Choudhary" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="animate-slide-right text-center md:text-left">
              <div className="mb-6 animate-float-up" style={{ animationDelay: '0.2s' }}>
                <p className="text-emerald-400 text-sm tracking-widest mb-2"># DEVELOPER.PORTFOLIO</p>
              </div>

              <h1 className="text-6xl md:text-7xl font-black mb-6 glow-text" style={{ animationDelay: '0.3s' }}>
                Rakhi Choudhary
              </h1>

              <h2 className="text-2xl md:text-3xl mb-6 text-cyan-400 font-bold terminal-text" style={{ animationDelay: '0.4s' }}>
                Backend Developer
              </h2>

              <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed" style={{ animationDelay: '0.5s' }}>
                Building scalable backend systems. Python | FastAPI | PostgreSQL. Transforming complex problems into elegant solutions.
              </p>

              <div className="flex flex-wrap gap-4 mb-12 justify-center md:justify-start" style={{ animationDelay: '0.6s' }}>
                <a href="https://github.com/rkrakhikumari" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-3 overflow-hidden rounded-lg font-bold transition-smooth hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-20 group-hover:opacity-100 transition-smooth"></div>
                  <div className="relative flex items-center gap-2 border border-emerald-500/50 group-hover:border-emerald-400 px-6 py-2 rounded-lg transition-smooth bg-black">
                    <Github size={18} /> GitHub
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/rakhi-choudhary-96ab88271" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-3 overflow-hidden rounded-lg font-bold transition-smooth hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 group-hover:opacity-100 transition-smooth"></div>
                  <div className="relative flex items-center gap-2 border border-cyan-500/50 group-hover:border-cyan-400 px-6 py-2 rounded-lg transition-smooth bg-black">
                    <Linkedin size={18} /> LinkedIn
                  </div>
                </a>
                <a href="https://leetcode.com/u/_rakhi__choudhary_/" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-3 overflow-hidden rounded-lg font-bold transition-smooth hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-20 group-hover:opacity-100 transition-smooth"></div>
                  <div className="relative border border-orange-500/50 group-hover:border-orange-400 px-6 py-2 rounded-lg transition-smooth bg-black">
                    LeetCode
                  </div>
                </a>
              </div>

              <div className="animate-pulse text-emerald-400 text-center md:text-left">
                <ChevronDown size={24} className="inline animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-16 glow-text animate-float-up">// ABOUT ME</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="code-block p-8 hover-glow transition-smooth">
              <p className="text-gray-300 leading-relaxed mb-6">
                <span className="text-emerald-400">const </span>
                <span className="text-cyan-400">developer</span>
                <span className="text-gray-400"> = </span>
                <span className="text-yellow-400">{}</span>
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Detail-oriented Backend Developer with hands-on experience building scalable systems. Expert in Python, Django, FastAPI, and cloud technologies.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Pursuing MCA from IGNOU. Passionate about creating robust, secure applications that solve real-world problems.
              </p>
            </div>

            <div className="space-y-6">
              {skills.map((skillGroup, idx) => (
                <div key={skillGroup.category} className="code-block p-6 hover-glow transition-smooth" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <skillGroup.icon className="text-emerald-400 w-6 h-6" />
                    <h3 className="text-lg font-bold terminal-text">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span key={skill} className="tech-tag text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-16 glow-text animate-float-up">// EXPERIENCE</h2>
          
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="experience-item group" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold terminal-text mb-2">{exp.company}</h3>
                    <p className="text-cyan-400 font-bold mb-1">{exp.role}</p>
                    <p className="text-gray-400 text-sm">{exp.period} • {exp.location}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3 group/item">
                      <span className="text-emerald-400 font-bold mt-1 group-hover/item:animate-bounce">→</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-16 glow-text animate-float-up">// PROJECTS</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="project-card group"
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{project.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 terminal-text group-hover:text-cyan-400 transition-smooth">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="relative py-32 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black mb-16 text-center glow-text animate-float-up">// GET IN TOUCH</h2>
          
          <div className="code-block p-10 hover-glow transition-smooth">
            <div className="mb-8">
              <label className="block text-emerald-400 font-bold mb-2 text-sm"># Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full px-4 py-3 bg-black border border-emerald-500/30 rounded-lg text-emerald-400 placeholder-gray-600 focus:border-emerald-400 focus:outline-none transition-smooth text-sm"
                placeholder="Enter your name..."
              />
            </div>

            <div className="mb-8">
              <label className="block text-emerald-400 font-bold mb-2 text-sm"># Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full px-4 py-3 bg-black border border-emerald-500/30 rounded-lg text-emerald-400 placeholder-gray-600 focus:border-emerald-400 focus:outline-none transition-smooth text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-8">
              <label className="block text-emerald-400 font-bold mb-2 text-sm"># Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className="w-full px-4 py-3 bg-black border border-emerald-500/30 rounded-lg text-emerald-400 placeholder-gray-600 focus:border-emerald-400 focus:outline-none transition-smooth h-32 resize-none text-sm"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              onClick={handleFormSubmit}
              disabled={loading}
              className="w-full px-6 py-3 bg-black border border-emerald-500/60 rounded-lg hover:border-emerald-400 hover:bg-emerald-500/10 transition-smooth font-bold text-emerald-400 flex items-center justify-center gap-2 group hover:-translate-y-1 disabled:opacity-50"
            >
              <Send size={18} className="group-hover:translate-x-1 transition-smooth" />
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {formStatus === 'success' && (
              <div className="mt-6 p-4 bg-emerald-500/20 border border-emerald-500/60 rounded-lg text-emerald-400 text-center animate-float-up font-bold">
                ✓ Message Sent Successfully!
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/60 rounded-lg text-red-400 text-center animate-float-up font-bold">
                ✗ Error sending message. Please try again.
              </div>
            )}
          </div>

          <div className="mt-16 flex justify-center gap-8">
            <a href="https://github.com/rkrakhikumari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-smooth group p-4 hover:bg-emerald-500/10 rounded-lg hover:-translate-y-1">
              <Github size={28} className="group-hover:scale-125 transition-smooth" />
            </a>
            <a href="https://www.linkedin.com/in/rakhi-choudhary-96ab88271" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-smooth group p-4 hover:bg-cyan-500/10 rounded-lg hover:-translate-y-1">
              <Linkedin size={28} className="group-hover:scale-125 transition-smooth" />
            </a>
            <a href="mailto:rkrakhichoudhary@gmail.com" className="text-gray-400 hover:text-emerald-400 transition-smooth group p-4 hover:bg-emerald-500/10 rounded-lg hover:-translate-y-1">
              <Mail size={28} className="group-hover:scale-125 transition-smooth" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative py-12 px-4 border-t border-emerald-500/20 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Rakhi Choudhary. <span className="text-emerald-400 terminal-text">Built with code & creativity</span>
          </p>
        </div>
      </section>
    </div>
  );
}