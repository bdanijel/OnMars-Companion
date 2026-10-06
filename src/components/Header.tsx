import React from 'react';
import { Rocket, Orbit, Search, Users, BookOpen, CheckSquare, Award, HelpCircle, Github, Sparkles } from 'lucide-react';
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
  shuttleTravelCount,
  setShuttleTravelCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 flex items-center justify-center shadow-lg shadow-orange-950/50 border border-amber-400/30">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg sm:text-xl tracking-wider text-orange-400">ON MARS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-950/80 text-orange-300 border border-orange-700/50 font-medium">
                Vital Lacerda Companion
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Vodič kroz pravila, postavku, FAQ i bodovanje za 2 igrača
            </p>
          </div>
        </div>

        {/* Players badge & Quick Tracker */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50 animate-pulse"></span>
            <span>Danijel (Žuta)</span>
          </div>
          <span className="text-slate-600 font-bold">vs</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50 animate-pulse"></span>
            <span>Ceca (Crvena)</span>
          </div>
        </div>
      </div>

      {/* Mini Interactive Game Status Bar */}
      <div className="bg-slate-900/90 border-t border-b border-slate-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Colony Level */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Nivo Kolonije (LSS):</span>
              <div className="flex items-center bg-slate-950 rounded border border-slate-700 p-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setColonyLevel(lvl)}
                    className={`px-2 py-0.5 text-xs font-bold rounded transition-colors ${
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
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Šatl pozicija:</span>
              <div className="flex items-center bg-slate-950 rounded border border-slate-700 p-0.5">
                <button
                  onClick={() => setShuttlePosition('orbit')}
                  className={`px-2 py-0.5 text-xs font-semibold rounded flex items-center gap-1 transition-colors ${
                    shuttlePosition === 'orbit'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Orbit className="w-3 h-3" /> Orbita
                </button>
                <button
                  onClick={() => setShuttlePosition('colony')}
                  className={`px-2 py-0.5 text-xs font-semibold rounded flex items-center gap-1 transition-colors ${
                    shuttlePosition === 'colony'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Rocket className="w-3 h-3" /> Kolonija
                </button>
              </div>
            </div>

            {/* Missions Remaining */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Preostale Misije:</span>
              <div className="flex items-center bg-slate-950 rounded border border-slate-700 p-0.5">
                {[3, 2, 1, 0].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMissionsRemaining(m)}
                    className={`px-2 py-0.5 text-xs font-bold rounded transition-colors ${
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
            <div className="flex items-center gap-1.5 text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>KRAJ IGRE JE TRIGERISAN! Igra se još 1 runda bez Šatla!</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-2 overflow-x-auto">
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
