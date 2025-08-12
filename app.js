const { useState, useEffect, useRef } = React;

// Portfolio data
const portfolioData = {
  personal_info: {
    name: "Piyush Bhardwaj",
    title: "Software Developer & Blockchain Enthusiast",
    email: "piyushkr07p@gmail.com",
    phone: "+91 7520319768",
    location: "Gurgaon, Haryana",
    linkedin: "https://linkedin.com/in/piyush-bhardwaj",
    github: "https://github.com/piyushbhardwaj",
    leetcode: "https://leetcode.com/piyushbhardwaj",
    bio: "Passionate software developer with expertise in full-stack web development and blockchain technologies. Currently pursuing Computer Science Engineering with a focus on innovative solutions and cutting-edge technologies."
  },
  stats: {
    experience_years: "1+",
    technologies_count: "22+",
    projects_count: "3",
    certifications_count: "10+"
  },
  skills: {
    programming_languages: ["Java", "C", "C++", "JavaScript", "SQL"],
    web_technologies: ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "ReactJS", "NodeJS", "ExpressJS", "MongoDB",],
    //blockchain_technologies: ["Solidity", "Web3.js", "Smart Contracts", "Ethereum", "Avalanche", "Polygon", "MetaMask"],
    development_tools: ["VS Code", "Git/GitHub", "Postman"],
    core_competencies: [
      "Web Development", "Software Engineering", "Data Structures & Algorithms",
      "Operating Systems", "Computer Architecture", "Database Management Systems",
      "Computer Networks", "Object-Oriented Programming"
    ]
  },
  experience: [
    {
      position: "Software Engineer Intern (SDE I)",
      company: "PolicyBazaar.com",
      duration: "May 2025 – July 2025",
      location: "Gurgaon, Haryana",
      responsibilities: [
        "Contributed to developing investment-related features using React and MongoDB in the Investment Tech team",
        "Built scalable and efficient projects ensuring smooth user experiences and optimal performance",
        "Collaborated with cross-functional teams to deliver high-quality solutions for the investment domain",
        "Gained hands-on experience with enterprise-level software development practices"
      ]
    },
    {
      position: "Project Intern",
      company: "MetaCrafters",
      duration: "June 2024 – September 2024",
      location: "Online",
      responsibilities: [
        "Worked on comprehensive blockchain projects across multiple platforms including Ethereum, Avalanche, and Polygon",
        "Gained practical experience in decentralized technologies and smart contract development",
        "Won scholarship for outstanding dedication and expertise in the blockchain domain",
        "Developed proficiency in various blockchain development tools and frameworks"
      ]
    }
  ],
  projects: [
    {
      name: "Decentralized Dining Platform",
      date: "February 2024",
      technologies: ["Blockchain", "Web3.js", "Solidity", "MetaMask"],
      description: "Developed an innovative blockchain-based dining solution enabling customers to access decentralized menus. Implemented secure cryptocurrency payment system via MetaMask integration with transaction transparency and smart contract functionality for payments and menu management."
    },
    {
      name: "Advanced E-commerce Platform",
      date: "November 2023",
      technologies: ["MongoDB", "ExpressJS", "ReactJS", "NodeJS"],
      description: "Built a comprehensive full-stack e-commerce platform with advanced filtering capabilities. Features include dynamic product search, user authentication, shopping cart functionality, payment integration, and responsive design with admin panel."
    },
    {
      name: "AI-Based Traffic Management System",
      date: "2024",
      technologies: ["IoT Sensors", "AI/ML", "Python", "Computer Vision"],
      description: "Developed intelligent traffic management system analyzing real-time traffic data. Implemented dynamic traffic light control, integrated IoT sensors with machine learning algorithms for predictive optimization, achieving significant improvements in traffic flow efficiency."
    }
  ],
  education: [
    {
      institution: "Chandigarh University, Mohali, Punjab",
      degree: "Bachelor of Engineering - Computer Science and Engineering",
      duration: "August 2022 – August 2026",
      grade: "CGPA: 8.22"
    },
    {
      institution: "Jawahar Navodaya Vidyalaya, Begusarai, Bihar",
      degree: "Intermediate - PCM",
      duration: "Completed: August 2022",
      grade: "Percentage: 94.80%"
    },
    {
      institution: "Jawahar Navodaya Vidyalaya, Begusarai, Bihar",
      degree: "Matriculation-All",
      duration: "Completed: March 2020",
      grade: "Percentage: 94.20%"
    }
  ],
  certifications: [
    "ReactJS & IoT - Coursera",
    "Java Programming - Professional Certification",
    "Python & Django Web Development - Coursera",
    "Cloud Computing Fundamentals - NPTEL",
    "C++ Programming - Professional Certification",
    "Computer Architecture - NPTEL",
    "Machine Learning, Flutter & Mobile Development - Workshop Certification"
  ],
  achievements: [
    "KVPY (Kishore Vaigyanik Protsahan Yojana) Bronze Medal Recipient",
    "SIH (Smart India Hackathon) & University Level Hackathon Certifications",
    "MetaCrafters Blockchain Development Scholarship Winner",
    "Consistent academic performance with 8.22 CGPA"
  ]
};

// Theme Hook
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

// Intersection Observer Hook
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

// Header Component
const Header = ({ theme, toggleTheme, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <a href="#hero" className="nav-brand" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
          Piyush Bhardwaj
        </a>
        
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className={activeSection === link.href.slice(1) ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [ref, isInView] = useInView();
  const { personal_info, stats } = portfolioData;

  return (
    <section id="hero" ref={ref} className={`section hero ${isInView ? 'animate-in' : ''}`}>
      <div className="container">
        <div className="hero-profile">
          {personal_info.name.split(' ').map(name => name[0]).join('')}
        </div>
        <h1 className="hero-name">{personal_info.name}</h1>
        <p className="hero-title">{personal_info.title}</p>
        <p className="hero-bio">{personal_info.bio}</p>
        
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.experience_years}</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.technologies_count}</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.projects_count}</div>
            <div className="stat-label">Major Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.certifications_count}</div>
            <div className="stat-label">Certifications</div>
          </div>
        </div>

        <div className="hero-contact">
          <a href={`mailto:${personal_info.email}`} className="contact-btn">
            <i className="fas fa-envelope"></i>
            Email
          </a>
          <a href={`tel:${personal_info.phone}`} className="contact-btn">
            <i className="fas fa-phone"></i>
            Call
          </a>
          <a href={personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn--secondary">
            <i className="fab fa-linkedin"></i>
            LinkedIn
          </a>
          <a href={personal_info.github} target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn--secondary">
            <i className="fab fa-github"></i>
            GitHub
          </a>
          <a href={personal_info.leetcode} target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn--secondary">
            <i className="fas fa-code"></i>
            LeetCode
          </a>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const [ref, isInView] = useInView();

  return (
    <section id="about" ref={ref} className={`section ${isInView ? 'animate-in' : ''}`}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="section-subtitle">
          I'm a passionate software developer with a strong foundation in computer science and a keen interest in emerging technologies. 
          My journey spans full-stack web development, blockchain technologies, and artificial intelligence, 
          always striving to create innovative solutions that make a difference.
        </div>
        <div className="about-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)', lineHeight: '1.6', marginBottom: 'var(--space-24)' }}>
            Currently pursuing my Bachelor's in Computer Science Engineering at Chandigarh University, 
            I have gained practical experience through internships at PolicyBazaar.com and MetaCrafters, 
            where I worked on investment technologies and blockchain development respectively.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)', lineHeight: '1.6' }}>
            My expertise lies in building scalable web applications using the MERN stack and developing 
            decentralized applications on various blockchain platforms. I'm always eager to learn new technologies 
            and take on challenging projects that push the boundaries of what's possible.
          </p>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const [ref, isInView] = useInView();
  const { skills } = portfolioData;

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: 'fa-code',
      skills: skills.programming_languages
    },
    {
      title: 'Web Technologies',
      icon: 'fa-globe',
      skills: skills.web_technologies
    },
    {
      title: 'Blockchain Technologies',
      icon: 'fa-link',
      skills: skills.blockchain_technologies
    },
    {
      title: 'Development Tools',
      icon: 'fa-tools',
      skills: skills.development_tools
    },
    {
      title: 'Core Competencies',
      icon: 'fa-brain',
      skills: skills.core_competencies
    }
  ];

  return (
    <section id="skills" ref={ref} className={`section ${isInView ? 'animate-in' : ''}`}>
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="skill-category-title">
                <i className={`fas ${category.icon} skill-category-icon`}></i>
                {category.title}
              </h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = () => {
  const [ref, isInView] = useInView();
  const { experience } = portfolioData;

  return (
    <section id="experience" ref={ref} className={`section ${isInView ? 'animate-in' : ''}`}>
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="experience-timeline">
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-card">
                <div className="experience-header">
                  <h3 className="experience-position">{exp.position}</h3>
                  <div className="experience-company">{exp.company}</div>
                  <div className="experience-duration">{exp.duration} • {exp.location}</div>
                </div>
                <ul className="experience-responsibilities">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const [ref, isInView] = useInView();
  const [searchTerm, setSearchTerm] = useState('');
  const { projects } = portfolioData;

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="projects" ref={ref} className={`section ${isInView ? 'animate-in' : ''}`}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div style={{ maxWidth: '400px', margin: '0 auto var(--space-48) auto' }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ textAlign: 'center' }}
          />
        </div>
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.name}</h3>
                <div className="project-date">{project.date}</div>
              </div>
              <div className="project-tech">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-actions">
                <button className="btn btn--primary">
                  <i className="fas fa-external-link-alt"></i>
                  View Live
                </button>
                <button className="btn btn--outline">
                  <i className="fab fa-github"></i>
                  GitHub
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            No projects found matching your search.
          </div>
        )}
      </div>
    </section>
  );
};

// Education Section Component
const EducationSection = () => {
  const [ref, isInView] = useInView();
  const { education } = portfolioData;

  return (
    <section id="education" ref={ref} className={`section ${isInView ? 'animate-in' : ''}`}>
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <h3 className="education-institution">
                <i className="fas fa-graduation-cap" style={{ marginRight: 'var(--space-8)', color: 'var(--color-primary)' }}></i>
                {edu.institution}
              </h3>
              <div className="education-degree">{edu.degree}</div>
              <div className="education-details">
                <span>{edu.duration}</span>
                <span className="education-grade">{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Certifications & Achievements Section Component
const CertificationsSection = () => {
  const [ref, isInView] = useInView();
  const { certifications, achievements } = portfolioData;

  return (
    <section id="certifications" ref={ref} className={`section ${isInView ? 'animate-in' : ''}`}>
      <div className="container">
        <h2 className="section-title">Certifications & Achievements</h2>
        <div className="certs-achievements">
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-24)', textAlign: 'center' }}>
              Certifications
            </h3>
            <div className="cert-list">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-item">
                  <i className="fas fa-certificate cert-icon"></i>
                  <span className="cert-text">{cert}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-24)', textAlign: 'center' }}>
              Achievements
            </h3>
            <div className="achievement-list">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <i className="fas fa-trophy achievement-icon"></i>
                  <span className="achievement-text">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { personal_info } = portfolioData;

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={ref} className={`section contact ${isInView ? 'animate-in' : ''}`}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-24)' }}>
              Send me a message
            </h3>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className="form-control"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
              <i className="fas fa-paper-plane"></i>
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <div className="contact-info-card">
              <i className="fas fa-envelope contact-icon"></i>
              <div className="contact-details">
                <h4>Email</h4>
                <p><a href={`mailto:${personal_info.email}`}>{personal_info.email}</a></p>
              </div>
            </div>
            <div className="contact-info-card">
              <i className="fas fa-phone contact-icon"></i>
              <div className="contact-details">
                <h4>Phone</h4>
                <p><a href={`tel:${personal_info.phone}`}>{personal_info.phone}</a></p>
              </div>
            </div>
            <div className="contact-info-card">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              <div className="contact-details">
                <h4>Location</h4>
                <p>{personal_info.location}</p>
              </div>
            </div>
            <div className="contact-info-card">
              <i className="fab fa-linkedin contact-icon"></i>
              <div className="contact-details">
                <h4>LinkedIn</h4>
                <p><a href={personal_info.linkedin} target="_blank" rel="noopener noreferrer">Connect with me</a></p>
              </div>
            </div>
            <div className="contact-info-card">
              <i className="fab fa-github contact-icon"></i>
              <div className="contact-details">
                <h4>GitHub</h4>
                <p><a href={personal_info.github} target="_blank" rel="noopener noreferrer">View my work</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

// Download Resume Button Component
const DownloadResumeButton = () => {
  const handleDownload = () => {
    // Simulate resume download
    alert('Resume download would start here. (Demo functionality)');
  };

  return (
    <button className="download-resume" onClick={handleDownload}>
      <i className="fas fa-download"></i>
      Download Resume
    </button>
  );
};

// Main App Component
const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio">
      <Header theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
      <main className="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <BackToTopButton />
      <DownloadResumeButton />
    </div>
  );
};

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));