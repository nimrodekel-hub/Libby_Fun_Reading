import { useState } from 'react';

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function MathGate({ onSuccess, onCancel }) {
  const [[num1, num2]] = useState(() => [rand(10, 20), rand(5, 13)]);
  const [answer, setAnswer]   = useState('');
  const [shaking, setShaking] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (parseInt(answer, 10) === num1 + num2) {
      onSuccess();
    } else {
      setShaking(true);
      setAnswer('');
      setTimeout(() => setShaking(false), 500);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border-4 border-purple-300 shadow-2xl
                      p-8 max-w-sm w-full mx-4 text-center font-rubik">
        <div className="text-6xl mb-3">🔐</div>
        <h2 className="text-2xl font-black text-purple-800 mb-1">רַק לְהוֹרִים</h2>
        <p className="text-purple-400 font-assistant mb-5 text-sm">
          כְּדֵי לְהֵיכָּנֵס, פִּתְרִי אֶת הַחֶשְׁבּוֹן:
        </p>

        <div className="text-5xl font-black text-purple-700 mb-6 tracking-wide" dir="ltr">
          {num1} + {num2} = ?
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            className={`
              w-full text-center text-4xl font-black border-4 rounded-2xl py-3 mb-5
              outline-none transition-all duration-150 dir-ltr
              ${shaking
                ? 'border-red-400 bg-red-50 animate-shake'
                : 'border-purple-300 focus:border-purple-500 bg-purple-50'}
            `}
            dir="ltr"
            placeholder="?"
            autoFocus
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-2xl border-2 border-purple-200
                         text-purple-500 font-bold hover:bg-purple-50 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500
                         text-white font-black hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              כְּנִיסָה 🚪
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
