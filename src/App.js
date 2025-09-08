import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('about');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">GS</div>
          <ul className="nav-menu">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                onClick={() => scrollToSection('experience')}
              >
                Experience
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'leadership' ? 'active' : ''}`}
                onClick={() => scrollToSection('leadership')}
              >
                Leadership
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={() => scrollToSection('skills')}
              >
                Skills
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Gabe Scoggin</h1>
          <h2 className="hero-subtitle">Senior Executive • Technical Program Management</h2>
          <p className="hero-description">
            20 years leading global programs at Google and Warner Music Group.<br />
            Building teams, scaling systems, driving measurable impact.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('experience')}
            >
              View Experience
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="about-content">
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
            <div className="credentials">
              <div className="credential">
                <h4>Education</h4>
                <p>Bachelor's Degree, University of North Carolina (2004)</p>
              </div>
              <div className="credential">
                <h4>Continuing Education</h4>
                <p>Advanced Program Management - Stanford University</p>
                <p>Full Stack Developer - UC Berkeley</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section section-dark">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Head of Technical Program Management</h3>
                <h4>Warner Music Group</h4>
                <span className="timeline-date">2023 - Present</span>
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

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Senior Staff Technical Program Manager</h3>
                <h4>Google Ads - Ads Safety</h4>
                <span className="timeline-date">2019 - 2023</span>
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

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Senior Technical Program Manager</h3>
                <h4>Google Ads - Ads Integrity</h4>
                <span className="timeline-date">2015 - 2019</span>
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

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Technical Program Manager</h3>
                <h4>Google Maps - Ground Truth</h4>
                <span className="timeline-date">2008 - 2015</span>
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

      {/* Leadership Section */}
      <section id="leadership" className="section">
        <div className="container">
          <h2 className="section-title">Leadership</h2>
          <div className="leadership-grid">
            <div className="leadership-card">
              <h3>Team Building</h3>
              <p>Scaled TPM teams from 1 to 15+ members at Google and built Warner Music Group's first TPM organization from the ground up.</p>
            </div>
            <div className="leadership-card">
              <h3>Crisis Management</h3>
              <p>Led company-wide responses during COVID-19, Ukraine-Russia conflict, and emergent fraud schemes with speed and structure.</p>
            </div>
            <div className="leadership-card">
              <h3>Executive Influence</h3>
              <p>Partnered with C-level leaders, driving alignment between executive priorities and day-to-day execution across organizations.</p>
            </div>
            <div className="leadership-card">
              <h3>Organizational Design</h3>
              <p>Designed and implemented operational frameworks including OKRs, incident response, and launch governance at scale.</p>
            </div>
            <div className="leadership-card">
              <h3>Global Operations</h3>
              <p>Managed programs spanning 75+ countries, coordinating across time zones, cultures, and regulatory environments.</p>
            </div>
            <div className="leadership-card">
              <h3>Performance Culture</h3>
              <p>Established data-driven, outcome-oriented operating models that improved transparency and accountability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section section-dark">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Leadership</h3>
              <ul>
                <li>Strategic Execution & Alignment</li>
                <li>Cross-Functional Influence</li>
                <li>Crisis & Incident Leadership</li>
                <li>Org Design & Team Building</li>
                <li>Data-Driven Decision Making</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Technical</h3>
              <ul>
                <li>Python, JavaScript, SQL, React</li>
                <li>Databricks, Snowflake, BigQuery</li>
                <li>AWS CloudFront, New Relic, Git</li>
                <li>ML & AI Platforms</li>
                <li>Mobile App Development</li>
              </ul>
            </div>
            <div className="skill-category">
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
          <h2 className="section-title">Contact</h2>
          <div className="contact-content">
            <p>Interested in connecting? Reach out through any of the following channels:</p>
            <div className="contact-links">
              <a href="mailto:gabescoggin@gmail.com" className="contact-link">
                <span>Email</span>
                <span>gabescoggin@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/gabescoggin/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>LinkedIn</span>
                <span>linkedin.com/in/gabescoggin</span>
              </a>
              <a href="tel:+17072875731" className="contact-link">
                <span>Phone</span>
                <span>(707) 287-5731</span>
              </a>
            </div>
            <p className="location">San Francisco Bay Area, CA</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
