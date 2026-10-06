import React, { useState } from 'react';
import { Users, AlertTriangle, Calculator, CheckCircle2, Flame, Shield, ArrowRight, Zap, RefreshCw, Layers } from 'lucide-react';
import { PLAYERS } from '../data/rulesData';

interface TwoPlayerHubProps {
  colonyLevel: number;
  setColonyLevel: (l: number) => void;
  missionsRemaining: number;
  setMissionsRemaining: (m: number) => void;
  shuttlePosition: 'orbit' | 'colony';
  setShuttlePosition: (p: 'orbit' | 'colony') => void;
}

export const TwoPlayerHub: React.FC<TwoPlayerHubProps> = ({
  colonyLevel,
  setColonyLevel,
  missionsRemaining,
  setMissionsRemaining,
  shuttlePosition,
  setShuttlePosition
}) => {
  // Calculator state
  const [activePlayer, setActivePlayer] = useState<'danijel' | 'ceca'>('danijel');
  const [existingColonistsCount, setExistingColonistsCount] = useState<number>(0);
  const [selectedActionType, setSelectedActionType] = useState<string>('blueprint');
  const [maxSlotsForAction, setMaxSlotsForAction] = useState<number>(3); // standard slots usually 3

  const playerObj = PLAYERS[activePlayer];
  const opponentObj = activePlayer === 'danijel' ? PLAYERS.ceca : PLAYERS.danijel;

  // 2-player cost formula:
  // In a 2-player game: The additional cost is 1 Crystal / Colonist to Working Area for EACH Colonist
  // (both yours and your opponent's) already on the Action slots!
  const additionalCost = existingColonistsCount;

  return (
    <div className="space-y-8">
      {/* 2-Player Focus Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-red-950/40 p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-orange-400">
            <Users className="w-3.5 h-3.5" />
            <span>Optimizovano za 2 Igrača</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-3">
            Danijel (Žuta) vs Ceca (Crvena) – Specijalna Pravila
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Igra u dva igrača na mapi Marsa je izuzetno tesna, taktička i nemilosrdna. Zalihe u magacinu su prepolovljene,
            nema novih tehnologija tokom partije, a svako postavljanje koloniste košta više zbog svakog prethodnog prisustva!
          </p>
        </div>

        {/* Player Switcher Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Danijel Card */}
          <div
            onClick={() => setActivePlayer('danijel')}
            className={`cursor-pointer rounded-xl p-4 border transition-all ${
              activePlayer === 'danijel'
                ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500'
                : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400 shadow-sm shadow-amber-400/80 ring-2 ring-amber-400/30"></span>
                <span className="font-heading font-bold text-base text-amber-300">Danijel</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                Žuti Igrač
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Početno Sklonište na mapi: gornja-leva heks pozicija za 2 igrača (vidi strana 6).
            </p>
          </div>

          {/* Ceca Card */}
          <div
            onClick={() => setActivePlayer('ceca')}
            className={`cursor-pointer rounded-xl p-4 border transition-all ${
              activePlayer === 'ceca'
                ? 'bg-red-950/40 border-red-500 shadow-lg shadow-red-950/40 ring-1 ring-red-500'
                : 'bg-slate-900/60 border-slate-800 hover:border-red-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-red-500 shadow-sm shadow-red-500/80 ring-2 ring-red-500/30"></span>
                <span className="font-heading font-bold text-base text-red-300">Ceca</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-medium">
                Crveni Igrač
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Početno Sklonište na mapi: donja heks pozicija za 2 igrača (vidi strana 6).
            </p>
          </div>
        </div>
      </div>

      {/* 2-Player Interactive Red Colonist Cost Calculator */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Kalkulator Troška Postavljanja Koloniste (Red Colonist Cost)
              </h3>
              <p className="text-xs text-slate-400">
                Specifična formula za 2 igrača (Pravilo sa strane 9 i strane 24)
              </p>
            </div>
          </div>
          <div className="text-xs text-amber-400 bg-amber-950/50 px-3 py-1.5 rounded-lg border border-amber-600/30">
            Aktivni igrač na potezu: <strong>{playerObj.name}</strong> ({playerObj.colorNameSr})
          </div>
        </div>

        {/* Calculator inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Action type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Izaberi Akciju sa Crvenim Kolonistom:</label>
            <select
              value={selectedActionType}
              onChange={(e) => setSelectedActionType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="blueprint">Obtain Blueprint (Nacrt - Orbita)</option>
              <option value="learn_tech">Learn New Tech (Učenje Tehnologije - Orbita)</option>
              <option value="rnd">R&D (Istraživanje & Razvoj - Orbita)</option>
              <option value="control_center">Control Center (Botovi & Rover - Kolonija)</option>
              <option value="construct">Construct a Building (Gradnja Zgrade - Kolonija)</option>
              <option value="upgrade">Upgrade a Building (Unapređenje - Kolonija)</option>
              <option value="welcome_ship">Welcome a Ship (Dozovi Brod - Kolonija)</option>
              <option value="hire_scientist">Hire Scientist / Contract (Naučnici / Ugovori - Kolonija)</option>
            </select>
            <p className="text-[11px] text-slate-500">
              {selectedActionType === 'hire_scientist'
                ? '⚠️ PAŽNJA: Ova akcija ima samo 1 slot po igraču i nikada se ne prazni automatski!'
                : 'Standardna akcija sa mestima za koloniste.'}
            </p>
          </div>

          {/* Number of colonists currently on action */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Koliko kolonista je VEĆ na poljima ove akcije?
            </label>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((count) => (
                <button
                  key={count}
                  onClick={() => setExistingColonistsCount(count)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    existingColonistsCount === count
                      ? 'bg-orange-600 text-white border-orange-500 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {count === 0 ? 'Nema (0)' : `${count} kolonist${count > 1 ? 'a' : ''}`}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              U 2 igrača broje se <strong>I DANIJELOVI I CECINI</strong> kolonisti koji su već tamo!
            </p>
          </div>

          {/* Cost Result Display */}
          <div className="bg-slate-950 rounded-xl p-4 border border-orange-500/30 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Ukupni dodatni trošak za {playerObj.name}:
            </span>
            <div className="my-2">
              {additionalCost === 0 ? (
                <div className="flex items-center gap-2 text-emerald-400 font-heading font-bold text-xl">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>0 Dodatnog Troška (BESPLATNO!)</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-amber-400 font-heading font-bold text-xl flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500" />
                    <span>Plati: {additionalCost} Kristal{additionalCost > 1 ? 'a' : ''}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    ILI pomeri {additionalCost} kolonist{additionalCost > 1 ? 'a' : 'u'} iz Living Quarters u Working Area (ili kombinuj!).
                  </div>
                </div>
              )}
            </div>
            <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-1.5">
              + Standardno postavlja 1 svog kolonistu iz Living Quarters na prazno polje akcije.
            </div>
          </div>
        </div>

        {/* Full Action Slots Reminder */}
        {existingColonistsCount >= 3 && (
          <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-4 text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Šta ako su sva mesta akcije popunjena (3 mesta)?</span>
            </div>
            <p className="leading-relaxed">
              Pre nego što {playerObj.name} odigra akciju: uklanjaju se <strong>SVI kolonisti igrača koji ima najviše kolonista na toj akciji</strong>
              (ako i Danijel i Ceca imaju podjednako, sklanjaju se svi!). Sklonjeni kolonisti idu u Working Area svojih vlasnika.
              Zatim {playerObj.name} plaća dodatni trošak samo za one koloniste koji su eventualno preostali na polju!
            </p>
          </div>
        )}
      </div>

      {/* 2-Player Differences Comprehensive List */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-orange-400" />
          <span>Sve Razlike Pravila za 2 Igrača (Referentna Lista)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Difference 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-base text-amber-300">
                1. Magacin (Warehouse) ima samo po 2 resursa
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Strana 4, 16</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prilikom postavke u magacin stavite samo po <strong>2 Kristala, 2 Baterije, 2 Vode, 2 Biljke i 2 Kiseonika</strong> (umesto po 3).
              Takođe, kada god se Colony Status unapredi i magacin dopuni, dopunjava se maksimalno <strong>do 2 komada</strong> svakog!
            </p>
          </div>

          {/* Difference 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-base text-cyan-300">
                2. Tehnologije (Tech Grid) – Samo 1 Set i NEMA dopune!
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Strana 4, 16, 24</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tokom postavke koristi se samo 1 set Tech pločica na tabli. Preostalih 8 pločica drugog seta se <strong>trajno vraća u kutiju igre</strong>.
              Pri podizanju nivoa kolonije, prazna mesta na Tech Grid-u se <strong>NE DOPUNJAVAJU</strong>! Tehnologije su strogo limitirane!
            </p>
          </div>

          {/* Difference 3 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-base text-red-300">
                3. Cena Crvenog Koloniste (Red Colonist Cost)
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Strana 9, 24</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dodatni trošak za akciju je <strong>1 Kristal ili 1 kolonista u Working Area po SVAKOM kolonisti</strong> (i vašem i protivnikovom) koji je već na toj akciji.
              Za razliku od 3-4 igrača gde se broje samo tuđe boje, u 2 igrača se plaća i za sopstvene prethodno ostavljene koloniste!
            </p>
          </div>

          {/* Difference 4 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-base text-emerald-300">
                4. Pozicije Početnih Skloništa (Shelters)
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Strana 6</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Danijel (žuti) postavlja svoje početno sklonište na gornje heks polje, a Ceca (crvena) na donje polje namenjeno za 2 igrača (označeno ikonicom za 2 igrača na tabli).
              Preostale 2 pozicije za 3. i 4. igrača ostaju prazne.
            </p>
          </div>

          {/* Difference 5 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-base text-purple-300">
                5. Kockice za Praćenje Misija (Mission Cubes)
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Strana 5</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kada postavite 3 Mission karte na tablu, kockica za praćenje misije se stavlja na polje rezervisano za <strong>2 igrača</strong> (koje zahteva manji ukupan doprinos nego za 3 ili 4 igrača kako bi partija imala pravu dinamiku).
            </p>
          </div>

          {/* Difference 6 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-base text-amber-400">
                6. First Colonists Varijanta za Prvu Partiju
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Strana 24</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Preporučuje se upotreba unapred definisane 3 misije (Obtain Blueprint, Hire Scientist, Control Center), kao i First Colonist pločice za nasumični početni redosled i First Colonist karte A i B za vođeni početni razvoj.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
