import React, { useState } from 'react';
import { CheckSquare, Square, Users, Sparkles, Film, ArrowRight, RotateCcw } from 'lucide-react';
import { SETUP_STEPS } from '../data/rulesData';

export const SetupGuide: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / SETUP_STEPS.length) * 100);

  const resetSetup = () => {
    setCompletedSteps({});
  };

  return (
    <div className="space-y-6">
      {/* Setup Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <CheckSquare className="w-4 h-4" />
            <span>Priprema Table i Komponenti</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2">
            Vodič Kroz Postavku Igre (Game Setup)
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Pratite korake redom pre početka partije. Sve specifičnosti za igranje u <strong>2 igrača (Danijel & Ceca)</strong> su jasno istaknute zlatnim i crvenim bedževima kako ništa ne biste propustili!
          </p>

          {/* First Player Easter Egg */}
          <div className="mt-4 p-3.5 bg-slate-950/80 border border-amber-500/30 rounded-xl flex items-center gap-3 text-xs text-amber-200">
            <Film className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="text-white">Ko je prvi igrač?</strong> Zvanično pravilo (strana 7): <em>Igrač koji je najviše puta pogledao film &quot;Marsovac&quot; (The Martian) počinje partiju!</em>
            </div>
          </div>

          {/* Progress Tracker Bar */}
          <div className="mt-5 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Završeno koraka: {completedCount} / {SETUP_STEPS.length}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={resetSetup}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 py-1 px-2.5 rounded bg-slate-800/80 hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Resetuj čekirane korake
          </button>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {SETUP_STEPS.map((step) => {
          const isDone = !!completedSteps[step.id];
          return (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition-all ${
                isDone
                  ? 'bg-slate-950/60 border-slate-800/80 opacity-75'
                  : step.isTwoPlayerSpecial
                  ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-500/80 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <button
                  type="button"
                  className={`mt-0.5 shrink-0 transition-colors ${
                    isDone ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {isDone ? (
                    <CheckSquare className="w-6 h-6" />
                  ) : (
                    <Square className="w-6 h-6" />
                  )}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm sm:text-base text-white">
                        {step.stepNumber}. {step.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {step.isTwoPlayerSpecial && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          2 Igrača Pravilo!
                        </span>
                      )}
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                        Strana {step.pageRef}
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDone ? 'text-slate-400 line-through' : 'text-slate-300'}`}>
                    {step.description}
                  </p>

                  {step.isTwoPlayerSpecial && step.twoPlayerNote && (
                    <div className="bg-amber-950/40 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-200/90 font-medium">
                      <strong className="text-amber-400 block mb-0.5">VAŽNO ZA DVA IGRAČA:</strong>
                      {step.twoPlayerNote}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
