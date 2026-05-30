export const NIKUD_META = {
  KAMATZ: { id: 'KAMATZ', name: 'קָמָץ',   symbol: 'ָ',  group: 'A', groupLabel: 'צְלִיל אָ' },
  PATACH: { id: 'PATACH', name: 'פַּתָח',  symbol: 'ַ',  group: 'A', groupLabel: 'צְלִיל אָ' },
  SEGOL:  { id: 'SEGOL',  name: 'סֶגּוֹל', symbol: 'ֶ',  group: 'E', groupLabel: 'צְלִיל אֶ' },
  TZERE:  { id: 'TZERE',  name: 'צֵירֵי',  symbol: 'ֵ',  group: 'E', groupLabel: 'צְלִיל אֶ' },
  HIRIK:  { id: 'HIRIK',  name: 'חִירִיק', symbol: 'ִ',  group: 'I', groupLabel: 'צְלִיל אִ' },
  HOLAM:  { id: 'HOLAM',  name: 'חוֹלָם',  symbol: 'ֹ',  group: 'O', groupLabel: 'צְלִיל אֹ' },
  KUBUTZ: { id: 'KUBUTZ', name: 'קֻבּוּץ', symbol: 'ֻ',  group: 'U', groupLabel: 'צְלִיל אֻ' },
};

export const NIKUD_ORDER = ['KAMATZ', 'PATACH', 'SEGOL', 'TZERE', 'HIRIK', 'HOLAM', 'KUBUTZ'];

export const LETTER_LESSONS = [
  {
    id: 'bet', base: 'בּ', name: 'בֵּית', emoji: '🏠',
    nikud: {
      KAMATZ: { display: 'בָּ', phonetic: 'בָּ',  example: 'בָּצָל 🧅' },
      PATACH: { display: 'בַּ', phonetic: 'בַּ',  example: 'בַּיִת 🏠' },
      SEGOL:  { display: 'בֶּ', phonetic: 'בֶּ',  example: 'בֶּגֶד 👗' },
      TZERE:  { display: 'בֵּ', phonetic: 'בֵּ',  example: 'בֵּית סֵפֶר 🏫' },
      HIRIK:  { display: 'בִּ', phonetic: 'בִּ',  example: 'בִּינְגוֹ 📋' },
      HOLAM:  { display: 'בֹּ', phonetic: 'בֹּ',  example: 'בֹּקֶר 🌅' },
      KUBUTZ: { display: 'בֻּ', phonetic: 'בֻּ',  example: 'בֻּבָּה 🪆' },
    },
  },
  {
    id: 'mem', base: 'מ', name: 'מֵם', emoji: '👸',
    nikud: {
      KAMATZ: { display: 'מָ', phonetic: 'מָ',  example: 'מָגֵן 🛡️' },
      PATACH: { display: 'מַ', phonetic: 'מַ',  example: 'מַלְכָּה 👸' },
      SEGOL:  { display: 'מֶ', phonetic: 'מֶ',  example: 'מֶלֶךְ 🤴' },
      TZERE:  { display: 'מֵ', phonetic: 'מֵ',  example: 'מֵאָה 💯' },
      HIRIK:  { display: 'מִ', phonetic: 'מִ',  example: 'מִיץ 🥤' },
      HOLAM:  { display: 'מֹ', phonetic: 'מֹ',  example: 'מֹחַ 🧠' },
      KUBUTZ: { display: 'מֻ', phonetic: 'מֻ',  example: 'מֻסִיקָה 🎵' },
    },
  },
  {
    id: 'dalet', base: 'ד', name: 'דָּלֶת', emoji: '🚪',
    nikud: {
      KAMATZ: { display: 'דָּ', phonetic: 'דָּ',  example: 'דָּג 🐟' },
      PATACH: { display: 'דַּ', phonetic: 'דַּ',  example: 'דַּלְיָה 🌸' },
      SEGOL:  { display: 'דֶּ', phonetic: 'דֶּ',  example: 'דֶּלֶת 🚪' },
      TZERE:  { display: 'דֵּ', phonetic: 'דֵּ',  example: 'דֵּקֶל 🌴' },
      HIRIK:  { display: 'דִּ', phonetic: 'דִּ',  example: 'דִּינוֹזָאוּר 🦕' },
      HOLAM:  { display: 'דֹּ', phonetic: 'דֹּ',  example: 'דֹּב 🐻' },
      KUBUTZ: { display: 'דֻּ', phonetic: 'דֻּ',  example: 'דֻּבּוֹן 🧸' },
    },
  },
  {
    id: 'samech', base: 'ס', name: 'סָמֶךְ', emoji: '📚',
    nikud: {
      KAMATZ: { display: 'סָ', phonetic: 'סָ',  example: 'סָבָא 👴' },
      PATACH: { display: 'סַ', phonetic: 'סַ',  example: 'סַל 🧺' },
      SEGOL:  { display: 'סֶ', phonetic: 'סֶ',  example: 'סֶרֶט 🎬' },
      TZERE:  { display: 'סֵ', phonetic: 'סֵ',  example: 'סֵפֶר 📖' },
      HIRIK:  { display: 'סִ', phonetic: 'סִ',  example: 'סִירָה ⛵' },
      HOLAM:  { display: 'סֹ', phonetic: 'סֹ',  example: 'סֹד 🤫' },
      KUBUTZ: { display: 'סֻ', phonetic: 'סֻ',  example: 'סֻכָּה 🛖' },
    },
  },
  {
    id: 'lamed', base: 'ל', name: 'לָמֶד', emoji: '❤️',
    nikud: {
      KAMATZ: { display: 'לָ', phonetic: 'לָ',  example: 'לָבָן 🤍' },
      PATACH: { display: 'לַ', phonetic: 'לַ',  example: 'לַיְלָה 🌙' },
      SEGOL:  { display: 'לֶ', phonetic: 'לֶ',  example: 'לֶחֶם 🍞' },
      TZERE:  { display: 'לֵ', phonetic: 'לֵ',  example: 'לֵב ❤️' },
      HIRIK:  { display: 'לִ', phonetic: 'לִ',  example: 'לִוְיָתָן 🐋' },
      HOLAM:  { display: 'לֹ', phonetic: 'לֹ',  example: 'לֹא ❌' },
      KUBUTZ: { display: 'לֻ', phonetic: 'לֻ',  example: 'לֻלָב 🌴' },
    },
  },
  {
    id: 'kaf', base: 'כּ', name: 'כַּף', emoji: '⚽',
    nikud: {
      KAMATZ: { display: 'כָּ', phonetic: 'כָּ',  example: 'כָּלָה 👰' },
      PATACH: { display: 'כַּ', phonetic: 'כַּ',  example: 'כַּדּוּר ⚽' },
      SEGOL:  { display: 'כֶּ', phonetic: 'כֶּ',  example: 'כֶּבֶשׂ 🐑' },
      TZERE:  { display: 'כֵּ', phonetic: 'כֵּ',  example: 'כֵּלֶב 🐕' },
      HIRIK:  { display: 'כִּ', phonetic: 'כִּ',  example: 'כִּינּוֹר 🎻' },
      HOLAM:  { display: 'כֹּ', phonetic: 'כֹּ',  example: 'כֹּחַ 💪' },
      KUBUTZ: { display: 'כֻּ', phonetic: 'כֻּ',  example: 'כֻּסְבָּרָה 🌿' },
    },
  },
  {
    id: 'nun', base: 'נ', name: 'נוּן', emoji: '🕯️',
    nikud: {
      KAMATZ: { display: 'נָ', phonetic: 'נָ',  example: 'נָחָשׁ 🐍' },
      PATACH: { display: 'נַ', phonetic: 'נַ',  example: 'נַעַל 👟' },
      SEGOL:  { display: 'נֶ', phonetic: 'נֶ',  example: 'נֶשֶׁר 🦅' },
      TZERE:  { display: 'נֵ', phonetic: 'נֵ',  example: 'נֵר 🕯️' },
      HIRIK:  { display: 'נִ', phonetic: 'נִ',  example: 'נִינְג׳ָה 🥷' },
      HOLAM:  { display: 'נֹ', phonetic: 'נֹ',  example: 'נוֹצָה 🪶' },
      KUBUTZ: { display: 'נֻ', phonetic: 'נֻ',  example: 'נֶתֶק 🔌' },
    },
  },
  {
    id: 'shin', base: 'שׁ', name: 'שִׁין', emoji: '☀️',
    nikud: {
      KAMATZ: { display: 'שָׁ', phonetic: 'שָׁ',  example: 'שָׁמַיִם ☁️' },
      PATACH: { display: 'שַׁ', phonetic: 'שַׁ',  example: 'שַׁרְבִיט 🪄' },
      SEGOL:  { display: 'שֶׁ', phonetic: 'שֶׁ',  example: 'שֶׁמֶשׁ 🌞' },
      TZERE:  { display: 'שֵׁ', phonetic: 'שֵׁ',  example: 'שֵׁן 🦷' },
      HIRIK:  { display: 'שִׁ', phonetic: 'שִׁ',  example: 'שִׁיר 🎶' },
      HOLAM:  { display: 'שֹׁ', phonetic: 'שֹׁ',  example: 'שׁוֹקוֹ 🍫' },
      KUBUTZ: { display: 'שֻׁ', phonetic: 'שֻׁ',  example: 'שֻׁלְחָן 🍽️' },
    },
  },
];

/**
 * Pick 4 sound-distinct options: one representative per group.
 * KAMATZ/PATACH sound identical, as do SEGOL/TZERE — so we never
 * put both from the same group as separate options.
 * Priority: always contrast A↔E since that's the core learning goal.
 */
function makeOptions(lesson, targetType) {
  const targetGroup = NIKUD_META[targetType].group;

  // Groups to use as distractors — exclude the target's own group.
  // Always put the "opposite" group (A↔E) first so it's always included.
  const opposite = targetGroup === 'A' ? 'E' : targetGroup === 'E' ? 'A' : null;
  const others   = ['A', 'E', 'I', 'O', 'U']
    .filter(g => g !== targetGroup)
    .sort((a, b) => {
      if (a === opposite) return -1;
      if (b === opposite) return 1;
      return Math.random() - 0.5;
    })
    .slice(0, 3); // 3 distractors → 4 options total

  const distractors = others.map(group => {
    const candidates = NIKUD_ORDER.filter(t => NIKUD_META[t].group === group);
    return candidates[Math.floor(Math.random() * candidates.length)];
  });

  return [targetType, ...distractors]
    .sort(() => Math.random() - 0.5)
    .map(type => ({
      nikudType: type,
      display:   lesson.nikud[type].display,
      example:   lesson.nikud[type].example,
      isCorrect: type === targetType,
      lessonId:  lesson.id,
    }));
}

/** Generate 3 quiz questions per lesson: one A, one E, one from I/O/U */
export function generateQuestions(lesson) {
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const targets = [
    pick(['KAMATZ', 'PATACH']),
    pick(['SEGOL',  'TZERE']),
    pick(['HIRIK',  'HOLAM', 'KUBUTZ']),
  ];
  return targets.map((targetType, i) => ({
    id:         `${lesson.id}-q${i + 1}`,
    lessonId:   lesson.id,
    targetType,
    target:     lesson.nikud[targetType],
    options:    makeOptions(lesson, targetType),
  }));
}

export function shuffleLessons() {
  return [...LETTER_LESSONS].sort(() => Math.random() - 0.5);
}
