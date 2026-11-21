export default function StatusBar({ score, hearts, streak, cardIndex, totalCards, stage }) {
  const maxHearts = 5;

  return (
    <div className="w-full px-4 py-3 flex items-center justify-between
                    bg-white/60 backdrop-blur-md border-b-2 border-magic-lavender-mid
                    rounded-b-3xl shadow-lg font-rubik">

      {/* Hearts */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <span
            key={i}
            className={`text-2xl transition-all duration-300 ${
              i < hearts ? 'opacity-100 drop-shadow-sm' : 'opacity-20 grayscale'
            }`}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Progress + stage badge */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border
            ${stage === 1
              ? 'bg-purple-100 text-purple-600 border-purple-300'
              : 'bg-pink-100   text-pink-600   border-pink-300'}`}>
            {stage === 1 ? '🌟 שלב 1' : '📚 שלב 2'}
          </span>
          <span className="text-xs font-semibold text-purple-500">
            {cardIndex} / {totalCards}
          </span>
        </div>
        <div className="w-32 h-3 bg-purple-100 rounded-full overflow-hidden border border-purple-200">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
            style={{ width: `${totalCards > 0 ? (cardIndex / totalCards) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Score + streak */}
      <div className="flex items-center gap-2">
        {streak >= 3 && (
          <span className="text-sm font-bold text-orange-500 animate-bounce-slow">
            🔥 ×{streak}
          </span>
        )}
        <div className="flex items-center gap-1 bg-magic-gold/60 px-3 py-1 rounded-full border border-amber-300">
          <span className="text-xl">👑</span>
          <span className="text-lg font-black text-amber-700">{score}</span>
        </div>
      </div>
    </div>
  );
}
