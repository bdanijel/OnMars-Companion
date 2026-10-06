import React, { useState } from 'react';
import { Github, Copy, Check, Terminal, ExternalLink, Globe, Sparkles, FolderGit2 } from 'lucide-react';

export const GithubDeployGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Kreirajte novi GitHub repozitorijum',
      desc: 'Idite na github.com/new i napravite novi repozitorijum npr. "on-mars-companion" (može biti Public ili Private).',
      command: null
    },
    {
      title: '2. Inicijalizacija i prvi Commit u vašem terminalu',
      desc: 'U folderu projekta pokrenite sledeće komande:',
      command: `git init
git add .
git commit -m "Initial commit: On Mars board game companion app for Danijel & Ceca"`
    },
    {
      title: '3. Povežite lokalni kod sa vašim GitHub repozitorijumom',
      desc: 'Zamenite KORISNICKO_IME i on-mars-companion sa vašim GitHub podacima:',
      command: `git branch -M main
git remote add origin https://github.com/KORISNICKO_IME/on-mars-companion.git
git push -u origin main`
    },
    {
      title: '4. Besplatno Pokretanje Uživo (GitHub Pages ili Vercel)',
      desc: 'Dva najlakša načina da aplikacija bude dostupna na internetu i na telefonu tokom partije:',
      options: [
        {
          name: 'Opcija A: Vercel (Najlakše - 1 klik)',
          detail: 'Idite na vercel.com, kliknite "Add New Project", uvezite vaš "on-mars-companion" repozitorijum sa GitHub-a i kliknite "Deploy". Sajt je onlajn za 30 sekundi!'
        },
        {
          name: 'Opcija B: GitHub Pages',
          detail: 'U vite.config.ts dodajte base: "./", zatim instalirajte "gh-pages" (npm i gh-pages -D) i dodajte "deploy": "gh-pages -d dist" u package.json scripts.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            <FolderGit2 className="w-4 h-4" />
            <span>GitHub & Online Hosting Vodič</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2">
            Kako Lako Objaviti Aplikaciju na GitHub-u
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Aplikacija je potpuno samostalna (React + TypeScript + Vite + Tailwind CSS) bez skrivenih zavisnosti. Možete je postaviti na GitHub i pokrenuti besplatno za igranje na telefonu, tabletu ili laptopu tokom partije.
          </p>
        </div>
      </div>

      {/* Step by step cards */}
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-indigo-400 text-xs font-bold flex items-center justify-center border border-slate-700">
                {idx + 1}
              </span>
              <span>{step.title}</span>
            </h3>
            <p className="text-xs text-slate-300">{step.desc}</p>

            {step.command && (
              <div className="relative bg-slate-950 rounded-xl p-4 font-mono text-xs text-indigo-200 border border-slate-800 overflow-x-auto">
                <pre>{step.command}</pre>
                <button
                  onClick={() => copyToClipboard(step.command!, idx)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Kopiraj u klipbord"
                >
                  {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {step.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {step.options.map((opt, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="font-heading font-bold text-sm text-indigo-300 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-indigo-400" />
                      <span>{opt.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{opt.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
