const OWNER  = 'nimrodekel-hub';
const REPO   = 'Libby_Fun_Reading';
const BRANCH = 'main';

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
    throw new Error(err.message ?? `HTTP ${res.status}`);
  }
  return true;
}

/** Quick connectivity check — returns true if the token is valid. */
export async function verifyToken(token) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}`,
    { headers: headers(token) }
  ).catch(() => null);
  return res?.ok ?? false;
}
