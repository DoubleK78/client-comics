"use client"
import { useState, useEffect } from 'react';

const ScrollButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  const handleScroll = () => {
    const threshold = 20;
    setIsVisible(window.scrollY > threshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      id="scrollBtn"
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: '20px',  // Adjusted to move the button to the bottom-right corner
        background: 'var(--color-primary)',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'right 0.3s ease-in-out',
        zIndex: '999'
      }}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollButton;
