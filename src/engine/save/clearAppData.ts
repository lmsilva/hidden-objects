import { musicPlayer } from '../audio/musicPlayer';
import { deleteDatabase, deleteSave } from './persistence';

/** Wipe save data, browser storage, and PWA caches; reload recommended after. */
export async function clearAllAppData(adventureId: string): Promise<void> {
  musicPlayer.stopAll();

  try {
    await deleteSave(adventureId);
  } catch {
    // Save may not exist yet.
  }

  try {
    await deleteDatabase();
  } catch {
    // Database may already be gone.
  }

  try {
    localStorage.clear();
  } catch {
    // ignore
  }

  try {
    sessionStorage.clear();
  } catch {
    // ignore
  }

  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }

  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((reg) => reg.unregister()));
  }
}
