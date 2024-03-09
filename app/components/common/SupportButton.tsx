"use client"
import SupportButtonProps from '@/app/models/common/SupportButtonProps';
import { setHistory } from '@/app/utils/HelperFunctions';
import React, { useState, useEffect } from 'react';

const SupportButton: React.FC<SupportButtonProps> = ({ prevLink, nextLink }) => {
  const [showControls, setShowControls] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const handleScroll = () => {
    const threshold = 20;
    const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    setIsVisible(window.scrollY > threshold && distanceFromBottom > 2800);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showControls && !event.target) {
        setShowControls(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showControls]);

  return (
    <div style={{ position: 'fixed', bottom: '80px', left: '20px', zIndex: 999 }}>
      {showControls && (
        <div style={{ display: 'flex' }}>
          <button
            onClick={() => {
              setHistory(prevLink);
              window.location.href = prevLink;
            }}
            style={{
              display: (isVisible && prevLink != null) ? 'inline-block' : 'none',
              background: 'var(--color-primary)',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '22px',
              cursor: 'pointer',
              transition: 'right 0.3s ease-in-out',
              zIndex: '999',
              marginRight: '10px'
            }}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <button
            onClick={() => {
              setHistory(nextLink);
              window.location.href = nextLink;
            }}
            style={{
              display: (isVisible && nextLink != null) ? 'inline-block' : 'none',
              background: 'var(--color-primary)',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '22px',
              cursor: 'pointer',
              transition: 'right 0.3s ease-in-out',
              zIndex: '999'
            }}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      )}
      <div
        id="scrollBtn"
        onClick={toggleControls}
        style={{
          display: isVisible ? 'block' : 'none',
          position: 'fixed',
          bottom: '20px',
          left: '20px',  // Adjusted to move the button to the bottom-right corner
          background: 'var(--color-primary)',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '22px',
          cursor: 'pointer',
          transition: 'right 0.3s ease-in-out',
          zIndex: '999'
        }}
      >
        <i className="far fa-life-ring"></i>
      </div>
    </div>
  );
};

export default SupportButton;
