import { useState, useEffect, useCallback } from 'react';

export const useScrollAnimations = ({ 
  contentLoaded, 
  setContentLoaded, 
  onSectionVisible 
}) => {
  const [visibleItems, setVisibleItems] = useState(new Set());

  const handleScroll = useCallback(() => {
    // Load content when user scrolls down (even just a little)
    if (!contentLoaded && window.scrollY > 10) {
      setContentLoaded(true);
    }

    // Check for section headers in viewport and trigger animations
    const sectionHeaders = document.querySelectorAll('.section-title');
    
    sectionHeaders.forEach((header) => {
      const rect = header.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      const sectionId = header.closest('section')?.id;
      
      if (isVisible && sectionId && onSectionVisible) {
        onSectionVisible(sectionId);
      }
    });

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
  }, [contentLoaded, visibleItems, onSectionVisible, setContentLoaded]);

  const handleWheel = useCallback(() => {
    // Load content on any scroll attempt (wheel/touchpad)
    if (!contentLoaded) {
      setContentLoaded(true);
    }
  }, [contentLoaded, setContentLoaded]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleWheel, { passive: true });
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleWheel);
    };
  }, [handleScroll, handleWheel]);

  return {
    visibleItems
  };
};