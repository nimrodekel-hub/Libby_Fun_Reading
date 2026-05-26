export default function StageUnlock({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/95 rounded-3xl border-4 border-amber-400 shadow-2xl
                      p-10 max-w-md w-full mx-4 text-center font-rubik animate-sparkle">
        {/* Stars rain */}
        {['✨','🌟','💫','⭐','✨','🌟'].map((s, i) => (
          <span
            key={i}
            className="fixed text-3xl animate-star-pop pointer-events-none"
            style={{ left: `${10 + i * 15}%`, top: '10%', animationDelay: `${i * 0.15}s` }}
          >
            {s}
          </span>
        ))}

        <div className="text-8xl mb-4 animate-bounce-slow">🏆</div>
        <h2 className="text-4xl font-black text-amber-700 mb-3">
          כֹּחַ סוּפֶּר, לִיבִּי! 🌟
        </h2>
        <p className="text-2xl font-bold text-purple-700 mb-2">
          פָּתַחְתְּ אֶת שַׁלַב הַמִּילִּים! 🔓📚
        </p>
        <p className="text-base text-purple-400 font-assistant mb-8">
          אַתְּ כָּל כָּךְ חֲכָמָה! עַכְשָׁיו נִלְמַד מִילִּים שְׁלֵמוֹת!
        </p>

        <button
          onClick={onDismiss}
          className="w-full py-4 bg-gradient-to-r from-amber-400 to-pink-500
                     text-white text-2xl font-black rounded-2xl shadow-lg
                     hover:scale-105 active:scale-95 transition-transform"
        >
          קְדִימָה לַמִּילִּים! 🚀
        </button>
      </div>
    </div>
  );
}
