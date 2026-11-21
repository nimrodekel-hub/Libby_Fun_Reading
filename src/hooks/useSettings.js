import { useState, useCallback } from 'react';

const SETTINGS_KEY   = 'libby-settings';
const DEFAULT_SETTINGS = {
  activeVowelTypes: ['KAMATZ', 'PATACH', 'SEGOL', 'TZERE'],
};

function load() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useSettings() {
  const [settings, setSettings] = useState(load);

  const updateSettings = useCallback((patch) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleVowelType = useCallback((type) => {
    setSettings(prev => {
      const current = prev.activeVowelTypes;
      // Always keep at least one A-group and one E-group active
      const next = current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type];

      const hasA = next.some(t => t === 'KAMATZ' || t === 'PATACH');
      const hasE = next.some(t => t === 'SEGOL'  || t === 'TZERE');
      if (!hasA || !hasE) return prev; // refuse to leave one group empty

      const updated = { ...prev, activeVowelTypes: next };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { settings, updateSettings, toggleVowelType };
}
