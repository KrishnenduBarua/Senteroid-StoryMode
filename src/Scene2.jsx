import React, { useState, useEffect } from 'react';
import flapmapImage from './flatmap.jpg';

const Scene2 = ({ onNext }) => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const textLines = [
    "Trajectory locked.",
    "Impact probability: 2%.",
    "Estimated impact date: February 3, 2026.",
    "DAYS REMAINING: 129"
  ];

  useEffect(() => {
    // Start fade-in animation when component mounts
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(fadeInTimer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentText < textLines.length - 1) {
        setCurrentText(currentText + 1);
      }
    }, 1000); // 2 second delay between each text

    return () => clearTimeout(timer);
  }, [currentText, textLines.length]);

  return (
    <div className={`scene2-container ${isVisible ? 'fade-in' : ''}`}>
      {/* Flapmap Background Image */}
      <div className="flapmap-background">
        <img src={flapmapImage} alt="Flapmap" className="flapmap-image" />
      </div>
      
      {/* Text Overlay */}
      <div className={`scene2-text-container ${isVisible ? 'visible' : ''}`}>
        {textLines.map((text, index) => (
          <div 
            key={index}
            className={`scene2-text ${index <= currentText ? 'visible' : ''} ${index === 3 ? 'countdown-text' : ''}`}
          >
            {text}
          </div>
        ))}
        
        {/* Button after all text is shown */}
        {currentText >= textLines.length - 1 && (
          <button className="scene2-button" onClick={onNext}>
            Run Deflection Strategies
          </button>
        )}
      </div>
    </div>
  );
};

export default Scene2;