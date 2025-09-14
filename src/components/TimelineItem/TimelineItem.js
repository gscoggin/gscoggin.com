import React from 'react';
import './TimelineItem.css';

const TimelineItem = ({ 
  item, 
  index, 
  isVisible, 
  className = "timeline-item" 
}) => {
  return (
    <div className={`${className} ${isVisible ? 'animate-in' : ''}`}>
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <div className="timeline-header">
          <div 
            className="company-logo"
            onClick={() => item.companyUrl && window.open(item.companyUrl, '_blank')}
            title={`Visit ${item.company}`}
          >
            <img 
              src={item.logo} 
              alt={item.logoAlt || `${item.company} logo`}
              className="logo-image" 
            />
          </div>
          <div className="timeline-text">
            <h3>{item.title}</h3>
            <h4>{item.company}</h4>
            <span className="timeline-date">{item.date}</span>
          </div>
        </div>
        <p>{item.description}</p>
        {item.achievements && (
          <ul>
            {item.achievements.map((achievement, achievementIndex) => (
              <li key={achievementIndex}>{achievement}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;