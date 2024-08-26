"use client"
import React, { useState, useEffect, useRef } from 'react';

interface ScrollDetectionProps {
    threshold: number;
    onDetect: () => void;
}

const ScrollDetection: React.FC<ScrollDetectionProps> = ({ threshold, onDetect }) => {
    const detectedRef = useRef<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (detectedRef.current) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollBottom = scrollTop + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop >= threshold || documentHeight - scrollBottom <= threshold) {
                detectedRef.current = true;
                onDetect();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default ScrollDetection;