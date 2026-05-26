export default function StatusBar({ score, hearts, streak, cardIndex, totalCards }) {
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

      {/* Progress */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-semibold text-purple-500">
          {cardIndex} / {totalCards} כרטיסים
        </span>
        <div className="w-32 h-3 bg-purple-100 rounded-full overflow-hidden border border-purple-200">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
            style={{ width: `${(cardIndex / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Score + Streak */}
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
