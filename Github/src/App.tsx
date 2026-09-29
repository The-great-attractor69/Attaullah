/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SaltMonolith3D } from './components/SaltMonolith3D';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { DataPipelineSimulator } from './components/DataPipelineSimulator';
import { GitHubDeployGuideModal } from './components/GitHubDeployGuideModal';
import { ATTA_ULLAH_PORTFOLIO, MONOLITH_THEMES } from './data/initialData';
import { Project, MonolithTheme } from './types/portfolio';
import { ambientAudio } from './utils/ambientAudio';
import {
  Volume2,
  VolumeX,
  Github,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowUpRight,
  Linkedin,
  Instagram,
  Compass,
} from 'lucide-react';

type SectionKey = 'stats' | 'work' | 'skills' | 'experience' | 'availability' | 'statement';

export default function App() {
  const data = ATTA_ULLAH_PORTFOLIO;
  const [currentTheme, setCurrentTheme] = useState<MonolithTheme>('amber');
  const [activeSection, setActiveSection] = useState<SectionKey>('stats');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const themeConfig = MONOLITH_THEMES[currentTheme] || MONOLITH_THEMES.amber;

  // Handle email copy
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(data.email);
    setCopiedEmail(true);
    showToast(`Copied ${data.email} to clipboard`);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSound = () => {
    const isPlaying = ambientAudio.toggle();
    setIsPlayingAudio(isPlaying);
    showToast(isPlaying ? 'Ambient 528Hz hum active' : 'Sound muted');
  };

  // Switch between themes conveniently with toast
  const cycleTheme = () => {
    const themeKeys: MonolithTheme[] = ['amber', 'rosequartz', 'emerald', 'obsidian', 'celestial'];
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];
    setCurrentTheme(nextTheme);
    showToast(`Palette: ${MONOLITH_THEMES[nextTheme].name}`);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0908] text-[#e3ded4] overflow-x-hidden font-sans select-text">
      {/* Background Horizon Layer: Warm Desert Twilight Silhouette */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 bg-cover bg-center mix-blend-screen transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/src/assets/images/bg_desert_dusk_horizon_1790653316887.jpg')`,
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-[#090706] via-transparent to-[#0b0908]/85" />
      <div className="fixed inset-0 pointer-events-none bg-radial-at-c from-transparent via-[#0b0908]/40 to-[#060504]/90" />

      {/* Top Bar Navigation: 3-Zone Contract */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-stone-800/40 backdrop-blur-md bg-[#0b0908]/45">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            {data.name}
          </span>
          <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
            / QMS & DATA ARCHIVE
          </span>
        </div>

        {/* Zone 2: Section switcher pills with active highlight */}
        <nav className="hidden lg:flex items-center gap-1 text-xs">
          {(
            [
              { id: 'stats', label: 'Stats' },
              { id: 'work', label: 'Work' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'availability', label: 'Availability' },
              { id: 'statement', label: 'Statement' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSection === tab.id
                  ? 'text-white bg-stone-800/90 font-medium border border-stone-700/60 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Interactive controls */}
        <div className="flex items-center gap-2.5">
          {/* GitHub Pages Deployment Roadmap Button */}
          <button
            onClick={() => setIsDeployGuideOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-900/90 hover:bg-stone-800 border border-stone-800/80 rounded-lg transition-all shadow-sm"
            title="Open step-by-step GitHub Pages deployment guide"
          >
            <Github className="w-3.5 h-3.5 text-[#d97736]" />
            <span className="hidden sm:inline">GitHub Pages Guide</span>
          </button>

          {/* Lighting Palette Indicator Dot */}
          <button
            onClick={cycleTheme}
            className="p-1.5 rounded-lg border border-transparent hover:border-stone-800 hover:bg-stone-800/60 transition-colors flex items-center gap-1.5 text-xs text-stone-400"
            title={`Switch Lighting Palette (Current: ${themeConfig.name})`}
          >
            <span
              className="block w-3.5 h-3.5 rounded-full border border-white/20 transition-transform hover:scale-110 shadow-sm"
              style={{ backgroundColor: themeConfig.accentHex }}
            />
            <span className="hidden xl:inline text-[11px] font-mono">{themeConfig.name}</span>
          </button>

          {/* Sound On/Off Toggle (Off by default) */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-lg border transition-colors ${
              isPlayingAudio
                ? 'text-[#d97736] bg-[#d97736]/10 border-[#d97736]/40'
                : 'text-stone-400 hover:text-white border-transparent hover:bg-stone-800/60'
            }`}
            title="Toggle soothing 528Hz ambient drone"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Split Layout: Left Column carries all text, Right Side stays clear for 3D Monolith */}
      <main className="relative z-10 min-h-screen flex flex-col lg:flex-row items-stretch pt-20 md:pt-24 pb-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* 3D Rock Monolith Container:
            - Desktop: Fixed at left 52.5%, top 8.7%, width 41.8%, height 87.3% (Center: 73.4%, 52.4%)
            - Mobile: Scaled down and centered below the header so it never covers text
        */}
        <div className="monolith-target-container">
          <SaltMonolith3D theme={themeConfig} isInteractive={true} />
        </div>

        {/* Left Column: All Text & Interactive Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between py-4 lg:py-6 pr-0 lg:pr-10 z-20 space-y-6">
          {/* Section 1: Hero (Name, Headline, Bio) */}
          <section className="space-y-3.5">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#d97736] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97736]" />
              <span>Atta Ullah · Dual QMS & Data Expertise</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-[25px] font-normal leading-snug tracking-tight text-white max-w-xl">
              <strong className="font-semibold text-white">{data.name}</strong>,{' '}
              <span className="text-stone-300 font-normal">data analyst and quality auditor.</span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-xl font-normal">
              {data.bio}
            </p>

            {/* Mobile / Tablet Pill Navigation */}
            <div className="lg:hidden flex flex-wrap gap-1.5 pt-2">
              {(
                [
                  { id: 'stats', label: 'Stats' },
                  { id: 'work', label: 'Work' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'availability', label: 'Availability' },
                  { id: 'statement', label: 'Statement' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-3 py-1 rounded-md text-xs transition-colors ${
                    activeSection === tab.id
                      ? 'bg-stone-800 text-white font-medium border border-stone-700/60'
                      : 'text-stone-400 hover:text-stone-200 bg-stone-900/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </section>

          {/* Dynamic Views Section */}
          <section className="my-auto py-2">
            {/* View 1: Stats Section (mirrors the reference Distinction/Category table) */}
            {activeSection === 'stats' && (
              <div className="space-y-4 max-w-lg animate-fadeIn">
                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono uppercase tracking-wider pb-2 border-b border-stone-800/60">
                  <span>Figure</span>
                  <span>Description & Scope</span>
                </div>
                <div className="space-y-2.5">
                  {data.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="group p-2.5 rounded-xl hover:bg-stone-900/40 transition-colors border border-transparent hover:border-stone-800/50"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm sm:text-base font-mono text-[#d97736] font-semibold tabular-nums shrink-0 w-12">
                          {stat.figure}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-medium text-stone-200 group-hover:text-white transition-colors">
                            {stat.description}
                          </p>
                          {stat.detail && (
                            <p className="text-[11px] text-stone-400 mt-0.5 leading-normal">
                              {stat.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 17 Departments Audited Tags */}
                <div className="pt-3 border-t border-stone-800/60">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
                    Departments Audited (17 Total):
                  </span>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-300 font-mono">
                    {data.departmentsAudited.map((dept, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2 py-0.5 rounded bg-stone-900/60 border border-stone-800/60"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* View 2: Work Section (Project Cards, Modals + Pipeline Simulator) */}
            {activeSection === 'work' && (
              <div className="space-y-6 max-w-xl animate-fadeIn">
                {/* Four-Stage Data Pipeline Simulator (Section 8) */}
                <DataPipelineSimulator />

                {/* Key Projects List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono uppercase tracking-wider pb-2 border-b border-stone-800/60">
                    <span>Key Projects (Click to Inspect)</span>
                    <span>Year</span>
                  </div>

                  {data.projects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="group p-3.5 rounded-xl bg-stone-900/40 hover:bg-stone-900/80 border border-stone-800/60 hover:border-stone-700/80 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#d97736] transition-colors">
                              {proj.title}
                            </h3>
                            <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#d97736] transition-colors" />
                          </div>
                          <p className="text-[11px] text-stone-400 mt-0.5">{proj.clientContext}</p>
                          <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {proj.problem}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-stone-400 shrink-0 font-medium">
                          {proj.year}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex flex-wrap gap-1">
                          {proj.tools.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded bg-stone-950/80 border border-stone-800 text-stone-400 font-mono"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-[11px] text-[#d97736] group-hover:underline">
                          View Details &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 3: Skills Section (Section 6) */}
            {activeSection === 'skills' && (
              <div className="space-y-4 max-w-lg animate-fadeIn">
                <div className="text-[11px] text-stone-400 font-mono uppercase tracking-wider pb-2 border-b border-stone-800/60">
                  Technical & Compliance Competencies
                </div>

                <div className="space-y-4">
                  {data.skills.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2">
                      <h4 className="text-xs font-semibold text-[#d97736] tracking-wide uppercase font-mono">
                        {group.category}
                      </h4>
                      <div className="space-y-2">
                        {group.skills.map((sk, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2.5 rounded-lg bg-stone-900/30 border border-stone-800/40 text-xs flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                          >
                            <span className="font-medium text-stone-200">{sk.name}</span>
                            {sk.detail && (
                              <span className="text-stone-400 text-[11px] sm:text-right font-mono">
                                {sk.detail}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 4: Experience Section (Section 4) */}
            {activeSection === 'experience' && (
              <div className="space-y-4 max-w-lg animate-fadeIn">
                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono uppercase tracking-wider pb-2 border-b border-stone-800/60">
                  <span>Work History & Timeline</span>
                  <span>Dates</span>
                </div>

                <div className="space-y-4">
                  {data.experience.map((entry, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-900/40 border border-stone-800/60 space-y-2"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white">{entry.role}</h4>
                        <span className="text-xs font-mono text-stone-400 shrink-0">
                          {entry.dates}
                        </span>
                      </div>
                      <p className="text-xs text-[#d97736] font-medium">{entry.organization}</p>
                      <ul className="pt-2 border-t border-stone-800/40 space-y-1.5">
                        {entry.bullets.map((b, bIdx) => (
                          <li
                            key={bIdx}
                            className="text-xs text-stone-300 flex items-start gap-2 leading-relaxed"
                          >
                            <span className="text-[#d97736] mt-0.5">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 5: Availability Section (Section 7) */}
            {activeSection === 'availability' && (
              <div className="space-y-4 max-w-md animate-fadeIn">
                <div className="text-[11px] text-stone-400 font-mono uppercase tracking-wider pb-2 border-b border-stone-800/60 flex items-center justify-between">
                  <span>Engagement Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {data.availability.badge}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-stone-900/90 to-stone-900/40 border border-stone-800 space-y-3.5">
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {data.availability.headline}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-stone-400 block font-mono text-[11px]">TIMEFRAME</span>
                      <span className="text-stone-200 font-medium">
                        {data.availability.timeframe}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-mono text-[11px]">TIME ZONE</span>
                      <span className="text-stone-200 font-medium">
                        {data.availability.timezone}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-mono text-[11px] mb-1.5">
                      PREFERRED ENGAGEMENTS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {data.availability.preferredEngagements.map((item, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 rounded bg-stone-950/80 border border-stone-800 text-stone-300 text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                    <span className="text-xs text-stone-400">
                      {data.availability.locationLine}
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#d97736] hover:bg-[#c26425] rounded-lg transition-colors cursor-pointer"
                    >
                      Inquire via Email
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View 6: Statement Section (Section 9) */}
            {activeSection === 'statement' && (
              <div className="space-y-4 max-w-md animate-fadeIn">
                <div className="text-[11px] text-stone-400 font-mono uppercase tracking-wider pb-2 border-b border-stone-800/60">
                  {data.statement.eyebrow}
                </div>

                <blockquote className="text-xl sm:text-2xl font-serif-display italic text-[#e6ded2] leading-snug">
                  "{data.statement.quote}"
                </blockquote>

                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
                  {data.statement.supportingText}
                </p>

                <div className="pt-4 border-t border-stone-800/60 text-xs text-stone-400 flex items-center justify-between">
                  <span className="font-medium text-stone-300">
                    {data.statement.signatureLine}
                  </span>
                  <span className="font-mono text-[11px] text-[#d97736]">QMS · BI</span>
                </div>
              </div>
            )}
          </section>

          {/* Section 8: Footer Row (Social Links + Copy Email) */}
          <footer className="pt-4 border-t border-stone-800/60 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-stone-400">
            <a
              href={data.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={data.socials.upwork}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Upwork
            </a>
            <a
              href={data.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={data.socials.x}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              X
            </a>
            <a
              href={data.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer group ml-auto sm:ml-0"
            >
              <span>{copiedEmail ? 'Email Copied' : 'Copy email'}</span>
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="text-[11px] text-[#d97736] group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              )}
            </button>
          </footer>
        </div>

        {/* Right Column Desktop Layout Spacer: Maintains split spacing on desktop */}
        <div className="hidden lg:block lg:w-1/2 pointer-events-none" />
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white shadow-2xl flex items-center gap-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#d97736]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Key Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* GitHub Pages Deployment Guide Modal */}
      <GitHubDeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />
    </div>
  );
}
