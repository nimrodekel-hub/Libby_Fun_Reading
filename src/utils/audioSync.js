import { getRecording, saveRecording } from './audioStorage';

const BASE_URL       = import.meta.env.BASE_URL ?? '/';
const MANIFEST_URL   = `${BASE_URL}audio/manifest.json`;
const MANIFEST_TS_KEY = 'libby_manifest_ts';

/** Fetch the manifest listing all published recordings. Returns null on failure. */
export async function fetchManifest() {
  try {
    const res = await fetch(`${MANIFEST_URL}?t=${Date.now()}`);
    if (!res.ok) return null;
    return await res.json(); // { v, ts, files: { key: ext, ... } }
  } catch {
    return null;
  }
}

/**
 * Download all manifest entries that are not yet in local IndexedDB.
 * force=true re-downloads everything (useful after re-recording).
 * onProgress({ done, total, key }) — called after each file attempt.
 * Returns { downloaded, skipped, total }.
 */
export async function syncAudio({ force = false, onProgress } = {}) {
  const manifest = await fetchManifest();
  if (!manifest?.files) return { downloaded: 0, skipped: 0, total: 0 };

  const keys  = Object.keys(manifest.files);
  const total = keys.length;
  let downloaded = 0, skipped = 0;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (!force) {
      const existing = await getRecording(key).catch(() => null);
      if (existing) {
        skipped++;
        onProgress?.({ done: i + 1, total, key });
        continue;
      }
    }

    const ext = manifest.files[key];
    const url = `${BASE_URL}audio/${key}.${ext}`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const blob   = await res.blob();
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror   = reject;
        reader.readAsDataURL(blob);
      });
      await saveRecording(key, dataUrl);
      downloaded++;
    } catch { /* skip failed downloads, try next */ }

    onProgress?.({ done: i + 1, total, key });
  }

  if (downloaded > 0) {
    localStorage.setItem(MANIFEST_TS_KEY, manifest.ts ?? new Date().toISOString());
  }

  return { downloaded, skipped, total };
}

/** How many manifest keys are already saved locally. */
export async function countLocalCached(manifestFiles) {
  if (!manifestFiles) return 0;
  const keys = Object.keys(manifestFiles);
  const hits = await Promise.all(
    keys.map(k => getRecording(k).then(v => !!v).catch(() => false))
  );
  return hits.filter(Boolean).length;
}

export const getLastSyncTs = () => localStorage.getItem(MANIFEST_TS_KEY) ?? null;
