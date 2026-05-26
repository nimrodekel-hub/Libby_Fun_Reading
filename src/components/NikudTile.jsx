import { useState } from 'react';
import { useAudio } from '../hooks/useAudio';
import { NIKUD_META } from '../data/curriculum';

const GROUP_COLORS = {
  A: { tile: 'bg-gradient-to-b from-amber-50  to-yellow-100  border-amber-300  hover:border-amber-500',  ring: 'ring-amber-300',  text: 'text-amber-800',  sub: 'text-amber-600',  badge: 'bg-amber-100  border-amber-300  text-amber-700'  },
  E: { tile: 'bg-gradient-to-b from-pink-50   to-fuchsia-100 border-pink-300   hover:border-pink-500',   ring: 'ring-pink-300',   text: 'text-pink-800',   sub: 'text-pink-600',   badge: 'bg-pink-100   border-pink-300   text-pink-700'   },
  I: { tile: 'bg-gradient-to-b from-blue-50   to-indigo-100  border-blue-300   hover:border-blue-500',   ring: 'ring-blue-300',   text: 'text-blue-800',   sub: 'text-blue-600',   badge: 'bg-blue-100   border-blue-300   text-blue-700'   },
  O: { tile: 'bg-gradient-to-b from-green-50  to-emerald-100 border-green-300  hover:border-green-500',  ring: 'ring-green-300',  text: 'text-green-800',  sub: 'text-green-600',  badge: 'bg-green-100  border-green-300  text-green-700'  },
  U: { tile: 'bg-gradient-to-b from-violet-50 to-purple-100  border-violet-300 hover:border-violet-500', ring: 'ring-violet-300', text: 'text-violet-800', sub: 'text-violet-600', badge: 'bg-violet-100 border-violet-300 text-violet-700' },
};

export default function NikudTile({ nikudType, data, onHear, heard }) {
  const { playText } = useAudio();
  const [playing, setPlaying] = useState(false);
  const meta   = NIKUD_META[nikudType];
  const colors = GROUP_COLORS[meta.group];

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
        ${colors.tile}
        ${playing ? `scale-105 ring-4 ${colors.ring}` : ''}
      `}
    >
      {heard && (
        <span className="absolute -top-2 -right-2 bg-green-400 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center shadow-md z-10 font-bold">
          ✓
        </span>
      )}

      <div
        className={`font-rubik font-black leading-none ${colors.text}`}
        style={{ fontSize: '4.5rem', lineHeight: '6rem', direction: 'rtl' }}
      >
        {data.display}
      </div>

      <div className={`text-sm font-bold font-assistant ${colors.sub}`}>
        {data.phonetic}
      </div>

      <div className={`text-xs font-assistant text-center px-1 ${colors.sub}`}>
        {data.example}
      </div>

      <div className={`text-xs font-black font-rubik px-2 py-0.5 rounded-full border ${colors.badge}`}>
        {meta.name}
      </div>

      {playing && (
        <div className="absolute inset-0 rounded-3xl border-4 border-blue-300 animate-ping opacity-40 pointer-events-none" />
      )}
    </button>
  );
}
