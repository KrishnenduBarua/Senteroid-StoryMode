import React, { useState, useEffect } from 'react';
import earthAnimation from './Earth.json';
import asteroidGif from './asteroid.gif';
import spacecraftGif from './spacecraft.gif';

const KineticAnimation = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [spacecraftPosition, setSpacecraftPosition] = useState({ x: 15, y: 35 });
  const [asteroidPosition, setAsteroidPosition] = useState({ x: 75, y: 25 });
  const [showImpactField, setShowImpactField] = useState(false);
  const [showText, setShowText] = useState(false);
  const [trajectoryColor, setTrajectoryColor] = useState('red');
  const [spacecraftVisible, setSpacecraftVisible] = useState(true);

  useEffect(() => {
    const sequence = [
      { delay: 1000, action: () => setAnimationPhase('approaching') },
      { delay: 2000, action: () => setSpacecraftPosition({ x: 70, y: 28 }) },
      { delay: 4000, action: () => {
          setShowImpactField(true);
          setSpacecraftVisible(false);
          setAnimationPhase('impacting');
        }},
      { delay: 5500, action: () => {
          setShowImpactField(false);
          setTrajectoryColor('orange');
          setAnimationPhase('deflecting');
        }},
      { delay: 6500, action: () => {
          setTrajectoryColor('green');
          setAsteroidPosition({ x: 85, y: 18 });
          setAnimationPhase('deflected');
        }},
      { delay: 9000, action: () => setShowText(true) }
    ];

    sequence.forEach(({ delay, action }) => {
      setTimeout(action, delay);
    });
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 5, background: 'black' }}>
      {/* Earth Background Animation */}
      <div style={{ position: 'absolute', top: '90px', left: 0, width: '100%', height: 'calc(100vh - 90px)', zIndex: 1 }}>
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
    <div className="space-overlay"></div>
      <svg style={{ position: 'absolute', top: '90px', left: 0, width: '100%', height: 'calc(100vh - 90px)', zIndex: 3, pointerEvents: 'none' }}>
        <path
          d="M 75% 35% Q 60% 55% 50% 85%"
          stroke={trajectoryColor === 'red' ? '#ff4444' : 'transparent'}
          strokeWidth="4"
          fill="none"
          strokeDasharray="10,5"
        />
        
        {trajectoryColor === 'orange' && (
          <path
            d="M 75% 35% Q 70% 42% 65% 55%"
            stroke="#ff8800"
            strokeWidth="4"
            fill="none"
            strokeDasharray="15,5"
          />
        )}
        
        {animationPhase === 'deflected' && (
          <path
            d="M 85% 28% Q 88% 22% 95% 18%"
            stroke="#00ff44"
            strokeWidth="4"
            fill="none"
          />
        )}
      </svg>

      {/* Impact Effects */}
      {showImpactField && (
        <>
          <div 
            style={{
              left: `${spacecraftPosition.x}%`,
              top: `${spacecraftPosition.y}%`,
              position: 'absolute',
              zIndex: 5,
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              border: '3px solid rgba(255, 255, 0, 0.8)',
              borderRadius: '50%',
              animation: 'impactPulse1 1.5s ease-in-out infinite'
            }}
          />
          <div 
            style={{
              left: `${spacecraftPosition.x}%`,
              top: `${spacecraftPosition.y}%`,
              position: 'absolute',
              zIndex: 5,
              transform: 'translate(-50%, -50%)',
              width: '140px',
              height: '140px',
              border: '2px solid rgba(255, 255, 0, 0.6)',
              borderRadius: '50%',
              animation: 'impactPulse2 1.5s ease-in-out infinite 0.3s'
            }}
          />
          <div 
            style={{
              left: `${spacecraftPosition.x}%`,
              top: `${spacecraftPosition.y}%`,
              position: 'absolute',
              zIndex: 5,
              transform: 'translate(-50%, -50%)',
              width: '180px',
              height: '180px',
              border: '1px solid rgba(255, 255, 0, 0.4)',
              borderRadius: '50%',
              animation: 'impactPulse3 1.5s ease-in-out infinite 0.6s'
            }}
          />
        </>
      )}

      {spacecraftVisible && (
        <img
          src={spacecraftGif}
          alt="Kinetic Impactor Spacecraft"
          style={{
            left: `${spacecraftPosition.x}%`,
            top: `${spacecraftPosition.y}%`,
            width: '70px',
            height: '50px',
            position: 'absolute',
            zIndex: 6,
            transform: 'translate(-50%, -50%)',
            transition: animationPhase === 'approaching' ? 'all 2s ease-out' : 'none',
            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))',
            animation: showImpactField ? 'impactHover 1s ease-in-out infinite' : 'none'
          }}
        />
      )}

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
          transition: 'all 2.5s ease-in-out',
          filter: animationPhase === 'deflected' 
            ? 'drop-shadow(0 0 15px rgba(0, 255, 68, 0.6))' 
            : showImpactField 
            ? 'drop-shadow(0 0 15px rgba(255, 255, 0, 0.6))' 
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
              color: '#ffff00',
              margin: '0 0 15px 0'
            }}>
              Kinetic Impactor Mission
            </h3>
            <p style={{
              fontSize: '18px',
              fontWeight: 400,
              marginBottom: '10px',
              textAlign: 'left',
              margin: '0 0 10px 0',
              lineHeight: '1.6'
            }}>
              The spacecraft collides at 20 km/s, transferring its momentum to the asteroid. The impact creates a small but crucial change in velocity, deflecting the asteroid's path away from Earth. This method works best for smaller asteroids detected years in advance.
            </p>
            <div style={{
              marginTop: '15px',
              fontSize: '18px',
              color: '#00ff44'
            }}>
              ✅ Mission Status: SUCCESS - Asteroid trajectory altered by 0.5°
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
        @keyframes impactPulse1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
        }
        
        @keyframes impactPulse2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.3; }
        }
        
        @keyframes impactPulse3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.4); opacity: 0.2; }
        }
        
        @keyframes impactHover {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        
        @keyframes starTwinkle {
          0% { opacity: 0.6; }
          100% { opacity: 0.9; }
        }

        
      `}</style>
    </div>
  );
};

export default KineticAnimation;