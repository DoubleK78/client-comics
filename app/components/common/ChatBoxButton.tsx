"use client"
import React, { useState, useEffect } from 'react';

const ChatBoxButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const redirectFanpage = () => {
    window.open('https://www.messenger.com/t/102376344776439', '_blank');
  };

  const handleScroll = () => {
    const threshold = 20;
    setIsVisible(window.scrollY > threshold);
  };

  useEffect(() => {
    // clean paging state when user go back home
    if (sessionStorage.getItem("paging-state")) {
      sessionStorage.removeItem("paging-state");
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '80px', left: '20px', zIndex: 999 }}>
      <button
        id="scrollBtn"
        onClick={redirectFanpage}
        style={{
          display: isVisible ? 'block' : 'none',
          position: 'fixed',
          bottom: '20px',
          left: '20px',  // Adjusted to move the button to the bottom-right corner
          background: '#47474e',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'right 0.3s ease-in-out',
          zIndex: '999'
        }}
      >
        <i className="fas fa-comments"></i>
      </button>
    </div>
  );
};

export default ChatBoxButton;
