import React, { useState } from 'react';
import { Github, Copy, Check, Terminal, ExternalLink, Globe, Sparkles, FolderGit2, PlayCircle, Settings, CheckCircle2 } from 'lucide-react';

export const GithubDeployGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const workflowYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>GitHub Actions CI/CD Automatski Deploy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2">
            Publish Preko GitHub Actions na GitHub Pages
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Fajl za automatski build i deploy (<code className="text-amber-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">.github/workflows/deploy.yml</code>) je <strong>već pripremljen i nalazi se u projektu</strong>!
            Svaki put kada uradite <code className="text-emerald-400 font-mono">git push</code>, GitHub Actions će sam instalirati pakete, bildovati aplikaciju i ažurirati vaš sajt na internetu.
          </p>
        </div>
      </div>

      {/* Step by step cards */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-indigo-400 text-xs font-bold flex items-center justify-center border border-slate-700">
              1
            </span>
            <span>Kreirajte novi repozitorijum na GitHub-u</span>
          </h3>
          <p className="text-xs text-slate-300">
            Otvorite <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-indigo-400 underline hover:text-indigo-300">github.com/new</a> i napravite novi repozitorijum, na primer nazvan <strong>on-mars-companion</strong>. Može biti i <em>Public</em> i <em>Private</em> (GitHub Pages sa Actions radi na oba).
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-indigo-400 text-xs font-bold flex items-center justify-center border border-slate-700">
              2
            </span>
            <span>Inicijalizujte Git i Pushujte kod na GitHub</span>
          </h3>
          <p className="text-xs text-slate-300">
            U terminalu u folderu ovog projekta pokrenite sledeće komande (zamenite <code className="text-amber-300">TVOJ_GITHUB_USERNAME</code>):
          </p>

          <div className="relative bg-slate-950 rounded-xl p-4 font-mono text-xs text-indigo-200 border border-slate-800 overflow-x-auto">
            <pre>{`git init
git add .
git commit -m "On Mars Companion app with GitHub Actions workflow"
git branch -M main
git remote add origin https://github.com/TVOJ_GITHUB_USERNAME/on-mars-companion.git
git push -u origin main`}</pre>
            <button
              onClick={() => copyToClipboard(`git init\ngit add .\ngit commit -m "On Mars Companion app with GitHub Actions workflow"\ngit branch -M main\ngit remote add origin https://github.com/TVOJ_GITHUB_USERNAME/on-mars-companion.git\ngit push -u origin main`, 'git-push')}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Kopiraj komande"
            >
              {copiedKey === 'git-push' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Step 3 - Crucial GitHub Settings */}
        <div className="bg-emerald-950/20 rounded-xl border border-emerald-500/40 p-5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-emerald-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold flex items-center justify-center border border-emerald-600">
                3
              </span>
              <span>KLJUČNO PODEŠAVANJE: Uključite GitHub Actions za Pages</span>
            </h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Jednokratno
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Nakon što pushujete kod, GitHub podrazumevano čeka da mu kažete da koristite <strong>GitHub Actions</strong>:
          </p>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/30 text-xs text-slate-200 space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">a</span>
              <span>Otvorite vaš repozitorijum na GitHub-u i kliknite na tab <strong>Settings</strong> na vrhu.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">b</span>
              <span>U levom meniju kliknite na sekciju <strong>Pages</strong> (ispod &quot;Code and automation&quot;).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">c</span>
              <span>
                Pod sekcijom <strong>Build and deployment</strong>, kliknite na padajući meni <strong>Source</strong> i izaberite:
                <strong className="text-amber-400 ml-1 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  GitHub Actions
                </strong>
                (umesto &quot;Deploy from a branch&quot;).
              </span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-indigo-400 text-xs font-bold flex items-center justify-center border border-slate-700">
              4
            </span>
            <span>Pratite automatski rad i otvorite sajt!</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kliknite na tab <strong>Actions</strong> na vašem GitHub repozitorijumu. Videćete pokrenut workflow <strong>Deploy to GitHub Pages</strong>.
            Za oko 40-60 sekundi pojaviće se zelena kvačica <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" /> i link do vaše aplikacije:
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-amber-300 font-mono flex items-center justify-between">
            <span>https://TVOJ_GITHUB_USERNAME.github.io/on-mars-companion/</span>
            <Globe className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        {/* Workflow File Preview */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-indigo-400" />
              <span>Sadržaj Workflow fajla (.github/workflows/deploy.yml)</span>
            </h3>
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded font-mono">
              Već kreiran u projektu
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Ovaj fajl je već konfigurisan za automatski Node.js 20 build, kreiranje Vite produkcionog dist paketa i distribuciju na GitHub Pages server:
          </p>

          <div className="relative bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-300 border border-slate-800 max-h-72 overflow-y-auto">
            <pre>{workflowYaml}</pre>
            <button
              onClick={() => copyToClipboard(workflowYaml, 'yaml')}
              className="sticky top-2 float-right p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Kopiraj YAML"
            >
              {copiedKey === 'yaml' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

