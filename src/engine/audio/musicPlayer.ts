import {
  getBoardTrack,
  getChapterTrack,
  getThemeTrack,
  trackUrl,
  type AudioTrack,
} from './tracks';
import { unlockAudio } from './audioUnlock';

export type MusicContext = 'menu' | 'map' | 'gameplay' | 'story' | 'none';

export interface AudioSettings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  musicVolume: number;
}

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  musicEnabled: true,
  sfxEnabled: true,
  musicVolume: 0.7,
};

class MusicPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentKey = '';
  /** Bumps on every halt — in-flight loads check this before playing. */
  private playbackGeneration = 0;
  private pendingElements = new Set<HTMLAudioElement>();
  private settings: AudioSettings = { ...DEFAULT_AUDIO_SETTINGS };
  private autoplayBlocked = false;

  updateSettings(settings: AudioSettings) {
    this.settings = settings;
    if (this.audio) {
      this.audio.volume = settings.musicVolume;
      if (!settings.musicEnabled) {
        this.stopAll();
      } else if (this.currentKey) {
        void this.audio.play().catch(() => undefined);
      }
    }
  }

  /** Stop every music element (including in-flight loads). */
  stopAll() {
    this.playbackGeneration += 1;
    this.currentKey = '';

    if (this.audio) {
      this.disposeElement(this.audio);
      this.audio = null;
    }

    for (const el of this.pendingElements) {
      this.disposeElement(el);
    }
    this.pendingElements.clear();
  }

  private disposeElement(el: HTMLAudioElement) {
    try {
      el.pause();
      el.removeAttribute('src');
      el.load();
    } catch {
      // ignore
    }
  }

  private isStale(generation: number): boolean {
    return generation !== this.playbackGeneration;
  }

  /** Try audible play, then muted autoplay (allowed without gesture in most browsers). */
  private async tryStartPlayback(el: HTMLAudioElement, generation: number): Promise<boolean> {
    if (this.isStale(generation)) return false;

    try {
      await unlockAudio();
    } catch {
      // ignore
    }

    if (this.isStale(generation)) return false;

    try {
      el.muted = false;
      el.volume = this.settings.musicVolume;
      await el.play();
      this.autoplayBlocked = false;
      return true;
    } catch {
      // Muted autoplay is permitted even when audible autoplay is blocked.
      try {
        el.muted = true;
        await el.play();
        if (this.isStale(generation)) return false;
        el.muted = false;
        el.volume = this.settings.musicVolume;
        this.autoplayBlocked = false;
        return true;
      } catch {
        this.autoplayBlocked = true;
        return false;
      }
    }
  }

  async playTrack(track: AudioTrack | undefined, key: string, fallbacks: AudioTrack[] = []) {
    if (!track || !this.settings.musicEnabled) {
      this.stopAll();
      return;
    }

    if (this.currentKey === key && this.audio && !this.audio.paused) {
      return;
    }

    const generation = this.playbackGeneration + 1;
    this.stopAll();
    this.playbackGeneration = generation;

    const candidates = [track, ...fallbacks.filter((t) => t.filename !== track.filename)];
    await this.playTrackCandidates(candidates, key, generation);
  }

  private async playTrackCandidates(
    candidates: AudioTrack[],
    key: string,
    generation: number,
    index = 0,
  ): Promise<void> {
    if (this.isStale(generation)) return;

    const track = candidates[index];
    if (!track) {
      if (import.meta.env.DEV) {
        console.warn('[audio] all track candidates failed for', key);
      }
      if (!this.isStale(generation)) {
        this.currentKey = '';
      }
      return;
    }

    const el = new Audio(trackUrl(track.filename));
    el.loop = true;
    el.volume = this.settings.musicVolume;
    el.preload = 'auto';
    el.autoplay = true;
    this.pendingElements.add(el);

    const loaded = await new Promise<boolean>((resolve) => {
      const finish = (ok: boolean) => {
        cleanup();
        resolve(ok);
      };
      const onCanPlay = () => finish(true);
      const onError = () => {
        if (import.meta.env.DEV) {
          console.warn(`[audio] missing or failed: ${track.filename}`);
        }
        finish(false);
      };
      const cleanup = () => {
        el.removeEventListener('canplaythrough', onCanPlay);
        el.removeEventListener('error', onError);
      };
      el.addEventListener('canplaythrough', onCanPlay, { once: true });
      el.addEventListener('error', onError, { once: true });
      if (el.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        finish(true);
        return;
      }
      el.load();
    });

    this.pendingElements.delete(el);

    if (this.isStale(generation)) {
      this.disposeElement(el);
      return;
    }

    if (!loaded) {
      this.disposeElement(el);
      return this.playTrackCandidates(candidates, key, generation, index + 1);
    }

    this.audio = el;
    this.currentKey = key;

    await this.tryStartPlayback(el, generation);
  }

  async setContext(context: MusicContext, chapterId?: string, boardId?: string) {
    if (context === 'none' || !this.settings.musicEnabled) {
      this.stopAll();
      return;
    }

    if (context === 'gameplay') {
      const id = boardId ?? chapterId;
      if (!id) return;
      const track = boardId ? getBoardTrack(boardId) : getChapterTrack(chapterId!);
      const key = boardId ? `gameplay:${boardId}` : `gameplay:${chapterId}`;
      const fallbacks: AudioTrack[] = [];
      if (chapterId) {
        const chapterTrack = getChapterTrack(chapterId);
        if (chapterTrack) fallbacks.push(chapterTrack);
      }
      const theme = getThemeTrack();
      if (theme) fallbacks.push(theme);
      await this.playTrack(track, key, fallbacks);
      return;
    }

    if (context === 'menu' || context === 'map' || context === 'story') {
      await this.playTrack(getThemeTrack(), 'theme');
    }
  }

  /** Call after first user click if autoplay was blocked. */
  async resumeIfNeeded() {
    if (!this.audio || !this.settings.musicEnabled) return;

    if (!this.audio.paused && !this.autoplayBlocked) return;

    const el = this.audio;
    const generation = this.playbackGeneration;
    await this.tryStartPlayback(el, generation);
  }
}

export const musicPlayer = new MusicPlayer();
