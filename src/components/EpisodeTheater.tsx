import React, { useState } from 'react';
import { Play, ExternalLink, Sparkles, CheckCircle2, ChevronRight, Activity, Clock, Film } from 'lucide-react';
import { EPISODES_DATA } from '../data/seriesData';
import { EpisodeItem } from '../types';
import { playClickBeep } from '../utils/soundEffects';

interface EpisodeTheaterProps {
  onJumpToClash?: () => void;
}

export const EpisodeTheater: React.FC<EpisodeTheaterProps> = ({ onJumpToClash }) => {
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeItem>(EPISODES_DATA[0]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="mb-8 border-b border-zinc-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Chronological Combat Saga
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">4 Chapters + Full Movie Cut</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-100 uppercase">
            Episode Summaries & Video Archive
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Stream every chapter of the Issac vs Zephyr conflict with authenticated tactical summaries, frame timestamps,
            and health differential telemetry.
          </p>
        </div>

        {/* Quick Episode Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/80 p-1.5 rounded-lg border border-zinc-800">
          {EPISODES_DATA.map((ep) => {
            const isSelected = selectedEpisode.id === ep.id;
            return (
              <button
                key={ep.id}
                onClick={() => {
                  playClickBeep();
                  setSelectedEpisode(ep);
                }}
                className={`rounded-md px-3 py-1 text-xs font-mono font-semibold transition-all ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80'
                }`}
              >
                {ep.partKey}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Theater Layout: Video Player + Episode Tactical Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-10">
        {/* Video Player Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
            <iframe
              key={selectedEpisode.youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${selectedEpisode.youtubeId}?rel=0&modestbranding=1`}
              title={selectedEpisode.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Episode Info Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/40 border border-zinc-800 rounded-xl p-3 sm:px-4">
            <div className="flex items-center gap-3">
              <span className="rounded bg-zinc-800 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                {selectedEpisode.partKey}
              </span>
              <span className="font-mono text-xs text-zinc-400">{selectedEpisode.phase}</span>
            </div>
            <a
              href={selectedEpisode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <span>Watch directly on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Tactical Breakdown Dossier Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                  Tactical Debriefing // {selectedEpisode.partKey}
                </span>
                <h3 className="text-xl font-black tracking-tight text-white uppercase mt-0.5">
                  {selectedEpisode.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">{selectedEpisode.subtitle}</p>
              </div>
              <span className="rounded bg-zinc-800/80 px-2.5 py-1 font-mono text-[11px] text-zinc-300 border border-zinc-700">
                {selectedEpisode.durationEstimate}
              </span>
            </div>

            {/* Tactical Summary Narrative */}
            <div className="mb-4">
              <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Executive Combat Summary
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800">
                {selectedEpisode.tacticalSummary}
              </p>
            </div>

            {/* Key Battlefield Milestones */}
            <div className="mb-4">
              <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Recorded Battle Milestones
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                {selectedEpisode.keyEvents.map((evt, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-zinc-950/40 p-1.5 rounded border border-zinc-800/60">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="leading-snug font-sans text-xs">{evt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Telemetry Metrics & Status Footprint */}
          <div className="space-y-2 border-t border-zinc-800 pt-4 mt-2 font-mono text-xs">
            <div className="flex justify-between items-center text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-amber-400" />
                HP Lead & Energy Shift:
              </span>
              <span className="text-zinc-200 font-semibold">{selectedEpisode.hpShift}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Signature Highlight:
              </span>
              <span className="text-emerald-300 font-medium">{selectedEpisode.highlightMove}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-400 pt-1">
              <span>Outcome:</span>
              <span className="font-bold text-rose-400 uppercase">{selectedEpisode.winnerOrPacing}</span>
            </div>

            {selectedEpisode.id === 3 && onJumpToClash && (
              <button
                onClick={onJumpToClash}
                className="mt-3 w-full rounded-lg bg-amber-950/60 border border-amber-600/60 py-2 text-center text-xs font-mono font-bold text-amber-300 hover:bg-amber-900/60 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Part 3 Domain Clash Simulator</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chronological Flow Roadmap Card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
            <Film className="h-4 w-4 text-emerald-400" />
            Chronological Battle Matrix
          </h3>
          <span className="text-[10px] font-mono text-zinc-500">Interactive Timeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 relative">
          {/* Part 1 */}
          <div
            onClick={() => {
              playClickBeep();
              setSelectedEpisode(EPISODES_DATA[0]);
            }}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedEpisode.id === 1
                ? 'border-emerald-500 bg-emerald-950/30'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-black text-emerald-400">PART 1</span>
              <span className="text-[10px] font-mono text-zinc-500">#01</span>
            </div>
            <h4 className="font-black text-sm text-white uppercase">Long-Range Blitz</h4>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              Issac uses room geometry & Nerf suppression to establish a +18% HP lead.
            </p>
            <div className="mt-3 font-mono text-[10px] text-emerald-400 font-bold uppercase">
              Advantage: Issac
            </div>
          </div>

          {/* Part 2 */}
          <div
            onClick={() => {
              playClickBeep();
              setSelectedEpisode(EPISODES_DATA[1]);
            }}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedEpisode.id === 2
                ? 'border-amber-500 bg-amber-950/30'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-black text-amber-400">PART 2</span>
              <span className="text-[10px] font-mono text-zinc-500">#02</span>
            </div>
            <h4 className="font-black text-sm text-white uppercase">CQC & Hallway Grapple</h4>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              Zephyr corners Issac in narrow corridors; wall-pins vs low-profile dodges.
            </p>
            <div className="mt-3 font-mono text-[10px] text-amber-400 font-bold uppercase">
              Advantage: Zephyr
            </div>
          </div>

          {/* Part 3 */}
          <div
            onClick={() => {
              playClickBeep();
              setSelectedEpisode(EPISODES_DATA[2]);
            }}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedEpisode.id === 3
                ? 'border-purple-500 bg-purple-950/30'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-black text-purple-400">PART 3</span>
              <span className="text-[10px] font-mono text-zinc-500">#03</span>
            </div>
            <h4 className="font-black text-sm text-white uppercase">The Domain Clash</h4>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              Verdant Horizon vs Malevolent Abyss; 14,500 V/CI collision & mutual barrier burnout.
            </p>
            <div className="mt-3 font-mono text-[10px] text-purple-400 font-bold uppercase">
              Dead Heat Burnout (0 MP)
            </div>
          </div>

          {/* Part 4 */}
          <div
            onClick={() => {
              playClickBeep();
              setSelectedEpisode(EPISODES_DATA[3]);
            }}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedEpisode.id === 4
                ? 'border-rose-500 bg-rose-950/30'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-black text-rose-400">PART 4</span>
              <span className="text-[10px] font-mono text-zinc-500">#04</span>
            </div>
            <h4 className="font-black text-sm text-white uppercase">Overdrive Impact</h4>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              Zero-MP arm trade; Zephyr triggers Iron Will & lands fatal Overdrive Finishing Blow.
            </p>
            <div className="mt-3 font-mono text-[10px] text-rose-400 font-bold uppercase">
              Decisive Victor: Zephyr
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
