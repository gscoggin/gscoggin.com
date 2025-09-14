import { useState, useCallback } from 'react';

export const useAnimationSequences = () => {
  const [leadershipCards, setLeadershipCards] = useState(new Set());
  const [aboutContent, setAboutContent] = useState(false);
  const [imageSlices, setImageSlices] = useState(new Set());
  const [skillsCards, setSkillsCards] = useState(new Set());
  const [contactBars, setContactBars] = useState(new Set());

  const startLeadershipCards = useCallback(() => {
    const cardOrder = [0, 1, 2, 3, 4, 5]; // Left to right, top to bottom
    
    // Typing "Leadership" takes roughly 1.0-1.5s, so we want cards spread over ~1.5s
    // Last card should appear as typing finishes
    cardOrder.forEach((cardIndex, arrayIndex) => {
      setTimeout(() => {
        setLeadershipCards(prev => new Set([...prev, cardIndex]));
      }, arrayIndex * 250); // 250ms delay between each card (1.25s total)
    });
  }, []);

  const startAboutContent = useCallback(() => {
    setAboutContent(true);
  }, []);

  const startImageSlices = useCallback(() => {
    const sliceOrder = [0, 1, 2, 3, 4, 5]; // 6 horizontal slices
    
    // Much slower with extended duration - last slices appear as user scrolls to image
    const delays = [0, 350, 600, 800, 950, 1050]; // Extended timing for dramatic effect
    
    sliceOrder.forEach((sliceIndex, arrayIndex) => {
      setTimeout(() => {
        setImageSlices(prev => new Set([...prev, sliceIndex]));
      }, delays[arrayIndex]);
    });
  }, []);

  const startSkillsCards = useCallback(() => {
    const cardOrder = [0, 1, 2]; // 3 skills cards
    
    // Slow zoom-in pop effect, 1 second duration each
    cardOrder.forEach((cardIndex, arrayIndex) => {
      setTimeout(() => {
        setSkillsCards(prev => new Set([...prev, cardIndex]));
      }, arrayIndex * 400); // 400ms delay between each card
    });
  }, []);

  const startContactBars = useCallback(() => {
    const barOrder = [0, 1, 2, 3]; // 4 contact bars (Email, LinkedIn, Resume, Location)
    
    // Flip up effect with staggered timing
    barOrder.forEach((barIndex, arrayIndex) => {
      setTimeout(() => {
        setContactBars(prev => new Set([...prev, barIndex]));
      }, arrayIndex * 300); // 300ms delay between each bar
    });
  }, []);

  return {
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
  };
};