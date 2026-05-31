// Sound-practice curriculum for the three sibilants Libby substitutes: ס /s/, שׁ /ʃ/, צ /ts/.
//
// Design grounded in evidence-based speech practice (see research notes in repo history):
//   • Perception-first: auditory discrimination before production (Van Riper ear-training).
//   • Minimal/contrastive pairs — the substitution contrast (sa/sha/tsa) is the core drill.
//   • Practice hierarchy: meet the sound → listen & discriminate → word → sentence.
//   • Child-friendly placement metaphors SLPs use (snake / quiet / sneeze).
//   • Carrier sentences for generalization to connected speech.
//
// NOTE: the app never auto-grades the child's *production* (speech recognition is
// unreliable for young/disordered speech). It grades only the listening games and
// uses record-and-compare + self-rating for production practice.

export const SOUND_TARGETS = [
  {
    id: 'samekh',
    letter: 'ס',
    sound: 's',
    emoji: '🐴',
    color: 'emerald',
    nickname: 'הַסּוּס',
    hiss: 'סּסּסּסּ',
    sampleSyllable: 'סָה',
    cue: 'שִׁינַיִם מְחַיְּכוֹת 😬 וְהַלָּשׁוֹן מִסְתַּתֶּרֶת מֵאֲחוֹרֵי הַשִּׁינַיִם. הָאֲוִיר יוֹצֵא חָלָק: סּסּסּ',
    tip: 'חִיּוּךְ גָּדוֹל, שִׁינַיִם סְגוּרוֹת קְצָת, וְהַלָּשׁוֹן לֹא יוֹצֵאת הַחוּצָה — כְּמוֹ סוּס שֶׁרָץ: סּסּסּ.',
    words: [
      { text: 'סוּס',      emoji: '🐴' },
      { text: 'סַבְתָּא',  emoji: '👵' },
      { text: 'סִירָה',    emoji: '⛵' },
      { text: 'סֵפֶר',     emoji: '📖' },
      { text: 'סַל',       emoji: '🧺' },
      { text: 'סֻכָּרִיָּה', emoji: '🍬' },
    ],
    sentences: [
      'אֲנִי רוֹאָה סוּס 🐴',
      'סָבָא סוֹחֵב סַל סָגֹל 🧺',
      'הַסּוּס שֶׁל סַבְתָּא רָץ מַהֵר 🐴',
    ],
  },
  {
    id: 'shin',
    letter: 'שׁ',
    sound: 'sh',
    emoji: '🤫',
    color: 'pink',
    nickname: 'הַשֶּׁקֶט',
    hiss: 'שּׁשּׁשּׁ',
    sampleSyllable: 'שָׁה',
    cue: 'שְׂפָתַיִם יוֹצְאוֹת קָדִימָה כְּמוֹ נְשִׁיקָה 😗 וְאֶצְבַּע עַל הַפֶּה — שּׁשּׁשּׁ, שֶׁקֶט!',
    tip: 'דַּמְיְנִי שֶׁאַתְּ מְבַקֶּשֶׁת שֶׁקֶט: שּׁׁׁׁ. הַשְּׂפָתַיִם עֲגֻלּוֹת וְקָדִימָה, לֹא חִיּוּךְ.',
    words: [
      { text: 'שֶׁמֶשׁ', emoji: '☀️' },
      { text: 'שׁוֹקוֹ', emoji: '🍫' },
      { text: 'שָׁעוֹן', emoji: '⌚' },
      { text: 'שֵׁן',    emoji: '🦷' },
      { text: 'שָׁפָן',  emoji: '🐰' },
      { text: 'שֶׁלֶג',  emoji: '❄️' },
    ],
    sentences: [
      'אֲנִי רוֹאָה שֶׁמֶשׁ ☀️',
      'שׁוֹשַׁנָּה שׁוֹתָה שׁוֹקוֹ 🍫',
      'הַשָּׁפָן שֶׁלִּי אוֹהֵב שֶׁלֶג ❄️',
    ],
  },
  {
    id: 'tsadi',
    letter: 'צ',
    sound: 'ts',
    emoji: '🤧',
    color: 'violet',
    nickname: 'הָעִיטּוּשׁ',
    hiss: 'צְצְצְ',
    sampleSyllable: 'צָה',
    cue: 'אוֹמְרִים T וּמִיָּד מַחְלִיקִים לְ-S, מַהֵר מְאוֹד: טְס! כְּמוֹ סוֹף שֶׁל עִיטּוּשׁ — אַפְּצְ! 🤧',
    tip: 'נַסִּי לוֹמַר "טְס" מָהִיר מְאוֹד. אֶפְשָׁר לְהַרְגִּישׁ קְצָת אֲוִיר קוֹפֵץ עַל הַיָּד.',
    words: [
      { text: 'צִפּוֹר',   emoji: '🐦' },
      { text: 'צָב',       emoji: '🐢' },
      { text: 'צַלַּחַת',  emoji: '🍽️' },
      { text: 'צֶמֶר',     emoji: '🧶' },
      { text: 'צָהֹב',     emoji: '💛' },
      { text: 'צִיּוּר',   emoji: '🎨' },
    ],
    sentences: [
      'אֲנִי רוֹאָה צִפּוֹר 🐦',
      'הַצָּב צוֹעֵד לְאַט 🐢',
      'צִפּוֹר צְהֻבָּה צוֹבַעַת צִיּוּר 🎨',
    ],
  },
];

export function getTarget(id) {
  return SOUND_TARGETS.find(t => t.id === id) ?? null;
}

const TEXT_ONLY = /[^֐-׿\s]/g;
export function stripEmoji(s) {
  return s.replace(TEXT_ONLY, '').trim();
}

/**
 * Build a shuffled set of auditory-discrimination rounds.
 * Perception-first: the child hears a syllable/word and taps the matching letter
 * (or picture). The app plays the cue and KNOWS the answer, so grading is exact —
 * unlike production, which we never auto-grade.
 *
 * Two round types, mixed (random practice > blocked for generalization):
 *   - 'syllable': hear סָה / שָׁה / צָה → pick the letter        (pure contrast)
 *   - 'word':     hear a word         → pick the matching picture (word level)
 */
export function buildDiscriminationRounds(count = 8) {
  const letters = SOUND_TARGETS.map(t => ({ id: t.id, letter: t.letter, emoji: t.emoji }));
  const rounds = [];

  for (let i = 0; i < count; i++) {
    const target = SOUND_TARGETS[i % SOUND_TARGETS.length];
    const useWord = i % 2 === 1; // alternate, then we shuffle

    if (useWord) {
      const word = target.words[Math.floor(Math.random() * target.words.length)];
      // distractors: one word from each other sound
      const distractors = SOUND_TARGETS
        .filter(t => t.id !== target.id)
        .map(t => {
          const w = t.words[Math.floor(Math.random() * t.words.length)];
          return { key: `${t.id}-${w.text}`, emoji: w.emoji, label: stripEmoji(w.text), correct: false };
        });
      const correctOpt = { key: `${target.id}-${word.text}`, emoji: word.emoji, label: stripEmoji(word.text), correct: true };
      rounds.push({
        type: 'word',
        prompt: stripEmoji(word.text),
        speak: stripEmoji(word.text),
        targetId: target.id,
        options: shuffle([correctOpt, ...distractors]),
      });
    } else {
      const options = shuffle(letters.map(l => ({
        key: l.id, emoji: l.emoji, label: l.letter, correct: l.id === target.id,
      })));
      rounds.push({
        type: 'syllable',
        prompt: target.sampleSyllable,
        speak: target.sampleSyllable,
        targetId: target.id,
        options,
      });
    }
  }
  return shuffle(rounds);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
