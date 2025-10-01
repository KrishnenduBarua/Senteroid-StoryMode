import React from 'react';
import cityImage from './city.jpg';

const Scene4 = ({ onNext }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${cityImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
    }}>
      {/* Dark overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1
      }}></div>

      {/* Success Message */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        color: 'white',
        fontFamily: "'League Spartan', sans-serif",
        padding: '40px 50px',
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '20px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
        maxWidth: '800px',
        animation: 'fadeInUp 1.5s ease-out'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          marginBottom: '20px',
          color: '#00ff44',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          lineHeight: 1.2
        }}>
          No cities harmed, no lives lost.
        </h1>
        
        <p style={{
          fontSize: '24px',
          fontWeight: 400,
          marginBottom: '30px',
          color: '#ffffff',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
          lineHeight: 1.4
        }}>
          Thanks to timely action, Earth is safe for now.
        </p>

        <button 
          onClick={onNext}
          style={{
            background: 'linear-gradient(135deg, #4CAF50, #45a049)',
            border: 'none',
            padding: '15px 35px',
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '20px',
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #5CBF60, #4CAF50)';
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
          }}
        >
          Next
        </button>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default Scene4;