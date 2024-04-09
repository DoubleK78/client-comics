"use client"
import SupportButtonProps from '@/app/models/common/SupportButtonProps';
import { setHistory } from '@/app/utils/HelperFunctions';
import React, { useState, useEffect, useRef } from 'react';

const SupportButton: React.FC<SupportButtonProps> = ({ prevLink, nextLink }) => {
  const [showControls, setShowControls] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const previousBtnRef = useRef<any>(null);
  const nextBtnRef = useRef<any>(null);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const handleScroll = () => {
    const threshold = 20;
    const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    setIsVisible(window.scrollY > threshold && distanceFromBottom > 2800);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        // Handle logic for Arrow Left key press
        previousBtnRef.current?.click();
        break;
      case 'ArrowRight':
        // Handle logic for Arrow Right key press
        nextBtnRef.current?.click();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
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
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            setHistory(prevLink);
            window.location.href = prevLink;
          }}
          ref={isVisible && prevLink != null ? previousBtnRef : null}
          style={{
            display: (showControls && prevLink != null) ? 'inline-block' : 'none',
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
          ref={isVisible && nextLink != null ? nextBtnRef : null}
          style={{
            display: (showControls && nextLink != null) ? 'inline-block' : 'none',
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
      <button
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
      </button>
    </div>
  );
};

export default SupportButton;
