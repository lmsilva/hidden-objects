import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { boardMap, lostLineManifest } from '@adventures/the-lost-line';
import { getBoardProgress } from '@engine/progress/helpers';
import { ScreenNav } from '@ui/components/ScreenNav';
import { useSave } from '../../context/SaveContext';

function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

function boardThumbStyle(background?: string): React.CSSProperties {
  if (background) {
    return {
      backgroundImage: `url(${assetUrl(background)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  return { backgroundColor: '#1a2a3a' };
}

function StationNav({ label }: { label: string }) {
  return (
    <ScreenNav
      ariaLabel={label}
      className="station-nav-actions"
      links={[{ to: '/map', label, primary: true }]}
    />
  );
}

export function StationScreen() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { save } = useSave();

  const chapter = lostLineManifest.chapters.find((c) => c.id === chapterId);
  const backLabel = t('station.backToMap');

  if (!save || !chapter) {
    return (
      <div className="screen station-screen">
        <StationNav label={backLabel} />
        <p className="station-subtitle">{t('app.locked')}</p>
      </div>
    );
  }

  const chapterProgress = save.chapters[chapter.id];
  if (!chapterProgress?.unlocked) {
    return (
      <div className="screen station-screen">
        <StationNav label={backLabel} />
        <p className="station-subtitle">{t('app.locked')}</p>
      </div>
    );
  }

  const completedCount = chapter.boardIds.filter(
    (boardId) => getBoardProgress(save, boardId, chapter.id).completed,
  ).length;
  const heroBoard = boardMap[chapter.boardIds[0]!];

  return (
    <div className="screen station-screen">
      <header className="station-header">
        <h1 className="screen-title station-title">
          {t('station.investigationTitle', { station: t(chapter.stationKey) })}
        </h1>
        <p className="station-subtitle">
          {t(`map.stationPreview.${chapter.id}`, {
            defaultValue: t('station.investigationSubtitle'),
          })}
        </p>
      </header>

      <div className="station-layout">
        <StationNav label={backLabel} />

        <aside className="station-hero-panel map-preview-panel">
          <div
            className="station-hero-thumb map-preview-thumb"
            style={boardThumbStyle(heroBoard?.background)}
          />
          <h2 className="map-preview-title">{t(chapter.stationKey)}</h2>
          <p className="map-preview-blurb">{t('station.investigationLead')}</p>
          <dl className="map-preview-stats station-progress-stats">
            <div>
              <dt>{t('station.locationsCleared')}</dt>
              <dd>
                {completedCount}/{chapter.boardIds.length}
              </dd>
            </div>
          </dl>
          {chapterProgress.completed ? (
            <button
              type="button"
              className="primary map-enter-btn"
              onClick={() => navigate(`/story/${chapter.id}`)}
            >
              {chapterProgress.letterRead ? t('app.continueStory') : t('app.readLetter')}
            </button>
          ) : null}
        </aside>

        <div className="station-locations">
          {chapter.boardIds.map((boardId, index) => {
            const board = boardMap[boardId];
            const bp = getBoardProgress(save, boardId, chapter.id);
            const prevComplete =
              index === 0 ||
              getBoardProgress(save, chapter.boardIds[index - 1]!, chapter.id).completed;
            const playable = prevComplete || bp.completed;

            return (
              <article
                key={boardId}
                className={`station-location-card ${bp.completed ? 'completed' : ''} ${playable ? '' : 'locked'}`}
              >
                <div
                  className="station-location-thumb"
                  style={boardThumbStyle(board?.background)}
                />
                <div className="station-location-body">
                  <span className="station-location-index">
                    {t('station.locationNumber', { number: index + 1 })}
                  </span>
                  <h3 className="station-location-name">
                    {t(`boards.${boardId}.title`, { defaultValue: boardId })}
                  </h3>
                  <p className="station-location-blurb">
                    {t(`boards.${boardId}.blurb`, { defaultValue: '' })}
                  </p>
                  {bp.completed ? (
                    <p className="station-location-score">
                      {t('app.bestScore', { score: bp.bestScore.toLocaleString() })}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    className={playable ? 'primary station-location-btn' : ''}
                    disabled={!playable}
                    onClick={() => navigate(`/play/${boardId}`)}
                  >
                    {!playable
                      ? t('station.locationLocked')
                      : bp.completed
                        ? t('station.replayLocation')
                        : t('station.investigate')}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="station-route-strip map-odyssey-strip" aria-label={t('station.routeLabel')}>
        <div className="map-odyssey-track station-route-track">
          <div className="map-odyssey-line" />
          {chapter.boardIds.map((boardId, index) => {
            const bp = getBoardProgress(save, boardId, chapter.id);
            const prevComplete =
              index === 0 ||
              getBoardProgress(save, chapter.boardIds[index - 1]!, chapter.id).completed;
            const playable = prevComplete || bp.completed;
            const spread = chapter.boardIds.length > 1 ? 84 / (chapter.boardIds.length - 1) : 0;

            return (
              <button
                key={boardId}
                type="button"
                className={`map-odyssey-node station-route-node ${bp.completed ? 'completed' : ''} ${playable ? '' : 'locked'}`}
                style={{ left: `${8 + index * spread}%` }}
                disabled={!playable}
                onClick={() => playable && navigate(`/play/${boardId}`)}
                title={t(`boards.${boardId}.title`, { defaultValue: boardId })}
              >
                <span className="map-odyssey-dot" />
                <span className="map-odyssey-label">
                  {t(`boards.${boardId}.title`, { defaultValue: `${index + 1}` })}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
