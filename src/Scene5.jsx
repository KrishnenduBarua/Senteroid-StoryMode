import React from 'react';

const Scene5 = ({ onDefendAgain }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: `
        radial-gradient(2px 2px at 20px 30px, #fff, transparent),
        radial-gradient(2px 2px at 40px 70px, #fff, transparent),
        radial-gradient(1px 1px at 90px 40px, #fff, transparent),
        radial-gradient(1px 1px at 130px 80px, #fff, transparent),
        radial-gradient(2px 2px at 160px 30px, #fff, transparent),
        radial-gradient(1px 1px at 200px 90px, #fff, transparent),
        radial-gradient(2px 2px at 240px 50px, #fff, transparent),
        radial-gradient(1px 1px at 280px 10px, #fff, transparent),
        radial-gradient(1px 1px at 320px 70px, #fff, transparent),
        radial-gradient(2px 2px at 360px 40px, #fff, transparent),
        #000000
      `,
      backgroundRepeat: 'repeat',
      backgroundSize: '400px 200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      animation: 'starField 20s linear infinite'
    }}>
      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        color: 'white',
        fontFamily: "'League Spartan', sans-serif",
        padding: '50px 60px',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '25px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 50px rgba(0, 0, 0, 0.8)',
        maxWidth: '900px',
        animation: 'fadeInSlow 2s ease-out'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 400,
          lineHeight: 1.4,
          marginBottom: '40px',
          color: '#ffffff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          letterSpacing: '1px'
        }}>
          Asteroids have struck Earth for billions of years.<br/>
          Will we be ready for the next one?
        </h1>

        <button 
          onClick={onDefendAgain}
          style={{
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            border: 'none',
            padding: '18px 40px',
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '22px',
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            borderRadius: '12px',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4)',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #ff8c61, #ff6b35)';
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 53, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
          }}
        >
          Defend Earth Again
        </button>
      </div>

      {/* Shooting Stars */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '2px',
        height: '2px',
        background: '#fff',
        borderRadius: '50%',
        animation: 'shootingStar1 8s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '80%',
        width: '1px',
        height: '1px',
        background: '#fff',
        borderRadius: '50%',
        animation: 'shootingStar2 12s ease-in-out infinite 4s'
      }} />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes starField {
          0% { background-position: 0 0; }
          100% { background-position: -400px -200px; }
        }
        
        @keyframes fadeInSlow {
          0% { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes shootingStar1 {
          0% { 
            transform: translateX(0) translateY(0) scale(0); 
            opacity: 0; 
          }
          10% { 
            transform: translateX(0) translateY(0) scale(1); 
            opacity: 1; 
          }
          90% { 
            transform: translateX(300px) translateY(100px) scale(0); 
            opacity: 0; 
          }
          100% { 
            transform: translateX(300px) translateY(100px) scale(0); 
            opacity: 0; 
          }
        }
        
        @keyframes shootingStar2 {
          0% { 
            transform: translateX(0) translateY(0) scale(0); 
            opacity: 0; 
          }
          15% { 
            transform: translateX(0) translateY(0) scale(1); 
            opacity: 1; 
          }
          85% { 
            transform: translateX(-250px) translateY(80px) scale(0); 
            opacity: 0; 
          }
          100% { 
            transform: translateX(-250px) translateY(80px) scale(0); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
};

export default Scene5;