import React, { useState } from 'react';
import './App.css';

// Import custom hooks
import { useTypewriter } from './hooks/useTypewriter';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { useAnimationSequences } from './hooks/useAnimationSequences';

// Import components
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import TypewriterTitle from './components/TypewriterTitle/TypewriterTitle';
import TimelineItem from './components/TimelineItem/TimelineItem';

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [contentLoaded, setContentLoaded] = useState(false);

  // Timeline data
  const timelineData = [
    {
      title: "Head of Technical Program Management",
      company: "Warner Music Group",
      date: "2023 - Present",
      logo: "/images/Warner_Music.jpg",
      logoAlt: "Warner Music Group logo consisting of a stylized blue W on a white background",
      companyUrl: "https://wmg.com",
      description: "Founded WMG's Technical Program Management organization from the ground up. Led critical programs including WMG Pulse app launch, digital supply chain stabilization, and implementation of company-wide operational frameworks including OKRs and incident response.",
      achievements: [
        "Built TPM team from 0 to full organization, establishing hiring strategy and execution structure",
        "Delivered WMG Pulse, the company's flagship artist and songwriter platform",
        "Transitioned engineering workforce from 98% contractor to 70/30 FTE/contractor mix",
        "Implemented OKR planning and launch tracking processes across the tech organization"
      ]
    },
    {
      title: "Senior Staff Technical Program Manager",
      company: "Google Ads - Ads Safety",
      date: "2019 - 2023",
      logo: "/images/Google_Ads.jpg",
      logoAlt: "Google logo with multicolored capital G in blue, red, yellow, and green",
      companyUrl: "https://ads.google.com",
      description: "Led TPM team managing high-severity escalations in ads policy abuse, financial fraud, and executive-level customer complaints. Built scalable escalation response programs and drove cross-functional risk mitigation during global crises.",
      achievements: [
        "Led company-wide crisis response during COVID-19, Ukraine-Russia conflict, and emergent fraud schemes",
        "Delivered political ads enforcement, advertiser identity verification, and transparency reporting programs",
        "Spearheaded Red Team exercises and AI-based detection systems targeting malware",
        "Built global escalation response systems improving coordination across Legal, Policy, and Engineering"
      ]
    },
    {
      title: "Senior Technical Program Manager",
      company: "Google Ads - Ads Integrity",
      date: "2015 - 2019",
      logo: "/images/Google_Ads.jpg",
      logoAlt: "Google logo with multicolored capital G in blue, red, yellow, and green",
      companyUrl: "https://ads.google.com",
      description: "Founding TPM for Google Ads' first integrated Ads Integrity team. Led transition from legacy systems to scalable, ML-first enforcement across 80+ ad product areas. Scaled TPM team from 1 to 15 members.",
      achievements: [
        "Successfully migrated 80+ ad products to ML-based enforcement in 4 years",
        "Enabled 20%+ annual business growth while maintaining safety standards",
        "Designed hybrid ML + human review workflows improving enforcement precision",
        "Established shared OKRs and launch tracking across previously siloed groups"
      ]
    },
    {
      title: "Technical Program Manager",
      company: "Google Maps - Ground Truth",
      date: "2008 - 2015",
      logo: "/images/Google-Maps-Icons-Logo-2020.png",
      logoAlt: "Google logo with multicolored capital G in blue, red, yellow, and green",
      companyUrl: "https://maps.google.com",
      description: "Founding Program Manager for Google's Ground Truth initiative. Built global mapping operations across 40+ countries, establishing quality frameworks and scaling operations for Google's mapping services.",
      achievements: [
        "Scaled Ground Truth operations to 40+ countries, enabling global mapping coverage",
        "Created quality frameworks for mapping accuracy and data integrity standards",
        "Built cross-functional partnerships with government agencies and data providers",
        "Pioneered automated quality metrics enabling real-time mapping data validation"
      ]
    }
  ];

  // Custom hooks for animations
  const {
    typingText,
    startTypewriter,
    markAsTyped,
    hasTyped
  } = useTypewriter();

  const {
    leadershipCards,
    aboutContent,
    imageSlices,
    skillsCards,
    contactBars,
    startLeadershipCards,
    startAboutContent,
    startImageSlices,
    startSkillsCards,
    startContactBars
  } = useAnimationSequences();

  // Handle section visibility and trigger animations
  const handleSectionVisible = (sectionId) => {
    if (!hasTyped(sectionId)) {
      markAsTyped(sectionId);
      
      const sectionTitles = {
        'about': 'About',
        'experience': 'Experience',
        'leadership': 'Leadership',
        'skills': 'Skills',
        'contact': 'Contact'
      };

      if (sectionTitles[sectionId]) {
        startTypewriter(sectionId, sectionTitles[sectionId]);
        
        // Trigger section-specific animations
        if (sectionId === 'leadership') {
          setTimeout(() => startLeadershipCards(), 200);
        }
        if (sectionId === 'about') {
          startAboutContent();
          setTimeout(() => startImageSlices(), 300);
        }
        if (sectionId === 'skills') {
          setTimeout(() => startSkillsCards(), 200);
        }
        if (sectionId === 'contact') {
          setTimeout(() => startContactBars(), 200);
        }
      }
    }
  };

  const { visibleItems } = useScrollAnimations({
    contentLoaded,
    setContentLoaded,
    onSectionVisible: handleSectionVisible
  });

  return (
    <div className="App">
      <Hero 
        typingText={typingText}
        startTypewriter={startTypewriter}
        contentLoaded={contentLoaded}
        setContentLoaded={setContentLoaded}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {contentLoaded && (
        <>
          <About 
            typingText={typingText}
            hasTyped={hasTyped}
            aboutContent={aboutContent}
            imageSlices={imageSlices}
          />

          {/* Experience Section */}
          <section id="experience" className="section section-dark">
            <div className="container">
              <TypewriterTitle
                sectionId="experience"
                typingText={typingText}
                hasTyped={hasTyped}
              />
              <div className="timeline">
                {timelineData.map((item, index) => (
                  <TimelineItem
                    key={index}
                    item={item}
                    index={index}
                    isVisible={visibleItems.has(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Leadership Section */}
          <section id="leadership" className="section">
            <div className="container">
              <TypewriterTitle
                sectionId="leadership"
                typingText={typingText}
                hasTyped={hasTyped}
              />
              <div className="leadership-grid">
                {[
                  {
                    title: "Team Building & Scaling",
                    description: "Built TPM organizations from 0 to 15+ members. Established hiring strategies, career frameworks, and performance management systems that scale across multiple teams and time zones."
                  },
                  {
                    title: "Cross-Functional Leadership",
                    description: "Led programs spanning Engineering, Legal, Policy, Sales, and Executive leadership. Designed coordination frameworks enabling alignment across diverse stakeholder groups."
                  },
                  {
                    title: "Crisis Management & Escalation",
                    description: "Led company-wide responses during COVID-19, geopolitical conflicts, and security incidents. Built escalation systems improving response time and coordination quality."
                  },
                  {
                    title: "Strategic Planning & OKRs",
                    description: "Implemented planning processes at Google and WMG, establishing quarterly goal-setting, progress tracking, and cross-team dependency management at organizational scale."
                  },
                  {
                    title: "Operational Excellence",
                    description: "Designed and implemented operational frameworks including incident response, launch processes, and quality management systems across multiple product areas."
                  },
                  {
                    title: "Stakeholder Management",
                    description: "Managed relationships with C-level executives, government agencies, and external partners. Built communication strategies enabling effective collaboration across organizational boundaries."
                  }
                ].map((card, index) => (
                  <div key={index} className={`leadership-card ${leadershipCards.has(index) ? 'card-deal-in' : ''}`}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="section">
            <div className="container">
              <TypewriterTitle
                sectionId="skills"
                typingText={typingText}
                hasTyped={hasTyped}
              />
              <div className="skills-grid">
                {[
                  {
                    category: "Technical Program Management",
                    skills: ["Large-scale program delivery", "Cross-functional coordination", "Risk assessment & mitigation", "Technical roadmap planning", "Resource allocation", "Timeline & milestone management"]
                  },
                  {
                    category: "Technology & Systems",
                    skills: ["Machine Learning operations", "API & system integration", "Cloud infrastructure (GCP, AWS)", "Data analytics & metrics", "Security & compliance frameworks", "Development lifecycle management"]
                  },
                  {
                    category: "Leadership & Strategy",
                    skills: ["Team building & scaling", "Executive communication", "Strategic planning & OKRs", "Crisis management", "Stakeholder alignment", "Organizational transformation"]
                  }
                ].map((skillGroup, index) => (
                  <div key={index} className={`skills-card ${skillsCards.has(index) ? 'skills-zoom-in' : ''}`}>
                    <h3>{skillGroup.category}</h3>
                    <ul>
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <li key={skillIndex}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section">
            <div className="container">
              <TypewriterTitle
                sectionId="contact"
                typingText={typingText}
                hasTyped={hasTyped}
              />
              <div className="contact-content">
                <div className="contact-links">
                  {[
                    {
                      label: "Email",
                      value: "gabescoggin@gmail.com",
                      link: "mailto:gabescoggin@gmail.com"
                    },
                    {
                      label: "LinkedIn",
                      value: "linkedin.com/in/gabescoggin",
                      link: "https://www.linkedin.com/in/gabescoggin"
                    },
                    {
                      label: "Resume",
                      value: "Download Resume",
                      link: "/resume/gabe-scoggin-resume.pdf"
                    },
                    {
                      label: "Location",
                      value: "San Francisco Bay Area",
                      link: "https://maps.google.com/maps?q=San+Francisco+Bay+Area"
                    }
                  ].map((contact, index) => 
                    contact.link ? (
                      <a 
                        key={index} 
                        href={contact.link} 
                        className={`contact-link ${contactBars.has(index) ? 'contact-flip-in' : ''}`}
                        target={contact.label === 'LinkedIn' || contact.label === 'Location' ? '_blank' : '_self'} 
                        rel={contact.label === 'LinkedIn' || contact.label === 'Location' ? 'noopener noreferrer' : ''}
                      >
                        <span>{contact.label}</span>
                        <span>{contact.value}</span>
                      </a>
                    ) : (
                      <div 
                        key={index} 
                        className={`contact-link ${contactBars.has(index) ? 'contact-flip-in' : ''}`}
                      >
                        <span>{contact.label}</span>
                        <span>{contact.value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      
      {/* Copyright Footer - Only show when contact section has been visited */}
      {hasTyped('contact') && (
        <footer className="copyright-footer">
          © Gabe Scoggin, 2025
        </footer>
      )}
    </div>
  );
};

export default App;