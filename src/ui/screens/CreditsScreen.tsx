import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { credits } from '@adventures/the-lost-line';
import audioManifest from '@adventures/the-lost-line/audio/manifest.json';
import type { CreditEntry } from '@engine/types';
import { ScreenNav } from '@ui/components/ScreenNav';

type CreditsSection = 'music' | 'visual';

interface MusicCredits {
  composer: string;
  source: string;
  license: string;
  license_url: string;
  note?: string;
}

type ManifestTrack = {
  slot: string;
  chapterId: string | null;
  station: string;
  title: string;
  filename: string;
  verified: boolean;
};

export function CreditsScreen() {
  const { t } = useTranslation();
  const [section, setSection] = useState<CreditsSection>('music');

  const assets = credits.assets as CreditEntry[];
  const music = (credits as { music?: MusicCredits }).music;
  const allTracks = audioManifest.tracks as ManifestTrack[];
  const themeTrack = allTracks.find((track) => track.slot === 'theme');
  const stationTracks = allTracks.filter((track) => track.slot !== 'theme');

  return (
    <div className="screen credits-screen">
      <h1 className="screen-title">{t('app.credits')}</h1>

      <div className="screen-odyssey-layout">
        <ScreenNav
          ariaLabel={t('app.menu')}
          links={[{ to: '/', label: t('app.menu'), primary: true }]}
        />

        <div className="screen-odyssey-content credits-content">
          <div className="credits-section-tabs" role="tablist" aria-label={t('app.credits')}>
            <button
              type="button"
              role="tab"
              id="credits-tab-music"
              aria-selected={section === 'music'}
              aria-controls="credits-panel-music"
              className={`credits-section-tab ${section === 'music' ? 'credits-section-tab--active' : ''}`}
              onClick={() => setSection('music')}
            >
              {t('credits.musicTitle')}
            </button>
            <button
              type="button"
              role="tab"
              id="credits-tab-visual"
              aria-selected={section === 'visual'}
              aria-controls="credits-panel-visual"
              className={`credits-section-tab ${section === 'visual' ? 'credits-section-tab--active' : ''}`}
              onClick={() => setSection('visual')}
            >
              {t('credits.visualTitle')}
            </button>
          </div>

          {section === 'music' && music ? (
            <section
              id="credits-panel-music"
              role="tabpanel"
              aria-labelledby="credits-tab-music"
              className="credits-panel"
            >
              <header className="credits-panel-header">
                <h2 className="credits-panel-title">{t('credits.musicTitle')}</h2>
                <p className="credits-panel-lead">
                  {t('credits.musicIntro', {
                    composer: music.composer,
                    license: music.license,
                  })}{' '}
                  <a href={music.source} target="_blank" rel="noreferrer">
                    incompetech.com
                  </a>
                  .{' '}
                  <a href={music.license_url} target="_blank" rel="noreferrer">
                    {music.license}
                  </a>
                  {music.note ? `. ${music.note}` : ''}
                </p>
              </header>

              {themeTrack ? (
                <div className="credits-subsection">
                  <h3 className="credits-subsection-title">{t('credits.themeTrack')}</h3>
                  <ul className="credits-list">
                    <li className="credits-list-item">
                      <p className="credits-item-title">&quot;{themeTrack.title}&quot;</p>
                      <p className="credits-item-meta">{themeTrack.station}</p>
                      <p className="credits-item-attribution">
                        {t('credits.trackAttribution', { title: themeTrack.title })}
                      </p>
                    </li>
                  </ul>
                </div>
              ) : null}

              <div className="credits-subsection">
                <h3 className="credits-subsection-title">{t('credits.stationTracks')}</h3>
                <ul className="credits-list credits-list--scroll">
                  {stationTracks.map((track) => (
                    <li key={track.slot} className="credits-list-item">
                      <p className="credits-item-title">&quot;{track.title}&quot;</p>
                      <p className="credits-item-meta">{track.station}</p>
                      <p className="credits-item-attribution">
                        {t('credits.trackAttribution', { title: track.title })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {section === 'visual' ? (
            <section
              id="credits-panel-visual"
              role="tabpanel"
              aria-labelledby="credits-tab-visual"
              className="credits-panel"
            >
              <header className="credits-panel-header">
                <h2 className="credits-panel-title">{t('credits.visualTitle')}</h2>
                <p className="credits-panel-lead">{t('credits.visualIntro')}</p>
              </header>

              <ul className="credits-list credits-list--scroll">
                {assets.map((asset) => (
                  <li key={asset.url} className="credits-list-item">
                    <p className="credits-item-title">
                      {asset.name}
                      {asset.attributionRequired ? ' *' : ''}
                    </p>
                    <p className="credits-item-meta">{asset.creator}</p>
                    <p className="credits-item-link">
                      <a href={asset.url} target="_blank" rel="noreferrer">
                        {asset.url}
                      </a>
                    </p>
                    <p className="credits-item-attribution">{asset.license}</p>
                    {asset.usedIn?.length ? (
                      <p className="credits-item-used">
                        {t('credits.usedIn', { boards: asset.usedIn.join(', ') })}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>

              <p className="credits-footnote">{t('credits.attributionNote')}</p>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
