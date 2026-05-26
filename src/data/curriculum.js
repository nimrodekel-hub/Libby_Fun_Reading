/**
 * Full 4-nikud curriculum organised by base letter.
 * Each lesson has KAMATZ, PATACH, SEGOL, TZERE variants.
 */

export const NIKUD_META = {
  KAMATZ: { id: 'KAMATZ', name: 'קָמָץ',  symbol: 'ָ',  group: 'A', groupLabel: 'צְלִיל אָ' },
  PATACH: { id: 'PATACH', name: 'פַּתָח', symbol: 'ַ',  group: 'A', groupLabel: 'צְלִיל אָ' },
  SEGOL:  { id: 'SEGOL',  name: 'סֶגּוֹל', symbol: 'ֶ',  group: 'E', groupLabel: 'צְלִיל אֶ' },
  TZERE:  { id: 'TZERE',  name: 'צֵירֵי',  symbol: 'ֵ',  group: 'E', groupLabel: 'צְלִיל אֶ' },
};

export const LETTER_LESSONS = [
  {
    id: 'bet',  base: 'בּ', name: 'בֵּית', emoji: '🏠',
    nikud: {
      KAMATZ: { display: 'בָּ', phonetic: 'BA',  example: 'בָּנָה 🏗️' },
      PATACH: { display: 'בַּ', phonetic: 'BA',  example: 'בַּיִת 🏠' },
      SEGOL:  { display: 'בֶּ', phonetic: 'BE',  example: 'בֶּגֶד 👗' },
      TZERE:  { display: 'בֵּ', phonetic: 'BEI', example: 'בֵּיצָה 🥚' },
    },
  },
  {
    id: 'mem',  base: 'מ', name: 'מֵם', emoji: '👸',
    nikud: {
      KAMATZ: { display: 'מָ', phonetic: 'MA',  example: 'מָגֵן 🛡️' },
      PATACH: { display: 'מַ', phonetic: 'MA',  example: 'מַלְכָּה 👸' },
      SEGOL:  { display: 'מֶ', phonetic: 'ME',  example: 'מֶלֶךְ 🤴' },
      TZERE:  { display: 'מֵ', phonetic: 'MEI', example: 'מֵי שִׁתִיָּה 💧' },
    },
  },
  {
    id: 'dalet', base: 'ד', name: 'דָּלֶת', emoji: '🚪',
    nikud: {
      KAMATZ: { display: 'דָּ', phonetic: 'DA',  example: 'דָּג 🐟' },
      PATACH: { display: 'דַּ', phonetic: 'DA',  example: 'דַּב 🐻' },
      SEGOL:  { display: 'דֶּ', phonetic: 'DE',  example: 'דֶּלֶת 🚪' },
      TZERE:  { display: 'דֵּ', phonetic: 'DEI', example: 'דֵּעָה 💡' },
    },
  },
  {
    id: 'samech', base: 'ס', name: 'סָמֶךְ', emoji: '📚',
    nikud: {
      KAMATZ: { display: 'סָ', phonetic: 'SA',  example: 'סָבָא 👴' },
      PATACH: { display: 'סַ', phonetic: 'SA',  example: 'סַל 🧺' },
      SEGOL:  { display: 'סֶ', phonetic: 'SE',  example: 'סֶפֶר 📚' },
      TZERE:  { display: 'סֵ', phonetic: 'SEI', example: 'סֵפֶר 📖' },
    },
  },
  {
    id: 'lamed', base: 'ל', name: 'לָמֶד', emoji: '❤️',
    nikud: {
      KAMATZ: { display: 'לָ', phonetic: 'LA',  example: 'לָבָן 🤍' },
      PATACH: { display: 'לַ', phonetic: 'LA',  example: 'לַיְלָה 🌙' },
      SEGOL:  { display: 'לֶ', phonetic: 'LE',  example: 'לֶחֶם 🍞' },
      TZERE:  { display: 'לֵ', phonetic: 'LEI', example: 'לֵב ❤️' },
    },
  },
  {
    id: 'kaf', base: 'כּ', name: 'כַּף', emoji: '⚽',
    nikud: {
      KAMATZ: { display: 'כָּ', phonetic: 'KA',  example: 'כָּבוֹד 🌟' },
      PATACH: { display: 'כַּ', phonetic: 'KA',  example: 'כַּדּוּר ⚽' },
      SEGOL:  { display: 'כֶּ', phonetic: 'KE',  example: 'כֶּבֶשׂ 🐑' },
      TZERE:  { display: 'כֵּ', phonetic: 'KEI', example: 'כֵּלֶב 🐕' },
    },
  },
];

export const NIKUD_ORDER = ['KAMATZ', 'PATACH', 'SEGOL', 'TZERE'];

/** Generate 2 quiz questions for a lesson (one A-sound, one E-sound), shuffled options. */
export function generateQuestions(lesson) {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const aTarget = pick(['KAMATZ', 'PATACH']);
  const eTarget = pick(['SEGOL', 'TZERE']);

  const makeOptions = (targetType) =>
    [...NIKUD_ORDER]
      .sort(() => Math.random() - 0.5)
      .map((type) => ({
        nikudType:  type,
        display:    lesson.nikud[type].display,
        nikudName:  NIKUD_META[type].name,
        isCorrect:  type === targetType,
      }));

  return [
    { id: `${lesson.id}-q1`, targetType: aTarget, target: lesson.nikud[aTarget], options: makeOptions(aTarget) },
    { id: `${lesson.id}-q2`, targetType: eTarget, target: lesson.nikud[eTarget], options: makeOptions(eTarget) },
  ];
}

export function shuffleLessons() {
  return [...LETTER_LESSONS].sort(() => Math.random() - 0.5);
}
