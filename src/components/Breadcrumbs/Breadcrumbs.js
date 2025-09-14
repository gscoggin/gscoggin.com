import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ activeSection, setActiveSection }) => {
  const handleBreadcrumbClick = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="breadcrumb-nav">
      {['about', 'experience', 'leadership', 'skills', 'contact'].map((section, index) => (
        <React.Fragment key={section}>
          <button 
            className="breadcrumb-link"
            onClick={() => handleBreadcrumbClick(section)}
          >
            {section}
          </button>
          {index < 4 && <span className="breadcrumb-separator"> / </span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;