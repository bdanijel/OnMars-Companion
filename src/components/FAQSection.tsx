import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, Sparkles, Filter, BookmarkCheck } from 'lucide-react';
import { FAQ_LIST } from '../data/rulesData';

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string>('faq-minerals-contract');
  const [filterOnlyHighlighted, setFilterOnlyHighlighted] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Sve Nedoumice' },
    { id: 'twoplayer', label: '2 Igrača (Danijel & Ceca)' },
    { id: 'contracts', label: 'Ugovori & Nacrti' },
    { id: 'actions', label: 'Akcije & Pomeranje' },
    { id: 'colonists', label: 'Kolonisti & Kristali' },
    { id: 'tech', label: 'Tehnologije' },
    { id: 'lss', label: 'LSS & Gradnja' },
    { id: 'endgame', label: 'Kraj Igre & Tie-Break' },
  ];

  const filteredFaq = FAQ_LIST.filter(item => {
    if (filterOnlyHighlighted && !item.highlight) return false;
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? '' : id);
  };

  return (
    <div className="space-y-6">
      {/* FAQ Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <HelpCircle className="w-4 h-4" />
            <span>Brzi Odgovori na Pitanja i Pravilne Odluke</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2">
            FAQ i Rešavanje Najčešćih Nedoumica
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Igra On Mars ima mnogo međusobno povezanih pravila. Ovde su sabrane sve situacije oko kojih igrači najčešće prekidaju partiju da bi listali pravilnik – sa direktnim referencama na originalne stranice.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <button
              onClick={() => setFilterOnlyHighlighted(!filterOnlyHighlighted)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                filterOnlyHighlighted
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800/40 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Samo Najvažnije Nedoumice</span>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Items Accordion */}
      <div className="space-y-3">
        {filteredFaq.map((item) => {
          const isExpanded = expandedFaqId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all ${
                item.highlight
                  ? isExpanded
                    ? 'bg-slate-900 border-amber-500/60 shadow-lg'
                    : 'bg-slate-900/80 border-amber-500/30 hover:border-amber-500/60'
                  : isExpanded
                  ? 'bg-slate-900 border-emerald-500/60 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(item.id)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    item.highlight
                      ? 'bg-amber-950 text-amber-400 border border-amber-600/50'
                      : 'bg-slate-800 text-emerald-400'
                  }`}>
                    ?
                  </div>
                  <div>
                    <h3 className={`font-heading font-bold text-sm sm:text-base leading-snug ${
                      item.highlight ? 'text-amber-200' : 'text-white'
                    }`}>
                      {item.question}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {item.highlight && (
                        <span className="text-[10px] font-semibold bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-600/40">
                          Ključno pravilo
                        </span>
                      )}
                      {item.pageRef && (
                        <span className="text-[10px] text-slate-400">
                          Pravilnik: Strana {item.pageRef}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-slate-400 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3">
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 whitespace-pre-line leading-relaxed font-sans text-slate-300">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaq.length === 0 && (
          <div className="text-center py-10 bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-xs">
            Nema pronađenih pitanja za odabrani filter.
          </div>
        )}
      </div>
    </div>
  );
};
