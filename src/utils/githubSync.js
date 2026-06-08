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

/**
 * Upload a single recording to public/audio/{key}.webm on the main branch.
 * dataUrl is the IndexedDB-stored "data:audio/...;base64,..." string.
 */
export async function uploadRecording(token, key, dataUrl) {
  const base64  = dataUrl.split(',')[1];
  const path    = `public/audio/${key}.webm`;
  const url     = apiUrl(path);

  // Fetch existing SHA so we can update (not duplicate) the file
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
 * This commits a tiny timestamp file to the code branch, which DOES trigger CI.
 * CI then overlays audio from main and deploys to Pages.
 */
export async function triggerDeploy(token) {
  const path = 'public/audio/.deploy-trigger';
  const url  = apiUrl(path);

  let sha;
  const existing = await fetch(`${url}?ref=${encodeURIComponent(CODE_BRANCH)}`, {
    headers: headers(token),
  }).catch(() => null);
  if (existing?.ok) {
    sha = (await existing.json()).sha;
  }

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

/** Connectivity + write-permission check.
 *  Returns 'ok' | 'no_write' | 'invalid' | 'network_error'
 */
export async function verifyToken(token) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}`,
    { headers: headers(token) }
  ).catch(() => null);
  if (!res)       return 'network_error';
  if (!res.ok)    return 'invalid';
  const data = await res.json().catch(() => ({}));
  // Fine-grained PATs expose permissions in the response
  if (data.permissions && !data.permissions.push) return 'no_write';
  return 'ok';
}
