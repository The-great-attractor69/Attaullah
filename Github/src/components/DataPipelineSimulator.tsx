import React, { useState } from 'react';
import {
  Database,
  ShieldCheck,
  FileCheck2,
  BarChart3,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Info,
  Layers,
} from 'lucide-react';

type StageId = 'ingestion' | 'validation' | 'audit' | 'reporting';

interface FieldNote {
  stage: StageId;
  author: string;
  note: string;
}

const FIELD_NOTES: Record<StageId, FieldNote> = {
  ingestion: {
    stage: 'ingestion',
    author: 'Atta / Plant QMS Log',
    note: 'Buffer sheet isolation prevents server #REF! failures when multiple QC inspectors update plant logs simultaneously.',
  },
  validation: {
    stage: 'validation',
    author: 'Atta / Formula Audit',
    note: 'Never sum contribution percentages across shifts before multiplying by volume—always aggregate weighted defect totals.',
  },
  audit: {
    stage: 'audit',
    author: 'Atta / ISO Lead Auditor',
    note: 'Every NCR requires an explicit ISO clause citation and a preventive CAPA timeline, not merely a reactive surface patch.',
  },
  reporting: {
    stage: 'reporting',
    author: 'Atta / Executive BI',
    note: 'If plant leadership cannot pinpoint the overdue department within 5 seconds, the dashboard has failed its purpose.',
  },
};

export const DataPipelineSimulator: React.FC = () => {
  const [activeStage, setActiveStage] = useState<StageId>('validation');

  // Interactive Validation Toggles
  const [useNamedRanges, setUseNamedRanges] = useState(true);
  const [useBufferSheet, setUseBufferSheet] = useState(true);
  const [fixInflationBug, setFixInflationBug] = useState(true);
  const [enablePythonPhotos, setEnablePythonPhotos] = useState(true);

  // Stress-test slider (CSS / JS only)
  const [recordVolume, setRecordVolume] = useState<number>(12500);

  // Computed reconciliation status
  const isFullyReconciled = useNamedRanges && useBufferSheet && fixInflationBug;
  const currentFieldNote = FIELD_NOTES[activeStage];

  // Dynamic simulation calculations
  const simulatedLatency = Math.max(4, Math.round(recordVolume / 1800));
  const simulatedThroughput = Math.round(recordVolume * 1.8);
  const simulatedMemory = (1.2 + (recordVolume / 50000) * 1.8).toFixed(1);

  return (
    <div className="w-full my-6 rounded-2xl bg-[#120e0b]/90 border border-stone-800/80 p-4 sm:p-5 text-stone-200 shadow-xl transition-all">
      {/* Header with Title and Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-stone-800/70 gap-2">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#d97736]">
            <Layers className="w-3.5 h-3.5" />
            <span>Proprietary Architecture Showcase</span>
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            Four-Stage Data Pipeline Simulator
          </h3>
        </div>
        <div className="text-[11px] font-mono text-stone-400 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-800/80 self-start sm:self-auto">
          QMS & Analytics Pipeline v2.4
        </div>
      </div>

      {/* 4 Stage Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-5 p-1 rounded-xl bg-stone-950/60 border border-stone-800/50">
        <button
          onClick={() => setActiveStage('ingestion')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
            activeStage === 'ingestion'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-[#d97736]" />
          <span>1. Ingestion</span>
        </button>

        <button
          onClick={() => setActiveStage('validation')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
            activeStage === 'validation'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>2. Validation</span>
        </button>

        <button
          onClick={() => setActiveStage('audit')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
            activeStage === 'audit'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-blue-400" />
          <span>3. Audit</span>
        </button>

        <button
          onClick={() => setActiveStage('reporting')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
            activeStage === 'reporting'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          <span>4. Reporting</span>
        </button>
      </div>

      {/* Stage Specific Content */}
      <div className="space-y-4">
        {/* Stage 1: Ingestion */}
        {activeStage === 'ingestion' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/60">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#d97736] mb-1">
                Architecture Breakdown
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Centralized Excel buffer sheet (<code className="text-amber-200">data_pull</code>)
                systematically extracting SKD inspection tables, shop-floor defect tallies, and
                component batch receipts across plant network folders.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-stone-900/40 border border-stone-800/40">
                <span className="text-[11px] font-mono text-red-400 uppercase block mb-1">
                  Problem Framed
                </span>
                <p className="text-stone-400 leading-normal">
                  External network workbooks linked directly caused recurring <code>#REF!</code>{' '}
                  formula crashes whenever servers hiccuped or files were moved.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-stone-900/40 border border-stone-800/40">
                <span className="text-[11px] font-mono text-emerald-400 uppercase block mb-1">
                  Solution Engineered
                </span>
                <p className="text-stone-400 leading-normal">
                  Isolated one-way buffer ingestion layer decoupling multi-user entry from downstream
                  analytical calculation sheets.
                </p>
              </div>
            </div>

            {/* Telemetry Readout */}
            <div className="p-3 rounded-lg bg-black/50 border border-stone-800 font-mono text-[11px] text-stone-300 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>FEED: 4 Supplier Files Connected</span>
              </div>
              <span className="text-stone-400">HASH: 0x9AF2_STABLE</span>
              <span className="text-[#d97736]">0 Network Lockups</span>
            </div>
          </div>
        )}

        {/* Stage 2: Validation (Interactive Playground) */}
        {activeStage === 'validation' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/60">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Live Formula & Logic Playground
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  {isFullyReconciled ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% RECONCILED
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> RECONCILIATION GAP
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Toggle the logic switches below to simulate formula stability, bug elimination, and
                data reconciliation live.
              </p>
            </div>

            {/* Interactive Toggle Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Toggle 1 */}
              <button
                type="button"
                onClick={() => setUseNamedRanges(!useNamedRanges)}
                className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                  useNamedRanges
                    ? 'bg-stone-900/80 border-emerald-500/40 text-stone-200'
                    : 'bg-stone-950/60 border-red-500/40 text-stone-400'
                }`}
              >
                <div>
                  <span className="text-xs font-medium block text-white">
                    SUMIFS with Named Ranges
                  </span>
                  <span className="text-[11px] text-stone-400 mt-0.5 block">
                    {useNamedRanges
                      ? 'Resolves external server link crashes'
                      : 'Disabled: Fragile network cell coordinates (#REF!)'}
                  </span>
                </div>
                <div
                  className={`w-8 h-4 rounded-full transition-colors relative shrink-0 mt-1 ${
                    useNamedRanges ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transition-transform absolute top-0.5 ${
                      useNamedRanges ? 'left-4.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </button>

              {/* Toggle 2 */}
              <button
                type="button"
                onClick={() => setUseBufferSheet(!useBufferSheet)}
                className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                  useBufferSheet
                    ? 'bg-stone-900/80 border-emerald-500/40 text-stone-200'
                    : 'bg-stone-950/60 border-red-500/40 text-stone-400'
                }`}
              >
                <div>
                  <span className="text-xs font-medium block text-white">
                    Buffer Sheet Decoupling
                  </span>
                  <span className="text-[11px] text-stone-400 mt-0.5 block">
                    {useBufferSheet
                      ? 'Protected multi-user concurrent access'
                      : 'Disabled: Direct file lock collisions'}
                  </span>
                </div>
                <div
                  className={`w-8 h-4 rounded-full transition-colors relative shrink-0 mt-1 ${
                    useBufferSheet ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transition-transform absolute top-0.5 ${
                      useBufferSheet ? 'left-4.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </button>

              {/* Toggle 3 */}
              <button
                type="button"
                onClick={() => setFixInflationBug(!fixInflationBug)}
                className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                  fixInflationBug
                    ? 'bg-stone-900/80 border-emerald-500/40 text-stone-200'
                    : 'bg-stone-950/60 border-amber-500/40 text-stone-400'
                }`}
              >
                <div>
                  <span className="text-xs font-medium block text-white">
                    FPY Percentage Weighting Fix
                  </span>
                  <span className="text-[11px] text-stone-400 mt-0.5 block">
                    {fixInflationBug
                      ? 'Weighted totals across production sessions'
                      : 'Warning: Defect quantity artificial inflation bug'}
                  </span>
                </div>
                <div
                  className={`w-8 h-4 rounded-full transition-colors relative shrink-0 mt-1 ${
                    fixInflationBug ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transition-transform absolute top-0.5 ${
                      fixInflationBug ? 'left-4.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </button>

              {/* Toggle 4 */}
              <button
                type="button"
                onClick={() => setEnablePythonPhotos(!enablePythonPhotos)}
                className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                  enablePythonPhotos
                    ? 'bg-stone-900/80 border-emerald-500/40 text-stone-200'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400'
                }`}
              >
                <div>
                  <span className="text-xs font-medium block text-white">
                    Python IQC Photo Daemon
                  </span>
                  <span className="text-[11px] text-stone-400 mt-0.5 block">
                    {enablePythonPhotos
                      ? 'Automated visual proof attached to records'
                      : 'Manual photograph compilation required'}
                  </span>
                </div>
                <div
                  className={`w-8 h-4 rounded-full transition-colors relative shrink-0 mt-1 ${
                    enablePythonPhotos ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transition-transform absolute top-0.5 ${
                      enablePythonPhotos ? 'left-4.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Stress Test Slider */}
            <div className="p-3.5 rounded-xl bg-stone-900/40 border border-stone-800/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-medium flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#d97736]" />
                  Simulated Record Throughput Stress-Test
                </span>
                <span className="font-mono text-[#d97736] font-semibold tabular-nums">
                  {recordVolume.toLocaleString()} rows
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={recordVolume}
                onChange={(e) => setRecordVolume(Number(e.target.value))}
                className="w-full accent-[#d97736] bg-stone-800 cursor-pointer h-1.5 rounded-lg"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-1">
                <span>Latency: {simulatedLatency}ms</span>
                <span>Throughput: {simulatedThroughput.toLocaleString()} calc/s</span>
                <span>Memory: {simulatedMemory} MB</span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Audit */}
        {activeStage === 'audit' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/60">
              <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">
                ISO 9001:2015 & ISO 45001 Compliance Matrix
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Structured non-conformance evaluation engine tracking findings across 5 severity
                classes (Major NC, Minor NC, Observation, Verification, Gap) with reference IDs
                (<code className="text-blue-300 font-mono">AUD-Dept-Q3-n</code>).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800/80 hover:border-blue-500/40 transition-colors">
                <span className="text-lg font-bold text-blue-400 font-mono tabular-nums">17</span>
                <span className="block text-[11px] text-stone-400 mt-0.5">Dept Audited</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800/80 hover:border-red-500/40 transition-colors">
                <span className="text-lg font-bold text-red-400 font-mono tabular-nums">90</span>
                <span className="block text-[11px] text-stone-400 mt-0.5">Major NCs</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors">
                <span className="text-lg font-bold text-amber-400 font-mono tabular-nums">103</span>
                <span className="block text-[11px] text-stone-400 mt-0.5">Minor NCs</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800/80 hover:border-emerald-500/40 transition-colors">
                <span className="text-lg font-bold text-emerald-400 font-mono tabular-nums">35</span>
                <span className="block text-[11px] text-stone-400 mt-0.5">Gaps</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/50 border border-stone-800 font-mono text-[11px] text-stone-300 flex items-center justify-between">
              <span>STATUS: ISO 9001 & 45001 AUDIT ROUND AUDITED</span>
              <span className="text-emerald-400">RE-AUDIT PASSED</span>
            </div>
          </div>
        )}

        {/* Stage 4: Reporting */}
        {activeStage === 'reporting' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/60">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                Executive Management Visibility
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Replaces daily manual reporting with automated Power BI dashboards circulated twice a
                week via Outlook, featuring claymorphism KPI cards, scrap decomposition trees, and
                PPM trend lines.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/50 border border-stone-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-300 font-mono text-[11px]">
                <span>CIRCULATION CYCLE</span>
                <span className="text-[#d97736]">Twice weekly (Outlook)</span>
              </div>
              <div className="flex items-center justify-between text-stone-300 font-mono text-[11px]">
                <span>SCRAP DRILLDOWN</span>
                <span className="text-emerald-400">Decomposition Tree Active</span>
              </div>
              <div className="flex items-center justify-between text-stone-300 font-mono text-[11px]">
                <span>HOURS SAVED</span>
                <span className="text-stone-200">12+ hrs/week manual compile</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Field Note Widget */}
      <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-start gap-2.5 bg-stone-950/40 p-2.5 rounded-xl border border-stone-800/40">
        <Info className="w-4 h-4 text-[#d97736] shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-mono text-[11px] text-[#d97736] uppercase tracking-wider block">
            Field Note · {currentFieldNote.author}
          </span>
          <p className="text-stone-400 italic text-[11px] leading-relaxed mt-0.5">
            "{currentFieldNote.note}"
          </p>
        </div>
      </div>
    </div>
  );
};
