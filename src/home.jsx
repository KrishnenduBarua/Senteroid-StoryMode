import React from 'react';
import bg from './bg.jpg';
import clickSound from './click.mp3';

function Home() {
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  };

  return (
    <div>
      <img className = 'background' src={bg} alt="Background" />
      <div className='main-content'>
        <h1 className='title'>DISCOVER NEAR EARTH OBJECTS (NEO)</h1>
        <p className='description'>Explore real asteroid orbits, simulate potential impacts, and uncover fascinating space facts.</p>
        <button className='explore-button' onClick={playClickSound}>Start Exploring</button>
      </div>
      <div className="learn-more">
        <button onClick={() => {
          playClickSound();
          window.open('https://science.nasa.gov/solar-system/asteroids/', '_blank');
        }}>
          LEARN MORE ABOUT ASTEROIDS
        </button>
      </div>
    </div>
  );
}

export default Home;
