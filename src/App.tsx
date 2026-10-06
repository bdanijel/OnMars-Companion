import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuickSearch } from './components/QuickSearch';
import { TwoPlayerHub } from './components/TwoPlayerHub';
import { PhasesActions } from './components/PhasesActions';
import { SetupGuide } from './components/SetupGuide';
import { EndGameScoring } from './components/EndGameScoring';
import { FAQSection } from './components/FAQSection';
import { GithubDeployGuide } from './components/GithubDeployGuide';
import { Search, Users, BookOpen, Award, Menu, X, CheckSquare, HelpCircle, Github, Heart, Rocket } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('twoplayer');
  const [colonyLevel, setColonyLevel] = useState<number>(1);
  const [missionsRemaining, setMissionsRemaining] = useState<number>(3);
  const [shuttlePosition, setShuttlePosition] = useState<'orbit' | 'colony'>('orbit');
  const [shuttleTravelCount, setShuttleTravelCount] = useState<number>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // If Colony Level rises to 3 or 4 or 5, automatically adjust mission threshold
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

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950 pb-20 sm:pb-0">
      {/* Background Star & Mars Glow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-orange-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-5 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-red-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Top Header & Sticky Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={selectTab}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-8 z-10">
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

      {/* Mobile Bottom Navigation Bar (Thumb Friendly) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 sm:hidden flex items-center justify-around shadow-2xl">
        <button
          onClick={() => selectTab('twoplayer')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'twoplayer' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className={`w-5 h-5 ${activeTab === 'twoplayer' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">2 Igrača</span>
        </button>

        <button
          onClick={() => selectTab('search')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'search' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className={`w-5 h-5 ${activeTab === 'search' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">Pretraga</span>
        </button>

        <button
          onClick={() => selectTab('actions')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'actions' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'actions' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">Akcije</span>
        </button>

        <button
          onClick={() => selectTab('endgame')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'endgame' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className={`w-5 h-5 ${activeTab === 'endgame' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">Bodovi</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            ['setup', 'faq', 'github'].includes(activeTab) ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Više</span>
        </button>
      </nav>

      {/* Mobile "More" Drawer / Bottom Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer Sheet */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-750 rounded-t-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-heading font-bold text-base text-white">Ostale Opcije & Pravila</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => selectTab('setup')}
                className={`flex items-center gap-3 w-full p-3.5 rounded-xl text-left border transition-all ${
                  activeTab === 'setup'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/40 font-bold'
                    : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <CheckSquare className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Postavka Igre (Setup)</div>
                  <div className="text-xs text-slate-400">Interaktivna čeklista za 2 igrača</div>
                </div>
              </button>

              <button
                onClick={() => selectTab('faq')}
                className={`flex items-center gap-3 w-full p-3.5 rounded-xl text-left border transition-all ${
                  activeTab === 'faq'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/40 font-bold'
                    : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold">FAQ & Nedoumice</div>
                  <div className="text-xs text-slate-400">Rešenja za specifične situacije tokom igre</div>
                </div>
              </button>

              <button
                onClick={() => selectTab('github')}
                className={`flex items-center gap-3 w-full p-3.5 rounded-xl text-left border transition-all ${
                  activeTab === 'github'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/40 font-bold'
                    : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Github className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold">GitHub Actions Publish</div>
                  <div className="text-xs text-slate-400">Uputstvo za hosting i deploy na telefon</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Footer (Hidden on mobile to save space) */}
      <footer className="hidden sm:block border-t border-slate-900 bg-slate-950/90 py-6 text-xs text-slate-500 z-10">
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
            <span>Kreirano za društvene igre</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
          </div>
        </div>
      </footer>
    </div>
  );
}
