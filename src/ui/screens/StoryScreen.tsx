import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lostLineManifest } from '@adventures/the-lost-line';
import { ScreenNav } from '@ui/components/ScreenNav';
import { useSave } from '../../context/SaveContext';

export function StoryScreen() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { save, updateSave } = useSave();

  const chapter = lostLineManifest.chapters.find((c) => c.id === chapterId);

  if (!save || !chapter) {
    return null;
  }

  const story = t(`story.${chapter.id}_complete.body`);
  const title = t(`story.${chapter.id}_complete.title`);
  const letter = t(`letters.${chapter.id}`);

  const finish = () => {
    void updateSave((prev) => {
      const next = structuredClone(prev);
      const ch = next.chapters[chapter.id];
      if (ch) ch.letterRead = true;
      return next;
    });
    navigate('/map');
  };

  return (
    <div className="screen">
      <h1 className="screen-title">{title}</h1>

      <div className="screen-odyssey-layout">
        <ScreenNav
          ariaLabel={t('app.menu')}
          links={[
            { to: '/map', label: t('station.backToMap'), primary: true },
            { to: '/', label: t('app.menu') },
          ]}
        />

        <div className="screen-odyssey-content">
          <div className="story-card" style={{ marginBottom: '1rem' }}>
            {story}
          </div>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)' }}>
            {t('app.readLetter')}
          </h2>
          <div className="story-card" style={{ fontStyle: 'italic' }}>
            {letter}
          </div>
          <button type="button" className="primary" style={{ marginTop: '1.5rem' }} onClick={finish}>
            {t('app.continueStory')}
          </button>
        </div>
      </div>
    </div>
  );
}
