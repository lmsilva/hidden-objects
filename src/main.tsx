import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import '@engine/i18n';
import { SaveProvider } from './context/SaveContext';
import { AudioProvider } from './context/AudioProvider';
import App from './App';
import './index.css';

const useHashRouter = import.meta.env.VITE_GITHUB_PAGES === 'true';
const Router = useHashRouter ? HashRouter : BrowserRouter;
const routerProps = useHashRouter
  ? {}
  : { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || undefined };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router {...routerProps}>
      <SaveProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </SaveProvider>
    </Router>
  </StrictMode>,
);
