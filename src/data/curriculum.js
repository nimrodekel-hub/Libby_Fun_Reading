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
  {
    id: 'alef', base: 'א', name: 'אָלֶף', emoji: '🦁',
    nikud: {
      KAMATZ: { display: 'אָ', phonetic: 'אָ', example: 'אָב 👨',       alts: ['אָחוֹת 👧', 'אָדֹם 🔴', 'אָרוֹן 🚪'] },
      PATACH: { display: 'אַ', phonetic: 'אַ', example: 'אַרְנָב 🐰',   alts: ['אַבָּא 👨', 'אַגַּם 🏞️', 'אַרְיֵה 🦁'] },
      SEGOL:  { display: 'אֶ', phonetic: 'אֶ', example: 'אֶצְבַּע 👆',  alts: ['אֶחָד 1️⃣', 'אֶרֶץ 🌍', 'אֶמֶשׁ 🌙'] },
      TZERE:  { display: 'אֵ', phonetic: 'אֵ', example: 'אֵם 👩',       alts: ['אֵשׁ 🔥', 'אֵלָה 🌳', 'אֵיל 🦌'] },
      HIRIK:  { display: 'אִ', phonetic: 'אִ', example: 'אִישׁ 🧔',     alts: ['אִמָּא 👩', 'אִיָּה 🦅', 'אִיִּי 🏝️'] },
      HOLAM:  { display: 'אֹ', phonetic: 'אֹ', example: 'אֹכֶל 🍽️',   alts: ['אוֹטוֹ 🚗', 'אוֹפַנַּיִם 🚲', 'אוֹצָר 💎'] },
      KUBUTZ: { display: 'אֻ', phonetic: 'אֻ', example: 'אֻמָּה 🌍',   alts: ['אֻמְנָם 🤔'] },
    },
  },
  {
    id: 'tav', base: 'ת', name: 'תָּו', emoji: '🍎',
    nikud: {
      KAMATZ: { display: 'תָּ', phonetic: 'תָּ', example: 'תָּנִין 🐊',    alts: ['תָּפוּחַ 🍎', 'תָּמָר 🌴', 'תָּרְנְגוֹל 🐓'] },
      PATACH: { display: 'תַּ', phonetic: 'תַּ', example: 'תַּפּוּחַ 🍎',  alts: ['תַּרְנְגוֹל 🐓', 'תַּנּוּר 🔥', 'תַּלְמִיד 📚'] },
      SEGOL:  { display: 'תֶּ', phonetic: 'תֶּ', example: 'תֶּבֶן 🌾',     alts: ['תֶּלֶם 🌾', 'תֶּכֶף ⚡'] },
      TZERE:  { display: 'תֵּ', phonetic: 'תֵּ', example: 'תֵּה 🍵',       alts: ['תֵּבָה 📦', 'תֵּל ⛰️', 'תֵּבֵל 🌍'] },
      HIRIK:  { display: 'תִּ', phonetic: 'תִּ', example: 'תִּינוֹק 👶',  alts: ['תִּירָס 🌽', 'תִּיק 🎒', 'תִּרְמוֹס 🧃'] },
      HOLAM:  { display: 'תֹּ', phonetic: 'תֹּ', example: 'תּוֹף 🥁',    alts: ['תּוֹלַעַת 🐛', 'תּוֹר 🕊️', 'תּוֹכִי 🦜'] },
      KUBUTZ: { display: 'תֻּ', phonetic: 'תֻּ', example: 'תֻּמָּה 💛',   alts: [] },
    },
  },
  {
    id: 'resh', base: 'ר', name: 'רֵישׁ', emoji: '🚆',
    nikud: {
      KAMATZ: { display: 'רָ', phonetic: 'רָ', example: 'רָץ 🏃',        alts: ['רָחֵל 🐑', 'רָקִיעַ ☁️', 'רָגֶל 🦵'] },
      PATACH: { display: 'רַ', phonetic: 'רַ', example: 'רַכֶּבֶת 🚆',  alts: ['רַגְלַיִם 🦵', 'רַעַשׁ 📢', 'רַעֲנָן 🌿'] },
      SEGOL:  { display: 'רֶ', phonetic: 'רֶ', example: 'רֶכֶב 🚗',     alts: ['רֶגֶל 🦵', 'רֶגַע ⏱️', 'רֶשֶׁת 🕸️'] },
      TZERE:  { display: 'רֵ', phonetic: 'רֵ', example: 'רֵיחַ 👃',     alts: ['רֵאָה 🫁', 'רֵעַ 👫'] },
      HIRIK:  { display: 'רִ', phonetic: 'רִ', example: 'רִיקוּד 💃',   alts: ['רִמּוֹן 🫐', 'רִינָה 👧', 'רִיצָה 🏃'] },
      HOLAM:  { display: 'רֹ', phonetic: 'רֹ', example: 'רוֹבוֹט 🤖',  alts: ['רוֹקֵד 💃', 'רוֹכֵב 🚲', 'רוֹחֵץ 🚿'] },
      KUBUTZ: { display: 'רֻ', phonetic: 'רֻ', example: 'רֻמָּח 🗡️',    alts: [] },
    },
  },
  {
    id: 'pe', base: 'פּ', name: 'פֵּא', emoji: '🦋',
    nikud: {
      KAMATZ: { display: 'פָּ', phonetic: 'פָּ', example: 'פָּרָה 🐄',      alts: ['פָּנִים 😊', 'פָּרָשׁ 🐎', 'פָּרָשָׁה 📜'] },
      PATACH: { display: 'פַּ', phonetic: 'פַּ', example: 'פַּרְפַּר 🦋',  alts: ['פַּח 🗑️', 'פַּרְדֵּס 🍊', 'פַּנָּס 🏮'] },
      SEGOL:  { display: 'פֶּ', phonetic: 'פֶּ', example: 'פֶּרַח 🌸',     alts: ['פֶּה 👄', 'פֶּקַק 🚗', 'פֶּלֶא 🪄'] },
      TZERE:  { display: 'פֵּ', phonetic: 'פֵּ', example: 'פֵּרוֹת 🍓',   alts: ['פֵּאָה 💇', 'פֵּה 👄'] },
      HIRIK:  { display: 'פִּ', phonetic: 'פִּ', example: 'פִּיל 🐘',      alts: ['פִּיצָה 🍕', 'פִּינָּה 🏠', 'פִּטְרִיָּה 🍄'] },
      HOLAM:  { display: 'פֹּ', phonetic: 'פֹּ', example: 'פּוֹנִי 🐎',   alts: ['פּוֹרִים 🎭', 'פּוֹעֵל 👷'] },
      KUBUTZ: { display: 'פֻּ', phonetic: 'פֻּ', example: 'פֻּנְדָּק 🏨',  alts: [] },
    },
  },
  {
    id: 'gimel', base: 'ג', name: 'גִּימֶל', emoji: '🦒',
    nikud: {
      KAMATZ: { display: 'גָּ', phonetic: 'גָּ', example: 'גָּמָל 🐪',    alts: ['גָּן 🌻', 'גָּשֶׁם 🌧️', 'גָּבִישׁ 💎'] },
      PATACH: { display: 'גַּ', phonetic: 'גַּ', example: 'גַּן 🌻',      alts: ['גַּלְגַּל 🎡', 'גַּב 🫃', 'גַּרְזֶן 🪓'] },
      SEGOL:  { display: 'גֶּ', phonetic: 'גֶּ', example: 'גֶּשֶׁם 🌧️',  alts: ['גֶּזֶר 🥕', 'גֶּפֶן 🍇', 'גֶּלֶד 🧊'] },
      TZERE:  { display: 'גֵּ', phonetic: 'גֵּ', example: 'גֵּרָה 🐄',    alts: [] },
      HIRIK:  { display: 'גִּ', phonetic: 'גִּ', example: 'גִּירָה 🖍️',  alts: ['גִּיבּוֹר 🦸', 'גִּינָה 🌻', 'גִּיגִית 🛁'] },
      HOLAM:  { display: 'גֹּ', phonetic: 'גֹּ', example: 'גּוֹרִיל 🦍',  alts: ['גּוֹלֵם 🗿', 'גּוֹלָן ⛰️'] },
      KUBUTZ: { display: 'גֻּ', phonetic: 'גֻּ', example: 'גֻּלָּה 🪀',   alts: ['גֻּלְגֹּלֶת 💀'] },
    },
  },
  {
    id: 'he', base: 'ה', name: 'הֵא', emoji: '⛰️',
    nikud: {
      KAMATZ: { display: 'הָ', phonetic: 'הָ', example: 'הָמוֹן 👥',   alts: ['הָדָס 🌿', 'הָלוֹם 📍'] },
      PATACH: { display: 'הַ', phonetic: 'הַ', example: 'הַר ⛰️',     alts: ['הַד 🔊'] },
      SEGOL:  { display: 'הֶ', phonetic: 'הֶ', example: 'הֶגֶה 🚗',    alts: ['הֶבֶל 💨', 'הֶמְשֵׁךְ ➡️'] },
      TZERE:  { display: 'הֵ', phonetic: 'הֵ', example: 'הֵיכָל 🏛️',  alts: ['הֵן ✅', 'הֵם 👥'] },
      HIRIK:  { display: 'הִ', phonetic: 'הִ', example: 'הִיא 👧',     alts: ['הִנֵּה 👇'] },
      HOLAM:  { display: 'הֹ', phonetic: 'הֹ', example: 'הוֹרֶה 👨',  alts: ['הוֹלֵךְ 🚶', 'הוֹדִי 🦃'] },
      KUBUTZ: { display: 'הֻ', phonetic: 'הֻ', example: 'הֻסְבַּר 💡', alts: [] },
    },
  },
  {
    id: 'yod', base: 'י', name: 'יוֹד', emoji: '✋',
    nikud: {
      KAMATZ: { display: 'יָ', phonetic: 'יָ', example: 'יָד ✋',           alts: ['יָם 🌊', 'יָרֵחַ 🌙', 'יָעַל 🐐'] },
      PATACH: { display: 'יַ', phonetic: 'יַ', example: 'יַעַר 🌳',         alts: ['יַלְדָּה 👧', 'יַלְקוּט 🎒', 'יַחְמוּר 🦌'] },
      SEGOL:  { display: 'יֶ', phonetic: 'יֶ', example: 'יֶלֶד 👦',         alts: ['יֶרֶק 🥦'] },
      TZERE:  { display: 'יֵ', phonetic: 'יֵ', example: 'יֵשׁ ✅',           alts: ['יֵין 🍷', 'יֵלֵךְ 🚶'] },
      HIRIK:  { display: 'יִ', phonetic: 'יִ', example: 'יִשְׂרָאֵל 🇮🇱', alts: ['יִצְחָק 😂', 'יִחְיֶה 🙏'] },
      HOLAM:  { display: 'יֹ', phonetic: 'יֹ', example: 'יוֹם 📅',          alts: ['יוֹנָה 🕊️', 'יוֹגוּרְט 🥛', 'יוֹסֵף 👦'] },
      KUBUTZ: { display: 'יֻ', phonetic: 'יֻ', example: 'יֻלַּד 👶',        alts: [] },
    },
  },
  {
    id: 'ayin', base: 'ע', name: 'עַיִן', emoji: '👁️',
    nikud: {
      KAMATZ: { display: 'עָ', phonetic: 'עָ', example: 'עָץ 🌳',      alts: ['עָם 🌍', 'עָנָן ☁️', 'עָשָׂן 💨'] },
      PATACH: { display: 'עַ', phonetic: 'עַ', example: 'עַיִן 👁️',   alts: ['עַכְבָּר 🐭', 'עַרְסָל 🌴', 'עַקְרָב 🦂'] },
      SEGOL:  { display: 'עֶ', phonetic: 'עֶ', example: 'עֶשֶׂב 🌿',   alts: ['עֶרֶב 🌆', 'עֶשֶׂר 🔟'] },
      TZERE:  { display: 'עֵ', phonetic: 'עֵ', example: 'עֵגֶל 🐄',    alts: ['עֵפִיפוֹן 🪁', 'עֵין 👁️'] },
      HIRIK:  { display: 'עִ', phonetic: 'עִ', example: 'עִיר 🏙️',   alts: ['עִיפָּרוֹן ✏️', 'עִינַיִם 👀', 'עִיגּוּל ⭕'] },
      HOLAM:  { display: 'עֹ', phonetic: 'עֹ', example: 'עוֹף 🐦',    alts: ['עוֹגָה 🎂', 'עוֹלָם 🌍', 'עוֹגַן ⚓'] },
      KUBUTZ: { display: 'עֻ', phonetic: 'עֻ', example: 'עֻז 💪',      alts: [] },
    },
  },
  {
    id: 'chet', base: 'ח', name: 'חֵית', emoji: '🐱',
    nikud: {
      KAMATZ: { display: 'חָ', phonetic: 'חָ', example: 'חָתוּל 🐱',   alts: ['חָמוֹר 🫏', 'חָלָב 🥛', 'חָבֵר 🤝'] },
      PATACH: { display: 'חַ', phonetic: 'חַ', example: 'חַיָּה 🦁',   alts: ['חַלּוֹן 🪟', 'חַמָּה ☀️', 'חַכָּה 🎣'] },
      SEGOL:  { display: 'חֶ', phonetic: 'חֶ', example: 'חֶדֶר 🏠',    alts: ['חֶבֶל ⛵', 'חֶרֶב ⚔️', 'חֶסֶד 💙'] },
      TZERE:  { display: 'חֵ', phonetic: 'חֵ', example: 'חֵץ 🏹',      alts: ['חֵן 😊', 'חֵלֶב 🧈'] },
      HIRIK:  { display: 'חִ', phonetic: 'חִ', example: 'חִידָה ❓',   alts: ['חִיּוּךְ 😊', 'חִינָּם 🎁', 'חִיּוּת 💪'] },
      HOLAM:  { display: 'חֹ', phonetic: 'חֹ', example: 'חוֹף 🏖️',   alts: ['חוֹמָה 🏰', 'חוֹלֶה 🤒'] },
      KUBUTZ: { display: 'חֻ', phonetic: 'חֻ', example: 'חֻלְצָה 👕',  alts: ['חֻקָּה 📜', 'חֻפָּה 👰'] },
    },
  },
  {
    id: 'kuf', base: 'ק', name: 'קוֹף', emoji: '🐒',
    nikud: {
      KAMATZ: { display: 'קָ', phonetic: 'קָ', example: 'קָפֵה ☕',    alts: ['קָנֶה 🎋', 'קָהָל 👥', 'קָדִים 🌬️'] },
      PATACH: { display: 'קַ', phonetic: 'קַ', example: 'קַרְקַע 🌍',  alts: ['קַו ✏️', 'קַל 🪶'] },
      SEGOL:  { display: 'קֶ', phonetic: 'קֶ', example: 'קֶשֶׁת 🌈',  alts: ['קֶרֶן 🦄', 'קֶסֶם 🪄'] },
      TZERE:  { display: 'קֵ', phonetic: 'קֵ', example: 'קֵן 🪺',     alts: ['קֵץ ⏰', 'קֵנְיָה 🌍'] },
      HIRIK:  { display: 'קִ', phonetic: 'קִ', example: 'קִיר 🧱',    alts: ['קִינָּה 😢', 'קִיצוֹן 🏔️'] },
      HOLAM:  { display: 'קֹ', phonetic: 'קֹ', example: 'קוֹף 🐒',   alts: ['קוֹל 🔊', 'קוֹלָה 🥤', 'קוֹמָה 🏢'] },
      KUBUTZ: { display: 'קֻ', phonetic: 'קֻ', example: 'קֻבִּיָּה 🎲', alts: ['קֻפָּה 💰'] },
    },
  },
  {
    id: 'vav', base: 'ו', name: 'וָו', emoji: '🪝',
    nikud: {
      KAMATZ: { display: 'וָ', phonetic: 'וָ', example: 'וָו 🪝',       alts: ['וָרֵד 🌹'] },
      PATACH: { display: 'וַ', phonetic: 'וַ', example: 'וַנִּיל 🍦',   alts: ['וַעַד 🏢'] },
      SEGOL:  { display: 'וֶ', phonetic: 'וֶ', example: 'וֶרֶד 🌹',     alts: [] },
      TZERE:  { display: 'וֵ', phonetic: 'וֵ', example: 'וֵילוֹן 🪟',  alts: ['וֵי 😱'] },
      HIRIK:  { display: 'וִ', phonetic: 'וִ', example: 'וִידֵאוֹ 📹', alts: ['וִילָה 🏡'] },
      HOLAM:  { display: 'וֹ', phonetic: 'וֹ', example: 'וֹלְגָּה 🌊',  alts: [] },
      KUBUTZ: { display: 'וֻ', phonetic: 'וֻ', example: 'וֻו 🪝',       alts: [] },
    },
  },
  {
    id: 'zayin', base: 'ז', name: 'זַיִן', emoji: '🥇',
    nikud: {
      KAMATZ: { display: 'זָ', phonetic: 'זָ', example: 'זָהָב 🥇',    alts: ['זָנָב 🐕', 'זָקֵן 👴', 'זָכָר 👦'] },
      PATACH: { display: 'זַ', phonetic: 'זַ', example: 'זַמָּר 🎤',   alts: ['זַיִת 🫒', 'זַרְקוֹר 🔦'] },
      SEGOL:  { display: 'זֶ', phonetic: 'זֶ', example: 'זֶה 👆',      alts: ['זֶרַע 🌱', 'זֶרֶם ⚡'] },
      TZERE:  { display: 'זֵ', phonetic: 'זֵ', example: 'זֵר 💐',      alts: ['זֵכֶר 📖'] },
      HIRIK:  { display: 'זִ', phonetic: 'זִ', example: 'זִמְרָה 🎵',  alts: ['זִירָה 🥊', 'זִכָּרוֹן 💭'] },
      HOLAM:  { display: 'זֹ', phonetic: 'זֹ', example: 'זוֹחֵל 🐍',  alts: ['זוֹג 💑', 'זוֹהָר ✨'] },
      KUBUTZ: { display: 'זֻ', phonetic: 'זֻ', example: 'זֻמַּר 🎵',   alts: [] },
    },
  },
  {
    id: 'tet', base: 'ט', name: 'טֵית', emoji: '🎒',
    nikud: {
      KAMATZ: { display: 'טָ', phonetic: 'טָ', example: 'טָס ✈️',         alts: ['טָלֶה 🐑', 'טָהוֹר ✨'] },
      PATACH: { display: 'טַ', phonetic: 'טַ', example: 'טַבַּעַת 💍',    alts: ['טַיָּס ✈️', 'טַבָּח 👨‍🍳'] },
      SEGOL:  { display: 'טֶ', phonetic: 'טֶ', example: 'טֶלֶפוֹן 📱',   alts: ['טֶלֶוִיזְיָה 📺', 'טֶקֶס 🎉'] },
      TZERE:  { display: 'טֵ', phonetic: 'טֵ', example: 'טֵנִיס 🎾',     alts: ['טֵלֵסְקוֹפּ 🔭'] },
      HIRIK:  { display: 'טִ', phonetic: 'טִ', example: 'טִיּוּל 🎒',   alts: ['טִירָה 🏰', 'טִיגְרִיס 🌊'] },
      HOLAM:  { display: 'טֹ', phonetic: 'טֹ', example: 'טוֹבָה 🌟',    alts: ['טוֹת 🍓', 'טוֹר 🗼'] },
      KUBUTZ: { display: 'טֻ', phonetic: 'טֻ', example: 'טֻגַּן 🍳',     alts: [] },
    },
  },
  {
    id: 'tsadi', base: 'צ', name: 'צַדִּי', emoji: '🐦',
    nikud: {
      KAMATZ: { display: 'צָ', phonetic: 'צָ', example: 'צָב 🐢',         alts: ['צָמִיד 📿', 'צָהֹב 💛', 'צָבָא 🎖️'] },
      PATACH: { display: 'צַ', phonetic: 'צַ', example: 'צַלַּחַת 🍽️',   alts: ['צַבָּר 🌵', 'צַפְרְדֵּעַ 🐸', 'צַחְקָן 😂'] },
      SEGOL:  { display: 'צֶ', phonetic: 'צֶ', example: 'צֶמֶר 🧶',       alts: ['צֶבַע 🎨', 'צֶלֶם 📷'] },
      TZERE:  { display: 'צֵ', phonetic: 'צֵ', example: 'צֵל 🌳',         alts: ['צֵידָה 🍱'] },
      HIRIK:  { display: 'צִ', phonetic: 'צִ', example: 'צִפּוֹר 🐦',     alts: ['צִיּוּר 🎨', 'צִמּוּק 🍇', 'צִלְמָן 📷'] },
      HOLAM:  { display: 'צֹ', phonetic: 'צֹ', example: 'צוֹלֵל 🤿',     alts: ['צוֹמֵחַ 🌱', 'צוֹחֵק 😄'] },
      KUBUTZ: { display: 'צֻ', phonetic: 'צֻ', example: 'צֻלַּם 📷',      alts: [] },
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
