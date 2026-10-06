import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuickSearch } from './components/QuickSearch';
import { TwoPlayerHub } from './components/TwoPlayerHub';
import { PhasesActions } from './components/PhasesActions';
import { SetupGuide } from './components/SetupGuide';
import { EndGameScoring } from './components/EndGameScoring';
import { FAQSection } from './components/FAQSection';
import { GithubDeployGuide } from './components/GithubDeployGuide';
import { Rocket, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('twoplayer');
  const [colonyLevel, setColonyLevel] = useState<number>(1);
  const [missionsRemaining, setMissionsRemaining] = useState<number>(3);
  const [shuttlePosition, setShuttlePosition] = useState<'orbit' | 'colony'>('orbit');
  const [shuttleTravelCount, setShuttleTravelCount] = useState<number>(1);

  // If Colony Level rises to 3 or 4 or 5, automatically adjust or suggest mission threshold
  const handleSetColonyLevel = (lvl: number) => {
    setColonyLevel(lvl);
    if (lvl === 5) {
      setMissionsRemaining(0);
    } else if (lvl === 4 && missionsRemaining > 1) {
      setMissionsRemaining(1);
    } else if (lvl === 3 && missionsRemaining > 2) {
      setMissionsRemaining(2);
    }
  };

  const handleNavigateToAction = (_actionId: string) => {
    setActiveTab('actions');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950">
      {/* Background Star & Mars Glow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Top Header & Sticky Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        colonyLevel={colonyLevel}
        setColonyLevel={handleSetColonyLevel}
        missionsRemaining={missionsRemaining}
        setMissionsRemaining={setMissionsRemaining}
        shuttlePosition={shuttlePosition}
        setShuttlePosition={setShuttlePosition}
        shuttleTravelCount={shuttleTravelCount}
        setShuttleTravelCount={setShuttleTravelCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8 z-10">
        {activeTab === 'search' && (
          <QuickSearch onNavigateToAction={handleNavigateToAction} />
        )}

        {activeTab === 'twoplayer' && (
          <TwoPlayerHub
            colonyLevel={colonyLevel}
            setColonyLevel={handleSetColonyLevel}
            missionsRemaining={missionsRemaining}
            setMissionsRemaining={setMissionsRemaining}
            shuttlePosition={shuttlePosition}
            setShuttlePosition={setShuttlePosition}
          />
        )}

        {activeTab === 'actions' && (
          <PhasesActions />
        )}

        {activeTab === 'setup' && (
          <SetupGuide />
        )}

        {activeTab === 'endgame' && (
          <EndGameScoring />
        )}

        {activeTab === 'faq' && (
          <FAQSection />
        )}

        {activeTab === 'github' && (
          <GithubDeployGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 text-xs text-slate-500 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-slate-400">ON MARS COMPANION</span>
            <span>•</span>
            <span>Danijel (Žuta) vs Ceca (Crvena)</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Dizajn igre: Vital Lacerda | Ilustracije: Ian O&apos;Toole</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <span>Kreirano sa pažnjom za društvene igre</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
          </div>
        </div>
      </footer>
    </div>
  );
}
