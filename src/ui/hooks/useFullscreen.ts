import { useCallback, useEffect, useState } from 'react';
import {
  enterFullscreen,
  exitFullscreen,
  isAnyFullscreen,
  isFullscreenSupported,
  isPseudoFullscreen,
  toggleFullscreen,
} from '@engine/display/fullscreen';

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(() => isAnyFullscreen());

  const sync = useCallback(() => {
    setIsFullscreen(isAnyFullscreen());
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (isPseudoFullscreen()) {
        void exitFullscreen().then(sync);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', sync);
      document.removeEventListener('webkitfullscreenchange', sync);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [sync]);

  const toggle = useCallback(async () => {
    await toggleFullscreen();
    sync();
  }, [sync]);

  const enter = useCallback(async () => {
    await enterFullscreen();
    sync();
  }, [sync]);

  const exit = useCallback(async () => {
    await exitFullscreen();
    sync();
  }, [sync]);

  return {
    isFullscreen,
    isSupported: isFullscreenSupported(),
    toggle,
    enter,
    exit,
  };
}
