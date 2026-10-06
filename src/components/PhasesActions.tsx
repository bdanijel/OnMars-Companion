import React, { useState } from 'react';
import { Orbit, Rocket, Zap, ArrowRight, ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, Layers, Award } from 'lucide-react';
import { ACTIONS } from '../data/rulesData';

export const PhasesActions: React.FC = () => {
  const [activeBoardSide, setActiveBoardSide] = useState<'colony' | 'orbit' | 'executive' | 'shuttle'>('colony');
  const [expandedActionId, setExpandedActionId] = useState<string>('construct-building');

  const filteredActions = ACTIONS.filter(a => {
    if (activeBoardSide === 'colony') return a.side === 'colony';
    if (activeBoardSide === 'orbit') return a.side === 'orbit';
    if (activeBoardSide === 'executive') return a.side === 'executive';
    return false;
  });

  return (
    <div className="space-y-8">
      {/* Phases Overview Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-orange-950/40 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
          Faze Igre i Glavne Akcije Table
        </h2>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Svaka runda u igri On Mars sastoji se iz dve faze: <strong>Colonization Phase</strong> (faza kolonizacije gde svaki igrač odigra 1 glavnu i opciono 1 izvršnu akciju) i <strong>Shuttle Phase</strong> (faza šatla gde igrači mogu putovati između orbite i površine planete).
        </p>

        {/* Board Side Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => { setActiveBoardSide('colony'); setExpandedActionId('construct-building'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
              activeBoardSide === 'colony'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50 border border-amber-500'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Kolonija na Marsu (Colony Actions)</span>
          </button>

          <button
            onClick={() => { setActiveBoardSide('orbit'); setExpandedActionId('obtain-blueprint'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
              activeBoardSide === 'orbit'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50 border border-cyan-500'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Orbit className="w-4 h-4" />
            <span>Svemirska Stanica u Orbiti (Orbit Actions)</span>
          </button>

          <button
            onClick={() => { setActiveBoardSide('executive'); setExpandedActionId('executive-actions-overview'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
              activeBoardSide === 'executive'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50 border border-purple-500'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Izvršne Akcije (Executive Actions)</span>
          </button>

          <button
            onClick={() => setActiveBoardSide('shuttle')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
              activeBoardSide === 'shuttle'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 border border-emerald-500'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
            <span>Shuttle Faza & Putovanje</span>
          </button>
        </div>
      </div>

      {/* Shuttle Phase Dedicated Visual Flow */}
      {activeBoardSide === 'shuttle' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Druga faza svake runde</span>
                <h3 className="text-2xl font-heading font-bold text-white mt-1">Shuttle Phase (Faza Šatla)</h3>
                <p className="text-xs text-slate-400">Pravila sa strane 19 i 20 zvaničnog pravilnika</p>
              </div>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded text-slate-300">
                Strana 19-20
              </span>
            </div>

            {/* Step 1: Shuttle Movement */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-orange-950 text-orange-300 flex items-center justify-center text-[11px] font-bold border border-orange-700">1</span>
                  Kretanje Šatla
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Na početku faze pomerite Šatl 1 polje prema sredini table. Ako je Šatl već bio na crvenom Travel polju 1 (najbližem sredini), Šatl <strong>PUTUJE</strong>!
                  Tada se premešta na Travel polje suprotne strane čiji broj odgovara trenutnom <strong>Nivou Kolonije (Colony Level)</strong>.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 flex items-center justify-center text-[11px] font-bold border border-cyan-700">2</span>
                  Odluka o Putovanju
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Po redosledu poteza (Turn Order), svi igrači odlučuju da li putuju.
                  <br />• <strong>Besplatno putovanje:</strong> Ako Šatl putuje i vi ste na strani SA KOJE šatl kreće!
                  <br />• <strong>Prinudno putovanje:</strong> U svakom drugom slučaju morate trajno odbaciti <strong>1 brod iz svog Hangara</strong> u kutiju!
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 flex items-center justify-center text-[11px] font-bold border border-emerald-700">3</span>
                  Ako NE putujete
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Samo uspravite svoju figuru igrača na njenom trenutnom Turn Order polju.
                  <strong className="text-amber-400 block mt-1">VAŽNO: Ne dobijate ponovo bonus tog polja!</strong>
                </p>
              </div>
            </div>

            {/* Travel Directions Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              {/* Travel to Colony */}
              <div className="bg-amber-950/20 border border-amber-600/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-lg text-amber-300 flex items-center gap-2">
                    <Rocket className="w-5 h-5" /> Putovanje na Koloniju (Travel to Colony)
                  </h4>
                  <span className="text-xs text-amber-400 font-medium">Iz Orbite na Mars</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-400 block mb-1">1. Exploration Space (Discovery Pločica):</strong>
                    Uzmite 1 od otvorenih Discovery pločica sa polja Exploration i postavite je na prazan heks <strong>tačno 3 polja udaljen od vašeg Rovera</strong>! (Ako vaš rover još nije na mapi, računa se kao da je na početnom rudniku u centru). Zatim otvorite novu pločicu na prazno mesto.
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-400 block mb-1">2. Vraćanje Kolonista (Retrieve Colonists):</strong>
                    a) Vratite sve svoje koloniste sa polja akcija na strani Kolonije nazad u svoj Living Quarters.
                    b) Vratite sve svoje koloniste iz Working Area nazad u Living Quarters! (Ako nema mesta, višak ide pored table).
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-400 block mb-1">3. Izbor Turn Order Polja:</strong>
                    Stavite svoju figuru na slobodno Turn Order polje na strani Kolonije i uzmite bonus odštampan na tom polju.
                  </div>
                </div>
              </div>

              {/* Travel to Orbit */}
              <div className="bg-cyan-950/20 border border-cyan-600/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-lg text-cyan-300 flex items-center gap-2">
                    <Orbit className="w-5 h-5" /> Putovanje u Orbitu (Travel to Orbit)
                  </h4>
                  <span className="text-xs text-cyan-400 font-medium">Sa Marsa u Orbitu</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <strong className="text-cyan-400 block mb-1">1. Proizvodnja (Production Space):</strong>
                    Svaka vaša <strong>Napredna Zgrada (Advanced Building)</strong> na Marsu proizvodi 1 odgovarajući resurs! Svaka napredna zgrada na Skloništu proizvodi 1 Kristal. Svaki vaš Kolonista (Rudar) ili napredna zgrada na Rudniku proizvodi <strong>1 Mineral</strong>!
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <strong className="text-cyan-400 block mb-1">2. Vraćanje Kolonista (Retrieve Colonists):</strong>
                    a) Vratite sve svoje koloniste sa polja akcija na strani Orbite nazad u svoj Living Quarters.
                    b) Vratite sve koloniste iz svog Working Area nazad u Living Quarters!
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <strong className="text-cyan-400 block mb-1">3. Izbor Turn Order Polja:</strong>
                    Stavite svoju figuru na slobodno Turn Order polje na strani Orbite i odmah uzmite bonus odštampan na tom polju.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Cards List for Colony, Orbit, or Executive */}
      {activeBoardSide !== 'shuttle' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xl font-heading font-bold text-white">
              {activeBoardSide === 'colony' && 'Akcije Kolonije na Površini Marsa'}
              {activeBoardSide === 'orbit' && 'Akcije Svemirske Stanice u Orbiti'}
              {activeBoardSide === 'executive' && 'Pregled Izvršnih Akcija (Depot & Naučnici)'}
            </h3>
            <span className="text-xs text-slate-400">Kliknite na akciju za detaljan tok poteza</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredActions.map((action) => {
              const isExpanded = expandedActionId === action.id;
              return (
                <div
                  key={action.id}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'bg-slate-900 border-orange-500/60 shadow-xl'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Action Header Card */}
                  <div
                    onClick={() => setExpandedActionId(isExpanded ? '' : action.id)}
                    className="p-5 cursor-pointer flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        action.side === 'orbit'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                          : action.side === 'colony'
                          ? 'bg-amber-950 text-amber-300 border border-amber-700'
                          : 'bg-purple-950 text-purple-300 border border-purple-700'
                      }`}>
                        {action.side === 'orbit' ? 'ORB' : action.side === 'colony' ? 'COL' : 'EXE'}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-lg text-white">
                          {action.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-400 italic">{action.titleEn}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[11px] text-slate-400">Strana {action.referencePage}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {action.requiresRedColonist && (
                        <span className="text-xs bg-red-950/80 text-red-300 border border-red-700/60 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          Traži Crvenog Kolonistu
                        </span>
                      )}
                      <button className="text-xs font-bold text-orange-400 hover:text-orange-300">
                        {isExpanded ? 'Zatvori' : 'Detalji'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-slate-800 space-y-5">
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {action.shortDesc}
                      </p>

                      {/* Cost and Requirements */}
                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                          Trošak i preduslovi za akciju:
                        </div>
                        <div className="text-xs text-slate-200">
                          {action.costDescription}
                        </div>
                        {action.boostOptions && (
                          <div className="pt-2 border-t border-slate-800/80 space-y-1">
                            <span className="text-[11px] font-semibold text-cyan-400 block">Opcije pojačavanja (Boost):</span>
                            {action.boostOptions.map((boost, bIdx) => (
                              <div key={bIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{boost}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Step-by-Step Flow */}
                      <div className="space-y-2">
                        <h5 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Korak po korak rešavanje akcije:</span>
                        </h5>
                        <div className="space-y-2">
                          {action.steps.map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="flex items-start gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 text-xs text-slate-300 leading-relaxed"
                            >
                              <span className="w-5 h-5 rounded-full bg-slate-800 text-orange-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                                {sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Important Notes / Pitfalls */}
                      {action.importantNotes.length > 0 && (
                        <div className="bg-amber-950/30 border border-amber-600/30 rounded-xl p-4 text-xs text-amber-200 space-y-2">
                          <div className="font-bold flex items-center gap-1.5 text-amber-300">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span>Ključne napomene & Pravila koja se često zaborave:</span>
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-slate-300">
                            {action.importantNotes.map((note, nIdx) => (
                              <li key={nIdx}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
