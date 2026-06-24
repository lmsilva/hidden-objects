import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSave } from '../../context/SaveContext';

const INTRO_BG = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/adventures/the-lost-line/backgrounds/boards/ch01_board01.png`;

const MYSTERY_KEYS = ['prologue.mystery1', 'prologue.mystery2', 'prologue.mystery3'] as const;
const HOW_KEYS = ['prologue.how1', 'prologue.how2', 'prologue.how3', 'prologue.how4'] as const;

export function IntroScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { save, updateSave } = useSave();

  if (!save) {
    return null;
  }

  const returning = save.prologueSeen;

  const finish = () => {
    if (!returning) {
      void updateSave((prev) => ({ ...prev, prologueSeen: true }));
    }
    navigate('/map');
  };

  const bodyParagraphs = t('prologue.body').split('\n\n');

  return (
    <div
      className="intro-screen"
      style={{ '--intro-bg': `url(${INTRO_BG})` } as CSSProperties}
    >
      <div className="intro-vignette" aria-hidden />
      <div className="intro-panel">
        <p className="intro-eyebrow">{t('prologue.eyebrow')}</p>
        <h1 className="intro-title">{t('prologue.title')}</h1>
        <div className="intro-divider" aria-hidden />

        <div className="story-card intro-body">
          {bodyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <div className="story-card intro-list-card">
          <h2 className="intro-section-title">{t('prologue.mysteryTitle')}</h2>
          <ul className="intro-list">
            {MYSTERY_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>

        <div className="story-card intro-list-card">
          <h2 className="intro-section-title">{t('prologue.howTitle')}</h2>
          <ul className="intro-list">
            {HOW_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>

        <button type="button" className="primary intro-begin-btn" onClick={finish}>
          {returning ? t('prologue.backToMap') : t('prologue.begin')}
        </button>
      </div>
    </div>
  );
}
