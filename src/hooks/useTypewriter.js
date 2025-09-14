import { useState, useCallback } from 'react';

export const useTypewriter = () => {
  const [typingText, setTypingText] = useState({});
  const [typedSections, setTypedSections] = useState(new Set());

  const startTypewriter = useCallback((sectionId, fullText) => {
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
  }, []);

  const markAsTyped = useCallback((sectionId) => {
    setTypedSections(prev => new Set([...prev, sectionId]));
  }, []);

  const hasTyped = useCallback((sectionId) => {
    return typedSections.has(sectionId);
  }, [typedSections]);

  return {
    typingText,
    startTypewriter,
    markAsTyped,
    hasTyped,
    typedSections,
    setTypedSections
  };
};