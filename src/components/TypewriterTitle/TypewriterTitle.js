import React from 'react';
import './TypewriterTitle.css';

const TypewriterTitle = ({ 
  sectionId, 
  typingText, 
  hasTyped, 
  className = "section-title" 
}) => {
  return (
    <h2 className={className}>
      <span className="typewriter-text">{typingText[sectionId] || ''}</span>
      <span className={`cursor ${hasTyped(sectionId) ? 'show' : ''}`}></span>
    </h2>
  );
};

export default TypewriterTitle;