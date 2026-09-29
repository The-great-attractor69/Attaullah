import React, { useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, Layers, CheckCircle2, ShieldAlert, Award, FileText } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#130f0d] border border-stone-800/90 rounded-2xl shadow-2xl text-stone-200">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#130f0d]/95 backdrop-blur-md border-b border-stone-800/80">
          <div className="flex items-center gap-2.5 text-xs text-stone-400">
            <span className="text-[#d97736] font-mono font-medium">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.clientContext}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">{project.subtitle}</p>
          </div>

          {/* Problem Statement */}
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Problem Addressed</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{project.problem}</p>
          </div>

          {/* What Was Built */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#d97736]">
              <Layers className="w-4 h-4" />
              <span>What Was Built & Delivered</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              {project.whatWasBuilt.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d97736] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Note if available */}
          {project.dataSnippet && (
            <div className="p-3 rounded-lg bg-black/40 border border-stone-800 text-xs font-mono text-stone-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-stone-500 shrink-0" />
              <span>{project.dataSnippet}</span>
            </div>
          )}

          {/* Outcome & Impact */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#d97736]/10 to-transparent border border-[#d97736]/30 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#d97736]">
              <Award className="w-4 h-4" />
              <span>Operational Outcome</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
              {project.outcome}
            </p>
          </div>

          {/* Tools & Stack */}
          <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="text-xs text-stone-400 font-mono italic">{project.linkText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
