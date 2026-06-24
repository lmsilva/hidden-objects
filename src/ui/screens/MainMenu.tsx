import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useSave } from '../../context/SaveContext';



const MENU_BG = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/adventures/the-lost-line/backgrounds/boards/ch01_board01.png`;



export function MainMenu() {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { ready, canContinue, startNewGame } = useSave();



  if (!ready) {

    return <div className="menu-screen menu-screen--loading">Loading…</div>;

  }



  return (

    <div

      className="menu-screen"

      style={{ '--menu-bg': `url(${MENU_BG})` } as CSSProperties}

    >

      <div className="menu-vignette" aria-hidden />

      <div className="menu-card">

        <p className="menu-eyebrow">{t('adventure.tagline')}</p>

        <h1 className="menu-title">{t('adventure.title')}</h1>

        <div className="menu-divider" aria-hidden />

        <div className="menu-actions">

          {canContinue ? (

            <button className="primary" type="button" onClick={() => navigate('/map')}>

              {t('app.continue')}

            </button>

          ) : null}

          <button

            type="button"

            onClick={() => {

              void startNewGame().then(() => navigate('/intro'));

            }}

          >

            {t('app.newGame')}

          </button>

          <button type="button" onClick={() => navigate('/settings')}>

            {t('app.settings')}

          </button>

          <button type="button" onClick={() => navigate('/credits')}>

            {t('app.credits')}

          </button>

        </div>

      </div>

    </div>

  );

}


