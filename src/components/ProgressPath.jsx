import { STAGE2_THRESHOLD } from '../hooks/useGameState';

export default function ProgressPath({ lifetimeCrowns, stage }) {
  const progress = Math.min(lifetimeCrowns / STAGE2_THRESHOLD, 1);
  const stage2Done = stage >= 2;

  return (
    <div className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border-t-2 border-purple-200">
      <div className="max-w-2xl mx-auto">
        {/* Path row */}
        <div className="relative flex items-center justify-between">

          {/* Track */}
          <div className="absolute inset-y-1/2 left-8 right-8 h-3 -translate-y-1/2 bg-purple-100 rounded-full overflow-hidden border border-purple-200">
            <div
              className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 rounded-full transition-all duration-1000"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Dotted overlay */}
          <div className="absolute inset-y-1/2 left-8 right-8 h-3 -translate-y-1/2 flex items-center justify-around pointer-events-none">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white/60" />
            ))}
          </div>

          {/* Node 1 — Stage 1 (Letters) */}
          <Node
            emoji="🌟"
            label="אוֹתִיּוֹת"
            active
            color="purple"
          />

          {/* Libby's avatar — moves along the path */}
          {stage < 2 && (
            <div
              className="absolute z-20 flex flex-col items-center -translate-x-1/2 transition-all duration-1000"
              style={{ left: `calc(${progress * 80 + 8}%)` }}
            >
              <span className="text-2xl drop-shadow-md animate-bounce-slow">👸</span>
            </div>
          )}

          {/* Node 2 — Stage 2 (Words) */}
          <Node
            emoji={stage2Done ? '📚' : '🔒'}
            label="מִילִּים"
            active={stage2Done}
            color="pink"
            subLabel={!stage2Done ? `עוֹד ${Math.max(0, STAGE2_THRESHOLD - lifetimeCrowns)} 👑` : undefined}
          />

          {/* Node 3 — Castle */}
          <Node
            emoji="🏰"
            label="הַטִּירָה"
            active={false}
            color="amber"
          />
        </div>

        {/* Crown counter */}
        <p className="mt-3 text-center text-sm font-semibold font-assistant text-purple-500">
          👑 {lifetimeCrowns} כְּתָרִים {!stage2Done && `מִתּוֹךְ ${STAGE2_THRESHOLD} לְפִתְיחַת שַׁלַב מִילִּים`}
          {stage2Done && '— שַׁלַב מִילִּים פָּתוּחַ! 🎉'}
        </p>
      </div>
    </div>
  );
}

function Node({ emoji, label, active, color, subLabel }) {
  const ring = {
    purple: active ? 'bg-purple-400 ring-4 ring-purple-200 shadow-purple-200' : 'bg-purple-100 opacity-50',
    pink:   active ? 'bg-pink-400   ring-4 ring-pink-200   shadow-pink-200'   : 'bg-purple-100 opacity-50',
    amber:  active ? 'bg-amber-400  ring-4 ring-amber-200  shadow-amber-200'  : 'bg-purple-100 opacity-30',
  }[color];
  const textColor = {
    purple: active ? 'text-purple-700' : 'text-purple-300',
    pink:   active ? 'text-pink-700'   : 'text-purple-300',
    amber:  active ? 'text-amber-700'  : 'text-purple-300',
  }[color];

  return (
    <div className="relative z-10 flex flex-col items-center gap-1">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg ${ring} transition-all duration-500`}>
        {emoji}
      </div>
      <span className={`text-xs font-bold font-rubik ${textColor}`}>{label}</span>
      {subLabel && <span className="text-xs text-purple-400 font-assistant">{subLabel}</span>}
    </div>
  );
}
