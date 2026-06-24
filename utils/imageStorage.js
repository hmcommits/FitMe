import localforage from 'localforage';

// Initialize the localforage instance for photos
localforage.config({
  name: 'FitMeApp',
  storeName: 'workout_photos', // Should be alphanumeric, with underscores.
  description: 'Stores base64 encoded photos for daily workouts'
});

/**
 * Save an image to IndexedDB.
 * @param {string} dateKey - The date string (e.g., '2026-06-22')
 * @param {string} base64Image - The image data
 */
export async function savePhotoLocally(dateKey, base64Image) {
  try {
    await localforage.setItem(dateKey, base64Image);
    return true;
  } catch (err) {
    console.error('Error saving photo locally:', err);
    return false;
  }
}

/**
 * Retrieve an image from IndexedDB.
 * @param {string} dateKey - The date string (e.g., '2026-06-22')
 * @returns {Promise<string|null>} The base64 image or null if not found
 */
export async function getPhotoLocally(dateKey) {
  try {
    const value = await localforage.getItem(dateKey);
    return value;
  } catch (err) {
    console.error('Error getting photo locally:', err);
    return null;
  }
}
