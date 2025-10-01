import React from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from './click.mp3';

function NavBar() {
  const navigate = useNavigate();
  
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  };

  const handleNav = (path) => {
    playClickSound();
    if (!path) return;
    // If it's an absolute URL (different origin), use a full-page navigation
    if (/^https?:\/\//i.test(path)) {
      window.location.href = path; // or window.location.assign(path)
      return;
    }

    // Otherwise, use client-side routing
    navigate(path);
  };

  return (
    <nav>
      <div className="page-name">SENTEROID</div>
      <ul>
        <li onClick={() => handleNav('https://senteroid.vercel.app/')}>HOME</li>
        <li onClick={() => handleNav('https://senteroid.vercel.app/earth')}>EARTH</li>
        <li onClick={() => handleNav('https://senteroid.vercel.app/simulate')}>SIMULATE</li>
        <li onClick={() => handleNav('https://senteroid.vercel.app/fact')}>FACT</li>
        <li onClick={() => handleNav('/storymode')}>STORYMODE</li>
        <li onClick={() => handleNav('https://senteroid.vercel.app/learn')}>LEARN</li>
      </ul>
    </nav>
  );
}

export default NavBar;
