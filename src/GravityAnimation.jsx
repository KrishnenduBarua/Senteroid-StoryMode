import React, { useState, useEffect } from 'react';
import earthAnimation from './Earth.json';
import asteroidGif from './asteroid.gif';
import spacecraftGif from './spacecraft.gif';

const GravityAnimation = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [spacecraftPosition, setSpacecraftPosition] = useState({ x: 15, y: 35 });
  const [asteroidPosition, setAsteroidPosition] = useState({ x: 75, y: 25 });
  const [showGravityField, setShowGravityField] = useState(false);
  const [showText, setShowText] = useState(false);
  const [trajectoryColor, setTrajectoryColor] = useState('red');
  const [showThrustExhaust, setShowThrustExhaust] = useState(false);

  useEffect(() => {
    const sequence = [
      { delay: 1000, action: () => setAnimationPhase('approaching') },
      { delay: 2000, action: () => {
          // Spacecraft approaches and hovers near (not touching) asteroid
          setSpacecraftPosition({ x: 70, y: 22 }); // Close but not touching
        }},
      { delay: 3500, action: () => {
          setShowGravityField(true);
          setShowThrustExhaust(true);
          setAnimationPhase('hovering');
        }},
      { delay: 5000, action: () => {
          // Very gradual deflection begins - gravity tractor takes time
          setTrajectoryColor('orange');
          setAsteroidPosition({ x: 76, y: 24 }); // Tiny movement
        }},
      { delay: 7000, action: () => {
          // Continued gradual deflection
          setAsteroidPosition({ x: 78, y: 22 }); 
        }},
      { delay: 9000, action: () => {
          // Final deflection - still gradual
          setTrajectoryColor('green');
          setAsteroidPosition({ x: 82, y: 18 });
          setAnimationPhase('deflected');
        }},
      { delay: 11000, action: () => setShowText(true) }
    ];

    sequence.forEach(({ delay, action }) => {
      setTimeout(action, delay);
    });
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      zIndex: 5, 
      background: 'black' 
    }}>
      {/* Earth Background Animation */}
      <div style={{ 
        position: 'absolute', 
        top: '90px', 
        left: 0, 
        width: '100%', 
        height: 'calc(100vh - 90px)', 
        zIndex: 1 
      }}>
        <lottie-player
          src={earthAnimation}
          background="transparent"
          speed="0.3"
          style={{width: '100%', height: '100%'}}
          loop
          autoplay
        />
      </div>
      
      {/* Space Overlay for Stars */}
      <div style={{
        position: 'absolute',
        top: '90px',
        left: 0,
        width: '100%',
        height: 'calc(100vh - 90px)',
        background: `
          radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.6), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.4), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.7), transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 150px',
        zIndex: 2,
        pointerEvents: 'none',
        animation: 'starTwinkle 8s ease-in-out infinite alternate'
      }}></div>

      {/* Asteroid Orbit - Shows gradual deflection */}
      <div style={{
        position: 'absolute',
        left: `${asteroidPosition.x}%`,
        top: `${asteroidPosition.y}%`,
        width: '160px',
        height: '160px',
        zIndex: 4,
        transform: 'translate(-50%, -50%)',
        border: `2px solid ${animationPhase === 'deflected' ? '#00ff44' : '#ff4444'}`,
        borderRadius: '50%',
        borderStyle: 'dashed',
        opacity: 0.5,
        transition: 'all 3s ease-out', // Slower transition for gravity tractor
        animation: 'orbitRotate 12s linear infinite' // Slower rotation
      }} />

      <svg style={{ 
        position: 'absolute', 
        top: '90px', 
        left: 0, 
        width: '100%', 
        height: 'calc(100vh - 90px)', 
        zIndex: 3, 
        pointerEvents: 'none' 
      }}>
        <path
          d="M 75% 35% Q 60% 55% 50% 85%"
          stroke={trajectoryColor === 'red' ? '#ff4444' : 'transparent'}
          strokeWidth="4"
          fill="none"
          strokeDasharray="10,5"
        />
        
        {trajectoryColor === 'orange' && (
          <path
            d="M 75% 35% Q 70% 42% 68% 50%"
            stroke="#ff8800"
            strokeWidth="4"
            fill="none"
            strokeDasharray="15,5"
          />
        )}
        
        {animationPhase === 'deflected' && (
          <path
            d="M 82% 28% Q 88% 22% 95% 18%"
            stroke="#00ff44"
            strokeWidth="4"
            fill="none"
          />
        )}
      </svg>

      {/* Gravity Field Effect - Subtle gravitational influence */}
      {showGravityField && (
        <>
          <div 
            style={{
              left: `${spacecraftPosition.x}%`,
              top: `${spacecraftPosition.y}%`,
              position: 'absolute',
              zIndex: 5,
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
              border: '2px solid rgba(100, 200, 255, 0.4)',
              borderRadius: '50%',
              animation: 'gravityPulse1 4s ease-in-out infinite'
            }}
          />
          <div 
            style={{
              left: `${spacecraftPosition.x}%`,
              top: `${spacecraftPosition.y}%`,
              position: 'absolute',
              zIndex: 5,
              transform: 'translate(-50%, -50%)',
              width: '160px',
              height: '160px',
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '50%',
              animation: 'gravityPulse2 4s ease-in-out infinite 1s'
            }}
          />
          <div 
            style={{
              left: `${spacecraftPosition.x}%`,
              top: `${spacecraftPosition.y}%`,
              position: 'absolute',
              zIndex: 5,
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              border: '1px solid rgba(100, 200, 255, 0.2)',
              borderRadius: '50%',
              animation: 'gravityPulse3 4s ease-in-out infinite 2s'
            }}
          />
        </>
      )}

      {/* Thrust Exhaust - Perpendicular to asteroid direction */}
      {showThrustExhaust && (
        <div style={{
          position: 'absolute',
          left: `${spacecraftPosition.x - 3}%`, // Slightly behind spacecraft
          top: `${spacecraftPosition.y + 2}%`,
          width: '20px',
          height: '6px',
          background: 'linear-gradient(90deg, rgba(0,150,255,0.8) 0%, transparent 100%)',
          zIndex: 4,
          animation: 'thrustFlicker 0.3s ease-in-out infinite alternate',
          borderRadius: '3px'
        }} />
      )}

      {/* Spacecraft - Hovers at consistent distance */}
      <img
        src={spacecraftGif}
        alt="Gravity Tractor Spacecraft"
        style={{
          left: `${spacecraftPosition.x}%`,
          top: `${spacecraftPosition.y}%`,
          width: '60px',
          height: '40px',
          position: 'absolute',
          zIndex: 6,
          transform: 'translate(-50%, -50%)',
          transition: animationPhase === 'approaching' ? 'all 2.5s ease-out' : 'all 4s ease-out',
          filter: 'drop-shadow(0 0 12px rgba(100, 200, 255, 0.6))',
          animation: animationPhase === 'hovering' ? 'stationKeeping 3s ease-in-out infinite' : 'none'
        }}
      />

      {/* Asteroid - Very gradual movement */}
      <img
        src={asteroidGif}
        alt="Asteroid"
        style={{
          left: `${asteroidPosition.x}%`,
          top: `${asteroidPosition.y}%`,
          width: '80px',
          height: '80px',
          position: 'absolute',
          zIndex: 6,
          transform: 'translate(-50%, -50%)',
          transition: 'all 4s ease-in-out', // Very slow, gradual movement
          filter: animationPhase === 'deflected' 
            ? 'drop-shadow(0 0 15px rgba(0, 255, 68, 0.6))' 
            : showGravityField 
            ? 'drop-shadow(0 0 15px rgba(100, 200, 255, 0.4))' 
            : 'drop-shadow(0 0 15px rgba(255, 68, 68, 0.6))'
        }}
      />

      {showText && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 15,
          background: 'rgba(0, 0, 0, 0.85)',
          padding: '30px 40px',
          borderRadius: '20px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
          maxWidth: '800px',
          fontFamily: "'League Spartan', sans-serif",
          color: '#ffffff',
          lineHeight: 1.6
        }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '15px',
              color: '#64C8FF',
              margin: '0 0 15px 0'
            }}>
              Gravity Tractor Mission
            </h3>
            <p style={{
              fontSize: '18px',
              fontWeight: 400,
              marginBottom: '10px',
              textAlign: 'left',
              margin: '0 0 10px 0',
              lineHeight: '1.6'
            }}>
              "The spacecraft hovers near the asteroid using only gravitational force - no physical contact needed. By maintaining position and directing thrust perpendicular to the asteroid's path, it gradually pulls the asteroid to a safe trajectory over months. This precise method works regardless of the asteroid's composition or rotation."
            </p>
            <div style={{
              marginTop: '15px',
              fontSize: '18px',
              color: '#00ff44'
            }}>
              ✅ Mission Status: SUCCESS - Asteroid gradually deflected over 8 months
            </div>
          </div>
          <button 
            onClick={onComplete}
            style={{
              background: 'linear-gradient(135deg, #4CAF50, #45a049)',
              border: 'none',
              padding: '15px 30px',
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '18px',
              fontWeight: 700,
              color: 'white',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
              marginTop: '20px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #5CBF60, #4CAF50)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
            }}
          >
            Continue Mission
          </button>
        </div>
      )}

      {/* Asteroid Attribution */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        zIndex: 20,
        fontSize: '10px',
        color: 'rgba(255, 255, 255, 0.6)',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '5px 8px',
        borderRadius: '4px'
      }}>
        <a 
          href="https://iconscout.com/lottie-animations/asteroid" 
          style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Asteroid
        </a> by{' '}
        <a 
          href="https://iconscout.com/contributors/vectorportal" 
          style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pixle Studio
        </a>
      </div>

      <style jsx>{`
        @keyframes gravityPulse1 {
          0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.6; }
        }
        
        @keyframes gravityPulse2 {
          0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; }
        }
        
        @keyframes gravityPulse3 {
          0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.4; }
        }
        
        @keyframes stationKeeping {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-2px); }
        }
        
        @keyframes thrustFlicker {
          0% { opacity: 0.6; transform: scaleX(0.8); }
          100% { opacity: 1; transform: scaleX(1.2); }
        }
        
        @keyframes starTwinkle {
          0% { opacity: 0.6; }
          100% { opacity: 0.9; }
        }

        @keyframes orbitRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GravityAnimation;