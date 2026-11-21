import { useState } from 'react';
import { X, Settings, Mic, BarChart2, RotateCcw } from 'lucide-react';
import RecordingStudio from './RecordingStudio';
import { NIKUD_TYPES } from '../data/letters';

const TABS = [
  { id: 'settings',    label: 'הגדרות',   icon: Settings  },
  { id: 'recordings',  label: 'הַקְלָטוֹת', icon: Mic       },
  { id: 'activity',    label: 'פְּעִילוּת',  icon: BarChart2 },
];

export default function ParentDashboard({
  settings,
  toggleVowelType,
  allTimeStats,
  stage,
  lifetimeCrowns,
  onResetProgress,
  onClose,
}) {
  const [tab, setTab]         = useState('settings');
  const [confirmReset, setConfirmReset] = useState(false);

  const successRate = allTimeStats.attempts > 0
    ? Math.round((allTimeStats.correct / allTimeStats.attempts) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
         dir="rtl">
      <div className="bg-white rounded-3xl border-4 border-purple-300 shadow-2xl
                      w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden font-rubik">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div>
            <h2 className="text-xl font-black text-purple-800">⚙️ לוח בקרת ההורים</h2>
            <p className="text-xs text-purple-400 font-assistant">כלים לניהול הלמידה של ליבי</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-purple-100 text-purple-500 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-purple-100 bg-white">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors
                ${tab === id
                  ? 'text-purple-700 border-b-2 border-purple-500 bg-purple-50'
                  : 'text-purple-400 hover:text-purple-600 hover:bg-purple-50'}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── Settings tab ─────────────────────────────── */}
          {tab === 'settings' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-base font-black text-purple-700 mb-3">
                  🎯 בחרי אילו ניקוד ללמד היום
                </h3>
                <p className="text-xs text-purple-400 font-assistant mb-4">
                  חייבת להישאר לפחות קבוצה אחת מכל צליל (אָ + אֶ).
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(NIKUD_TYPES).map(nikud => {
                    const active = settings.activeVowelTypes.includes(nikud.id);
                    const isA    = nikud.group === 'A';
                    return (
                      <button
                        key={nikud.id}
                        onClick={() => toggleVowelType(nikud.id)}
                        className={`
                          flex flex-col items-center gap-1 p-4 rounded-2xl border-2 transition-all
                          ${active
                            ? isA
                              ? 'bg-amber-100 border-amber-400 text-amber-800'
                              : 'bg-pink-100  border-pink-400   text-pink-800'
                            : 'bg-gray-50 border-gray-200 text-gray-400'}
                        `}
                      >
                        <span className="text-3xl font-black font-rubik" style={{ lineHeight: '3rem' }}>
                          {nikud.symbol ? `א${nikud.symbol}` : 'א'}
                        </span>
                        <span className="text-sm font-bold">{nikud.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold
                          ${active ? (isA ? 'bg-amber-200 text-amber-700' : 'bg-pink-200 text-pink-700') : 'bg-gray-200 text-gray-500'}`}>
                          {active ? 'פָּעִיל ✓' : 'כָּבוּי'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* ── Recordings tab ────────────────────────────── */}
          {tab === 'recordings' && <RecordingStudio />}

          {/* ── Activity tab ──────────────────────────────── */}
          {tab === 'activity' && (
            <div className="space-y-6">
              {/* Stats */}
              <section>
                <h3 className="text-base font-black text-purple-700 mb-4">📊 סטטיסטיקות</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Stat label="ניסיונות" value={allTimeStats.attempts} emoji="🎮" color="purple" />
                  <Stat label="תשובות נכונות" value={allTimeStats.correct} emoji="✅" color="green" />
                  <Stat label="אחוז הצלחה" value={`${successRate}%`} emoji="🌟" color="amber" />
                  <Stat label="כתרים" value={lifetimeCrowns} emoji="👑" color="pink" />
                </div>
              </section>

              {/* Stage info */}
              <section className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                <p className="text-sm font-bold text-purple-700 mb-1">שלב נוכחי</p>
                <p className="text-2xl font-black text-purple-800">
                  {stage === 1 ? '🌟 שלב 1 — אוֹתִיּוֹת' : '📚 שלב 2 — מִילִּים'}
                </p>
              </section>

              {/* Reset */}
              <section>
                <h3 className="text-base font-black text-purple-700 mb-3">🔄 איפוס התקדמות</h3>
                {!confirmReset ? (
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-red-300
                               text-red-500 font-bold hover:bg-red-50 transition-colors text-sm"
                  >
                    <RotateCcw size={16} /> אפס כתרים, שלב, וסטטיסטיקות
                  </button>
                ) : (
                  <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 space-y-3">
                    <p className="text-sm font-bold text-red-600">
                      האם את בטוחה? פעולה זו תמחק את כל ההתקדמות של ליבי!
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="flex-1 py-2 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50"
                      >
                        ביטול
                      </button>
                      <button
                        onClick={() => { onResetProgress(); setConfirmReset(false); onClose(); }}
                        className="flex-1 py-2 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600"
                      >
                        כן, אפסי 🗑️
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, emoji, color }) {
  const bg = { purple:'bg-purple-50 border-purple-200 text-purple-700',
                green: 'bg-green-50  border-green-200  text-green-700',
                amber: 'bg-amber-50  border-amber-200  text-amber-700',
                pink:  'bg-pink-50   border-pink-200   text-pink-700' }[color];
  return (
    <div className={`flex flex-col items-center p-4 rounded-2xl border-2 ${bg}`}>
      <span className="text-3xl mb-1">{emoji}</span>
      <span className="text-2xl font-black">{value}</span>
      <span className="text-xs font-semibold font-assistant">{label}</span>
    </div>
  );
}
