import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createDifficultyFromPreset,
  getPresetSummaryKey,
} from '@engine/gameplay/constants';
import { createInitialSave } from '@engine/save/persistence';
import type { DifficultyPreset, DifficultySettings } from '@engine/types';
import { ScreenNav } from '@ui/components/ScreenNav';
import { lostLineManifest } from '@adventures/the-lost-line';
import { useSave } from '../../context/SaveContext';

export function SettingsScreen() {
  const { t } = useTranslation();
  const { save, setDifficulty, updateSave, resetProgress, clearAllCacheAndData, exportSave, importSave } =
    useSave();

  const defaults = useMemo(
    () => createInitialSave(lostLineManifest.id),
    [],
  );

  const settings = save ?? defaults;
  const d = settings.difficulty;
  const apply = (next: DifficultySettings) => {
    void setDifficulty(next);
  };

  const selectPreset = (preset: DifficultyPreset) => {
    if (preset === 'custom') {
      apply({ ...d, preset: 'custom' });
    } else {
      apply(createDifficultyFromPreset(preset));
    }
  };

  const patchCustom = (patch: Partial<DifficultySettings>) => {
    apply({ ...d, preset: 'custom', ...patch });
  };

  const handleExport = () => {
    const json = exportSave();
    if (!json) return;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lost-line-save.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          void importSave(String(reader.result));
        } catch {
          alert('Invalid save file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="screen">
      <h1 className="screen-title">{t('settings.title')}</h1>

      <div className="screen-odyssey-layout">
        <ScreenNav
          ariaLabel={t('app.menu')}
          links={[{ to: '/', label: t('app.menu'), primary: true }]}
        />

        <div className="screen-odyssey-content">
      <div className="settings-group">
        <h3>{t('settings.difficulty')}</h3>
        <div className="preset-grid">
          {(['relaxed', 'normal', 'hard', 'custom'] as const).map((preset) => (
            <button
              key={preset}
              type="button"
              className={`preset-card ${d.preset === preset ? 'active' : ''}`}
              onClick={() => selectPreset(preset)}
            >
              <strong style={{ textTransform: 'capitalize' }}>{preset}</strong>
              <small>
                {preset === 'custom'
                  ? t('settings.difficulty.custom.summary')
                  : t(getPresetSummaryKey(preset))}
              </small>
            </button>
          ))}
        </div>
      </div>

      {d.preset === 'custom' ? (
        <div className="settings-group">
          <div className="form-row">
            <label>{t('settings.objectCount')}</label>
            <input
              type="range"
              min={6}
              max={15}
              value={d.objectCount}
              onChange={(e) => patchCustom({ objectCount: Number(e.target.value) })}
            />
            <span>{d.objectCount}</span>
          </div>
          <div className="form-row">
            <label>{t('settings.timeMode')}</label>
            <select
              value={d.timeMode}
              onChange={(e) =>
                patchCustom({ timeMode: e.target.value as DifficultySettings['timeMode'] })
              }
            >
              <option value="none">{t('settings.timeMode.none')}</option>
              <option value="soft">{t('settings.timeMode.soft')}</option>
              <option value="strict">{t('settings.timeMode.strict')}</option>
            </select>
          </div>
          <div className="form-row">
            <label>{t('settings.parTime')}</label>
            <input
              type="number"
              min={2}
              max={8}
              value={Math.round(d.parTimeSeconds / 60)}
              onChange={(e) =>
                patchCustom({ parTimeSeconds: Number(e.target.value) * 60 })
              }
            />
          </div>
          <div className="form-row">
            <label>{t('settings.missPenalty')}</label>
            <select
              value={d.missPenalty}
              onChange={(e) =>
                patchCustom({
                  missPenalty: e.target.value as DifficultySettings['missPenalty'],
                })
              }
            >
              <option value="none">{t('settings.missPenalty.none')}</option>
              <option value="spam">{t('settings.missPenalty.spam')}</option>
              <option value="every">{t('settings.missPenalty.every')}</option>
            </select>
          </div>
          <div className="form-row">
            <label>{t('settings.hintCooldown')}</label>
            <input
              type="number"
              min={30}
              max={120}
              value={d.hintCooldownSeconds}
              onChange={(e) =>
                patchCustom({ hintCooldownSeconds: Number(e.target.value) })
              }
            />
          </div>
          <div className="form-row">
            <label>{t('settings.hintPenalty')}</label>
            <input
              type="number"
              min={0}
              max={500}
              step={25}
              value={d.hintPenalty}
              onChange={(e) => patchCustom({ hintPenalty: Number(e.target.value) })}
            />
          </div>
          <div className="form-row">
            <label>{t('settings.panZoom')}</label>
            <input
              type="checkbox"
              checked={d.panZoomEnabled}
              onChange={(e) => patchCustom({ panZoomEnabled: e.target.checked })}
            />
          </div>
        </div>
      ) : null}

      <div className="settings-group">
        <h3>{t('settings.audio')}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {t('settings.audioNote')}
        </p>
        <div className="form-row">
          <label>{t('settings.music')}</label>
          <input
            type="checkbox"
            checked={settings.audio.musicEnabled}
            onChange={(e) =>
              void updateSave((prev) => ({
                ...prev,
                audio: { ...prev.audio, musicEnabled: e.target.checked },
              }))
            }
          />
        </div>
        <div className="form-row">
          <label>{t('settings.sfx')}</label>
          <input
            type="checkbox"
            checked={settings.audio.sfxEnabled}
            onChange={(e) =>
              void updateSave((prev) => ({
                ...prev,
                audio: { ...prev.audio, sfxEnabled: e.target.checked },
              }))
            }
          />
        </div>
        <div className="form-row">
          <label>{t('settings.musicVolume')}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.audio.musicVolume}
            onChange={(e) =>
              void updateSave((prev) => ({
                ...prev,
                audio: { ...prev.audio, musicVolume: Number(e.target.value) },
              }))
            }
          />
        </div>
      </div>

      <div className="settings-group menu-actions">
        <button type="button" onClick={handleExport} disabled={!save}>
          {t('app.exportSave')}
        </button>
        <button type="button" onClick={handleImport}>
          {t('app.importSave')}
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(t('app.confirmReset'))) {
              void resetProgress();
            }
          }}
        >
          {t('app.resetProgress')}
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(t('app.confirmClearCache'))) {
              void clearAllCacheAndData();
            }
          }}
        >
          {t('app.clearCacheAndData')}
        </button>
      </div>
        </div>
      </div>
    </div>
  );
}
