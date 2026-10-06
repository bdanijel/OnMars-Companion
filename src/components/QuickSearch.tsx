import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Layers, HelpCircle, CheckSquare, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import { ACTIONS, COMPONENTS, FAQ_LIST, SETUP_STEPS } from '../data/rulesData';

interface QuickSearchProps {
  onNavigateToAction?: (actionId: string) => void;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({ onNavigateToAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'actions' | 'components' | 'faq' | 'setup'>('all');

  const filteredResults = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    const matchedActions = ACTIONS.filter(a => {
      if (activeCategory !== 'all' && activeCategory !== 'actions') return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.titleEn.toLowerCase().includes(q) ||
        a.shortDesc.toLowerCase().includes(q) ||
        a.steps.some(s => s.toLowerCase().includes(q)) ||
        a.importantNotes.some(n => n.toLowerCase().includes(q))
      );
    });

    const matchedComponents = COMPONENTS.filter(c => {
      if (activeCategory !== 'all' && activeCategory !== 'components') return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.rulesDetail.toLowerCase().includes(q) ||
        (c.twoPlayerNote && c.twoPlayerNote.toLowerCase().includes(q))
      );
    });

    const matchedFAQ = FAQ_LIST.filter(f => {
      if (activeCategory !== 'all' && activeCategory !== 'faq') return false;
      if (!q) return true;
      return (
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
      );
    });

    const matchedSetup = SETUP_STEPS.filter(s => {
      if (activeCategory !== 'all' && activeCategory !== 'setup') return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.twoPlayerNote && s.twoPlayerNote.toLowerCase().includes(q))
      );
    });

    return {
      actions: matchedActions,
      components: matchedComponents,
      faq: matchedFAQ,
      setup: matchedSetup,
      totalCount: matchedActions.length + matchedComponents.length + matchedFAQ.length + matchedSetup.length
    };
  }, [searchTerm, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Search Header Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/40 p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Instant Baza Znanja On Mars</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2">
            Brza Pretraga Pravila, Pločica i Komponenti
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Pronađite objašnjenje za bilo koje pravilo, simbol, zgradu, ugovor ili nedoumicu u sekundi tokom igranja!
          </p>

          {/* Search Input Bar */}
          <div className="mt-5 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Unesite pojam (npr. 'minerali ugovor', 'displej zgrada', 'red colonist', 'rover', 'lss', 'tie break', 'kockica progresa')..."
              className="w-full bg-slate-950/90 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded"
              >
                Obriši
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
            <span className="text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {[
              { id: 'all', label: `Sve (${filteredResults.totalCount})` },
              { id: 'actions', label: `Akcije (${filteredResults.actions.length})` },
              { id: 'components', label: `Komponente & Pločice (${filteredResults.components.length})` },
              { id: 'faq', label: `FAQ & Nedoumice (${filteredResults.faq.length})` },
              { id: 'setup', label: `Postavka (${filteredResults.setup.length})` },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Pronađeno <strong>{filteredResults.totalCount}</strong> rezultata
          {searchTerm && <span> za &quot;{searchTerm}&quot;</span>}
        </span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-orange-400 hover:underline"
          >
            Prikaži sve
          </button>
        )}
      </div>

      {/* Main Results Grid */}
      <div className="space-y-8">
        {/* Actions Results */}
        {filteredResults.actions.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-orange-400 font-heading font-semibold text-lg border-b border-slate-800 pb-2">
              <BookOpen className="w-5 h-5" />
              <span>Glavne Akcije Table ({filteredResults.actions.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.actions.map((action) => (
                <div
                  key={action.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-orange-500/50 rounded-xl p-5 space-y-3 transition-all hover:shadow-lg hover:shadow-orange-950/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        action.side === 'orbit'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          : action.side === 'colony'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-purple-950 text-purple-300 border border-purple-800'
                      }`}>
                        {action.side === 'orbit' ? 'Orbita' : action.side === 'colony' ? 'Kolonija' : 'Izvršna'}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-white mt-1">
                        {action.title}
                      </h3>
                      <p className="text-xs text-slate-400 italic">{action.titleEn}</p>
                    </div>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 whitespace-nowrap">
                      Strana {action.referencePage}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {action.shortDesc}
                  </p>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
                    <div className="text-amber-400 font-medium">Trošak i zahtevi:</div>
                    <div className="text-slate-300">{action.costDescription}</div>
                  </div>

                  {action.importantNotes.length > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-xs text-amber-200/90 flex gap-2 items-start">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        {action.importantNotes.map((note, idx) => (
                          <div key={idx} className="leading-snug">{note}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {onNavigateToAction && (
                    <button
                      onClick={() => onNavigateToAction(action.id)}
                      className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium pt-1"
                    >
                      Pogledaj detaljan vodič kroz korake <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Components & Tiles Results */}
        {filteredResults.components.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-heading font-semibold text-lg border-b border-slate-800 pb-2">
              <Layers className="w-5 h-5" />
              <span>Komponente, Pločice i Mehanike ({filteredResults.components.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.components.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 space-y-2.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-heading font-bold text-base text-white">
                        {comp.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{comp.nameEn}</p>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                      Strana {comp.pageRef}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{comp.description}</p>

                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-cyan-400 block mb-1">Pravilo:</strong>
                    {comp.rulesDetail}
                  </div>

                  {comp.twoPlayerNote && (
                    <div className="bg-amber-950/40 border border-amber-600/30 rounded-lg p-2 text-[11px] text-amber-300">
                      <strong>Za 2 igrača:</strong> {comp.twoPlayerNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Results */}
        {filteredResults.faq.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-heading font-semibold text-lg border-b border-slate-800 pb-2">
              <HelpCircle className="w-5 h-5" />
              <span>Najčešća Pitanja & Nedoumice ({filteredResults.faq.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.faq.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 space-y-2 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-heading font-bold text-sm text-emerald-300 leading-snug">
                      {item.question}
                    </h4>
                    {item.pageRef && (
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 shrink-0">
                        p.{item.pageRef}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Setup Steps Results */}
        {filteredResults.setup.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-heading font-semibold text-lg border-b border-slate-800 pb-2">
              <CheckSquare className="w-5 h-5" />
              <span>Koraci Postavke Igre ({filteredResults.setup.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.setup.map((step) => (
                <div
                  key={step.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-700 text-purple-300 text-xs font-bold flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-white">
                        {step.title}
                      </h4>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                      p.{step.pageRef}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                  {step.isTwoPlayerSpecial && step.twoPlayerNote && (
                    <div className="bg-amber-950/50 border border-amber-600/40 rounded-lg p-2 text-xs text-amber-300">
                      <strong>Pravilo za 2 igrača:</strong> {step.twoPlayerNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {filteredResults.totalCount === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-slate-300">Nema rezultata za &quot;{searchTerm}&quot;</h3>
            <p className="text-xs text-slate-500 mt-1">Pokušajte sa kraćim terminom poput &quot;kristal&quot;, &quot;ugovor&quot;, &quot;tehnologija&quot;, ili &quot;2 igrača&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
};
