"use client"
import { useState, useEffect } from 'react';

const ScrollButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [marginRight, setMarginRight] = useState('20px');

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  const handleScroll = () => {
    const threshold = 20;
    setIsVisible(window.scrollY > threshold);
  };


  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const newMargin = `${(window.innerWidth * 0.2)*(window.innerWidth/1200)}px`;
        if (window.innerWidth > 1000)
        {
          setMarginRight(newMargin);
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <button
      id="scrollBtn"
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: marginRight,
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
