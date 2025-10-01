import React, { useState, useEffect } from 'react';
import starryBg from './starry.json';
import kineticGif from './kinetic.json';
import gravityGif from './gravity.json';
import nuclearGif from './nuclear.json';

const Scene3 = ({ onStrategySelect }) => {
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const strategies = [
    {
      id: 1,
      type: 'kinetic',
      gif: kineticGif,
      heading: "Kinetic Impactor",
      description: "A spacecraft is launched to collide with the asteroid, transferring momentum and slightly changing its trajectory. Works best for small adjustments."
    },
    {
      id: 2,
      type: 'gravity',
      gif: gravityGif,
      heading: "Gravity Tractor",
      description: "A spacecraft hovers near the asteroid, using its gravitational pull to slowly steer the asteroid away. Safe, precise, but slow."
    },
    {
      id: 3,
      type: 'nuclear',
      gif: nuclearGif,
      heading: "Nuclear Explosion",
      description: "A nuclear device detonates near the asteroid, vaporizing material on one side. The recoil pushes it off course."
    }
  ];

  return (
    <div className="scene3-container">
      {/* Starry Background */}
      <div className="starry-background">
        <lottie-player
          src={starryBg}
          background="transparent"
          speed="0.5"
          style={{width: '100%', height: '100%'}}
          loop
          autoplay
        />
      </div>
      
      {/* Main Content */}
      <div className="scene3-content">
        <h1 className="scene3-title">Choose Deflection Strategy</h1>
        
        {/* Strategy Cards Container */}
        <div className={`strategy-cards-container ${cardsVisible ? 'visible' : ''}`}>
          {strategies.map((strategy, index) => (
            <div 
              key={strategy.id} 
              className="strategy-card"
              style={{animationDelay: `${index * 0.3}s`}}
            >
              {/* JSON Animation Container */}
              <div className="strategy-gif-container">
                <lottie-player
                  src={strategy.gif}
                  background="transparent"
                  speed="1"
                  style={{width: '100%', height: '100%'}}
                  loop
                  autoplay
                />
              </div>
              
              {/* Strategy Heading */}
              <h3 className="strategy-heading">{strategy.heading}</h3>
              
              {/* Strategy Description */}
              <p className="strategy-description">{strategy.description}</p>
              
              {/* Select Button */}
              <button 
                className="strategy-button"
                onClick={() => onStrategySelect(strategy.type)}
              >
                Select Strategy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scene3;