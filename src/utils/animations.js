import { useState, useEffect } from 'react';

// Custom hook for cell reveal animation
export const useCellRevealAnimation = (completed, delay = 50) => {
  const [revealedCells, setRevealedCells] = useState(new Set());

  const animateCellReveal = (y, x) => {
    setTimeout(() => {
      setRevealedCells(prev => new Set([...prev, `${y}-${x}`]));
    }, delay * (y * 15 + x)); // 15 is the grid width
  };

  const resetAnimation = () => {
    setRevealedCells(new Set());
  };

  return {
    revealedCells,
    animateCellReveal,
    resetAnimation
  };
};

// Custom hook for success celebration animation
export const useSuccessAnimation = (completed) => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (completed) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [completed]);

  return showCelebration;
};

// Animation class names for Tailwind CSS
export const animationClasses = {
  cellReveal: 'transition-all duration-200 ease-in-out transform',
  cellSuccess: 'animate-bounce bg-green-100',
  cellError: 'animate-shake bg-red-100',
  fadeIn: 'transition-opacity duration-300 ease-in-out',
  slideIn: 'transition-transform duration-300 ease-in-out',
  pulse: 'animate-pulse',
  celebration: 'animate-confetti',
};

// Helper function to add temporary animation class
export const withTemporaryAnimation = (element, animationClass, duration = 1000) => {
  element.classList.add(animationClass);
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, duration);
};

// Keyframe animations for custom effects
export const keyframeAnimations = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  @keyframes confetti {
    0% { transform: translateY(0) rotate(0); opacity: 1; }
    100% { transform: translateY(-500px) rotate(360deg); opacity: 0; }
  }
`;