import { useState } from 'react';
import { Volume2 } from 'lucide-react';

export default function AudioButton({ card, playAudio }) {
  const [playing, setPlaying] = useState(false);

  function handleClick() {
    if (playing) return;
    setPlaying(true);
    playAudio(card);
    setTimeout(() => setPlaying(false), 800);
  }

  return (
    <button
      onClick={handleClick}
      aria-label="השמע את הצליל"
      className={`
        relative flex items-center justify-center w-14 h-14 rounded-full
        bg-gradient-to-br from-sky-300 to-blue-400
        shadow-lg border-2 border-blue-200
        hover:scale-110 active:scale-95 transition-all duration-200
        ${playing ? 'ring-4 ring-blue-300 ring-opacity-70' : ''}
      `}
    >
      <Volume2
        size={26}
        className={`text-white drop-shadow ${playing ? 'animate-pulse' : ''}`}
      />
      {/* Ripple waves */}
      {playing && (
        <>
          <span className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping opacity-60" />
          <span className="absolute inset-[-6px] rounded-full border-2 border-blue-200 animate-ping opacity-40 delay-100" />
        </>
      )}
    </button>
  );
}
