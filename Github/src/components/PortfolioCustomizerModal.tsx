import React, { useState } from 'react';
import { PortfolioData, MonolithTheme } from '../types/portfolio';
import { MONOLITH_THEMES } from '../data/initialData';
import { X, RotateCcw, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PortfolioCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  currentTheme: MonolithTheme;
  onThemeChange: (theme: MonolithTheme) => void;
}

export const PortfolioCustomizerModal: React.FC<PortfolioCustomizerModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
  currentTheme,
  onThemeChange,
}) => {
  const [formData, setFormData] = useState<PortfolioData>({ ...data });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d97736', '#f59e0b', '#e0728c'],
      });
    } catch {
      // Ignored
    }
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#130f0d] border border-stone-800 rounded-2xl shadow-2xl text-stone-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#130f0d]/95 backdrop-blur-md border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d97736]" />
            <h2 className="text-base font-semibold text-white">Live Portfolio Customizer</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Monolith Lighting Theme Picker */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
              3D Monolith Crystal Lighting Palette
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.values(MONOLITH_THEMES).map((theme) => {
                const isSelected = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onThemeChange(theme.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-[#d97736] bg-[#d97736]/15 text-white'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: theme.accentHex }}
                    />
                    <span className="truncate">{theme.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-4 pt-4 border-t border-stone-800/80">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#d97736]">
              Identity & Intro
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-stone-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#d97736]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-stone-400 mb-1">Headline</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#d97736]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1">Bio Paragraph</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-sm text-stone-200 focus:outline-none focus:border-[#d97736] leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#d97736]"
                required
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 pt-4 border-t border-stone-800/80">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#d97736]">
              Contact & Social Channels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-400 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={formData.socials.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 focus:outline-none focus:border-[#d97736]"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1">Upwork Profile</label>
                <input
                  type="text"
                  value={formData.socials.upwork}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, upwork: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 focus:outline-none focus:border-[#d97736]"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={formData.socials.github}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, github: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 focus:outline-none focus:border-[#d97736]"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1">X (Twitter)</label>
                <input
                  type="text"
                  value={formData.socials.x}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, x: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 focus:outline-none focus:border-[#d97736]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-stone-800/80 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-stone-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#d97736] hover:bg-[#c26425] rounded-lg transition-colors shadow-lg"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <span>Apply Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
