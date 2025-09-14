import React from 'react';
import TypewriterTitle from '../TypewriterTitle/TypewriterTitle';
import './About.css';

const About = ({ 
  typingText, 
  hasTyped,
  aboutContent,
  imageSlices 
}) => {
  return (
    <section id="about" className="section">
      <div className="container">
        <TypewriterTitle
          sectionId="about"
          typingText={typingText}
          hasTyped={hasTyped}
        />
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
  );
};

export default About;