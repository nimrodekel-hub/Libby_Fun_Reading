import localforage from 'localforage';

const store = localforage.createInstance({
  name: 'LibbyReadingKingdom',
  storeName: 'parentRecordings',
  description: "Parent voice recordings for Libby's reading game",
});

export async function saveRecording(cardId, dataUrl) {
  return store.setItem(`rec_${cardId}`, dataUrl);
}

export async function getRecording(cardId) {
  return store.getItem(`rec_${cardId}`);
}

export async function deleteRecording(cardId) {
  return store.removeItem(`rec_${cardId}`);
}

export async function hasRecording(cardId) {
  const val = await store.getItem(`rec_${cardId}`);
  return val !== null;
}

export async function getAllRecordedCardIds() {
  const keys = await store.keys();
  return keys.filter(k => k.startsWith('rec_')).map(k => k.replace('rec_', ''));
}
