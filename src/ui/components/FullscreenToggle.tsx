import { useTranslation } from 'react-i18next';
import { useFullscreen } from '@ui/hooks/useFullscreen';

interface FullscreenToggleProps {
  /** Larger label on menu screens; icon-only when compact */
  variant?: 'menu' | 'compact';
}

export function FullscreenToggle({ variant = 'compact' }: FullscreenToggleProps) {
  const { t } = useTranslation();
  const { isFullscreen, toggle } = useFullscreen();

  const label = isFullscreen ? t('app.exitFullscreen') : t('app.enterFullscreen');
  const icon = isFullscreen ? '⤢' : '⛶';

  return (
    <button
      type="button"
      className={`fullscreen-toggle ${variant} ${isFullscreen ? 'is-active' : ''}`}
      onClick={() => void toggle()}
      title={label}
      aria-label={label}
      aria-pressed={isFullscreen}
    >
      <span className="fullscreen-toggle-icon" aria-hidden>
        {icon}
      </span>
      {variant === 'menu' ? <span className="fullscreen-toggle-label">{label}</span> : null}
    </button>
  );
}
