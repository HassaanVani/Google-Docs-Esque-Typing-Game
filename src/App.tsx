import { useState } from 'react';
import { GameProvider } from './context/GameContext';
import TitleBar from './components/TitleBar';
import MenuBar from './components/MenuBar';
import Toolbar from './components/Toolbar';
import Ruler from './components/Ruler';
import DocumentArea from './components/DocumentArea';
import StatsPanel from './components/StatsPanel';
import ResultsModal from './components/ResultsModal';
import SettingsModal from './components/SettingsModal';
import './App.css';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <GameProvider>
      <div className="app">
        <div className="app-header">
          <TitleBar />
          <MenuBar onOpenSettings={() => setSettingsOpen(true)} />
          <Toolbar />
        </div>
        <div className="app-body">
          <Ruler />
          <DocumentArea />
        </div>
        <div className="app-footer">
          <StatsPanel />
        </div>
        <ResultsModal />
        <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </div>
    </GameProvider>
  );
}

export default App;
