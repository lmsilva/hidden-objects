import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import {
  musicPlayer,
  DEFAULT_AUDIO_SETTINGS,
  type MusicContext,
} from '@engine/audio/musicPlayer';
import { unlockAudio } from '@engine/audio/audioUnlock';
import { updateSfxSettings } from '@engine/audio/sfxPlayer';
import { useSave } from './SaveContext';

function boardIdFromPath(pathname: string): string | undefined {
  return pathname.match(/\/play\/([^/?#]+)/)?.[1];
}

function chapterIdFromPath(pathname: string): string | undefined {
  const station = pathname.match(/\/station\/([^/?#]+)/)?.[1];
  if (station) return station;
  const story = pathname.match(/\/story\/([^/?#]+)/)?.[1];
  if (story) return story;
  const boardId = boardIdFromPath(pathname);
  return boardId?.match(/^(ch\d+)/)?.[1];
}

function resolveContext(pathname: string): MusicContext {
  if (pathname === '/' || pathname.startsWith('/settings') || pathname.startsWith('/credits')) {
    return 'menu';
  }
  if (pathname.startsWith('/map')) {
    return 'map';
  }
  if (pathname === '/intro' || pathname.startsWith('/story/')) {
    return 'story';
  }
  if (pathname.startsWith('/play/')) {
    return 'gameplay';
  }
  if (pathname.startsWith('/station/')) {
    return 'map';
  }
  return 'none';
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { save, ready } = useSave();

  const musicEnabled = save?.audio.musicEnabled ?? DEFAULT_AUDIO_SETTINGS.musicEnabled;
  const sfxEnabled = save?.audio.sfxEnabled ?? DEFAULT_AUDIO_SETTINGS.sfxEnabled;
  const musicVolume = save?.audio.musicVolume ?? DEFAULT_AUDIO_SETTINGS.musicVolume;

  useEffect(() => {
    musicPlayer.updateSettings({ musicEnabled, sfxEnabled, musicVolume });
    updateSfxSettings(sfxEnabled);
  }, [musicEnabled, sfxEnabled, musicVolume]);

  useEffect(() => {
    if (!musicEnabled) {
      void musicPlayer.setContext('none');
      return;
    }

    const context = resolveContext(pathname);
    const boardId = boardIdFromPath(pathname);
    const chapterId = chapterIdFromPath(pathname);

    if (context === 'gameplay' && boardId) {
      void musicPlayer.setContext('gameplay', chapterId, boardId);
      return;
    }

    void musicPlayer.setContext(context, chapterId);
  }, [pathname, musicEnabled]);

  // Retry after save finishes loading (initial menu visit).
  useEffect(() => {
    if (!ready || !musicEnabled) return;
    void musicPlayer.resumeIfNeeded();
  }, [ready, musicEnabled]);

  useEffect(() => {
    const onGesture = () => {
      void unlockAudio().then(() => musicPlayer.resumeIfNeeded());
    };
    window.addEventListener('pointerdown', onGesture);
    window.addEventListener('keydown', onGesture);
    return () => {
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
    };
  }, []);

  return children;
}
