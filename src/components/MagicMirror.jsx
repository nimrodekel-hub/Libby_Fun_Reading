import LetterCard from './LetterCard';

export default function MagicMirror({ card, phase, showHint, playAudio }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Mirror frame */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-[-16px] rounded-[2.5rem] bg-gradient-to-br from-purple-300 via-pink-200 to-amber-200 blur-xl opacity-60 animate-pulse-slow" />

        {/* Mirror border */}
        <div className="relative bg-gradient-to-br from-purple-200 via-white to-pink-200
                        border-4 border-purple-300 rounded-[2.5rem] p-4 shadow-2xl">
          {/* Title */}
          <div className="text-center mb-3">
            <span className="text-lg font-black font-rubik text-purple-600 drop-shadow-sm">
              🪞 הַמַּרְאָה הַקְּסוּמָה
            </span>
          </div>

          {/* Card area */}
          <div className="flex items-center justify-center min-h-[380px] min-w-[300px]">
            {card
              ? <LetterCard card={card} phase={phase} showHint={showHint} playAudio={playAudio} />
              : (
                <div className="text-center text-purple-300 text-5xl animate-pulse-slow">
                  ✨
                </div>
              )
            }
          </div>

          {/* Instruction */}
          <p className="mt-4 text-center text-sm font-semibold font-assistant text-purple-500 leading-relaxed">
            לְאֵיזֶה יוּנִיקוֹרן שַׁיֶּכֶת הָאוֹת הַזֹּאת?<br />
            לְחֲצִי עַל הַיּוּנִיקוֹרן הַנָּכוֹן! 🦄
          </p>
        </div>

        {/* Corner decorations */}
        {['top-0 right-0','top-0 left-0','bottom-0 right-0','bottom-0 left-0'].map((pos, i) => (
          <span key={i} className={`absolute ${pos} text-2xl -translate-x-1 translate-y-1 pointer-events-none`}>
            {['⭐','🌟','💫','✨'][i]}
          </span>
        ))}
      </div>
    </div>
  );
}
