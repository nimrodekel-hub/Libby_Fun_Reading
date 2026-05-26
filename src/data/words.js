/** Stage 2 — full word cards (unlocked after STAGE2_THRESHOLD crowns). */

export const WORD_CARDS = [
  // ── PATACH  (A-sound) ─────────────────────────────────────
  {
    id: 'word-bayit',   cardType: 'word', nikudType: 'PATACH',
    letter: 'בּ',
    display: 'בַּיִת',   phonetic: 'בַּיִת (BA-yit)',
    exampleWord: 'בַּיִת', exampleMeaning: 'בַּיִת 🏠',
    audioPath: '/audio/word-bayit.mp3', vowelGroup: 'A',
  },
  {
    id: 'word-malka',   cardType: 'word', nikudType: 'PATACH',
    letter: 'מ',
    display: 'מַלְכָּה', phonetic: 'מַלְכָּה (MAL-ka)',
    exampleWord: 'מַלְכָּה', exampleMeaning: 'מַלְכָּה 👸',
    audioPath: '/audio/word-malka.mp3', vowelGroup: 'A',
  },
  {
    id: 'word-kadur',   cardType: 'word', nikudType: 'PATACH',
    letter: 'כּ',
    display: 'כַּדּוּר', phonetic: 'כַּדּוּר (KA-dur)',
    exampleWord: 'כַּדּוּר', exampleMeaning: 'כַּדּוּר ⚽',
    audioPath: '/audio/word-kadur.mp3', vowelGroup: 'A',
  },
  {
    id: 'word-tapuach', cardType: 'word', nikudType: 'PATACH',
    letter: 'תּ',
    display: 'תַּפּוּחַ', phonetic: 'תַּפּוּחַ (ta-PU-ach)',
    exampleWord: 'תַּפּוּחַ', exampleMeaning: 'תַּפּוּחַ 🍎',
    audioPath: '/audio/word-tapuach.mp3', vowelGroup: 'A',
  },
  {
    id: 'word-shamesh', cardType: 'word', nikudType: 'PATACH',
    letter: 'שׁ',
    display: 'שַׁמֶּשׁ', phonetic: 'שַׁמֶּשׁ (SHA-mesh)',
    exampleWord: 'שַׁמֶּשׁ', exampleMeaning: 'שַׁמֶּשׁ ☀️',
    audioPath: '/audio/word-shamesh.mp3', vowelGroup: 'A',
  },
  // ── KAMATZ  (A-sound) ─────────────────────────────────────
  {
    id: 'word-dag',     cardType: 'word', nikudType: 'KAMATZ',
    letter: 'ד',
    display: 'דָּג',    phonetic: 'דָּג (DAG)',
    exampleWord: 'דָּג', exampleMeaning: 'דָּג 🐟',
    audioPath: '/audio/word-dag.mp3', vowelGroup: 'A',
  },
  {
    id: 'word-saba',    cardType: 'word', nikudType: 'KAMATZ',
    letter: 'ס',
    display: 'סָבָא',   phonetic: 'סָבָא (SA-ba)',
    exampleWord: 'סָבָא', exampleMeaning: 'סָבָא 👴',
    audioPath: '/audio/word-saba.mp3', vowelGroup: 'A',
  },
  {
    id: 'word-shamayim',cardType: 'word', nikudType: 'KAMATZ',
    letter: 'שׁ',
    display: 'שָׁמַיִם', phonetic: 'שָׁמַיִם (sha-MA-yim)',
    exampleWord: 'שָׁמַיִם', exampleMeaning: 'שָׁמַיִם 🌈',
    audioPath: '/audio/word-shamayim.mp3', vowelGroup: 'A',
  },
  {
    id: 'word-yad',     cardType: 'word', nikudType: 'KAMATZ',
    letter: 'י',
    display: 'יָד',    phonetic: 'יָד (YAD)',
    exampleWord: 'יָד', exampleMeaning: 'יָד ✋',
    audioPath: '/audio/word-yad.mp3', vowelGroup: 'A',
  },
  // ── SEGOL   (E-sound) ─────────────────────────────────────
  {
    id: 'word-sefer',   cardType: 'word', nikudType: 'SEGOL',
    letter: 'ס',
    display: 'סֶפֶר',  phonetic: 'סֶפֶר (SE-fer)',
    exampleWord: 'סֶפֶר', exampleMeaning: 'סֶפֶר 📚',
    audioPath: '/audio/word-sefer.mp3', vowelGroup: 'E',
  },
  {
    id: 'word-melech',  cardType: 'word', nikudType: 'SEGOL',
    letter: 'מ',
    display: 'מֶלֶךְ',  phonetic: 'מֶלֶךְ (ME-lech)',
    exampleWord: 'מֶלֶךְ', exampleMeaning: 'מֶלֶךְ 🤴',
    audioPath: '/audio/word-melech.mp3', vowelGroup: 'E',
  },
  {
    id: 'word-delet',   cardType: 'word', nikudType: 'SEGOL',
    letter: 'ד',
    display: 'דֶּלֶת',  phonetic: 'דֶּלֶת (DE-let)',
    exampleWord: 'דֶּלֶת', exampleMeaning: 'דֶּלֶת 🚪',
    audioPath: '/audio/word-delet.mp3', vowelGroup: 'E',
  },
  {
    id: 'word-yeled',   cardType: 'word', nikudType: 'SEGOL',
    letter: 'י',
    display: 'יֶלֶד',   phonetic: 'יֶלֶד (YE-led)',
    exampleWord: 'יֶלֶד', exampleMeaning: 'יֶלֶד 👦',
    audioPath: '/audio/word-yeled.mp3', vowelGroup: 'E',
  },
  {
    id: 'word-keshet',  cardType: 'word', nikudType: 'SEGOL',
    letter: 'ק',
    display: 'קֶשֶׁת',  phonetic: 'קֶשֶׁת (KE-shet)',
    exampleWord: 'קֶשֶׁת', exampleMeaning: 'קֶשֶׁת 🏹',
    audioPath: '/audio/word-keshet.mp3', vowelGroup: 'E',
  },
  // ── TZERE   (E-sound) ─────────────────────────────────────
  {
    id: 'word-beytza',  cardType: 'word', nikudType: 'TZERE',
    letter: 'בּ',
    display: 'בֵּיצָה', phonetic: 'בֵּיצָה (BEI-tza)',
    exampleWord: 'בֵּיצָה', exampleMeaning: 'בֵּיצָה 🥚',
    audioPath: '/audio/word-beytza.mp3', vowelGroup: 'E',
  },
  {
    id: 'word-lev',     cardType: 'word', nikudType: 'TZERE',
    letter: 'ל',
    display: 'לֵב',     phonetic: 'לֵב (LEV)',
    exampleWord: 'לֵב', exampleMeaning: 'לֵב ❤️',
    audioPath: '/audio/word-lev.mp3', vowelGroup: 'E',
  },
  {
    id: 'word-shem',    cardType: 'word', nikudType: 'TZERE',
    letter: 'שׁ',
    display: 'שֵׁם',    phonetic: 'שֵׁם (SHEM)',
    exampleWord: 'שֵׁם', exampleMeaning: 'שֵׁם 🏷️',
    audioPath: '/audio/word-shem.mp3', vowelGroup: 'E',
  },
  {
    id: 'word-kedev',   cardType: 'word', nikudType: 'TZERE',
    letter: 'כּ',
    display: 'כֵּלֶב',  phonetic: 'כֵּלֶב (KEI-lev)',
    exampleWord: 'כֵּלֶב', exampleMeaning: 'כֵּלֶב 🐕',
    audioPath: '/audio/word-kelev.mp3', vowelGroup: 'E',
  },
];
