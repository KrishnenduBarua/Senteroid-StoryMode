import React, { useState, useEffect } from 'react';
import earthAnimation from './Earth.json';
import asteroidGif from './asteroid.gif';

const NuclearAnimation = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [asteroidPosition, setAsteroidPosition] = useState({ x: 75, y: 25 });
  const [showWarningBeep, setShowWarningBeep] = useState(false);
  const [showXRayBurst, setShowXRayBurst] = useState(false);
  const [showFragments, setShowFragments] = useState(false);
  const [showText, setShowText] = useState(false);
  const [trajectoryColor, setTrajectoryColor] = useState('red');
  const [asteroidFragments, setAsteroidFragments] = useState([
    { x: 75, y: 25, size: 40 },
    { x: 78, y: 22, size: 25 },
    { x: 72, y: 28, size: 30 }
  ]);

  useEffect(() => {
    const sequence = [
      { delay: 1000, action: () => setAnimationPhase('warning') },
      { delay: 1500, action: () => setShowWarningBeep(true) },
      { delay: 3000, action: () => {
          setShowWarningBeep(false);
          setShowXRayBurst(true);
          setAnimationPhase('detonation');
        }},
      { delay: 3500, action: () => {
          // X-rays vaporize surface and create thrust
          setShowFragments(true);
          setAsteroidFragments([
            { x: 82, y: 18, size: 40 }, // Main fragment deflected
            { x: 88, y: 15, size: 25 }, // Smaller fragments
            { x: 85, y: 22, size: 30 }
          ]);
          setAnimationPhase('fragmentation');
        }},
      { delay: 5000, action: () => {
          setShowXRayBurst(false);
          setTrajectoryColor('green');
          setAnimationPhase('deflected');
        }},
      { delay: 7000, action: () => setShowText(true) }
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
        
        {animationPhase === 'deflected' && (
          <>
            <path
              d="M 82% 28% Q 88% 22% 95% 15%"
              stroke="#00ff44"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M 88% 25% Q 92% 20% 98% 12%"
              stroke="#44ff88"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,3"
            />
            <path
              d="M 85% 32% Q 90% 28% 96% 20%"
              stroke="#66ff99"
              strokeWidth="2"
              fill="none"
              strokeDasharray="3,2"
            />
          </>
        )}
      </svg>

      {/* Warning Beeping Effect */}
      {showWarningBeep && (
        <div style={{
          position: 'absolute',
          left: `${asteroidPosition.x}%`,
          top: `${asteroidPosition.y}%`,
          width: '100px',
          height: '100px',
          zIndex: 7,
          transform: 'translate(-50%, -50%)',
          border: '3px solid #ff0000',
          borderRadius: '50%',
          animation: 'warningBeep 0.8s ease-in-out infinite'
        }} />
      )}

      {/* X-Ray Burst - Massive energy release */}
      {showXRayBurst && (
        <>
          {/* Central X-ray burst */}
          <div style={{
            position: 'absolute',
            left: `${asteroidPosition.x}%`,
            top: `${asteroidPosition.y}%`,
            width: '400px',
            height: '400px',
            zIndex: 8,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,200,100,0.8) 30%, rgba(255,100,100,0.6) 60%, transparent 100%)',
            borderRadius: '50%',
            animation: 'xrayBurst 2s ease-out'
          }} />
          
          {/* X-ray waves */}
          <div style={{
            position: 'absolute',
            left: `${asteroidPosition.x}%`,
            top: `${asteroidPosition.y}%`,
            width: '200px',
            height: '200px',
            zIndex: 7,
            transform: 'translate(-50%, -50%)',
            border: '4px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            animation: 'xrayWave1 1.5s ease-out infinite'
          }} />
          
          <div style={{
            position: 'absolute',
            left: `${asteroidPosition.x}%`,
            top: `${asteroidPosition.y}%`,
            width: '300px',
            height: '300px',
            zIndex: 6,
            transform: 'translate(-50%, -50%)',
            border: '3px solid rgba(255, 200, 100, 0.6)',
            borderRadius: '50%',
            animation: 'xrayWave2 1.5s ease-out infinite 0.3s'
          }} />
        </>
      )}

      {/* Asteroid Fragments */}
      {!showFragments ? (
        /* Original asteroid */
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
            filter: showWarningBeep 
              ? 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.8))' 
              : 'drop-shadow(0 0 15px rgba(255, 68, 68, 0.6))',
            animation: showWarningBeep ? 'asteroidWarning 0.8s ease-in-out infinite' : 'none'
          }}
        />
      ) : (
        /* Fragmented pieces */
        asteroidFragments.map((fragment, index) => (
          <img
            key={index}
            src={asteroidGif}
            alt={`Asteroid Fragment ${index + 1}`}
            style={{
              left: `${fragment.x}%`,
              top: `${fragment.y}%`,
              width: `${fragment.size}px`,
              height: `${fragment.size}px`,
              position: 'absolute',
              zIndex: 6,
              transform: 'translate(-50%, -50%)',
              transition: 'all 2s ease-out',
              filter: 'drop-shadow(0 0 15px rgba(0, 255, 68, 0.6))',
              animation: `fragmentSpin${index + 1} 3s linear infinite`
            }}
          />
        ))
      )}

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
              color: '#FF6B35',
              margin: '0 0 15px 0'
            }}>
              Nuclear X-Ray Deflection
            </h3>
            <p style={{
              fontSize: '18px',
              fontWeight: 400,
              marginBottom: '10px',
              textAlign: 'left',
              margin: '0 0 10px 0',
              lineHeight: '1.6'
            }}>
              A nuclear device detonated near the asteroid produces intense X-rays that vaporize the surface material. This creates explosive thrust as gas expands away, fragmenting and deflecting even large asteroids. The X-ray energy transfer is far more effective than shock waves alone - perfect for short-warning scenarios.
            </p>
            <div style={{
              marginTop: '15px',
              fontSize: '18px',
              color: '#00ff44'
            }}>
              ✅ Mission Status: SUCCESS - Asteroid fragmented and all pieces deflected
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
        @keyframes warningBeep {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.9); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes asteroidWarning {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.8)); }
          50% { filter: drop-shadow(0 0 30px rgba(255, 100, 100, 1)); }
        }
        
        @keyframes xrayBurst {
          0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
          10% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        
        @keyframes xrayWave1 {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        
        @keyframes xrayWave2 {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
        
        @keyframes fragmentSpin1 {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes fragmentSpin2 {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        @keyframes fragmentSpin3 {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(180deg); }
        }
        
        @keyframes starTwinkle {
          0% { opacity: 0.6; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default NuclearAnimation;