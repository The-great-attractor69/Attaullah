import React, { useState } from 'react';
import { X, Check, Copy, Terminal, Github, FolderTree, Code, Sparkles, CheckCircle2 } from 'lucide-react';

interface GitHubDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployGuideModal: React.FC<GitHubDeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'steps' | 'actions' | 'tree' | 'vite'>('steps');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const projectFileTree = `my-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/                     # Static icons & manifest
├── src/
│   ├── assets/                 # Background horizon image & textures
│   ├── components/
│   │   ├── SaltMonolith3D.tsx         # Three.js low-poly 3D crystal monolith
│   │   ├── DataPipelineSimulator.tsx  # 4-stage interactive pipeline simulator
│   │   ├── ProjectDetailModal.tsx     # Case study inspection modal
│   │   └── GitHubDeployGuideModal.tsx # Built-in deployment guide
│   ├── data/
│   │   └── initialData.ts             # All portfolio content & lighting themes
│   ├── types/
│   │   └── portfolio.ts               # TypeScript data definitions
│   ├── utils/
│   │   └── ambientAudio.ts            # Soothing ambient audio synthesizer
│   ├── App.tsx                        # Master layout (split-view & tabs)
│   ├── index.css                      # Tailwind CSS v4 styling & typography
│   └── main.tsx                       # React DOM entry point
├── index.html                  # HTML entry point (fonts & meta tags)
├── package.json                # Dependencies: react, three, tailwindcss, etc.
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite config with base: './' for GitHub Pages`;

  const gitPushCommands = `# 1. Create a repository on GitHub (e.g. "portfolio" or "the-great-attractor69.github.io")
# 2. Open your terminal in the project directory:
git init
git add .
git commit -m "feat: initial release of Atta Ullah portfolio"
git branch -M main
git remote add origin https://github.com/the-great-attractor69/the-great-attractor69.github.io.git
git push -u origin main`;

  const githubActionsWorkflow = `name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v4

      - name: Upload static artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const viteConfigSnippet = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  // CRITICAL for GitHub Pages: relative base path prevents 404s on subpaths
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#130f0d] border border-stone-800 rounded-2xl shadow-2xl text-stone-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#130f0d]/95 backdrop-blur-md border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-[#d97736]">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Step-by-Step GitHub Pages Deployment Guide
              </h2>
              <p className="text-xs text-stone-400">
                Complete walkthrough to host Atta Ullah's static portfolio live on GitHub Pages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-stone-800/80 px-6 bg-[#0f0c0a] text-xs">
          <button
            onClick={() => setActiveTab('steps')}
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'steps'
                ? 'border-[#d97736] text-white'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            1. Setup & Push
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'actions'
                ? 'border-[#d97736] text-white'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            2. GitHub Actions CI/CD
          </button>
          <button
            onClick={() => setActiveTab('tree')}
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'tree'
                ? 'border-[#d97736] text-white'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            3. Project File Tree
          </button>
          <button
            onClick={() => setActiveTab('vite')}
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'vite'
                ? 'border-[#d97736] text-white'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            4. Vite Base Path
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {activeTab === 'steps' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800">
                  <span className="text-[11px] font-mono text-[#d97736] uppercase block mb-1">
                    STEP 01
                  </span>
                  <h4 className="text-sm font-semibold text-white mb-1">Create GitHub Repo</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Create a new public repository on GitHub (named e.g.{' '}
                    <code>the-great-attractor69.github.io</code> or <code>portfolio</code>).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800">
                  <span className="text-[11px] font-mono text-[#d97736] uppercase block mb-1">
                    STEP 02
                  </span>
                  <h4 className="text-sm font-semibold text-white mb-1">Push Codebase</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Initialize git locally, add your remote, and push to the <code>main</code>{' '}
                    branch.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800">
                  <span className="text-[11px] font-mono text-[#d97736] uppercase block mb-1">
                    STEP 03
                  </span>
                  <h4 className="text-sm font-semibold text-white mb-1">Enable Pages</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Under Settings &rarr; Pages, select <strong>GitHub Actions</strong> as source.
                    It auto-deploys on every push!
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#d97736]" />
                  <span>Terminal Push Commands</span>
                </h3>
                <div className="relative group rounded-xl overflow-hidden bg-black/60 border border-stone-800 p-4">
                  <pre className="text-xs text-stone-300 font-mono overflow-x-auto whitespace-pre-wrap">
                    {gitPushCommands}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(gitPushCommands, 'push')}
                    className="absolute top-3 right-3 p-1.5 rounded bg-stone-800 text-stone-300 hover:text-white transition-colors"
                  >
                    {copiedKey === 'push' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  Automated GitHub Actions Deployment Workflow
                </h3>
                <p className="text-xs text-stone-400 mb-3">
                  Save this as <code className="text-[#d97736]">.github/workflows/deploy.yml</code>.
                  It installs dependencies, runs <code className="text-stone-300">npm run build</code>, and publishes the static <code className="text-stone-300">dist/</code> folder.
                </p>
              </div>

              <div className="relative group rounded-xl overflow-hidden bg-black/60 border border-stone-800 p-4">
                <pre className="text-xs text-stone-300 font-mono overflow-x-auto whitespace-pre-wrap max-h-96">
                  {githubActionsWorkflow}
                </pre>
                <button
                  onClick={() => copyToClipboard(githubActionsWorkflow, 'actions')}
                  className="absolute top-3 right-3 p-1.5 rounded bg-stone-800 text-stone-300 hover:text-white transition-colors"
                >
                  {copiedKey === 'actions' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tree' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-[#d97736]" />
                <span>Recommended Repository File Structure</span>
              </h3>
              <p className="text-xs text-stone-400">
                A clean, modular static React + Vite architecture ready for GitHub Pages hosting:
              </p>
              <div className="relative group rounded-xl overflow-hidden bg-black/60 border border-stone-800 p-4">
                <pre className="text-xs text-stone-300 font-mono overflow-x-auto whitespace-pre-wrap">
                  {projectFileTree}
                </pre>
                <button
                  onClick={() => copyToClipboard(projectFileTree, 'tree')}
                  className="absolute top-3 right-3 p-1.5 rounded bg-stone-800 text-stone-300 hover:text-white transition-colors"
                >
                  {copiedKey === 'tree' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'vite' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-1">
                Vite Configuration (`vite.config.ts`)
              </h3>
              <p className="text-xs text-stone-400">
                Setting <code className="text-[#d97736]">base: './'</code> ensures that all scripts,
                fonts, and images resolve accurately whether hosted at the root domain or in a
                repository subfolder.
              </p>
              <div className="relative group rounded-xl overflow-hidden bg-black/60 border border-stone-800 p-4">
                <pre className="text-xs text-stone-300 font-mono overflow-x-auto whitespace-pre-wrap">
                  {viteConfigSnippet}
                </pre>
                <button
                  onClick={() => copyToClipboard(viteConfigSnippet, 'vite')}
                  className="absolute top-3 right-3 p-1.5 rounded bg-stone-800 text-stone-300 hover:text-white transition-colors"
                >
                  {copiedKey === 'vite' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0f0c0a] border-t border-stone-800/80 flex items-center justify-between text-xs">
          <span className="text-stone-400">Static site · zero backend required · 100% free hosting</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#d97736] hover:bg-[#c26425] text-white font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
