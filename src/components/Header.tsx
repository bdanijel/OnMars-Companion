import React, { useState } from 'react';
import { Rocket, Orbit, Search, Users, BookOpen, CheckSquare, Award, HelpCircle, Github, Sparkles, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { PLAYERS } from '../data/rulesData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  colonyLevel: number;
  setColonyLevel: (lvl: number) => void;
  missionsRemaining: number;
  setMissionsRemaining: (count: number) => void;
  shuttlePosition: 'orbit' | 'colony';
  setShuttlePosition: (pos: 'orbit' | 'colony') => void;
  shuttleTravelCount: number;
  setShuttleTravelCount: (c: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  colonyLevel,
  setColonyLevel,
  missionsRemaining,
  setMissionsRemaining,
  shuttlePosition,
  setShuttlePosition,
}) => {
  const [mobileStatusExpanded, setMobileStatusExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 flex items-center justify-center shadow-md shadow-orange-950/50 border border-amber-400/30 shrink-0">
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base sm:text-xl tracking-wider text-orange-400">ON MARS</span>
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-950/80 text-orange-300 border border-orange-700/50 font-medium">
                2P Companion
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Vodič kroz pravila, postavku, FAQ i bodovanje za 2 igrača
            </p>
          </div>
        </div>

        {/* Players badge & Mobile Status Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Player badges */}
          <div className="flex items-center gap-1 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/80"></span>
              <span>Danijel</span>
            </div>
            <span className="text-slate-600 text-[10px]">vs</span>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500/80"></span>
              <span>Ceca</span>
            </div>
          </div>

          {/* Mobile status expand trigger button */}
          <button
            onClick={() => setMobileStatusExpanded(!mobileStatusExpanded)}
            className="sm:hidden flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-orange-300 active:bg-slate-800"
            title="Brzo stanje igre"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="text-[11px]">L{colonyLevel}</span>
            {mobileStatusExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Game Status Bar - Desktop always visible, Mobile collapsible */}
      <div className={`bg-slate-900/95 border-t border-b border-slate-800 px-3 sm:px-4 py-2 sm:py-1.5 text-xs ${
        mobileStatusExpanded ? 'block' : 'hidden sm:block'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-slate-300">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Colony Level */}
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
              <span className="text-slate-400 text-xs">Nivo Kolonije:</span>
              <div className="flex items-center bg-slate-950 rounded-lg border border-slate-700 p-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setColonyLevel(lvl)}
                    className={`min-w-[28px] h-7 sm:h-6 text-xs font-bold rounded flex items-center justify-center transition-colors ${
                      colonyLevel === lvl
                        ? 'bg-orange-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    L{lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Shuttle Position */}
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
              <span className="text-slate-400 text-xs">Šatl:</span>
              <div className="flex items-center bg-slate-950 rounded-lg border border-slate-700 p-0.5">
                <button
                  onClick={() => setShuttlePosition('orbit')}
                  className={`px-2.5 h-7 sm:h-6 text-xs font-semibold rounded flex items-center gap-1 transition-colors ${
                    shuttlePosition === 'orbit'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Orbit className="w-3.5 h-3.5" /> Orbita
                </button>
                <button
                  onClick={() => setShuttlePosition('colony')}
                  className={`px-2.5 h-7 sm:h-6 text-xs font-semibold rounded flex items-center gap-1 transition-colors ${
                    shuttlePosition === 'colony'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" /> Kolonija
                </button>
              </div>
            </div>

            {/* Missions Remaining */}
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
              <span className="text-slate-400 text-xs">Misije:</span>
              <div className="flex items-center bg-slate-950 rounded-lg border border-slate-700 p-0.5">
                {[3, 2, 1, 0].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMissionsRemaining(m)}
                    className={`min-w-[32px] h-7 sm:h-6 text-xs font-bold rounded flex items-center justify-center transition-colors ${
                      missionsRemaining === m
                        ? m === 0
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-emerald-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m === 0 ? 'KRAJ!' : m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {missionsRemaining === 0 && (
            <div className="flex items-center gap-1.5 text-amber-300 font-bold bg-amber-950/70 p-2 sm:px-2.5 sm:py-1 rounded-lg border border-amber-500/40 text-xs animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>KRAJ IGRE! Još 1 runda bez Šatla!</span>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation Tabs (Hidden on mobile - mobile uses fixed bottom bar) */}
      <nav className="hidden sm:block max-w-7xl mx-auto px-3 overflow-x-auto">
        <div className="flex space-x-1 py-1 min-w-max">
          {[
            { id: 'search', label: 'Brza Pretraga', icon: Search },
            { id: 'twoplayer', label: '2 Igrača (Danijel & Ceca)', icon: Users },
            { id: 'actions', label: 'Faze i Akcije', icon: BookOpen },
            { id: 'setup', label: 'Postavka Igre', icon: CheckSquare },
            { id: 'endgame', label: 'Kraj Igre & Tie-Break', icon: Award },
            { id: 'faq', label: 'FAQ & Nedoumice', icon: HelpCircle },
            { id: 'github', label: 'GitHub Publish', icon: Github },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
