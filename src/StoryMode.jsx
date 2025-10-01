import React, { useState, useEffect, useRef } from 'react';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Scene4 from './Scene4';
import Scene5 from './Scene5';
import KineticAnimation from './KineticAnimation';
import GravityAnimation from './GravityAnimation';
import NuclearAnimation from './NuclearAnimation';
import deepSpaceAudio from './deep-space.mp3';

function StoryMode() {
  const [currentScene, setCurrentScene] = useState(1);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const audioRef = useRef(null);

  // Audio control based on current scene
  useEffect(() => {
    const audio = audioRef.current;
    
    if (currentScene === 7) { // Scene4 is case 7
      // Pause audio for Scene4
      if (audio) {
        audio.pause();
      }
    } else {
      // Play audio for all other scenes
      if (audio) {
        audio.play().catch(error => {
          console.log('Audio autoplay failed:', error);
        });
      }
    }
  }, [currentScene]);

  const handleNextScene = () => {
    setCurrentScene(currentScene + 1);
  };

  const handleStrategySelection = (strategyType) => {
    setSelectedStrategy(strategyType);
    if (strategyType === 'kinetic') {
      setCurrentScene(4);
    } else if (strategyType === 'gravity') {
      setCurrentScene(5);
    } else if (strategyType === 'nuclear') {
      setCurrentScene(6);
    }
  };

  const handleAnimationComplete = () => {
    setCurrentScene(7); // Go to Scene4
  };

  const handleScene4Next = () => {
    setCurrentScene(8); // Go to Scene5
  };

  const handleDefendAgain = () => {
    setCurrentScene(1); // Restart from Scene1
    setSelectedStrategy(null);
  };

  const renderCurrentScene = () => {
    switch(currentScene) {
      case 1:
        return <Scene1 onNext={handleNextScene} />;
      case 2:
        return <Scene2 onNext={handleNextScene} />;
      case 3:
        return <Scene3 onStrategySelect={handleStrategySelection} />;
      case 4:
        return <KineticAnimation onComplete={handleAnimationComplete} />;
      case 5:
        return <GravityAnimation onComplete={handleAnimationComplete} />;
      case 6:
        return <NuclearAnimation onComplete={handleAnimationComplete} />;
      case 7:
        return <Scene4 onNext={handleScene4Next} />;
      case 8:
        return <Scene5 onDefendAgain={handleDefendAgain} />;
      default:
        return <Scene1 onNext={handleNextScene} />;
    }
  };

  return (
    <div>
      {/* Audio Element */}
      <audio 
        ref={audioRef}
        src={deepSpaceAudio}
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
      
      {renderCurrentScene()}

      {/* Audio Attribution - Show only when audio is playing (not Scene4) */}
      {currentScene !== 7 && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 30,
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.6)',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '5px 8px',
          borderRadius: '4px',
          maxWidth: '250px'
        }}>
          Sound Effect by{' '}
          <a 
            href="https://pixabay.com/users/audiopapkin-14728698/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=304974"
            style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Paweł Spychała
          </a> from{' '}
          <a 
            href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=304974"
            style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixabay
          </a>
        </div>
      )}
    </div>
  );
}

export default StoryMode;