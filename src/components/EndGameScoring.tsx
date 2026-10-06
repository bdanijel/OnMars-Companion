import React, { useState } from 'react';
import { Award, AlertTriangle, Calculator, Sparkles, Scale, Trophy, Flame, CheckCircle2, RotateCcw, Plus, Minus } from 'lucide-react';
import { PlayerScoreState } from '../types';
import { PLAYERS, TIE_BREAKER_HIERARCHY } from '../data/rulesData';

export const EndGameScoring: React.FC = () => {
  const [mobileActivePlayer, setMobileActivePlayer] = useState<'danijel' | 'ceca'>('danijel');

  // Score state for Danijel (Yellow)
  const [danijelScore, setDanijelScore] = useState<PlayerScoreState>({
    inGameOP: 25,
    progressCubes: 3, // 1/2/4/7/11
    hangarShips: 2, // 3 OP each
    colonistHighestOP: 8, // from highest colonist in Living Quarters
    techTilesOP: 12, // sum of tech column points
    builtLvl1Blueprints: 2, // +3 each
    builtLvl3Blueprints: 1, // +5 each
    unbuiltLvl1Blueprints: 0, // -3 each
    unbuiltLvl3Blueprints: 0, // -5 each
    scientistsOP: 6, // 3 OP per matching building on Mars
    contractsCompletedOP: 9, // positive
    contractsFailedPenalty: 0, // positive number to subtract
    crystalsCount: 4, // for tie-break
    advancedBuildingsCount: 3 // for tie-break
  });

  // Score state for Ceca (Red)
  const [cecaScore, setCecaScore] = useState<PlayerScoreState>({
    inGameOP: 28,
    progressCubes: 2,
    hangarShips: 2,
    colonistHighestOP: 10,
    techTilesOP: 9,
    builtLvl1Blueprints: 1,
    builtLvl3Blueprints: 1,
    unbuiltLvl1Blueprints: 0,
    unbuiltLvl3Blueprints: 0,
    scientistsOP: 9,
    contractsCompletedOP: 8,
    contractsFailedPenalty: 4, // e.g. -4
    crystalsCount: 5,
    advancedBuildingsCount: 2
  });

  // Progress cube table: 0: 0, 1: 1, 2: 2, 3: 4, 4: 7, 5: 11
  const getProgressCubeOP = (cubes: number) => {
    switch (cubes) {
      case 1: return 1;
      case 2: return 2;
      case 3: return 4;
      case 4: return 7;
      case 5: return 11;
      default: return 0;
    }
  };

  const calculateTotal = (s: PlayerScoreState) => {
    const progressOP = getProgressCubeOP(s.progressCubes);
    const shipsOP = s.hangarShips * 3;
    const colonistsOP = s.colonistHighestOP;
    const techOP = s.techTilesOP;
    const advBuiltOP = (s.builtLvl1Blueprints * 3) + (s.builtLvl3Blueprints * 5);
    const unbuiltPenalty = (s.unbuiltLvl1Blueprints * 3) + (s.unbuiltLvl3Blueprints * 5);
    const scientistsOP = s.scientistsOP;
    const contractsOP = s.contractsCompletedOP - s.contractsFailedPenalty;

    const total = s.inGameOP + progressOP + shipsOP + colonistsOP + techOP + advBuiltOP - unbuiltPenalty + scientistsOP + contractsOP;
    return {
      total,
      progressOP,
      shipsOP,
      colonistsOP,
      techOP,
      advBuiltOP,
      unbuiltPenalty,
      scientistsOP,
      contractsOP
    };
  };

  const danijelResults = calculateTotal(danijelScore);
  const cecaResults = calculateTotal(cecaScore);

  // Stepper helper
  const adjustField = (
    player: 'danijel' | 'ceca',
    field: keyof PlayerScoreState,
    delta: number,
    min: number = 0,
    max: number = 99
  ) => {
    if (player === 'danijel') {
      const current = danijelScore[field] as number;
      const next = Math.max(min, Math.min(max, current + delta));
      setDanijelScore({ ...danijelScore, [field]: next });
    } else {
      const current = cecaScore[field] as number;
      const next = Math.max(min, Math.min(max, current + delta));
      setCecaScore({ ...cecaScore, [field]: next });
    }
  };

  // Tie-breaker evaluation
  let winner = '';
  let winReason = '';

  if (danijelResults.total > cecaResults.total) {
    winner = 'Danijel (Žuta)';
    winReason = `Pobeda po ukupnom broju OP bodova: ${danijelResults.total} prema ${cecaResults.total}!`;
  } else if (cecaResults.total > danijelResults.total) {
    winner = 'Ceca (Crvena)';
    winReason = `Pobeda po ukupnom broju OP bodova: ${cecaResults.total} prema ${danijelResults.total}!`;
  } else {
    // Tie break 1: Most crystals
    if (danijelScore.crystalsCount > cecaScore.crystalsCount) {
      winner = 'Danijel (Žuta)';
      winReason = `TIE-BREAK KORAK 1: Izjednačeni bodovi (${danijelResults.total} OP)! Danijel pobeđuje jer ima više Kristala (${danijelScore.crystalsCount} vs ${cecaScore.crystalsCount})!`;
    } else if (cecaScore.crystalsCount > danijelScore.crystalsCount) {
      winner = 'Ceca (Crvena)';
      winReason = `TIE-BREAK KORAK 1: Izjednačeni bodovi (${cecaResults.total} OP)! Ceca pobeđuje jer ima više Kristala (${cecaScore.crystalsCount} vs ${danijelScore.crystalsCount})!`;
    } else {
      // Tie break 2: Most advanced buildings
      if (danijelScore.advancedBuildingsCount > cecaScore.advancedBuildingsCount) {
        winner = 'Danijel (Žuta)';
        winReason = `TIE-BREAK KORAK 2: Izjednačeni bodovi i kristali! Danijel pobeđuje jer ima više Naprednih Zgrada (${danijelScore.advancedBuildingsCount} vs ${cecaScore.advancedBuildingsCount})!`;
      } else if (cecaScore.advancedBuildingsCount > danijelScore.advancedBuildingsCount) {
        winner = 'Ceca (Crvena)';
        winReason = `TIE-BREAK KORAK 2: Izjednačeni bodovi i kristali! Ceca pobeđuje jer ima više Naprednih Zgrada (${cecaScore.advancedBuildingsCount} vs ${danijelScore.advancedBuildingsCount})!`;
      } else {
        // Tie break 3: Progress cubes
        if (danijelScore.progressCubes > cecaScore.progressCubes) {
          winner = 'Danijel (Žuta)';
          winReason = `TIE-BREAK KORAK 3: Izjednačeno sve do kockica progresa! Danijel pobeđuje sa ${danijelScore.progressCubes} kockice u Progress Area!`;
        } else if (cecaScore.progressCubes > danijelScore.progressCubes) {
          winner = 'Ceca (Crvena)';
          winReason = `TIE-BREAK KORAK 3: Izjednačeno sve do kockica progresa! Ceca pobeđuje sa ${cecaScore.progressCubes} kockice u Progress Area!`;
        } else {
          winner = 'NEREŠENO – ZAJEDNIČKA POBEDA!';
          winReason = 'TIE-BREAK KORAK 4: Svi kriterijumi su apsolutno identični! Danijel i Ceca ravnopravno dele pobedu na Marsu!';
        }
      }
    }
  }

  const renderPlayerForm = (playerKey: 'danijel' | 'ceca') => {
    const isDanijel = playerKey === 'danijel';
    const score = isDanijel ? danijelScore : cecaScore;
    const results = isDanijel ? danijelResults : cecaResults;
    const accentClass = isDanijel ? 'text-amber-400' : 'text-red-400';
    const borderClass = isDanijel ? 'border-amber-500/40' : 'border-red-500/40';
    const bgClass = isDanijel ? 'bg-amber-950/20' : 'bg-red-950/20';

    return (
      <div className={`${bgClass} border ${borderClass} rounded-2xl p-4 sm:p-5 space-y-4`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className={`w-3.5 h-3.5 rounded-full ${isDanijel ? 'bg-amber-400' : 'bg-red-500'}`}></span>
            <h4 className={`font-heading font-bold text-lg sm:text-xl ${accentClass}`}>
              {isDanijel ? 'Danijel (Žuta)' : 'Ceca (Crvena)'}
            </h4>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block font-medium">Ukupno:</span>
            <div className={`text-2xl font-heading font-bold ${accentClass}`}>{results.total} OP</div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3.5 text-xs">
          {/* In game OP */}
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-semibold">Poeni sa trake u igri (In-Game OP):</label>
              <span className="font-bold text-white text-sm">{score.inGameOP} OP</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => adjustField(playerKey, 'inGameOP', -5)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold active:bg-slate-700"
              >-5</button>
              <button
                type="button"
                onClick={() => adjustField(playerKey, 'inGameOP', -1)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 active:bg-slate-700"
              ><Minus className="w-4 h-4" /></button>
              <input
                type="number"
                min="0"
                value={score.inGameOP}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  if (isDanijel) setDanijelScore({ ...danijelScore, inGameOP: val });
                  else setCecaScore({ ...cecaScore, inGameOP: val });
                }}
                className="flex-1 text-center bg-slate-900 border border-slate-700 rounded-lg py-1.5 text-white font-bold"
              />
              <button
                type="button"
                onClick={() => adjustField(playerKey, 'inGameOP', 1)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 active:bg-slate-700"
              ><Plus className="w-4 h-4" /></button>
              <button
                type="button"
                onClick={() => adjustField(playerKey, 'inGameOP', 5)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold active:bg-slate-700"
              >+5</button>
            </div>
          </div>

          {/* Progress Cubes */}
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold">Kockice u Progress Area (0 do 5):</label>
              <span className="text-amber-400 font-bold">{getProgressCubeOP(score.progressCubes)} OP</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (isDanijel) setDanijelScore({ ...danijelScore, progressCubes: num });
                    else setCecaScore({ ...cecaScore, progressCubes: num });
                  }}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    score.progressCubes === num
                      ? isDanijel
                        ? 'bg-amber-600 text-white border-amber-500'
                        : 'bg-red-600 text-white border-red-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Hangar Ships & Living Quarters */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium">Brodovi (x3 OP):</label>
                <span className="font-bold text-white">{score.hangarShips * 3}p</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustField(playerKey, 'hangarShips', -1, 0, 5)}
                  className="p-1 rounded bg-slate-800 text-slate-300 active:bg-slate-700"
                ><Minus className="w-3.5 h-3.5" /></button>
                <span className="flex-1 text-center font-bold text-white text-sm">{score.hangarShips}</span>
                <button
                  type="button"
                  onClick={() => adjustField(playerKey, 'hangarShips', 1, 0, 5)}
                  className="p-1 rounded bg-slate-800 text-slate-300 active:bg-slate-700"
                ><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium">Spavaonice OP:</label>
                <span className="font-bold text-white">{score.colonistHighestOP}p</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustField(playerKey, 'colonistHighestOP', -1)}
                  className="p-1 rounded bg-slate-800 text-slate-300 active:bg-slate-700"
                ><Minus className="w-3.5 h-3.5" /></button>
                <span className="flex-1 text-center font-bold text-white text-sm">{score.colonistHighestOP}</span>
                <button
                  type="button"
                  onClick={() => adjustField(playerKey, 'colonistHighestOP', 1)}
                  className="p-1 rounded bg-slate-800 text-slate-300 active:bg-slate-700"
                ><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>

          {/* Tech Tiles OP */}
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-semibold">Tehnologije u Laboratoriji (OP):</label>
              <span className="font-bold text-cyan-400">{score.techTilesOP} OP</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => adjustField(playerKey, 'techTilesOP', -2)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold active:bg-slate-700"
              >-2</button>
              <button
                type="button"
                onClick={() => adjustField(playerKey, 'techTilesOP', -1)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 active:bg-slate-700"
              ><Minus className="w-4 h-4" /></button>
              <input
                type="number"
                min="0"
                value={score.techTilesOP}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  if (isDanijel) setDanijelScore({ ...danijelScore, techTilesOP: val });
                  else setCecaScore({ ...cecaScore, techTilesOP: val });
                }}
                className="flex-1 text-center bg-slate-900 border border-slate-700 rounded-lg py-1.5 text-white font-bold"
              />
              <button
                type="button"
                onClick={() => adjustField(playerKey, 'techTilesOP', 1)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 active:bg-slate-700"
              ><Plus className="w-4 h-4" /></button>
              <button
                type="button"
                onClick={() => adjustField(playerKey, 'techTilesOP', 2)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold active:bg-slate-700"
              >+2</button>
            </div>
          </div>

          {/* Built vs Unbuilt Blueprints */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="text-slate-300 font-medium">Izgrađeni Nacrti:</div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>L1 (+3p):</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'builtLvl1Blueprints', -1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Minus className="w-3 h-3" /></button>
                  <span className="w-5 text-center text-white font-bold">{score.builtLvl1Blueprints}</span>
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'builtLvl1Blueprints', 1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Plus className="w-3 h-3" /></button>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>L3 (+5p):</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'builtLvl3Blueprints', -1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Minus className="w-3 h-3" /></button>
                  <span className="w-5 text-center text-white font-bold">{score.builtLvl3Blueprints}</span>
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'builtLvl3Blueprints', 1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-red-900/40 space-y-1.5">
              <div className="text-red-400 font-medium">Neizgrađeni (KAZNA):</div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>L1 (-3p):</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'unbuiltLvl1Blueprints', -1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Minus className="w-3 h-3" /></button>
                  <span className="w-5 text-center text-red-400 font-bold">{score.unbuiltLvl1Blueprints}</span>
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'unbuiltLvl1Blueprints', 1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Plus className="w-3 h-3" /></button>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>L3 (-5p):</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'unbuiltLvl3Blueprints', -1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Minus className="w-3 h-3" /></button>
                  <span className="w-5 text-center text-red-400 font-bold">{score.unbuiltLvl3Blueprints}</span>
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'unbuiltLvl3Blueprints', 1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Scientists & Earth Contracts */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium">Naučnici OP:</label>
                <span className="font-bold text-white">{score.scientistsOP}p</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustField(playerKey, 'scientistsOP', -3)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                >-3</button>
                <span className="flex-1 text-center font-bold text-white">{score.scientistsOP}</span>
                <button
                  type="button"
                  onClick={() => adjustField(playerKey, 'scientistsOP', 3)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                >+3</button>
              </div>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium">Ugovori (+ / -):</label>
                <span className="font-bold text-white">{score.contractsCompletedOP - score.contractsFailedPenalty}p</span>
              </div>
              <div className="flex gap-1">
                <input
                  type="number"
                  placeholder="+"
                  title="Ispunjeni ugovori OP"
                  value={score.contractsCompletedOP}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    if (isDanijel) setDanijelScore({ ...danijelScore, contractsCompletedOP: val });
                    else setCecaScore({ ...cecaScore, contractsCompletedOP: val });
                  }}
                  className="w-1/2 text-center bg-slate-900 border border-slate-700 rounded py-1 text-emerald-400 font-bold"
                />
                <input
                  type="number"
                  placeholder="-"
                  title="Neispunjeni ugovori minus"
                  value={score.contractsFailedPenalty}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    if (isDanijel) setDanijelScore({ ...danijelScore, contractsFailedPenalty: val });
                    else setCecaScore({ ...cecaScore, contractsFailedPenalty: val });
                  }}
                  className="w-1/2 text-center bg-slate-900 border border-red-900 rounded py-1 text-red-400 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Tie break fields */}
          <div className="pt-2 border-t border-slate-800 bg-slate-950/90 p-2.5 rounded-xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
              Za rešavanje Tie-Break-a:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400">Kristali:</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'crystalsCount', -1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Minus className="w-3 h-3" /></button>
                  <span className="w-5 text-center font-bold text-white">{score.crystalsCount}</span>
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'crystalsCount', 1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Plus className="w-3 h-3" /></button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400">Napredne zgr.:</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'advancedBuildingsCount', -1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Minus className="w-3 h-3" /></button>
                  <span className="w-5 text-center font-bold text-white">{score.advancedBuildingsCount}</span>
                  <button
                    type="button"
                    onClick={() => adjustField(playerKey, 'advancedBuildingsCount', 1)}
                    className="p-0.5 rounded bg-slate-800"
                  ><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* End Game Trigger Rules Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 rounded-2xl border border-slate-800 p-4 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
          <Award className="w-4 h-4" />
          <span>Završetak Partije i Bodovanje</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-heading font-bold text-white">
          Kada se Trigeruje Kraj Igre & Šta se Igra Dalje?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Kraj igre se trigeruje na kraju <strong>Colonization Faze</strong> kada marker preostalih misija (Remaining Missions marker) dođe na polje 1 i potom se pomeri udesno.
        </p>

        {/* Trigger Condition Ladder */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
          <div className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Standard</span>
            <div className="font-heading font-bold text-sm sm:text-base text-amber-300">3 Misije</div>
            <p className="text-[11px] text-slate-400">Zajednički završene sve 3 karte.</p>
          </div>

          <div className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-cyan-400 uppercase">Colony L3</span>
            <div className="font-heading font-bold text-sm sm:text-base text-cyan-300">2 Misije</div>
            <p className="text-[11px] text-slate-400">Dovoljne samo 2 misije!</p>
          </div>

          <div className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-purple-400 uppercase">Colony L4</span>
            <div className="font-heading font-bold text-sm sm:text-base text-purple-300">1 Misija</div>
            <p className="text-[11px] text-slate-400">Dovoljna samo 1 misija!</p>
          </div>

          <div className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-red-500/40 space-y-1">
            <span className="text-[10px] font-bold text-red-400 uppercase">Colony L5</span>
            <div className="font-heading font-bold text-sm sm:text-base text-red-400 animate-pulse">TRENUTNI KRAJ!</div>
            <p className="text-[11px] text-slate-400">Bez obzira na broj misija!</p>
          </div>
        </div>

        {/* Final Round Specifics */}
        <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-3 sm:p-4 text-xs text-amber-200 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-amber-300 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Kritična Pravila Poslednje Runde (Strana 21):</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-300">
            <li>Igra se do kraja <strong>tekuće runde</strong>.</li>
            <li>Zatim se igra <strong>TAČNO JOŠ JEDNA PUNA RUNDA</strong>.</li>
            <li><strong>VAŽNO:</strong> U toj poslednjoj rundi se <strong>PRESKAČE SHUTTLE FAZA</strong>!</li>
            <li>Svi kristali zarađeni u poslednjoj rundi prebacuju se u Depot pre bodovanja!</li>
          </ol>
        </div>
      </div>

      {/* Tie Break Hierarchy Breakdown */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-heading font-bold text-base sm:text-lg">
          <Scale className="w-5 h-5" />
          <span>Zvanična Tie-Break Pravila (U Slučaju Istih Poena)</span>
        </div>
        <p className="text-xs text-slate-400">
          Ako Danijel i Ceca završe sa istim brojem bodova, pobednik se utvrđuje po tačnom redosledu (Strana 21):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {TIE_BREAKER_HIERARCHY.map((tb) => (
            <div key={tb.step} className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-orange-950 text-orange-400 border border-orange-700/60 flex items-center justify-center text-xs font-bold">
                  {tb.step}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Kriterijum {tb.step}</span>
              </div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-white">{tb.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{tb.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Score Calculator */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white shadow-md">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-xl text-white">
                Kalkulator Bodova i Tie-Break
              </h3>
              <p className="text-[11px] text-slate-400">
                Podešeno za Danijela i Cecu sa brzim +/- tasterima
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setDanijelScore({
                inGameOP: 0, progressCubes: 0, hangarShips: 0, colonistHighestOP: 0,
                techTilesOP: 0, builtLvl1Blueprints: 0, builtLvl3Blueprints: 0,
                unbuiltLvl1Blueprints: 0, unbuiltLvl3Blueprints: 0, scientistsOP: 0,
                contractsCompletedOP: 0, contractsFailedPenalty: 0, crystalsCount: 0, advancedBuildingsCount: 0
              });
              setCecaScore({
                inGameOP: 0, progressCubes: 0, hangarShips: 0, colonistHighestOP: 0,
                techTilesOP: 0, builtLvl1Blueprints: 0, builtLvl3Blueprints: 0,
                unbuiltLvl1Blueprints: 0, unbuiltLvl3Blueprints: 0, scientistsOP: 0,
                contractsCompletedOP: 0, contractsFailedPenalty: 0, crystalsCount: 0, advancedBuildingsCount: 0
              });
            }}
            className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg bg-slate-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        {/* Mobile Player Segmented Switcher (Visible only on phone) */}
        <div className="flex sm:hidden rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setMobileActivePlayer('danijel')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileActivePlayer === 'danijel'
                ? 'bg-amber-500 text-slate-950 shadow-md font-heading'
                : 'text-amber-400/80 hover:text-amber-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-950"></span>
            Danijel ({danijelResults.total} OP)
          </button>
          <button
            onClick={() => setMobileActivePlayer('ceca')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileActivePlayer === 'ceca'
                ? 'bg-red-500 text-white shadow-md font-heading'
                : 'text-red-400/80 hover:text-red-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-slate-950"></span>
            Ceca ({cecaResults.total} OP)
          </button>
        </div>

        {/* Forms Container */}
        {/* On Mobile: show only selected player */}
        <div className="block sm:hidden">
          {mobileActivePlayer === 'danijel' ? renderPlayerForm('danijel') : renderPlayerForm('ceca')}
        </div>

        {/* On Desktop: show both side by side */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-6">
          {renderPlayerForm('danijel')}
          {renderPlayerForm('ceca')}
        </div>

        {/* Winner Verdict Card */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-red-950/40 border border-orange-500/50 rounded-2xl p-4 sm:p-6 text-center space-y-2 shadow-xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold bg-orange-950/80 px-3 py-1 rounded-full border border-orange-700">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Konačni Pobednik Partije</span>
          </div>
          <div className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-wider">
            {winner}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed pt-1">
            {winReason}
          </p>
        </div>
      </div>
    </div>
  );
};
