import React, { useState, useEffect } from 'react';
import earthAnimation from './Earth.json';
import meteorGif from './meteor.gif'; // Assuming you have a meteor gif file

const Scene1 = ({ onNext }) => {
  const [currentText, setCurrentText] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  const textLines = [
    "OCTOBER 26, 2025",
    "Amid the stars, a new object emerges…",
    "It grows brighter… moving faster… and it's heading straight for Earth."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentText < textLines.length - 1) {
        setCurrentText(currentText + 1);
      } else if (currentText === textLines.length - 1 && !showButton) {
        // Show button 1 second after the last line appears
        setTimeout(() => {
          setShowButton(true);
        }, 1000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentText, textLines.length, showButton]);

  const handleButtonClick = () => {
    setIsTransitioning(true);
    // Wait for fade out animation to complete before switching scenes
    setTimeout(() => {
      onNext();
    }, 1500); // 1.5 seconds to match CSS transition
  };

  return (
    <div className={`scene1-container ${isTransitioning ? 'fade-out' : ''}`}>
      {/* Earth Animation Background */}
      <div className="earth-background">
        <lottie-player
          src={earthAnimation}
          background="transparent"
          speed="0.4"
          style={{width: '100%', height: '100%'}}
          loop
          autoplay
        />
      </div>
      
      {/* Meteor GIF - Top Left */}
      <div className="meteor-container">
        <img src={meteorGif} alt="Meteor" className="meteor-gif" />
      </div>
      
      {/* Cinematic Text */}
      <div className="cinematic-text-container">
        {textLines.map((text, index) => (
          <div 
            key={index}
            className={`cinematic-text ${index <= currentText ? 'visible' : ''} ${index === 0 ? 'date-text' : ''}`}
          >
            {text}
          </div>
        ))}
        
        {/* Button appears 1 second after all text is shown */}
        {showButton && (
          <button 
            className={`scene1-button ${isTransitioning ? 'clicked' : ''}`}
            onClick={handleButtonClick}
          >
            Track Orbit
          </button>
        )}
      </div>
    </div>
  );
};

export default Scene1;
