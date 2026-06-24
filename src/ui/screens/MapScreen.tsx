import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lostLineManifest, boardMap } from '@adventures/the-lost-line';
import {
  BRAKEMAN_COLLECTION_TOTAL,
  BRAKEMAN_MVP_BOARDS,
  countBrakemanSightings,
  getNextMilestone,
} from '@engine/progress/brakeman';
import { getMapRestorePercent, isStationUnlocked } from '@engine/progress/helpers';
import {
  labelAnchor,
  segmentStroke,
  subwayPathD,
} from '@engine/map/transitLayout';
import { useSave } from '../../context/SaveContext';
import { ScreenNav } from '@ui/components/ScreenNav';

const SCENE_W = 800;
const SCENE_H = 400;

function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

function getStationPreviewStyle(chapterId: string): React.CSSProperties {
  const chapter = lostLineManifest.chapters.find((c) => c.id === chapterId);
  const firstBoardId = chapter?.boardIds[0];
  const board = firstBoardId ? boardMap[firstBoardId] : undefined;
  if (board?.background) {
    return {
      backgroundImage: `url(${assetUrl(board.background)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  return { backgroundColor: board?.backgroundColor ?? '#1a2a3a' };
}

export function MapScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { save } = useSave();
  const [selectedId, setSelectedId] = useState(lostLineManifest.stations[0]?.id ?? '');

  const mvpStations = lostLineManifest.stations.filter((s) => s.mvp);
  const restorePct = save ? getMapRestorePercent(save, mvpStations.length) : 0;

  const selected = lostLineManifest.stations.find((s) => s.id === selectedId);

  const selectedUnlocked = useMemo(() => {
    if (!save || !selected) return false;
    return selected.mvp
      ? isStationUnlocked(save, selected.chapterId, true)
      : false;
  }, [save, selected]);

  const visibleSegments = useMemo(() => lostLineManifest.lineSegments, []);

  if (save && !save.prologueSeen) {
    return <Navigate to="/intro" replace />;
  }

  const selectStation = (stationId: string, unlocked: boolean) => {
    if (!unlocked) return;
    setSelectedId(stationId);
  };

  const enterStation = () => {
    if (!selected || !selectedUnlocked) return;
    navigate(`/station/${selected.chapterId}`);
  };

  if (!save) {
    return (
      <div className="screen">
        <h1 className="screen-title">{t('app.map')}</h1>
        <div className="screen-odyssey-layout">
          <ScreenNav
            ariaLabel={t('app.menu')}
            links={[{ to: '/', label: t('app.menu'), primary: true }]}
          />
        </div>
      </div>
    );
  }

  const brakemanCount = countBrakemanSightings(save);
  const brakemanNext = getNextMilestone(brakemanCount);

  return (
    <div className="screen map-screen">
      <h1 className="screen-title">{t('app.map')}</h1>

      <div className="map-odyssey-layout">
        <ScreenNav
          ariaLabel={t('app.menu')}
          links={[
            { to: '/', label: t('app.menu'), primary: true },
            { to: '/intro', label: t('app.gameOverview') },
          ]}
        />

        {selected ? (
          <aside className="map-preview-panel">
            <div className="map-preview-thumb" style={getStationPreviewStyle(selected.chapterId)} />
            <h2 className="map-preview-title">{t(selected.labelKey)}</h2>
            <p className="map-preview-blurb">
              {t(`map.stationPreview.${selected.chapterId}`, {
                defaultValue: t('map.selectStation'),
              })}
            </p>
            <dl className="map-preview-stats">
              <div>
                <dt>{t('map.lineRestored', { percent: restorePct })}</dt>
              </div>
              <div>
                <dt>{t('app.fragments')}</dt>
                <dd>{save.mapFragmentsCollected}</dd>
              </div>
              <div>
                <dt>{t('app.brakemanCollectionTitle')}</dt>
                <dd>
                  {brakemanCount}/{BRAKEMAN_COLLECTION_TOTAL}
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                    {' '}
                    (MVP {Math.min(brakemanCount, BRAKEMAN_MVP_BOARDS)}/{BRAKEMAN_MVP_BOARDS})
                  </span>
                </dd>
              </div>
            </dl>
            <div className="brakeman-collection-bar" aria-hidden>
              <div
                className="brakeman-collection-fill"
                style={{
                  width: `${(brakemanCount / BRAKEMAN_COLLECTION_TOTAL) * 100}%`,
                }}
              />
            </div>
            {brakemanNext ? (
              <p className="map-preview-blurb" style={{ margin: 0 }}>
                {t('map.brakemanNextMilestone', { count: brakemanNext })}
              </p>
            ) : (
              <p className="map-preview-blurb" style={{ margin: 0, color: 'var(--accent-gold)' }}>
                {t('map.brakemanCollectionComplete')}
              </p>
            )}
            <button
              type="button"
              className="primary map-enter-btn"
              disabled={!selectedUnlocked}
              onClick={enterStation}
            >
              {selectedUnlocked ? t('map.enterStation') : t('app.locked')}
            </button>
          </aside>
        ) : null}

        <div className="map-diagram-wrap">
          <div className="map-container">
            <svg
              className="map-svg"
              viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
              role="img"
              aria-label={t('app.map')}
            >
              <defs>
                <pattern
                  id="map-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                </pattern>
                <linearGradient id="map-water" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1a3344" />
                  <stop offset="100%" stopColor="#0f2230" />
                </linearGradient>
              </defs>
              <rect width={SCENE_W} height={SCENE_H} fill="url(#map-water)" />
              <rect width={SCENE_W} height={SCENE_H} fill="url(#map-grid)" />
              <text
                x={SCENE_W - 16}
                y={28}
                textAnchor="end"
                className="map-svg-title"
              >
                Meridian Line
              </text>
              {visibleSegments.map((seg) => {
                const from = lostLineManifest.stations.find((s) => s.id === seg.from);
                const to = lostLineManifest.stations.find((s) => s.id === seg.to);
                if (!from || !to) return null;
                const style = segmentStroke(save, seg, to);
                return (
                  <path
                    key={`${seg.from}-${seg.to}`}
                    d={subwayPathD(from, to)}
                    fill="none"
                    stroke={style.stroke}
                    strokeWidth={style.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={style.strokeDasharray}
                    opacity={style.opacity}
                  />
                );
              })}
              {lostLineManifest.stations.map((station) => {
                const unlocked = station.mvp
                  ? isStationUnlocked(save, station.chapterId, true)
                  : false;
                const completed = save.chapters[station.chapterId]?.completed;
                const isSelected = station.id === selectedId;
                const label = labelAnchor(station);
                const labelText = station.mvp ? t(station.labelKey) : t('app.comingSoon');
                return (
                  <g
                    key={station.id}
                    className={`map-station ${unlocked ? '' : 'locked'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => selectStation(station.id, unlocked)}
                    style={{ cursor: unlocked ? 'pointer' : 'not-allowed' }}
                  >
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? 15 : completed ? 13 : 11}
                      fill={unlocked ? station.lineColor : '#6b7a8a'}
                      stroke={isSelected ? '#f4d58d' : '#e8eef2'}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      className={`map-station-label ${isSelected ? 'selected' : ''}`}
                    >
                      {labelText}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      <div className="map-odyssey-strip" aria-label={t('map.stripLabel')}>
        <div className="map-odyssey-track">
          <div className="map-odyssey-line" />
          {lostLineManifest.stations.map((station, index) => {
            const unlocked = station.mvp
              ? isStationUnlocked(save, station.chapterId, true)
              : false;
            const isSelected = station.id === selectedId;
            const completed = save.chapters[station.chapterId]?.completed;
            return (
              <button
                key={station.id}
                type="button"
                className={`map-odyssey-node ${isSelected ? 'active' : ''} ${unlocked ? '' : 'locked'} ${completed ? 'completed' : ''}`}
                style={{ left: `${8 + index * 18}%` }}
                onClick={() => selectStation(station.id, unlocked)}
                disabled={!unlocked}
                title={station.mvp ? t(station.labelKey) : t('app.comingSoon')}
              >
                <span className="map-odyssey-dot" />
                <span className="map-odyssey-label">
                  {station.mvp ? t(station.labelKey) : '…'}
                </span>
              </button>
            );
          })}
        </div>
        {selected ? (
          <p className="map-odyssey-selection">
            {t('map.selected')}: <strong>{t(selected.labelKey)}</strong>
          </p>
        ) : null}
      </div>
    </div>
  );
}
