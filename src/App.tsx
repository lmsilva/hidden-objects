import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@ui/components/AppLayout';
import { MainMenu } from '@ui/screens/MainMenu';
import { SettingsScreen } from '@ui/screens/SettingsScreen';
import { CreditsScreen } from '@ui/screens/CreditsScreen';
import { MapScreen } from '@ui/screens/MapScreen';
import { StationScreen } from '@ui/screens/StationScreen';
import { GameplayScreen } from '@ui/screens/GameplayScreen';
import { StoryScreen } from '@ui/screens/StoryScreen';
import { IntroScreen } from '@ui/screens/IntroScreen';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/credits" element={<CreditsScreen />} />
        <Route path="/intro" element={<IntroScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/station/:chapterId" element={<StationScreen />} />
        <Route path="/play/:boardId" element={<GameplayScreen />} />
        <Route path="/story/:chapterId" element={<StoryScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
