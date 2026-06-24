import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AUTO_DISMISS_MS = 4000;

type BoardCompleteSplashProps = {
  visible: boolean;
  score: number;
  subtitle: string;
  brakemanLines: string[];
  onDismiss: () => void;
};

export function BoardCompleteSplash({
  visible,
  score,
  subtitle,
  brakemanLines,
  onDismiss,
}: BoardCompleteSplashProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="board-complete-splash"
      onClick={onDismiss}
      aria-label={t('gameplay.completeDismiss')}
    >
      <div className="board-complete-splash-card">
        <p className="board-complete-splash-eyebrow">{t('gameplay.completeEyebrow')}</p>
        <h2 className="board-complete-splash-title">{t('gameplay.completeTitle')}</h2>
        <p className="board-complete-splash-score">
          {t('app.score')}: <strong>{score.toLocaleString()}</strong>
        </p>
        <p className="board-complete-splash-subtitle">{subtitle}</p>
        {brakemanLines.length > 0 ? (
          <ul className="board-complete-splash-bonuses">
            {brakemanLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        <p className="board-complete-splash-hint">{t('gameplay.completeTapHint')}</p>
      </div>
    </button>
  );
}
