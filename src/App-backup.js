import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [contentLoaded, setContentLoaded] = useState(false);
  const [typedSections, setTypedSections] = useState(new Set());
  const [typingText, setTypingText] = useState({});
  const [heroTyped, setHeroTyped] = useState(false);
  const [leadershipCards, setLeadershipCards] = useState(new Set());
  const [aboutContent, setAboutContent] = useState(false);
  const [imageSlices, setImageSlices] = useState(new Set());
  const [skillsCards, setSkillsCards] = useState(new Set());
  const [contactBars, setContactBars] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      // Load content when user scrolls down (even just a little)
      if (!contentLoaded && window.scrollY > 10) {
        setContentLoaded(true);
      }

      // Check for section headers in viewport and trigger typewriter effect
      const sectionHeaders = document.querySelectorAll('.section-title');
      const newTypedSections = new Set(typedSections);
      
      sectionHeaders.forEach((header) => {
        const rect = header.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        const sectionId = header.closest('section')?.id;
        
        if (isVisible && sectionId && !typedSections.has(sectionId)) {
          newTypedSections.add(sectionId);
          // Start typing animation for this section
          const sectionTitles = {
            'about': 'About',
            'experience': 'Experience',
            'leadership': 'Leadership',
            'skills': 'Skills',
            'contact': 'Contact'
          };
          if (sectionTitles[sectionId]) {
            startTypewriter(sectionId, sectionTitles[sectionId]);
            
            // Start leadership cards animation as typing begins
            if (sectionId === 'leadership') {
              setTimeout(() => {
                startLeadershipCards();
              }, 200); // Start cards almost immediately with typing
            }
            
            // Start about content fade-in when typing begins
            if (sectionId === 'about') {
              setTimeout(() => {
                setAboutContent(true);
              }, 200); // Start fade as typing begins
              
              // Start image slice animation
              setTimeout(() => {
                startImageSlices();
              }, 300); // Start slicing slightly after content fade
            }
            
            // Start skills cards zoom-in when typing begins
            if (sectionId === 'skills') {
              setTimeout(() => {
                startSkillsCards();
              }, 200); // Start zooming as typing begins
            }
            
            // Start contact bars flip-up when typing begins
            if (sectionId === 'contact') {
              setTimeout(() => {
                startContactBars();
              }, 200); // Start flipping as typing begins
            }
          }
        }
      });
      
      if (newTypedSections.size !== typedSections.size) {
        setTypedSections(newTypedSections);
      }

      // Timeline animation logic - once visible, stay visible
      const timelineItems = document.querySelectorAll('.timeline-item');
      const newVisibleItems = new Set(visibleItems); // Start with previously visible items
      
      timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
        
        if (isVisible && !visibleItems.has(index)) {
          newVisibleItems.add(index);
        }
      });
      
      if (newVisibleItems.size !== visibleItems.size) {
        setVisibleItems(newVisibleItems);
      }
    };

    const handleWheel = () => {
      // Load content on any scroll attempt (wheel/touchpad)
      if (!contentLoaded) {
        setContentLoaded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleWheel, { passive: true });
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleWheel);
    };
  }, [contentLoaded, typedSections]);

  const startTypewriter = (sectionId, fullText) => {
    let currentIndex = 0;
    const typeChar = () => {
      if (currentIndex <= fullText.length) {
        setTypingText(prev => ({
          ...prev,
          [sectionId]: fullText.slice(0, currentIndex)
        }));
        currentIndex++;
        
        // Variable typing speed (100-200ms per character for realistic feel)
        const delay = 100 + Math.random() * 100;
        setTimeout(typeChar, delay);
      }
    };
    typeChar();
  };

  const startLeadershipCards = () => {
    const cardOrder = [0, 1, 2, 3, 4, 5]; // Left to right, top to bottom
    
    // Typing "Leadership" takes roughly 1.0-1.5s, so we want cards spread over ~1.5s
    // Last card should appear as typing finishes
    cardOrder.forEach((cardIndex, arrayIndex) => {
      setTimeout(() => {
        setLeadershipCards(prev => new Set([...prev, cardIndex]));
      }, arrayIndex * 250); // 250ms delay between each card (1.25s total)
    });
  };

  const startImageSlices = () => {
    const sliceOrder = [0, 1, 2, 3, 4, 5]; // 6 horizontal slices
    
    // Much slower with extended duration - last slices appear as user scrolls to image
    const delays = [0, 350, 600, 800, 950, 1050]; // Extended timing for dramatic effect
    
    sliceOrder.forEach((sliceIndex, arrayIndex) => {
      setTimeout(() => {
        setImageSlices(prev => new Set([...prev, sliceIndex]));
      }, delays[arrayIndex]);
    });
  };

  const startSkillsCards = () => {
    const cardOrder = [0, 1, 2]; // 3 skills cards
    
    // Slow zoom-in pop effect, 1 second duration each
    cardOrder.forEach((cardIndex, arrayIndex) => {
      setTimeout(() => {
        setSkillsCards(prev => new Set([...prev, cardIndex]));
      }, arrayIndex * 400); // 400ms delay between each card
    });
  };

  const startContactBars = () => {
    const barOrder = [0, 1, 2]; // 3 contact bars (Email, LinkedIn, Resume)
    
    // Flip-up animation one by one
    barOrder.forEach((barIndex, arrayIndex) => {
      setTimeout(() => {
        setContactBars(prev => new Set([...prev, barIndex]));
      }, arrayIndex * 300); // 300ms delay between each bar
    });
  };

  // Start hero typing animation after slide-in completes
  useEffect(() => {
    // Wait for the 1s slide-in animation to complete, then start typing
    const timer = setTimeout(() => {
      setHeroTyped(true);
      startTypewriter('hero', 'Gabe Scoggin');
    }, 1100);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    // Load content when breadcrumb is clicked
    if (!contentLoaded) {
      setContentLoaded(true);
    }
    
    setActiveSection(sectionId);
    
    // Delay scrolling if content just loaded
    if (!contentLoaded) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="typewriter-text">{typingText['hero'] || ''}</span>
            <span className={`cursor hero-cursor ${heroTyped ? 'show' : ''}`}></span>
          </h1>
          <h2 className="hero-subtitle">Senior Executive • Technical Program Management</h2>
          <p className="hero-description">
            20 years leading software programs at a global scale for Google and Warner Music Group. Building high performing teams, scaling systems and processes, driving measurable business impact.
          </p>
          
          <nav className="breadcrumb-nav">
            <button 
              className={`breadcrumb-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
            <span className="breadcrumb-separator">•</span>
            <button 
              className={`breadcrumb-link ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </button>
            <span className="breadcrumb-separator">•</span>
            <button 
              className={`breadcrumb-link ${activeSection === 'leadership' ? 'active' : ''}`}
              onClick={() => scrollToSection('leadership')}
            >
              Leadership
            </button>
            <span className="breadcrumb-separator">•</span>
            <button 
              className={`breadcrumb-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </button>
            <span className="breadcrumb-separator">•</span>
            <button 
              className={`breadcrumb-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </nav>
        </div>
      </section>

      {/* Conditional Content - Only render after scroll/click */}
      {contentLoaded && (
        <>
      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">
            <span className="typewriter-text">{typingText['about'] || ''}</span>
            <span className={`cursor ${typedSections.has('about') ? 'show' : ''}`}>█</span>
          </h2>
          <div className={`about-content ${aboutContent ? 'content-fade-in' : ''}`}>
            <div className="about-main">
              <div className="about-photo">
                <div className="image-container">
                  <img 
                    src="/images/profile-photo.jpg" 
                    alt="Gabe Scoggin" 
                    className="profile-image"
                  />
                  <div className="image-slices">
                    {[0, 1, 2, 3, 4, 5].map(sliceIndex => (
                      <div 
                        key={sliceIndex}
                        className={`image-slice slice-${sliceIndex} ${imageSlices.has(sliceIndex) ? 'slice-reveal' : ''}`}
                        style={{
                          backgroundImage: 'url(/images/profile-photo.jpg)',
                          backgroundPosition: `0 ${-sliceIndex * (250/6)}px`,
                          backgroundSize: '250px 250px'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-text">
                <p>
                  Senior Technical Program Management Executive with 20 years of experience leading global programs in Ads, Music, AI, Maps, and Safety. 
                  Proven track record scaling TPM teams, shipping ML products, and transforming operational systems at Google and Warner Music Group. 
                  Recognized for building high-performing teams, influencing C-level strategy, and driving measurable, cross-org impact.
                </p>
                <p>
                  Former leader on the Google Ads Integrity Team, where I led large-scale ads abuse prevention programs focused on financial fraud mitigation, 
                  and policy enforcement—leveraging machine learning and metrics-driven decision making. Pioneer of Google Maps' Ground Truth program, 
                  developing cutting-edge digital cartographic processes and scaling operations across 40+ countries.
                </p>
              </div>
            </div>
            <div className="credentials">
              <div className="credential education-single">
                <h4>Education</h4>
                <div className="education-list">
                  <div className="education-item">
                    <span className="education-program">Bachelor's Degree</span>
                    <span className="education-institution">University of North Carolina</span>
                    <span className="education-date">2004</span>
                  </div>
                  <div className="education-item">
                    <span className="education-program">Advanced Program Management Certificate</span>
                    <span className="education-institution">Stanford University Continuing Studies</span>
                    <span className="education-date">2022</span>
                  </div>
                  <div className="education-item">
                    <span className="education-program">Full Stack Developer Certificate</span>
                    <span className="education-institution">UC Berkeley Extension</span>
                    <span className="education-date">2021</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
        <section id="experience" className="section section-dark">
          <div className="container">
            <h2 className="section-title">
            <span className="typewriter-text">{typingText['experience'] || ''}</span>
            <span className={`cursor ${typedSections.has('experience') ? 'show' : ''}`}>█</span>
          </h2>
            <div className="timeline">
          <div className={`timeline-item ${visibleItems.has(0) ? 'animate-in' : ''}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
            <div className="company-logo">
              <img 
                src="/images/Warner_Music.jpg" 
                alt="Warner Music Group logo consisting of a stylized blue W on a white background, representing the company in a professional and modern style" 
                className="logo-image" 
              />
            </div>
            <div className="timeline-text">
              <h3>Head of Technical Program Management</h3>
              <h4>Warner Music Group</h4>
              <span className="timeline-date">2023 - Present</span>
            </div>
              </div>
              <p>
            Founded WMG's Technical Program Management organization from the ground up. 
            Led critical programs including WMG Pulse app launch, digital supply chain stabilization, 
            and implementation of company-wide operational frameworks including OKRs and incident response.
              </p>
              <ul>
            <li>Built TPM team from 0 to full organization, establishing hiring strategy and execution structure</li>
            <li>Delivered WMG Pulse, the company's flagship artist and songwriter platform</li>
            <li>Transitioned engineering workforce from 98% contractor to 70/30 FTE/contractor mix</li>
            <li>Implemented OKR planning and launch tracking processes across the tech organization</li>
              </ul>
            </div>
          </div>

          <div className={`timeline-item ${visibleItems.has(1) ? 'animate-in' : ''}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
            <div className="company-logo">
              <img 
                src="/images/Google_Ads.jpg" 
                alt="Google logo with multicolored capital G in blue, red, yellow, and green, symbolizing the Google brand in a clean and friendly style" 
                className="logo-image" 
              />
            </div>
            <div className="timeline-text">
              <h3>Senior Staff Technical Program Manager</h3>
              <h4>Google Ads - Ads Safety</h4>
              <span className="timeline-date">2019 - 2023</span>
            </div>
              </div>
              <p>
            Led TPM team managing high-severity escalations in ads policy abuse, financial fraud, 
            and executive-level customer complaints. Built scalable escalation response programs 
            and drove cross-functional risk mitigation during global crises.
              </p>
              <ul>
            <li>Led company-wide crisis response during COVID-19, Ukraine-Russia conflict, and emergent fraud schemes</li>
            <li>Delivered political ads enforcement, advertiser identity verification, and transparency reporting programs</li>
            <li>Spearheaded Red Team exercises and AI-based detection systems targeting malware</li>
            <li>Built global escalation response systems improving coordination across Legal, Policy, and Engineering</li>
              </ul>
            </div>
          </div>

          <div className={`timeline-item ${visibleItems.has(2) ? 'animate-in' : ''}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
            <div className="company-logo">
              <img 
                src="/images/Google_Ads.jpg" 
                alt="Google logo with multicolored capital G in blue, red, yellow, and green, representing the Google brand in a welcoming and innovative environment" 
                className="logo-image" 
              />
            </div>
            <div className="timeline-text">
              <h3>Senior Technical Program Manager</h3>
              <h4>Google Ads - Ads Integrity</h4>
              <span className="timeline-date">2015 - 2019</span>
            </div>
              </div>
              <p>
            Founding TPM for Google Ads' first integrated Ads Integrity team. 
            Led transition from legacy systems to scalable, ML-first enforcement 
            across 80+ ad product areas. Scaled TPM team from 1 to 15 members.
              </p>
              <ul>
            <li>Successfully migrated 80+ ad products to ML-based enforcement in 4 years</li>
            <li>Enabled 20%+ annual business growth while maintaining safety standards</li>
            <li>Designed hybrid ML + human review workflows improving enforcement precision</li>
            <li>Established shared OKRs and launch tracking across previously siloed groups</li>
              </ul>
            </div>
          </div>

          <div className={`timeline-item ${visibleItems.has(3) ? 'animate-in' : ''}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
            <div className="company-logo">
              <img 
                src="/images/Google-Maps-Icons-Logo-2020.png" 
                alt="Google logo with multicolored capital G in blue, red, yellow, and green, conveying a sense of innovation and global reach" 
                className="logo-image" 
              />
            </div>
            <div className="timeline-text">
              <h3>Technical Program Manager</h3>
              <h4>Google Maps - Ground Truth</h4>
              <span className="timeline-date">2008 - 2015</span>
            </div>
              </div>
              <p>
            Founding Program Manager for Google's Ground Truth initiative. 
            Invented and scaled multi-stage mapping pipeline that saved $300M annual licensing costs 
            and enabled Google Maps' global accuracy across 75+ countries.
              </p>
              <ul>
            <li>Developed end-to-end Ground Truth mapping stages replacing TeleAtlas and TomTom data</li>
            <li>Scaled data operations globally including offshore mapping processes</li>
            <li>Delivered high-fidelity maps across North America, Europe, Asia, and South America</li>
            <li>Enabled flagship Google services in Navigation, Local Search, Transit, and Explore</li>
              </ul>
            </div>
          </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}}
      <section id="leadership" className="section">
        <div className="container">
          <h2 className="section-title">
            <span className="typewriter-text">{typingText['leadership'] || ''}</span>
            <span className={`cursor ${typedSections.has('leadership') ? 'show' : ''}`}>█</span>
          </h2>
          <div className="leadership-grid">
            <div className={`leadership-card ${leadershipCards.has(0) ? 'card-deal-in' : ''}`}>
              <h3>Team Building</h3>
              <p>Scaled TPM teams from 1 to 15+ members at Google and built Warner Music Group's first TPM organization from the ground up.</p>
            </div>
            <div className={`leadership-card ${leadershipCards.has(1) ? 'card-deal-in' : ''}`}>
              <h3>Crisis Management</h3>
              <p>Led company-wide responses during COVID-19, Ukraine-Russia conflict, and emergent fraud schemes with speed and structure.</p>
            </div>
            <div className={`leadership-card ${leadershipCards.has(2) ? 'card-deal-in' : ''}`}>
              <h3>Executive Influence</h3>
              <p>Partnered with C-level leaders, driving alignment between executive priorities and day-to-day execution across organizations.</p>
            </div>
            <div className={`leadership-card ${leadershipCards.has(3) ? 'card-deal-in' : ''}`}>
              <h3>Organizational Design</h3>
              <p>Designed and implemented operational frameworks including OKRs, incident response, and launch governance at scale.</p>
            </div>
            <div className={`leadership-card ${leadershipCards.has(4) ? 'card-deal-in' : ''}`}>
              <h3>Global Operations</h3>
              <p>Managed programs spanning 75+ countries, coordinating across time zones, cultures, and regulatory environments.</p>
            </div>
            <div className={`leadership-card ${leadershipCards.has(5) ? 'card-deal-in' : ''}`}>
              <h3>Performance Culture</h3>
              <p>Established data-driven, outcome-oriented operating models that improved transparency and accountability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section section-dark">
        <div className="container">
          <h2 className="section-title">
            <span className="typewriter-text">{typingText['skills'] || ''}</span>
            <span className={`cursor ${typedSections.has('skills') ? 'show' : ''}`}>█</span>
          </h2>
          <div className="skills-grid">
            <div className={`skill-category ${skillsCards.has(0) ? 'skills-zoom-in' : ''}`}>
              <h3>Leadership</h3>
              <ul>
                <li>Strategic Execution & Alignment</li>
                <li>Cross-Functional Influence</li>
                <li>Crisis & Incident Leadership</li>
                <li>Org Design & Team Building</li>
                <li>Data-Driven Decision Making</li>
              </ul>
            </div>
            <div className={`skill-category ${skillsCards.has(1) ? 'skills-zoom-in' : ''}`}>
              <h3>Technical</h3>
              <ul>
                <li>Python, JavaScript, SQL, React</li>
                <li>Databricks, Snowflake, BigQuery</li>
                <li>AWS CloudFront, New Relic, Git</li>
                <li>ML & AI Platforms</li>
                <li>Mobile App Development</li>
              </ul>
            </div>
            <div className={`skill-category ${skillsCards.has(2) ? 'skills-zoom-in' : ''}`}>
              <h3>Domains</h3>
              <ul>
                <li>Online Fraud & Abuse Prevention</li>
                <li>Digital Mapping & Cartography</li>
                <li>Music Technology & Supply Chain</li>
                <li>Ads Integrity & Trust & Safety</li>
                <li>Global Risk Mitigation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">
            <span className="typewriter-text">{typingText['contact'] || ''}</span>
            <span className={`cursor ${typedSections.has('contact') ? 'show' : ''}`}>█</span>
          </h2>
          <div className="contact-content">
            <p>Interested in connecting? Reach out through any of the following channels:</p>
            <div className="contact-links">
              <a href="mailto:gabescoggin@gmail.com" className={`contact-link ${contactBars.has(0) ? 'contact-flip-in' : ''}`}>
                <span>Email</span>
                <span>gabescoggin@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/gabescoggin/" target="_blank" rel="noopener noreferrer" className={`contact-link ${contactBars.has(1) ? 'contact-flip-in' : ''}`}>
                <span>LinkedIn</span>
                <span>linkedin.com/in/gabescoggin</span>
              </a>
              <a href="/resume/Gabe_Scoggin_Resume.pdf" download="Gabe_Scoggin_Resume.pdf" className={`contact-link ${contactBars.has(2) ? 'contact-flip-in' : ''}`}>
                <span>Resume</span>
                <span>Download PDF</span>
              </a>
            </div>
            <p className="location">San Francisco Bay Area, CA</p>
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
};

export default App;
