import type { ReactNode } from 'react';

import { useLocation } from 'react-router-dom';

import { FullscreenToggle } from '@ui/components/FullscreenToggle';



export function AppLayout({ children }: { children: ReactNode }) {

  const { pathname } = useLocation();

  const showFullscreen = pathname !== '/' && !pathname.startsWith('/play/');



  return (

    <div className="app-layout">

      {showFullscreen ? (

        <div className="app-layout-chrome">

          <FullscreenToggle variant="compact" />

        </div>

      ) : null}

      {children}

    </div>

  );

}


