const PSEUDO_CLASS = 'game-pseudo-fullscreen';

type FsElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
};

type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
};

function doc(): FsDocument {
  return document;
}

export function isFullscreenSupported(): boolean {
  return (
    typeof document !== 'undefined' &&
    (document.fullscreenEnabled === true ||
      !!(doc().documentElement as FsElement).webkitRequestFullscreen)
  );
}

export function isNativeFullscreen(): boolean {
  return !!(document.fullscreenElement ?? doc().webkitFullscreenElement);
}

export function isPseudoFullscreen(): boolean {
  return document.documentElement.classList.contains(PSEUDO_CLASS);
}

export function isAnyFullscreen(): boolean {
  return isNativeFullscreen() || isPseudoFullscreen();
}

export async function enterNativeFullscreen(
  element: HTMLElement = document.documentElement,
): Promise<void> {
  const el = element as FsElement;
  if (element.requestFullscreen) {
    await element.requestFullscreen();
    return;
  }
  if (el.webkitRequestFullscreen) {
    await el.webkitRequestFullscreen();
  }
}

export async function exitNativeFullscreen(): Promise<void> {
  if (document.exitFullscreen) {
    await document.exitFullscreen();
    return;
  }
  const webkitExit = doc().webkitExitFullscreen;
  if (webkitExit) {
    await webkitExit.call(document);
  }
}

export function enterPseudoFullscreen(): void {
  document.documentElement.classList.add(PSEUDO_CLASS);
}

export function exitPseudoFullscreen(): void {
  document.documentElement.classList.remove(PSEUDO_CLASS);
}

export async function enterFullscreen(): Promise<void> {
  if (isAnyFullscreen()) return;

  if (isFullscreenSupported()) {
    try {
      await enterNativeFullscreen();
      return;
    } catch {
      // Fall through to pseudo fullscreen (e.g. iOS, denied permission).
    }
  }

  enterPseudoFullscreen();
}

export async function exitFullscreen(): Promise<void> {
  if (isNativeFullscreen()) {
    await exitNativeFullscreen();
  }
  if (isPseudoFullscreen()) {
    exitPseudoFullscreen();
  }
}

export async function toggleFullscreen(): Promise<boolean> {
  if (isAnyFullscreen()) {
    await exitFullscreen();
    return false;
  }
  await enterFullscreen();
  return isAnyFullscreen();
}
