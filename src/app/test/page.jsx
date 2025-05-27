'use client';

import { useState, useRef } from 'react';

const songs = [
  {
    title: "Song One",
    src: "/audio/song1.mp3",
  },
  {
    title: "Song Two",
    src: "/audio/song2.mp3",
  },
];

export default function Mp3Player() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % songs.length;
    setCurrentTrack(next);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{songs[currentTrack].title}</h2>
      <audio ref={audioRef} style={styles.audio}>
        <source src={songs[currentTrack].src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div style={styles.controls}>
        <button onClick={togglePlay} style={styles.button}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={nextTrack} style={styles.button}>Next</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    maxWidth: '400px',
    margin: '40px auto',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '16px',
  },
  audio: {
    width: '100%',
    marginBottom: '16px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
