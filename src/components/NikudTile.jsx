import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';
import { NIKUD_META } from '../data/curriculum';

const GROUP_STYLES = {
  A: {
    tile:  'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-300',
    text:  'text-amber-800',
    sub:   'text-amber-500',
    badge: 'bg-amber-200 border-amber-400 text-amber-800',
    ring:  'border-amber-400',
    spark: '#FBBF24',
  },
  E: {
    tile:  'bg-gradient-to-b from-pink-50 to-pink-100 border-pink-300',
    text:  'text-pink-800',
    sub:   'text-pink-500',
    badge: 'bg-pink-200 border-pink-400 text-pink-800',
    ring:  'border-pink-400',
    spark: '#F472B6',
  },
  I: {
    tile:  'bg-gradient-to-b from-blue-50 to-indigo-100 border-blue-300',
    text:  'text-blue-800',
    sub:   'text-blue-500',
    badge: 'bg-blue-200 border-blue-400 text-blue-800',
    ring:  'border-blue-400',
    spark: '#818CF8',
  },
  O: {
    tile:  'bg-gradient-to-b from-green-50 to-emerald-100 border-green-300',
    text:  'text-green-800',
    sub:   'text-green-500',
    badge: 'bg-green-200 border-green-400 text-green-800',
    ring:  'border-green-400',
    spark: '#34D399',
  },
  U: {
    tile:  'bg-gradient-to-b from-violet-50 to-purple-100 border-violet-300',
    text:  'text-violet-800',
    sub:   'text-violet-500',
    badge: 'bg-violet-200 border-violet-400 text-violet-800',
    ring:  'border-violet-400',
    spark: '#A78BFA',
  },
};

export default function NikudTile({ nikudType, data, onHear, heard }) {
  const { playText } = useAudio();
  const [playing,   setPlaying]   = useState(false);
  const [animHit,   setAnimHit]   = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const prevHeard = useRef(heard);
  const meta   = NIKUD_META[nikudType];
  const gs     = GROUP_STYLES[meta.group];

  // Trigger burst ring once when tile transitions to "heard"
  useEffect(() => {
    if (heard && !prevHeard.current) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 700);
    }
    prevHeard.current = heard;
  }, [heard]);

  function handlePlay(e) {
    e.stopPropagation();
    setPlaying(true);
    setAnimHit(true);
    playText(data.display);
    onHear(nikudType);
    setTimeout(() => setPlaying(false), 700);
    setTimeout(() => setAnimHit(false),  400);
  }

  return (
    <div className="relative w-full">
      <button
        onClick={handlePlay}
        className={`
          relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-[3px] w-full
          cursor-pointer select-none transition-transform duration-150
          hover:scale-105 hover:-translate-y-0.5
          active:scale-95
          ${gs.tile}
          tile-glow-${meta.group}
          ${animHit ? 'animate-tile-hit' : ''}
          ${playing ? 'scale-105' : ''}
        `}
      >
        {/* Heard badge */}
        {heard && (
          <span className="absolute -top-2.5 -right-2.5 bg-green-400 text-white text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-lg z-10 font-black border-2 border-white animate-pop-in">
            ✓
          </span>
        )}

        {/* Letter + nikud */}
        <div
          className={`font-rubik font-black leading-none ${gs.text} transition-transform duration-100`}
          style={{ fontSize: '3rem', lineHeight: '3.8rem', direction: 'rtl' }}
        >
          {data.display}
        </div>

        {/* Group label */}
        <div className={`text-xs font-black font-rubik px-2 py-0.5 rounded-full border ${gs.badge}`}>
          {meta.groupLabel}
        </div>

        {/* Example */}
        <div className={`text-xs font-assistant text-center leading-tight ${gs.sub}`}>
          {data.example}
        </div>

        {/* Playing pulse ring */}
        {playing && (
          <div className={`absolute inset-0 rounded-2xl border-4 animate-ping opacity-50 pointer-events-none ${gs.ring}`} />
        )}
      </button>

      {/* Sparkle burst ring on first hear */}
      {showBurst && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
          style={{
            border: `3px solid ${gs.spark}`,
            animation: 'ringBurst 0.6s ease-out forwards',
          }}
        />
      )}
    </div>
  );
}
