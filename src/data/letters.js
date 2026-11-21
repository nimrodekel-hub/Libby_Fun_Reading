/**
 * Hebrew vowel (nikud) database for Libby's Reading Kingdom.
 *
 * vowelGroup:
 *   "A" = Kamatz (ָ) or Patach (ַ) — open-mouth "AH" sound
 *   "E" = Segol (ֶ) or Tzere (ֵ) — wide-smile "EH" sound
 *
 * nikudName: display name shown to child
 * nikudSymbol: the Unicode combining character for the vowel alone
 */

export const VOWEL_GROUPS = {
  A: {
    id: 'A',
    label: 'קָמָץ / פַּתָח',
    sound: 'אָ',
    hint: 'פּוֹתְחִים אֶת הַפֶּה גָּדוֹל! 😮',
    color: 'gold',
    gradientFrom: 'from-yellow-300',
    gradientTo:   'to-amber-400',
    borderColor:  'border-amber-400',
    bgLight:      'bg-yellow-50',
    textColor:    'text-amber-700',
    unicornEmoji: '🦄',
    unicornName:  'יוּנִיקוֹרן הַזָּהָב',
    unicornColor: '#F59E0B',
  },
  E: {
    id: 'E',
    label: 'סֶגּוֹל / צֵירֵי',
    sound: 'אֶ',
    hint: 'עוֹשִׂים חִיּוּךְ רָחָב! 😁',
    color: 'pink',
    gradientFrom: 'from-pink-300',
    gradientTo:   'to-fuchsia-400',
    borderColor:  'border-pink-400',
    bgLight:      'bg-pink-50',
    textColor:    'text-pink-700',
    unicornEmoji: '🦄',
    unicornName:  'יוּנִיקוֹרן הַוָּרֹד',
    unicornColor: '#EC4899',
  },
};

export const NIKUD_TYPES = {
  KAMATZ:  { id: 'KAMATZ',  name: 'קָמָץ',  symbol: 'ָ', group: 'A' },
  PATACH:  { id: 'PATACH',  name: 'פַּתָח', symbol: 'ַ', group: 'A' },
  SEGOL:   { id: 'SEGOL',   name: 'סֶגּוֹל', symbol: 'ֶ', group: 'E' },
  TZERE:   { id: 'TZERE',   name: 'צֵירֵי',  symbol: 'ֵ', group: 'E' },
};

// Each card: { id, letter, nikudType, display, phonetic, exampleWord, exampleMeaning, audioPath, vowelGroup }
export const LETTER_CARDS = [
  // ── KAMATZ (A) ──────────────────────────────────────────────
  {
    id: 'ba-kamatz',
    letter: 'בּ',
    nikudType: 'KAMATZ',
    display: 'בָּ',
    phonetic: 'בָּ (BA)',
    exampleWord: 'בָּיִת',
    exampleMeaning: 'בַּיִת 🏠',
    audioPath: '/audio/ba-kamatz.mp3',
    vowelGroup: 'A',
  },
  {
    id: 'ma-kamatz',
    letter: 'מ',
    nikudType: 'KAMATZ',
    display: 'מָ',
    phonetic: 'מָ (MA)',
    exampleWord: 'מָגֵן',
    exampleMeaning: 'מָגֵן 🛡️',
    audioPath: '/audio/ma-kamatz.mp3',
    vowelGroup: 'A',
  },
  {
    id: 'da-kamatz',
    letter: 'ד',
    nikudType: 'KAMATZ',
    display: 'דָּ',
    phonetic: 'דָּ (DA)',
    exampleWord: 'דָּג',
    exampleMeaning: 'דָּג 🐟',
    audioPath: '/audio/da-kamatz.mp3',
    vowelGroup: 'A',
  },
  {
    id: 'sa-kamatz',
    letter: 'ס',
    nikudType: 'KAMATZ',
    display: 'סָ',
    phonetic: 'סָ (SA)',
    exampleWord: 'סָבָא',
    exampleMeaning: 'סָבָא 👴',
    audioPath: '/audio/sa-kamatz.mp3',
    vowelGroup: 'A',
  },
  {
    id: 'la-kamatz',
    letter: 'ל',
    nikudType: 'KAMATZ',
    display: 'לָ',
    phonetic: 'לָ (LA)',
    exampleWord: 'לָבָן',
    exampleMeaning: 'לָבָן 🤍',
    audioPath: '/audio/la-kamatz.mp3',
    vowelGroup: 'A',
  },
  // ── PATACH (A) ───────────────────────────────────────────────
  {
    id: 'ba-patach',
    letter: 'בּ',
    nikudType: 'PATACH',
    display: 'בַּ',
    phonetic: 'בַּ (BA)',
    exampleWord: 'בַּיִת',
    exampleMeaning: 'בַּיִת 🏠',
    audioPath: '/audio/ba-patach.mp3',
    vowelGroup: 'A',
  },
  {
    id: 'ma-patach',
    letter: 'מ',
    nikudType: 'PATACH',
    display: 'מַ',
    phonetic: 'מַ (MA)',
    exampleWord: 'מַלְכָּה',
    exampleMeaning: 'מַלְכָּה 👸',
    audioPath: '/audio/ma-patach.mp3',
    vowelGroup: 'A',
  },
  {
    id: 'ka-patach',
    letter: 'כּ',
    nikudType: 'PATACH',
    display: 'כַּ',
    phonetic: 'כַּ (KA)',
    exampleWord: 'כַּדּוּר',
    exampleMeaning: 'כַּדּוּר ⚽',
    audioPath: '/audio/ka-patach.mp3',
    vowelGroup: 'A',
  },
  {
    id: 'ta-patach',
    letter: 'תּ',
    nikudType: 'PATACH',
    display: 'תַּ',
    phonetic: 'תַּ (TA)',
    exampleWord: 'תַּפּוּחַ',
    exampleMeaning: 'תַּפּוּחַ 🍎',
    audioPath: '/audio/ta-patach.mp3',
    vowelGroup: 'A',
  },
  {
    id: 'ra-patach',
    letter: 'ר',
    nikudType: 'PATACH',
    display: 'רַ',
    phonetic: 'רַ (RA)',
    exampleWord: 'רַגְלַיִם',
    exampleMeaning: 'רַגְלַיִם 🦵',
    audioPath: '/audio/ra-patach.mp3',
    vowelGroup: 'A',
  },
  // ── SEGOL (E) ────────────────────────────────────────────────
  {
    id: 'be-segol',
    letter: 'בּ',
    nikudType: 'SEGOL',
    display: 'בֶּ',
    phonetic: 'בֶּ (BE)',
    exampleWord: 'בֶּגֶד',
    exampleMeaning: 'בֶּגֶד 👗',
    audioPath: '/audio/be-segol.mp3',
    vowelGroup: 'E',
  },
  {
    id: 'me-segol',
    letter: 'מ',
    nikudType: 'SEGOL',
    display: 'מֶ',
    phonetic: 'מֶ (ME)',
    exampleWord: 'מֶלֶךְ',
    exampleMeaning: 'מֶלֶךְ 🤴',
    audioPath: '/audio/me-segol.mp3',
    vowelGroup: 'E',
  },
  {
    id: 'se-segol',
    letter: 'ס',
    nikudType: 'SEGOL',
    display: 'סֶ',
    phonetic: 'סֶ (SE)',
    exampleWord: 'סֶפֶר',
    exampleMeaning: 'סֶפֶר 📚',
    audioPath: '/audio/se-segol.mp3',
    vowelGroup: 'E',
  },
  {
    id: 'de-segol',
    letter: 'ד',
    nikudType: 'SEGOL',
    display: 'דֶּ',
    phonetic: 'דֶּ (DE)',
    exampleWord: 'דֶּלֶת',
    exampleMeaning: 'דֶּלֶת 🚪',
    audioPath: '/audio/de-segol.mp3',
    vowelGroup: 'E',
  },
  {
    id: 'ke-segol',
    letter: 'כּ',
    nikudType: 'SEGOL',
    display: 'כֶּ',
    phonetic: 'כֶּ (KE)',
    exampleWord: 'כֶּבֶשׂ',
    exampleMeaning: 'כֶּבֶשׂ 🐑',
    audioPath: '/audio/ke-segol.mp3',
    vowelGroup: 'E',
  },
  // ── TZERE (E) ────────────────────────────────────────────────
  {
    id: 'be-tzere',
    letter: 'בּ',
    nikudType: 'TZERE',
    display: 'בֵּ',
    phonetic: 'בֵּ (BEI)',
    exampleWord: 'בֵּיצָה',
    exampleMeaning: 'בֵּיצָה 🥚',
    audioPath: '/audio/be-tzere.mp3',
    vowelGroup: 'E',
  },
  {
    id: 'me-tzere',
    letter: 'מ',
    nikudType: 'TZERE',
    display: 'מֵ',
    phonetic: 'מֵ (MEI)',
    exampleWord: 'מֵימוֹן',
    exampleMeaning: 'מֵי שִׁתִיָּה 💧',
    audioPath: '/audio/me-tzere.mp3',
    vowelGroup: 'E',
  },
  {
    id: 'le-tzere',
    letter: 'ל',
    nikudType: 'TZERE',
    display: 'לֵ',
    phonetic: 'לֵ (LEI)',
    exampleWord: 'לֵב',
    exampleMeaning: 'לֵב ❤️',
    audioPath: '/audio/le-tzere.mp3',
    vowelGroup: 'E',
  },
  {
    id: 'ke-tzere',
    letter: 'כּ',
    nikudType: 'TZERE',
    display: 'כֵּ',
    phonetic: 'כֵּ (KEI)',
    exampleWord: 'כֵּלֶב',
    exampleMeaning: 'כֵּלֶב 🐕',
    audioPath: '/audio/ke-tzere.mp3',
    vowelGroup: 'E',
  },
  {
    id: 're-tzere',
    letter: 'ר',
    nikudType: 'TZERE',
    display: 'רֵ',
    phonetic: 'רֵ (REI)',
    exampleWord: 'רֵיחַ',
    exampleMeaning: 'רֵיחַ 🌸',
    audioPath: '/audio/re-tzere.mp3',
    vowelGroup: 'E',
  },
];

export function getRandomCard(excludeId = null) {
  const pool = excludeId
    ? LETTER_CARDS.filter(c => c.id !== excludeId)
    : LETTER_CARDS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function shuffleDeck() {
  return [...LETTER_CARDS].sort(() => Math.random() - 0.5);
}
