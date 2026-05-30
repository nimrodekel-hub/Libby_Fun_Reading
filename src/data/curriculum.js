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
      KAMATZ: { display: 'בָּ', phonetic: 'בָּ', example: 'בָּצָל 🧅',        alts: ['בָּנָנָה 🍌', 'בָּשָׂר 🥩', 'בָּרָק ⚡'] },
      PATACH: { display: 'בַּ', phonetic: 'בַּ', example: 'בַּיִת 🏠',        alts: ['בַּלּוֹן 🎈', 'בַּקְבּוּק 🍶', 'בַּד 🧵'] },
      SEGOL:  { display: 'בֶּ', phonetic: 'בֶּ', example: 'בֶּגֶד 👗',        alts: ['בֶּן 👦', 'בֶּטֶן 🫃', 'בֶּרֶז 🚰'] },
      TZERE:  { display: 'בֵּ', phonetic: 'בֵּ', example: 'בֵּית סֵפֶר 🏫', alts: ['בֵּצָה 🥚', 'בֵּכִי 😢', 'בֵּן 👦'] },
      HIRIK:  { display: 'בִּ', phonetic: 'בִּ', example: 'בִּינְגוֹ 📋',    alts: ['בִּינָה 🧠', 'בִּרְכַּיִם 🦵', 'בִּכִי 😢'] },
      HOLAM:  { display: 'בֹּ', phonetic: 'בֹּ', example: 'בֹּקֶר 🌅',       alts: ['בּוֹרֶקַס 🥐', 'בּוֹר 🕳️', 'בּוֹסְתַּן 🌳'] },
      KUBUTZ: { display: 'בֻּ', phonetic: 'בֻּ', example: 'בֻּבָּה 🪆',      alts: ['בֻּל 📮', 'בֻּשָׁה 😳'] },
    },
  },
  {
    id: 'mem', base: 'מ', name: 'מֵם', emoji: '👸',
    nikud: {
      KAMATZ: { display: 'מָ', phonetic: 'מָ', example: 'מָגֵן 🛡️',     alts: ['מָנָה 🍽️', 'מָקוֹם 📍', 'מָרוֹם ☁️'] },
      PATACH: { display: 'מַ', phonetic: 'מַ', example: 'מַלְכָּה 👸', alts: ['מַיִם 💧', 'מַחְבֶּרֶת 📓', 'מַסָּכָה 🎭'] },
      SEGOL:  { display: 'מֶ', phonetic: 'מֶ', example: 'מֶלֶךְ 🤴',   alts: ['מֶלַח 🧂', 'מֶרְכָּז 🏢', 'מֶרְחָק 📏'] },
      TZERE:  { display: 'מֵ', phonetic: 'מֵ', example: 'מֵאָה 💯',    alts: ['מֵרוֹץ 🏃', 'מֵטָר 📏', 'מֵדִינָה 🗺️'] },
      HIRIK:  { display: 'מִ', phonetic: 'מִ', example: 'מִיץ 🥤',     alts: ['מִיטָה 🛏️', 'מִטְרִיָּה ☂️', 'מִכְנָסַיִם 👖'] },
      HOLAM:  { display: 'מֹ', phonetic: 'מֹ', example: 'מֹחַ 🧠',    alts: ['מוֹרָה 👩‍🏫', 'מוֹנִית 🚕', 'מוֹל 🏪'] },
      KUBUTZ: { display: 'מֻ', phonetic: 'מֻ', example: 'מֻסִיקָה 🎵', alts: ['מֻכָּן ✅', 'מֻזָּר 🤔', 'מֻצָּר 📦'] },
    },
  },
  {
    id: 'dalet', base: 'ד', name: 'דָּלֶת', emoji: '🚪',
    nikud: {
      KAMATZ: { display: 'דָּ', phonetic: 'דָּ', example: 'דָּג 🐟',          alts: ['דָּם 🩸', 'דָּבָר 💬', 'דָּקָה ⏱️'] },
      PATACH: { display: 'דַּ', phonetic: 'דַּ', example: 'דַּלְיָה 🌸',      alts: ['דַּף 📄', 'דַּל 😔', 'דַּגָּן 🌾'] },
      SEGOL:  { display: 'דֶּ', phonetic: 'דֶּ', example: 'דֶּלֶת 🚪',       alts: ['דֶּשֶׁא 🌿', 'דֶּגֶל 🏳️', 'דֶּרֶךְ 🛣️'] },
      TZERE:  { display: 'דֵּ', phonetic: 'דֵּ', example: 'דֵּקֶל 🌴',       alts: ['דֵּלֶק ⛽', 'דֵּי ✋', 'דֵּן 👦'] },
      HIRIK:  { display: 'דִּ', phonetic: 'דִּ', example: 'דִּינוֹזָאוּר 🦕', alts: ['דִּירָה 🏠', 'דִּינָה 👧', 'דִּבּוּר 💬'] },
      HOLAM:  { display: 'דֹּ', phonetic: 'דֹּ', example: 'דֹּב 🐻',         alts: ['דּוֹד 👨', 'דּוֹאַר 📬', 'דּוֹלָר 💵'] },
      KUBUTZ: { display: 'דֻּ', phonetic: 'דֻּ', example: 'דֻּבּוֹן 🧸',     alts: ['דֻּגְמָה 📋', 'דֻּבָּה 🐻'] },
    },
  },
  {
    id: 'samech', base: 'ס', name: 'סָמֶךְ', emoji: '📚',
    nikud: {
      KAMATZ: { display: 'סָ', phonetic: 'סָ', example: 'סָבָא 👴',  alts: ['סָבְתָא 👵', 'סָלָט 🥗', 'סָמוּי 🕵️'] },
      PATACH: { display: 'סַ', phonetic: 'סַ', example: 'סַל 🧺',   alts: ['סַבּוֹן 🧼', 'סַנְדָּל 👡', 'סַכִּין 🔪'] },
      SEGOL:  { display: 'סֶ', phonetic: 'סֶ', example: 'סֶרֶט 🎬', alts: ['סֶלַע 🪨', 'סֶדֶר 📋', 'סֶמֶל 🏅'] },
      TZERE:  { display: 'סֵ', phonetic: 'סֵ', example: 'סֵפֶר 📖', alts: ['סֵדֶר 🍽️', 'סֵפֶל ☕'] },
      HIRIK:  { display: 'סִ', phonetic: 'סִ', example: 'סִירָה ⛵', alts: ['סִינוֹר 👔', 'סִיכָּה 📌', 'סִפְרִיָּה 📚'] },
      HOLAM:  { display: 'סֹ', phonetic: 'סֹ', example: 'סֹד 🤫',   alts: ['סוֹס 🐴', 'סוֹף 🏁', 'סוֹכֶּרֶת 🍬'] },
      KUBUTZ: { display: 'סֻ', phonetic: 'סֻ', example: 'סֻכָּה 🛖', alts: ['סֻלָּם 🪜'] },
    },
  },
  {
    id: 'lamed', base: 'ל', name: 'לָמֶד', emoji: '❤️',
    nikud: {
      KAMATZ: { display: 'לָ', phonetic: 'לָ', example: 'לָבָן 🤍',     alts: ['לָשׁוֹן 👅', 'לָמָּה ❓', 'לָרוּץ 🏃'] },
      PATACH: { display: 'לַ', phonetic: 'לַ', example: 'לַיְלָה 🌙', alts: ['לַחְמָנִיָּה 🥖', 'לַהֲבָה 🔥'] },
      SEGOL:  { display: 'לֶ', phonetic: 'לֶ', example: 'לֶחֶם 🍞',   alts: ['לֶגוֹ 🧱', 'לֶחִי 😊', 'לֶשֶׁם 💎'] },
      TZERE:  { display: 'לֵ', phonetic: 'לֵ', example: 'לֵב ❤️',    alts: ['לֵילִית 🌙', 'לֵאָה 👧', 'לֵוִי 👦'] },
      HIRIK:  { display: 'לִ', phonetic: 'לִ', example: 'לִוְיָתָן 🐋', alts: ['לִימוֹן 🍋', 'לִינָה 🌙', 'לִיסָה 👧'] },
      HOLAM:  { display: 'לֹ', phonetic: 'לֹ', example: 'לֹא ❌',    alts: ['לוֹחַ 📋', 'לוֹחֵם 🪖', 'לוֹז 🌰'] },
      KUBUTZ: { display: 'לֻ', phonetic: 'לֻ', example: 'לֻלָב 🌴',  alts: [] },
    },
  },
  {
    id: 'kaf', base: 'כּ', name: 'כַּף', emoji: '⚽',
    nikud: {
      KAMATZ: { display: 'כָּ', phonetic: 'כָּ', example: 'כָּלָה 👰',      alts: ['כָּבוֹד 🏆', 'כָּנָף 🦋', 'כָּתָב ✍️'] },
      PATACH: { display: 'כַּ', phonetic: 'כַּ', example: 'כַּדּוּר ⚽',    alts: ['כַּף 🤲', 'כַּפִּית 🥄', 'כַּרְטִיס 🎟️'] },
      SEGOL:  { display: 'כֶּ', phonetic: 'כֶּ', example: 'כֶּבֶשׂ 🐑',    alts: ['כֶּלֶב 🐕', 'כֶּסֶף 💰', 'כֶּרֶם 🍇'] },
      TZERE:  { display: 'כֵּ', phonetic: 'כֵּ', example: 'כֵּלֶב 🐕',     alts: ['כֵּן ✅', 'כֵּרֶם 🍇', 'כֵּף 🎉'] },
      HIRIK:  { display: 'כִּ', phonetic: 'כִּ', example: 'כִּינּוֹר 🎻',  alts: ['כִּיסֵּא 🪑', 'כִּיף 😎', 'כִּירַיִם 🍳'] },
      HOLAM:  { display: 'כֹּ', phonetic: 'כֹּ', example: 'כֹּחַ 💪',      alts: ['כּוֹס 🥛', 'כּוֹבַע 🎩', 'כּוֹכָב ⭐'] },
      KUBUTZ: { display: 'כֻּ', phonetic: 'כֻּ', example: 'כֻּסְבָּרָה 🌿', alts: ['כֻּלָּם 👥', 'כֻּלּוֹ 🌕'] },
    },
  },
  {
    id: 'nun', base: 'נ', name: 'נוּן', emoji: '🕯️',
    nikud: {
      KAMATZ: { display: 'נָ', phonetic: 'נָ', example: 'נָחָשׁ 🐍',    alts: ['נָהָר 🌊', 'נָמֵר 🐆', 'נָמָל ⚓'] },
      PATACH: { display: 'נַ', phonetic: 'נַ', example: 'נַעַל 👟',     alts: ['נַמְלָה 🐜', 'נַהַג 🚗', 'נַדְנֵדָה 🛝'] },
      SEGOL:  { display: 'נֶ', phonetic: 'נֶ', example: 'נֶשֶׁר 🦅',    alts: ['נֶפֶשׁ 💙', 'נֶגֶב 🏜️', 'נֶכֶד 👦'] },
      TZERE:  { display: 'נֵ', phonetic: 'נֵ', example: 'נֵר 🕯️',      alts: ['נֵס 🎗️'] },
      HIRIK:  { display: 'נִ', phonetic: 'נִ', example: 'נִינְג׳ָה 🥷', alts: ['נִיסָן 🌸', 'נִירָה 👧', 'נִינָה 👧'] },
      HOLAM:  { display: 'נֹ', phonetic: 'נֹ', example: 'נוֹצָה 🪶',    alts: ['נוֹחַ ⛵', 'נוֹף 🌄'] },
      KUBUTZ: { display: 'נֻ', phonetic: 'נֻ', example: 'נֻסְחָה 📝',   alts: [] },
    },
  },
  {
    id: 'shin', base: 'שׁ', name: 'שִׁין', emoji: '☀️',
    nikud: {
      KAMATZ: { display: 'שָׁ', phonetic: 'שָׁ', example: 'שָׁמַיִם ☁️',  alts: ['שָׁנָה 📅', 'שָׁלוֹם ✌️', 'שָׁרָב 🌡️'] },
      PATACH: { display: 'שַׁ', phonetic: 'שַׁ', example: 'שַׁרְבִיט 🪄', alts: ['שַׁעַר ⚽', 'שַׁבָּת 🕍', 'שַׁחְמָט ♟️'] },
      SEGOL:  { display: 'שֶׁ', phonetic: 'שֶׁ', example: 'שֶׁמֶשׁ 🌞',   alts: ['שֶׁלֶג ❄️', 'שֶׁקֶל 🪙', 'שֶׁקֶר 🤥'] },
      TZERE:  { display: 'שֵׁ', phonetic: 'שֵׁ', example: 'שֵׁן 🦷',      alts: ['שֵׁם 📛', 'שֵׁנָה 😴', 'שֵׁבֶט 🔱'] },
      HIRIK:  { display: 'שִׁ', phonetic: 'שִׁ', example: 'שִׁיר 🎶',     alts: ['שִׁינַיִם 🦷', 'שִׁיעוּר 📚', 'שִׁיחָה 💬'] },
      HOLAM:  { display: 'שֹׁ', phonetic: 'שֹׁ', example: 'שׁוֹקוֹ 🍫',  alts: ['שׁוֹטֵר 👮', 'שׁוֹר 🐂', 'שׁוֹמֵר 🛡️'] },
      KUBUTZ: { display: 'שֻׁ', phonetic: 'שֻׁ', example: 'שֻׁלְחָן 🍽️', alts: ['שֻׁתָּף 🤝', 'שֻׁנָּה 🔄'] },
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
