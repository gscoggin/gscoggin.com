import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ 
  typingText, 
  startTypewriter, 
  contentLoaded, 
  setContentLoaded, 
  activeSection, 
  setActiveSection 
}) => {
  const [heroTyped, setHeroTyped] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeWelcome, setFadeWelcome] = useState(false);
  const [showBlinkingEllipses, setShowBlinkingEllipses] = useState(false);

  // Start hero typing animation after slide-in completes
  useEffect(() => {
    // Wait for the 1s slide-in animation to complete, then start typing
    const timer = setTimeout(() => {
      setHeroTyped(true);
      startTypewriter('hero', 'Gabe Scoggin');
    }, 1100);
    
    return () => clearTimeout(timer);
  }, [startTypewriter]);

  // Start welcome message after hero typing completes
  useEffect(() => {
    if (heroTyped) {
      // Wait for "Gabe Scoggin" typing to complete (roughly 2 seconds)
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(true);
        
        // Type out welcome message
        const baseMessage = "welcome to my digital resume, scroll down to learn more about me";
        const message = baseMessage + "...";
        let index = 0;
        
        const typeWelcome = () => {
          if (index <= baseMessage.length) {
            setWelcomeMessage(baseMessage.slice(0, index));
            index++;
            setTimeout(typeWelcome, 50); // Faster typing for this message
          } else if (index <= message.length) {
            // Type the ellipses
            setWelcomeMessage(message.slice(0, index));
            index++;
            setTimeout(typeWelcome, 50);
          } else {
            // Message complete, start blinking ellipses  
            setShowBlinkingEllipses(true);
            
            // Show for 10 seconds then fade out
            setTimeout(() => {
              setFadeWelcome(true);
              setShowBlinkingEllipses(false);
              // Remove completely after fade animation
              setTimeout(() => {
                setShowWelcome(false);
              }, 3000); // 3 second fade duration
            }, 10000); // Show for 10 seconds
          }
        };
        
        typeWelcome();
      }, 2500); // Wait for hero typing to complete
      
      return () => clearTimeout(welcomeTimer);
    }
  }, [heroTyped]);

  // Fade welcome message when user starts interacting (scrolling)
  useEffect(() => {
    const handleInteraction = () => {
      setShowBlinkingEllipses(false);
      setFadeWelcome(true);
      // Remove completely after fade animation
      setTimeout(() => {
        setShowWelcome(false);
      }, 3000); // 3 second fade duration
    };

    if (showWelcome && !fadeWelcome) {
      window.addEventListener('scroll', handleInteraction);
      window.addEventListener('wheel', handleInteraction);
      window.addEventListener('touchmove', handleInteraction);
      
      return () => {
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('wheel', handleInteraction);
        window.removeEventListener('touchmove', handleInteraction);
      };
    }
  }, [showWelcome, fadeWelcome]);

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
        
        {/* Welcome Message Container - Always present to prevent jumping */}
        <div className="welcome-message-container">
          {showWelcome && (
            <div className={`welcome-message ${fadeWelcome ? 'fade-out' : ''}`}>
              {showBlinkingEllipses ? (
                <>
                  {welcomeMessage.replace(/\.\.\.$/, '')}
                  <span className="blinking-ellipses">...</span>
                </>
              ) : (
                welcomeMessage
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;