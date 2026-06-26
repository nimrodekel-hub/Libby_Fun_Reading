const PREFIX = 'wordOverride_';

export function loadAllWordOverrides() {
  const result = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIX)) {
      result[k.slice(PREFIX.length)] = localStorage.getItem(k);
    }
  }
  return result;
}

export function saveWordOverride(key, example) {
  localStorage.setItem(PREFIX + key, example);
}
