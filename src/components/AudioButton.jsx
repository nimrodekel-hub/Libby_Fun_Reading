import { useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function AudioButton({ card, size = 'md' }) {
  const { playCardAudio } = useAudio();
  const [pulse, setPulse]   = useState(false);
  const cooldownRef         = useRef(false);

  async function handleClick(e) {
    e.stopPropagation();
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    setPulse(true);
    await playCardAudio(card);
    setTimeout(() => {
      setPulse(false);
      cooldownRef.current = false;
    }, 800);
  }

  const sizeClass = size === 'lg'
    ? 'w-20 h-20 text-4xl'
    : 'w-14 h-14 text-2xl';

  return (
    <button
      onClick={handleClick}
      aria-label="השמע את הצליל"
      className={`
        relative flex items-center justify-center rounded-full
        bg-gradient-to-br from-sky-400 to-blue-500
        shadow-xl border-4 border-blue-200
        hover:scale-110 active:scale-95 transition-transform duration-150
        ${sizeClass}
        ${pulse ? 'ring-4 ring-blue-300' : ''}
      `}
    >
      <Volume2 className={`text-white drop-shadow-md ${pulse ? 'animate-pulse' : ''}`} />
      {pulse && (
        <>
          <span className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping opacity-60" />
          <span className="absolute inset-[-8px] rounded-full border-4 border-blue-200 animate-ping opacity-30" style={{ animationDelay: '0.15s' }} />
        </>
      )}
    </button>
  );
}
