import { useState } from 'react';
import { useAudio } from '../hooks/useAudio';
import { NIKUD_META } from '../data/curriculum';

export default function NikudTile({ nikudType, data, onHear, heard }) {
  const { playText } = useAudio();
  const [playing, setPlaying] = useState(false);
  const meta = NIKUD_META[nikudType];
  const isA  = meta.group === 'A';

  async function handlePlay(e) {
    e.stopPropagation();
    setPlaying(true);
    playText(data.display);
    onHear(nikudType);
    setTimeout(() => setPlaying(false), 700);
  }

  return (
    <button
      onClick={handlePlay}
      className={`
        relative flex flex-col items-center gap-2 p-4 rounded-3xl border-4
        cursor-pointer select-none transition-all duration-200
        hover:scale-105 active:scale-95 shadow-lg
        ${isA
          ? 'bg-gradient-to-b from-amber-50 to-yellow-100 border-amber-300 hover:border-amber-500'
          : 'bg-gradient-to-b from-pink-50   to-fuchsia-100 border-pink-300   hover:border-pink-500'}
        ${playing ? 'scale-105 ring-4 ' + (isA ? 'ring-amber-300' : 'ring-pink-300') : ''}
      `}
    >
      {/* Heard badge */}
      {heard && (
        <span className="absolute -top-2 -right-2 bg-green-400 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center shadow-md z-10 font-bold">
          ✓
        </span>
      )}

      {/* Big letter+nikud */}
      <div
        className={`font-rubik font-black leading-none ${isA ? 'text-amber-800' : 'text-pink-800'}`}
        style={{ fontSize: '4.5rem', lineHeight: '6rem', direction: 'rtl' }}
      >
        {data.display}
      </div>

      {/* Phonetic */}
      <div className={`text-sm font-bold font-assistant ${isA ? 'text-amber-600' : 'text-pink-600'}`}>
        {data.phonetic}
      </div>

      {/* Example */}
      <div className={`text-xs font-assistant text-center px-1 ${isA ? 'text-amber-500' : 'text-pink-500'}`}>
        {data.example}
      </div>

      {/* Nikud name badge */}
      <div className={`
        text-xs font-black font-rubik px-2 py-0.5 rounded-full border
        ${isA ? 'bg-amber-100 border-amber-300 text-amber-700' : 'bg-pink-100 border-pink-300 text-pink-700'}
      `}>
        {meta.name}
      </div>

      {/* Speaker wave animation */}
      {playing && (
        <div className="absolute inset-0 rounded-3xl border-4 border-blue-300 animate-ping opacity-40 pointer-events-none" />
      )}
    </button>
  );
}
