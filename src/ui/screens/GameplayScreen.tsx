import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { boardMap } from '@adventures/the-lost-line';
import { lostLineManifest } from '@adventures/the-lost-line';
import {
  createCamera,
  panBy,
  resetCamera,
  zoomAtPoint,
  zoomStep,
  type CameraState,
} from '@engine/camera/panZoom';
import { CAMERA } from '@engine/gameplay/constants';
import { devHitClipPath, objectCenter } from '@engine/gameplay/hitShape';
import {
  getActiveListObjects,
  getHintArea,
  getObjectDisplayName,
  hitTest,
  pickHintTarget,
  selectObjectsForBoard,
} from '@engine/gameplay/objects';
import {
  applyFind,
  applyHint,
  applyMiss,
  computeBoardCompletionBonus,
  createBoardSession,
  serializeBoardSession,
  tickSession,
} from '@engine/gameplay/scoring';
import { applyBoardCompletion, getBoardProgress } from '@engine/progress/helpers';
import { getPostBoardRoute, getNextBoardId } from '@engine/progress/boardNavigation';
import { bootstrapBoardPlay } from '@engine/progress/boardPlay';
import {
  BRAKEMAN_COLLECTION_TOTAL,
  BRAKEMAN_REWARDS,
  calcBrakemanCollectionBonuses,
  countBrakemanSightings,
} from '@engine/progress/brakeman';
import {
  playBrakemanSfx,
  playFindSfx,
  playMissSfx,
  playSpecialFindSfx,
} from '@engine/audio/sfxPlayer';
import type { BoardObject } from '@engine/types';
import { useSave } from '../../context/SaveContext';
import { FindStarBurst } from '@ui/components/FindStarBurst';
import { BoardCompleteSplash } from '@ui/components/BoardCompleteSplash';
import { FullscreenToggle } from '@ui/components/FullscreenToggle';

const SCENE_W = 1920;
const SCENE_H = 1080;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function GameplayScreen() {
  const { boardId } = useParams<{ boardId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { save, updateSave } = useSave();

  const board = boardId ? boardMap[boardId] : undefined;
  const difficulty = save?.difficulty;

  const [session, setSession] = useState(() => createBoardSession(boardId ?? ''));
  const [camera, setCamera] = useState<CameraState>(createCamera);
  const [fitScale, setFitScale] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hintArea, setHintArea] = useState<ReturnType<typeof getHintArea> | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [findBursts, setFindBursts] = useState<Array<{ key: number; x: number; y: number }>>(
    [],
  );
  const [missFloaters, setMissFloaters] = useState<
    Array<{ key: number; x: number; y: number; penalty: number }>
  >([]);
  const [brakemanRewardLines, setBrakemanRewardLines] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const [showCompleteSplash, setShowCompleteSplash] = useState(false);
  const [findList, setFindList] = useState<string[]>([]);
  const [boardReady, setBoardReady] = useState(false);

  const postBoardRouteRef = useRef('/map');
  const saveRef = useRef(save);
  saveRef.current = save;
  const difficultyRef = useRef(difficulty);
  difficultyRef.current = difficulty;

  const viewportRef = useRef<HTMLDivElement>(null);
  const effectKeyRef = useRef(0);
  const dragRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(
    null,
  );
  /** Opt-in via VITE_SHOW_DEV_HITS=true — hidden in normal play (including dev server). */
  const showDevHits = import.meta.env.VITE_SHOW_DEV_HITS === 'true';

  const activeObjects = useMemo(() => {
    if (!board || !difficulty || !save || !boardReady) return [];
    const selected = selectObjectsForBoard(board, difficulty, findList);
    const bp = getBoardProgress(save, board.id, board.chapterId);
    return selected.filter(
      (o) => o.id !== 'easter_egg_brakeman' || !bp.brakemanFound,
    );
  }, [board, difficulty, save, boardReady, findList]);

  const listObjects = useMemo(
    () => getActiveListObjects(activeObjects),
    [activeObjects],
  );

  const remaining = listObjects.filter((o) => !session.foundIds.has(o.id)).length;
  const listTotal = listObjects.length;

  const hasFragmentOnLevel = activeObjects.some((o) => o.collectibleRole === 'fragment');
  const hasCollectibleOnLevel = activeObjects.some((o) => o.collectibleRole === 'collectible');

  const updateFitScale = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    setFitScale(Math.min(w / SCENE_W, h / SCENE_H));
  }, []);

  useEffect(() => {
    updateFitScale();
    window.addEventListener('resize', updateFitScale);
    return () => window.removeEventListener('resize', updateFitScale);
  }, [updateFitScale]);

  useEffect(() => {
    if (paused || complete) return;
    const id = window.setInterval(() => {
      setSession((s) => tickSession(s, 1));
    }, 1000);
    return () => clearInterval(id);
  }, [paused, complete]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const spawnFindBurst = useCallback((obj: BoardObject) => {
    const center = objectCenter(obj.bounds);
    const key = ++effectKeyRef.current;
    setFindBursts((prev) => [...prev, { key, x: center.x, y: center.y }]);
    window.setTimeout(() => {
      setFindBursts((prev) => prev.filter((b) => b.key !== key));
    }, 950);
  }, []);

  const spawnMissFloater = useCallback((x: number, y: number, penalty: number) => {
    const key = ++effectKeyRef.current;
    setMissFloaters((prev) => [...prev, { key, x, y, penalty }]);
    window.setTimeout(() => {
      setMissFloaters((prev) => prev.filter((f) => f.key !== key));
    }, 1100);
  }, []);

  const completionHandled = useRef(false);

  const dismissCompleteSplash = useCallback(() => {
    setShowCompleteSplash(false);
    navigate(postBoardRouteRef.current);
  }, [navigate]);

  useEffect(() => {
    if (!boardId || !board) {
      setBoardReady(false);
      return;
    }
    const s = saveRef.current;
    const d = difficultyRef.current;
    if (!s || !d) return;

    const boot = bootstrapBoardPlay(s, board, d);
    if (!boot.continued) {
      void updateSave(() => boot.save);
    }

    setFindList(boot.save.boardFindLists?.[board.id] ?? []);
    setSession(boot.session);
    completionHandled.current = false;
    setCamera(createCamera());
    setComplete(false);
    setShowCompleteSplash(false);
    setPaused(false);
    setHintArea(null);
    setFindBursts([]);
    setMissFloaters([]);
    setBrakemanRewardLines([]);
    setBoardReady(true);
  }, [boardId, board, updateSave]);

  useEffect(() => {
    if (!boardId || complete || !boardReady) return;
    if (session.foundIds.size === 0) return;

    const id = window.setTimeout(() => {
      void updateSave((prev) => ({
        ...prev,
        activeBoardSessions: {
          ...(prev.activeBoardSessions ?? {}),
          [boardId]: serializeBoardSession(session),
        },
      }));
    }, 400);

    return () => window.clearTimeout(id);
  }, [session.foundIds, session.score, session.hintsUsed, boardId, complete, boardReady, updateSave]);

  const sceneToScreenScale = fitScale * camera.zoom;

  const clientToScene = useCallback(
    (clientX: number, clientY: number) => {
      const el = viewportRef.current;
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left - camera.panX) / sceneToScreenScale;
      const y = (clientY - rect.top - camera.panY) / sceneToScreenScale;
      return { x, y };
    },
    [camera.panX, camera.panY, sceneToScreenScale],
  );

  const handleFind = useCallback(
    (obj: BoardObject) => {
      if (obj.type === 'easter_egg' && save && board) {
        const bp = getBoardProgress(save, board.id, board.chapterId);
        if (bp.brakemanFound) return;
      }

      setSession((s) => applyFind(s, obj));
      spawnFindBurst(obj);

      if (save?.audio.sfxEnabled) {
        if (obj.type === 'special') playSpecialFindSfx();
        else if (obj.type === 'easter_egg') playBrakemanSfx();
        else playFindSfx();
      }

      if (obj.type === 'easter_egg' && save) {
        const nextCount = countBrakemanSightings(save) + 1;
        setToast(
          t('gameplay.brakemanCollection', {
            count: nextCount,
            total: BRAKEMAN_COLLECTION_TOTAL,
            points: BRAKEMAN_REWARDS.pointsPerFirstFind,
          }),
        );
      }
    },
    [t, save, board, spawnFindBurst],
  );

  const handleTap = useCallback(
    (clientX: number, clientY: number) => {
      if (paused || complete || !difficulty) return;
      const { x, y } = clientToScene(clientX, clientY);
      const hit = hitTest(x, y, activeObjects, session.foundIds);
      if (hit) {
        handleFind(hit);
      } else {
        const { session: next, penalty } = applyMiss(session, difficulty);
        setSession(next);
        if (penalty > 0) {
          if (save?.audio.sfxEnabled) playMissSfx();
          spawnMissFloater(x, y, penalty);
        }
      }
    },
    [
      paused,
      complete,
      difficulty,
      clientToScene,
      activeObjects,
      session,
      handleFind,
      save?.audio.sfxEnabled,
      spawnMissFloater,
    ],
  );

  useEffect(() => {
    if (!board || !boardReady || complete || completionHandled.current) return;
    if (listObjects.length === 0) return;

    const allListFound = listObjects.every((o) => session.foundIds.has(o.id));
    if (!allListFound) return;

    completionHandled.current = true;

    const specialsFound = activeObjects
      .filter((o) => o.type === 'special')
      .every((o) => session.foundIds.has(o.id));

    const bonus = difficulty
      ? computeBoardCompletionBonus(session, difficulty, specialsFound)
      : 0;
    const finalScore = Math.max(0, session.score + bonus);
    setComplete(true);

    if (save) {
      const bp = getBoardProgress(save, board.id, board.chapterId);
      const brakemanNew =
        session.foundIds.has('easter_egg_brakeman') && !bp.brakemanFound;
      if (brakemanNew) {
        const preview = structuredClone(save);
        const ch = preview.chapters[board.chapterId] ?? {
          chapterId: board.chapterId,
          unlocked: false,
          completed: false,
          letterRead: false,
          boards: {},
        };
        preview.chapters[board.chapterId] = ch;
        const existing = ch.boards[board.id] ?? getBoardProgress(preview, board.id, board.chapterId);
        ch.boards[board.id] = { ...existing, brakemanFound: true };
        const rewards = calcBrakemanCollectionBonuses(preview, true);
        const lines: string[] = [];
        if (rewards.milestone !== null) {
          lines.push(
            t('gameplay.brakemanMilestone', { count: rewards.milestone }),
          );
        }
        if (rewards.mvpComplete) {
          lines.push(t('gameplay.brakemanMvpComplete'));
        }
        if (rewards.fullComplete) {
          lines.push(t('gameplay.brakemanFullComplete'));
        }
        setBrakemanRewardLines(lines);
      }
    }

    void updateSave((prev) => {
      const next = applyBoardCompletion(prev, lostLineManifest, board, session, finalScore);
      postBoardRouteRef.current = getPostBoardRoute(board.id, next, lostLineManifest);
      return next;
    });
    setShowCompleteSplash(true);
  }, [
    session,
    listObjects,
    activeObjects,
    board,
    boardReady,
    complete,
    difficulty,
    updateSave,
    save,
    t,
  ]);

  const onPointerDown = (e: ReactPointerEvent) => {
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: e.clientX,
      startY: e.clientY,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragRef.current || !difficulty?.panZoomEnabled || camera.zoom <= 1) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    dragRef.current = { ...dragRef.current, x: e.clientX, y: e.clientY };
    setCamera((c) => panBy(c, dx, dy, SCENE_W * fitScale, SCENE_H * fitScale));
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (!dragRef.current) return;
    const dx = Math.abs(e.clientX - dragRef.current.startX);
    const dy = Math.abs(e.clientY - dragRef.current.startY);
    dragRef.current = null;
    if (dx < 8 && dy < 8) {
      handleTap(e.clientX, e.clientY);
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!difficulty?.panZoomEnabled) return;
    e.preventDefault();
    const delta = -e.deltaY * CAMERA.WHEEL_SENSITIVITY * 10;
    const { x, y } = clientToScene(e.clientX, e.clientY);
    setCamera((c) =>
      zoomAtPoint(c, delta, x * fitScale, y * fitScale, SCENE_W * fitScale, SCENE_H * fitScale),
    );
  };

  const useHint = () => {
    if (!difficulty || session.hintCooldownRemaining > 0) return;
    const target = pickHintTarget(activeObjects, session.foundIds);
    if (!target) return;
    setSession((s) => applyHint(s, difficulty));
    setHintArea(getHintArea(target.bounds));
    window.setTimeout(() => setHintArea(null), 4000);
  };

  if (!save || !board || !difficulty || !boardReady) {
    return null;
  }

  const hintReady = session.hintCooldownRemaining <= 0;
  const hintCooldownTotal = difficulty.hintCooldownSeconds;
  const hintFillPercent = hintReady
    ? 100
    : Math.min(
        100,
        ((hintCooldownTotal - session.hintCooldownRemaining) / hintCooldownTotal) * 100,
      );


  return (
    <div className="game-shell">
      <div className="hud-top">
        <span className="hud-stat">
          {t('app.score')}: <strong>{session.score.toLocaleString()}</strong>
        </span>
        <span className="hud-stat">
          {t('app.time')}: {formatTime(session.elapsedSeconds)}
        </span>
        <span className="hud-stat">{t('app.itemsLeft', { count: remaining })}</span>
        {hasFragmentOnLevel ? (
          <span className="hud-stat">
            {t('app.fragments')}: {save.mapFragmentsCollected}
          </span>
        ) : null}
        {hasCollectibleOnLevel ? (
          <span className="hud-stat">
            {t('app.tokens')}: {save.brassTokensCollected}
          </span>
        ) : null}
      </div>

      <div
        className="game-viewport-wrap"
        ref={viewportRef}
        onWheel={onWheel}
      >
        <div className="game-viewport-overlay game-viewport-overlay--tl">
          <button type="button" className="game-chrome-btn" onClick={() => navigate(`/station/${board.chapterId}`)}>
            {t('app.menu')}
          </button>
          <button type="button" className="game-chrome-btn" onClick={() => setPaused((p) => !p)}>
            {paused ? t('app.resume') : t('app.pause')}
          </button>
        </div>

        <div className="game-viewport-overlay game-viewport-overlay--tr">
          <FullscreenToggle variant="compact" />
          {difficulty.panZoomEnabled ? (
            <div className="zoom-controls">
              <button
                type="button"
                className="game-chrome-btn game-chrome-btn--icon"
                title={t('app.zoomIn')}
                onClick={() => setCamera((c) => zoomStep(c, 1))}
              >
                +
              </button>
              <button
                type="button"
                className="game-chrome-btn game-chrome-btn--icon"
                title={t('app.zoomOut')}
                onClick={() => setCamera((c) => zoomStep(c, -1))}
              >
                −
              </button>
              <button
                type="button"
                className="game-chrome-btn game-chrome-btn--icon"
                title={t('app.resetView')}
                onClick={() => setCamera(resetCamera())}
              >
                ⌂
              </button>
            </div>
          ) : null}
        </div>

        <div
          className="game-viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragRef.current = null;
          }}
        >
          <div
            className="scene-layer"
            style={{
              transform: `translate(${camera.panX}px, ${camera.panY}px) scale(${sceneToScreenScale})`,
            }}
          >
            <div
              className="scene-bg"
              style={{
                backgroundImage: board.background
                  ? `url(${import.meta.env.BASE_URL.replace(/\/$/, '')}${board.background})`
                  : undefined,
                backgroundColor: board.backgroundColor ?? '#1a2a3a',
              }}
            />
            {hintArea ? (
              <div
                className="hint-glow"
                style={{
                  left: hintArea.x,
                  top: hintArea.y,
                  width: hintArea.width,
                  height: hintArea.height,
                }}
              />
            ) : null}
            {findBursts.map((burst) => (
              <div
                key={burst.key}
                className="find-star-anchor"
                style={{ left: burst.x, top: burst.y }}
              >
                <FindStarBurst />
              </div>
            ))}
            {missFloaters.map((floater) => (
              <div
                key={floater.key}
                className="miss-penalty-floater"
                style={{ left: floater.x, top: floater.y }}
              >
                −{floater.penalty}
              </div>
            ))}
            {showDevHits
              ? activeObjects.map((obj) => {
                  const clip = devHitClipPath(obj.bounds);
                  return (
                  <div
                    key={obj.id}
                    className={`dev-hit-area ${session.foundIds.has(obj.id) ? 'found' : ''}`}
                    style={{
                      left: obj.bounds.x,
                      top: obj.bounds.y,
                      width: obj.bounds.width,
                      height: obj.bounds.height,
                      clipPath: clip,
                    }}
                  >
                    <span className="dev-hit-label">{getObjectDisplayName(obj, t)}</span>
                  </div>
                  );
                })
              : null}
          </div>
          {toast ? <div className="toast toast--info">{toast}</div> : null}
        </div>
      </div>

      <div className="hud-bottom">
        <p className="object-list-heading object-list-heading--primary">
          {t('gameplay.findTheseProgress', { remaining, total: listTotal })}
        </p>
        <div className="object-list">
          {listObjects.map((obj) => (
            <span
              key={obj.id}
              className={`object-list-item ${session.foundIds.has(obj.id) ? 'found' : ''} ${obj.type === 'special' ? 'special' : ''}`}
            >
              {session.foundIds.has(obj.id) ? (
                <span className="object-found-mark" aria-hidden>
                  ✓
                </span>
              ) : null}
              {getObjectDisplayName(obj, t)}
            </span>
          ))}
        </div>
        <div className="hud-controls hud-controls--hint-only">
          <div className="hint-block">
            <button
              type="button"
              className={`hint-btn hint-btn--compact ${hintReady ? 'hint-btn--ready' : ''}`}
              disabled={!hintReady || paused || complete}
              onClick={useHint}
              title={
                hintReady
                  ? t('gameplay.hintReady')
                  : t('gameplay.hintCooldown', {
                      seconds: Math.ceil(session.hintCooldownRemaining),
                    })
              }
            >
              {t('app.hint')}
            </button>
            <div
              className="hint-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={hintCooldownTotal}
              aria-valuenow={hintReady ? hintCooldownTotal : Math.round(hintCooldownTotal - session.hintCooldownRemaining)}
              aria-label={
                hintReady
                  ? t('gameplay.hintReady')
                  : t('gameplay.hintCooldown', {
                      seconds: Math.ceil(session.hintCooldownRemaining),
                    })
              }
            >
              <div className="hint-bar-fill" style={{ width: `${hintFillPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {showCompleteSplash && board ? (
        <BoardCompleteSplash
          visible={showCompleteSplash}
          score={session.score}
          subtitle={
            (() => {
              const nextId = getNextBoardId(board.id, lostLineManifest);
              if (nextId) {
                return t('gameplay.completeNextBoard', {
                  location: t(`boards.${nextId}.title`, { defaultValue: nextId }),
                });
              }
              return t('gameplay.completeChapterDone');
            })()
          }
          brakemanLines={brakemanRewardLines}
          onDismiss={dismissCompleteSplash}
        />
      ) : null}

      {paused && !complete ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <div className="story-card" style={{ textAlign: 'center' }}>
            <h2>{t('app.pause')}</h2>
            <button type="button" className="primary" onClick={() => setPaused(false)}>
              {t('app.resume')}
            </button>
            <button
              type="button"
              style={{ marginLeft: '0.5rem' }}
              onClick={() => navigate(`/station/${board.chapterId}`)}
            >
              {t('app.quitToMenu')}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
