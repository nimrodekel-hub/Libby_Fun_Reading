const OWNER       = 'nimrodekel-hub';
const REPO        = 'Libby_Fun_Reading';
const BRANCH      = 'main';
const CODE_BRANCH = 'claude/pensive-maxwell-3Q5u3';

const TOKEN_KEY = 'gh_recordings_token';
export const getToken   = ()  => localStorage.getItem(TOKEN_KEY) ?? '';
export const saveToken  = t   => localStorage.setItem(TOKEN_KEY, t.trim());
export const clearToken = ()  => localStorage.removeItem(TOKEN_KEY);

function apiUrl(path) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
}

function headers(token) {
  return {
    Authorization:  `Bearer ${token}`,
    Accept:         'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

// ── WAV conversion ────────────────────────────────────────────────────────────
// iOS Safari does not support WebM. We convert every recording to WAV before
// uploading so the audio plays universally (iOS, Android, desktop).

function encodeWav(audioBuffer) {
  const pcm        = audioBuffer.getChannelData(0); // mono — use left channel
  const numSamples = pcm.length;
  const sampleRate = audioBuffer.sampleRate;
  const wavBuf     = new ArrayBuffer(44 + numSamples * 2);
  const dv         = new DataView(wavBuf);
  const wr = (off, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(off + i, s.charCodeAt(i)); };

  wr(0,  'RIFF'); dv.setUint32(4,  36 + numSamples * 2, true);
  wr(8,  'WAVE'); wr(12, 'fmt ');
  dv.setUint32(16, 16,          true); // chunk size
  dv.setUint16(20, 1,           true); // PCM
  dv.setUint16(22, 1,           true); // mono
  dv.setUint32(24, sampleRate,  true);
  dv.setUint32(28, sampleRate * 2, true); // byte rate
  dv.setUint16(32, 2,           true); // block align
  dv.setUint16(34, 16,          true); // 16-bit
  wr(36, 'data'); dv.setUint32(40, numSamples * 2, true);

  let off = 44;
  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, pcm[i]));
    dv.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    off += 2;
  }
  return wavBuf;
}

async function toWavBase64(dataUrl) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx      = new AudioCtx();
  try {
    const resp    = await fetch(dataUrl);
    const buf     = await resp.arrayBuffer();
    const decoded = await ctx.decodeAudioData(buf);
    const wav     = encodeWav(decoded);
    // chunk-based base64 to avoid call-stack overflow on large buffers
    const bytes   = new Uint8Array(wav);
    let binary    = '';
    const CHUNK   = 0xffff;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      binary += String.fromCharCode(...bytes.subarray(i, Math.min(i + CHUNK, bytes.length)));
    }
    return btoa(binary);
  } finally {
    ctx.close();
  }
}

// ── API helpers ───────────────────────────────────────────────────────────────

/**
 * Upload a single recording to public/audio/{key}.wav on the main branch.
 * Converts the IndexedDB data URL to WAV so it plays on iOS Safari.
 */
export async function uploadRecording(token, key, dataUrl) {
  const base64 = await toWavBase64(dataUrl);
  const path   = `public/audio/${key}.wav`;
  const url    = apiUrl(path);

  // Fetch existing SHA so we can update (not duplicate)
  let sha;
  const existing = await fetch(url, { headers: headers(token) }).catch(() => null);
  if (existing?.ok) {
    sha = (await existing.json()).sha;
  } else if (existing?.status === 401) {
    throw new Error('TOKEN_INVALID');
  }

  const res = await fetch(url, {
    method:  'PUT',
    headers: headers(token),
    body:    JSON.stringify({
      message: `🎙️ recording: ${key}`,
      content:  base64,
      branch:   BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 401) throw new Error('TOKEN_INVALID');
    if (res.status === 403) throw new Error('TOKEN_NO_WRITE');
    throw new Error(err.message ?? `HTTP ${res.status}`);
  }
  return true;
}

/**
 * GitHub doesn't auto-trigger CI when audio is uploaded via Contents API.
 * This commits a tiny timestamp file to the code branch to trigger CI.
 * CI then overlays audio from main and deploys to Pages.
 */
export async function triggerDeploy(token) {
  const path = 'public/audio/.deploy-trigger';
  const url  = apiUrl(path);

  let sha;
  const existing = await fetch(`${url}?ref=${encodeURIComponent(CODE_BRANCH)}`, {
    headers: headers(token),
  }).catch(() => null);
  if (existing?.ok) sha = (await existing.json()).sha;

  await fetch(url, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify({
      message: '🚀 trigger deploy after recording upload',
      content: btoa(new Date().toISOString()),
      branch:  CODE_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  }).catch(() => null);
}

/**
 * Fetch the existing manifest from main, merge new keys, and re-upload.
 * filesMap: { [key]: 'wav', ... }
 */
export async function uploadManifest(token, filesMap) {
  const path = 'public/audio/manifest.json';
  const url  = apiUrl(path);

  let existingFiles = {};
  let sha;
  const res = await fetch(`${url}?ref=${encodeURIComponent(BRANCH)}`, {
    headers: headers(token),
  }).catch(() => null);
  if (res?.ok) {
    const data = await res.json().catch(() => ({}));
    sha = data.sha;
    try {
      const decoded = atob(data.content.replace(/\n/g, ''));
      existingFiles = JSON.parse(decoded).files ?? {};
    } catch { /* start fresh */ }
  }

  const merged  = { v: 1, ts: new Date().toISOString(), files: { ...existingFiles, ...filesMap } };
  const content = btoa(JSON.stringify(merged, null, 2));

  const putRes = await fetch(url, {
    method:  'PUT',
    headers: headers(token),
    body:    JSON.stringify({
      message: '🗂️ update audio manifest',
      content,
      branch:  BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    throw new Error(err.message ?? `HTTP ${putRes.status}`);
  }
  return true;
}

/** Connectivity + write-permission check.
 *  Returns 'ok' | 'no_write' | 'invalid' | 'network_error'
 */
export async function verifyToken(token) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}`,
    { headers: headers(token) }
  ).catch(() => null);
  if (!res)    return 'network_error';
  if (!res.ok) return 'invalid';
  const data = await res.json().catch(() => ({}));
  if (data.permissions && !data.permissions.push) return 'no_write';
  return 'ok';
}

// Extensions to try when looking for deployed audio, newest format first.
export const AUDIO_EXTS = ['.wav', '.webm'];
