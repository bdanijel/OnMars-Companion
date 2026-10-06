import React, { useState } from 'react';
import { Award, AlertTriangle, Calculator, Sparkles, Scale, Trophy, Flame, CheckCircle2, RotateCcw } from 'lucide-react';
import { PlayerScoreState } from '../types';
import { PLAYERS, TIE_BREAKER_HIERARCHY, SCORING_CATEGORIES } from '../data/rulesData';

export const EndGameScoring: React.FC = () => {
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

  return (
    <div className="space-y-8">
      {/* End Game Trigger Rules Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
          <Award className="w-4 h-4" />
          <span>Završetak Partije i Bodovanje</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
          Kada se Trigeruje Kraj Igre & Šta se Igra Dalje?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Kraj igre se trigeruje na kraju <strong>Colonization Faze</strong> kada marker preostalih misija (Remaining Missions marker) dođe na polje 1 i potom se pomeri udesno.
        </p>

        {/* Trigger Condition Ladder */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Standardni Uslov</span>
            <div className="font-heading font-bold text-base text-amber-300">3 Završene Misije</div>
            <p className="text-xs text-slate-400">
              Kada igrači zajednički ispune sva 3 zadatka sa Mission karata.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-cyan-400 uppercase">Colony Nivo 3</span>
            <div className="font-heading font-bold text-base text-cyan-300">Dovoljne 2 Misije</div>
            <p className="text-xs text-slate-400">
              Marker preostalih misija se automatski pomera za 1 udesno kada kolonija dostigne nivo 3!
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-purple-400 uppercase">Colony Nivo 4</span>
            <div className="font-heading font-bold text-base text-purple-300">Dovoljna 1 Misija</div>
            <p className="text-xs text-slate-400">
              Marker se pomera još 1 udesno – samo još jedna završena misija završava igru!
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-red-500/40 space-y-1.5">
            <span className="text-[11px] font-bold text-red-400 uppercase">Colony Nivo 5</span>
            <div className="font-heading font-bold text-base text-red-400 animate-pulse">TRENUTNI KRAJ!</div>
            <p className="text-xs text-slate-400">
              Kraj igre se trigeruje ODMAH, čak i ako nijedna misija nije završena!
            </p>
          </div>
        </div>

        {/* Final Round Specifics */}
        <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-4 text-xs text-amber-200 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-amber-300 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Kritična Pravila Poslednje Runde (Strana 21):</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
            <li>Kada se trigeruje kraj, igra se do kraja <strong>tekuće runde</strong>.</li>
            <li>Zatim se igra <strong>TAČNO JOŠ JEDNA PUNA RUNDA</strong>.</li>
            <li><strong>VAŽNO:</strong> U toj poslednjoj rundi se <strong>PRESKAČE SHUTTLE FAZA</strong> (nema putovanja na kraju!).</li>
            <li>Svi kristali stečeni tokom te poslednje runde prebacuju se u Depot pre završnog bodovanja!</li>
          </ol>
        </div>
      </div>

      {/* Tie Break Hierarchy Breakdown */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-heading font-bold text-lg">
          <Scale className="w-5 h-5" />
          <span>Zvanična Tie-Break Pravila (U Slučaju Istih Poena)</span>
        </div>
        <p className="text-xs text-slate-400">
          Ako Danijel i Ceca završe partiju sa istim brojem Opportunity Points (OP), pobednik se utvrđuje po tačnom zvaničnom redosledu (Strana 21):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIE_BREAKER_HIERARCHY.map((tb) => (
            <div key={tb.step} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-orange-950 text-orange-400 border border-orange-700/60 flex items-center justify-center text-xs font-bold">
                  {tb.step}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Korak {tb.step}</span>
              </div>
              <h4 className="font-heading font-bold text-sm text-white">{tb.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{tb.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 2-Player Score Calculator for Danijel & Ceca */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white shadow-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Interaktivni Kalkulator Završnog Bodovanja
              </h3>
              <p className="text-xs text-slate-400">
                Unesite konačne elemente za Danijela i Cecu – aplikacija automatski računa bodove i rešava tie-break!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Očisti kalkulator
            </button>
          </div>
        </div>

        {/* Inputs Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Danijel (Yellow) Column */}
          <div className="bg-amber-950/20 border border-amber-500/40 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400"></span>
                <h4 className="font-heading font-bold text-lg text-amber-300">Danijel (Žuta)</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-400/80 font-medium">Ukupno OP:</span>
                <div className="text-2xl font-heading font-bold text-amber-400">{danijelResults.total}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Poeni sa glavne trake u toku igre (In-Game OP):</label>
                <input
                  type="number"
                  min="0"
                  value={danijelScore.inGameOP}
                  onChange={(e) => setDanijelScore({ ...danijelScore, inGameOP: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Kockice u Progress Area (0 do 5):</label>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setDanijelScore({ ...danijelScore, progressCubes: num })}
                      className={`flex-1 py-1 rounded text-xs font-bold border ${
                        danijelScore.progressCubes === num
                          ? 'bg-amber-600 text-white border-amber-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {num} ({getProgressCubeOP(num)}p)
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Brodovi u Hangaru (x3 OP):</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={danijelScore.hangarShips}
                    onChange={(e) => setDanijelScore({ ...danijelScore, hangarShips: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Kolonisti u Spavaonicama (OP):</label>
                  <input
                    type="number"
                    min="0"
                    value={danijelScore.colonistHighestOP}
                    onChange={(e) => setDanijelScore({ ...danijelScore, colonistHighestOP: parseInt(e.target.value) || 0 })}
                    placeholder="npr. 8"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Ukupni OP za Razvijene Tehnologije u Labu:</label>
                <input
                  type="number"
                  min="0"
                  value={danijelScore.techTilesOP}
                  onChange={(e) => setDanijelScore({ ...danijelScore, techTilesOP: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Izgrađeni Lvl 1 (+3) / Lvl 3 (+5):</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min="0"
                      title="Broj Lvl 1 nacrta"
                      placeholder="L1"
                      value={danijelScore.builtLvl1Blueprints}
                      onChange={(e) => setDanijelScore({ ...danijelScore, builtLvl1Blueprints: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs"
                    />
                    <input
                      type="number"
                      min="0"
                      title="Broj Lvl 3 nacrta"
                      placeholder="L3"
                      value={danijelScore.builtLvl3Blueprints}
                      onChange={(e) => setDanijelScore({ ...danijelScore, builtLvl3Blueprints: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-red-400 block mb-1">Neizgrađeni Lvl 1 (-3) / Lvl 3 (-5):</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min="0"
                      placeholder="L1"
                      value={danijelScore.unbuiltLvl1Blueprints}
                      onChange={(e) => setDanijelScore({ ...danijelScore, unbuiltLvl1Blueprints: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-red-900 rounded-lg px-2 py-1 text-white text-xs"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="L3"
                      value={danijelScore.unbuiltLvl3Blueprints}
                      onChange={(e) => setDanijelScore({ ...danijelScore, unbuiltLvl3Blueprints: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-red-900 rounded-lg px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Naučnici OP (3 po zgradi):</label>
                  <input
                    type="number"
                    min="0"
                    value={danijelScore.scientistsOP}
                    onChange={(e) => setDanijelScore({ ...danijelScore, scientistsOP: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Ugovori OP (+) minus Kazne (-):</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min="0"
                      placeholder="+ OP"
                      value={danijelScore.contractsCompletedOP}
                      onChange={(e) => setDanijelScore({ ...danijelScore, contractsCompletedOP: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-emerald-400 text-xs"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="- OP"
                      value={danijelScore.contractsFailedPenalty}
                      onChange={(e) => setDanijelScore({ ...danijelScore, contractsFailedPenalty: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-red-900 rounded-lg px-2 py-1 text-red-400 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Tie-breaker specific data */}
              <div className="pt-2 border-t border-amber-500/20 bg-slate-950/60 p-2.5 rounded-lg space-y-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase block">Za Tie-Break Kriterijume:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block">Broj Kristala u Depotu:</label>
                    <input
                      type="number"
                      min="0"
                      value={danijelScore.crystalsCount}
                      onChange={(e) => setDanijelScore({ ...danijelScore, crystalsCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block">Naprednih zgrada na mapi:</label>
                    <input
                      type="number"
                      min="0"
                      value={danijelScore.advancedBuildingsCount}
                      onChange={(e) => setDanijelScore({ ...danijelScore, advancedBuildingsCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ceca (Red) Column */}
          <div className="bg-red-950/20 border border-red-500/40 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-red-500/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-sm shadow-red-500"></span>
                <h4 className="font-heading font-bold text-lg text-red-300">Ceca (Crvena)</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-red-400/80 font-medium">Ukupno OP:</span>
                <div className="text-2xl font-heading font-bold text-red-400">{cecaResults.total}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Poeni sa glavne trake u toku igre (In-Game OP):</label>
                <input
                  type="number"
                  min="0"
                  value={cecaScore.inGameOP}
                  onChange={(e) => setCecaScore({ ...cecaScore, inGameOP: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Kockice u Progress Area (0 do 5):</label>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCecaScore({ ...cecaScore, progressCubes: num })}
                      className={`flex-1 py-1 rounded text-xs font-bold border ${
                        cecaScore.progressCubes === num
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {num} ({getProgressCubeOP(num)}p)
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Brodovi u Hangaru (x3 OP):</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={cecaScore.hangarShips}
                    onChange={(e) => setCecaScore({ ...cecaScore, hangarShips: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Kolonisti u Spavaonicama (OP):</label>
                  <input
                    type="number"
                    min="0"
                    value={cecaScore.colonistHighestOP}
                    onChange={(e) => setCecaScore({ ...cecaScore, colonistHighestOP: parseInt(e.target.value) || 0 })}
                    placeholder="npr. 8"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Ukupni OP za Razvijene Tehnologije u Labu:</label>
                <input
                  type="number"
                  min="0"
                  value={cecaScore.techTilesOP}
                  onChange={(e) => setCecaScore({ ...cecaScore, techTilesOP: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Izgrađeni Lvl 1 (+3) / Lvl 3 (+5):</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min="0"
                      title="Broj Lvl 1 nacrta"
                      placeholder="L1"
                      value={cecaScore.builtLvl1Blueprints}
                      onChange={(e) => setCecaScore({ ...cecaScore, builtLvl1Blueprints: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs"
                    />
                    <input
                      type="number"
                      min="0"
                      title="Broj Lvl 3 nacrta"
                      placeholder="L3"
                      value={cecaScore.builtLvl3Blueprints}
                      onChange={(e) => setCecaScore({ ...cecaScore, builtLvl3Blueprints: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-red-400 block mb-1">Neizgrađeni Lvl 1 (-3) / Lvl 3 (-5):</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min="0"
                      placeholder="L1"
                      value={cecaScore.unbuiltLvl1Blueprints}
                      onChange={(e) => setCecaScore({ ...cecaScore, unbuiltLvl1Blueprints: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-red-900 rounded-lg px-2 py-1 text-white text-xs"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="L3"
                      value={cecaScore.unbuiltLvl3Blueprints}
                      onChange={(e) => setCecaScore({ ...cecaScore, unbuiltLvl3Blueprints: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-red-900 rounded-lg px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Naučnici OP (3 po zgradi):</label>
                  <input
                    type="number"
                    min="0"
                    value={cecaScore.scientistsOP}
                    onChange={(e) => setCecaScore({ ...cecaScore, scientistsOP: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Ugovori OP (+) minus Kazne (-):</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min="0"
                      placeholder="+ OP"
                      value={cecaScore.contractsCompletedOP}
                      onChange={(e) => setCecaScore({ ...cecaScore, contractsCompletedOP: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-emerald-400 text-xs"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="- OP"
                      value={cecaScore.contractsFailedPenalty}
                      onChange={(e) => setCecaScore({ ...cecaScore, contractsFailedPenalty: parseInt(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-950 border border-red-900 rounded-lg px-2 py-1 text-red-400 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Tie-breaker specific data */}
              <div className="pt-2 border-t border-red-500/20 bg-slate-950/60 p-2.5 rounded-lg space-y-2">
                <span className="text-[11px] font-bold text-red-400 uppercase block">Za Tie-Break Kriterijume:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block">Broj Kristala u Depotu:</label>
                    <input
                      type="number"
                      min="0"
                      value={cecaScore.crystalsCount}
                      onChange={(e) => setCecaScore({ ...cecaScore, crystalsCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block">Naprednih zgrada na mapi:</label>
                    <input
                      type="number"
                      min="0"
                      value={cecaScore.advancedBuildingsCount}
                      onChange={(e) => setCecaScore({ ...cecaScore, advancedBuildingsCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Announcement & Tie-Breaker Banner */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-red-950/40 border border-orange-500/50 rounded-2xl p-6 text-center space-y-2 shadow-xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-orange-400 font-bold bg-orange-950/80 px-3 py-1 rounded-full border border-orange-700">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Konačna Presuda i Pobednik Partije</span>
          </div>
          <div className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-wider">
            {winner}
          </div>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed pt-1">
            {winReason}
          </p>
        </div>
      </div>
    </div>
  );
};
