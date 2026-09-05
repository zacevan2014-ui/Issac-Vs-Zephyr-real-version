import React from 'react';
import { Play, Flame, Shield, ArrowRight, Zap, Award, Swords, MessageSquare, Lock } from 'lucide-react';
import { playDomainClashSound, playHitSound, playClickBeep } from '../utils/soundEffects';

interface HeroSectionProps {
  onSelectTab: (tab: string) => void;
  onSelectFighter: (fighter: 'issac' | 'zephyr') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab, onSelectFighter }) => {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-black pt-8 pb-12 sm:pt-10 sm:pb-16 text-zinc-300">
      {/* Cinematic Dynamic Background Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-10 left-1/4 h-[30rem] w-[30rem] rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="absolute -bottom-10 right-1/4 h-[30rem] w-[30rem] rounded-full bg-rose-500/15 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header & Dossier Identification */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-[0.25em]">
              Combat Telemetry & Historical Archive
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white uppercase mt-1">
              ISSAC <span className="text-zinc-500 font-light italic">vs</span> ZEPHYR
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              The official combat archive, frame-by-frame telemetry, and domain collision analysis of the martial arts showdown.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3 py-1.5 text-zinc-400 border border-zinc-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: <strong className="text-zinc-200">CONCLUDED</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-950/40 px-3 py-1.5 text-rose-400 border border-rose-900/40 font-bold">
              VICTOR: ZEPHYR
            </span>
          </div>
        </div>

        {/* Cinematic Versus Battle Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          {/* FIGHTER 1: ISSAC */}
          <div className="lg:col-span-4 rounded-2xl border border-emerald-900/40 bg-zinc-950/90 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-1 rounded-md border border-emerald-500/20 uppercase font-mono font-bold tracking-wider">
                  The Phantom Vector
                </span>
                <span className="text-emerald-500 font-mono text-xs font-bold">CHALLENGER 01</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-white italic tracking-tight leading-none mb-2">
                ISSAC
              </h2>
              <p className="text-xs text-zinc-400 mb-6 uppercase tracking-wide">
                High-Speed Evasion & Spatial Zone Control
              </p>

              {/* Combat Stat Gauges */}
              <div className="space-y-3.5 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-zinc-400 mb-1.5">
                    <span>Agility & Reaction</span>
                    <span className="text-emerald-400">92 / 100</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-zinc-400 mb-1.5">
                    <span>Tactical Combat IQ</span>
                    <span className="text-emerald-300">90 / 100</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-zinc-400 mb-1.5">
                    <span>Physical Defense</span>
                    <span className="text-emerald-500">80 / 100</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: '80%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs font-mono">
                  <span className="text-zinc-500">Max Sprint Velocity</span>
                  <span className="font-bold text-emerald-400">16.5 m/s</span>
                </div>
              </div>

              {/* Domain & Signature Technique */}
              <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-3.5 mb-6">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider block mb-0.5">
                  Domain Expansion
                </span>
                <p className="text-sm font-black text-white italic">VERDANT HORIZON</p>
                <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                  Echo acceleration and mirror clone mirage kiting.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playHitSound();
                onSelectFighter('issac');
                onSelectTab('characters');
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 py-3 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider transition-all hover:border-emerald-500 shadow-lg"
            >
              <span>Inspect Issac Frame Data</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* CENTER CLASH CORE & COMBAT OVERVIEW */}
          <div className="lg:col-span-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="text-center">
              <span className="inline-block font-mono text-[10px] font-bold text-amber-400 uppercase tracking-[0.25em] mb-2">
                Energy Collision Core
              </span>
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="h-14 w-14 rounded-2xl border-2 border-zinc-700 bg-black flex items-center justify-center font-black italic text-zinc-200 text-xl shadow-xl">
                  VS
                </div>
              </div>

              {/* Health Pool Comparison */}
              <div className="grid grid-cols-2 gap-3 bg-zinc-900/70 p-3.5 rounded-xl border border-zinc-800 mb-5">
                <div className="text-center border-r border-zinc-800 pr-2">
                  <p className="text-2xl font-black text-emerald-400 font-mono">2,450</p>
                  <p className="text-[10px] uppercase font-mono font-bold text-zinc-500">Issac Base HP</p>
                </div>
                <div className="text-center pl-2">
                  <p className="text-2xl font-black text-rose-400 font-mono">2,900</p>
                  <p className="text-[10px] uppercase font-mono font-bold text-zinc-500">Zephyr Base HP</p>
                </div>
              </div>

              {/* Domain Collision Telemetry */}
              <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 mb-5 text-left">
                <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                  <span className="font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" />
                    Domain Clash Peak
                  </span>
                  <span className="text-white font-extrabold">14,500 V/CI</span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 animate-pulse" />
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Equal resonance barrier collision exhausted both combatants&apos; magic pools, initiating the decisive physical fistfight.
                </p>
              </div>

              {/* Matchup Outcome Dossier */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 mb-5 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-rose-400" />
                  <span className="font-mono text-xs font-bold uppercase text-white">Canonical Resolution</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Zephyr secures victory in the Movie Finale following an Overdrive Impact physical knockout after weathering Issac&apos;s rapid Nerf barrage.
                </p>
              </div>
            </div>

            {/* Quick Action Triggers */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  playClickBeep();
                  onSelectTab('theater');
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-zinc-200 py-3 text-xs font-mono font-bold text-black uppercase tracking-wider transition-all shadow-lg"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Watch Full Series & Movie</span>
              </button>

              <button
                onClick={() => {
                  playDomainClashSound();
                  onSelectTab('clash');
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-amber-950/30 hover:bg-amber-900/40 py-2.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider transition-all"
              >
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>Simulate Domain Clash</span>
              </button>
            </div>
          </div>

          {/* FIGHTER 2: ZEPHYR */}
          <div className="lg:col-span-4 rounded-2xl border border-rose-900/40 bg-zinc-950/90 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-rose-500/50 transition-all text-right">
            <div className="absolute top-0 left-0 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-rose-500 font-mono text-xs font-bold">CHALLENGER 02</span>
                <span className="bg-rose-500/10 text-rose-400 text-[10px] px-2.5 py-1 rounded-md border border-rose-500/20 uppercase font-mono font-bold tracking-wider">
                  The Apex Colossus
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-white italic tracking-tight leading-none mb-2">
                ZEPHYR
              </h2>
              <p className="text-xs text-zinc-400 mb-6 uppercase tracking-wide">
                Heavy CQC Grappler & Iron Will Titan
              </p>

              {/* Combat Stat Gauges */}
              <div className="space-y-3.5 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-zinc-400 mb-1.5">
                    <span className="text-rose-400">95 / 100</span>
                    <span>Attack Strike Power</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-rose-500 ml-auto rounded-full transition-all" style={{ width: '95%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-zinc-400 mb-1.5">
                    <span className="text-rose-300">92 / 100</span>
                    <span>Physical Defense & Poise</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-rose-400 ml-auto rounded-full transition-all" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-zinc-400 mb-1.5">
                    <span className="text-rose-500">94 / 100</span>
                    <span>Special Aura Endurance</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-rose-600 ml-auto rounded-full transition-all" style={{ width: '94%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs font-mono">
                  <span className="font-bold text-rose-400">850 HP Damage</span>
                  <span className="text-zinc-500">Finisher KO Impact</span>
                </div>
              </div>

              {/* Domain & Signature Technique */}
              <div className="rounded-xl border border-rose-900/30 bg-rose-950/20 p-3.5 mb-6 text-left">
                <span className="text-[10px] uppercase font-mono font-bold text-rose-400 tracking-wider block mb-0.5">
                  Domain Expansion
                </span>
                <p className="text-sm font-black text-white italic">MALEVOLENT ABYSS</p>
                <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                  Gravitational inward pull and inescapable CQC trap.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playHitSound();
                onSelectFighter('zephyr');
                onSelectTab('characters');
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/60 py-3 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider transition-all hover:border-rose-500 shadow-lg"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
              <span>Inspect Zephyr Frame Data</span>
            </button>
          </div>
        </div>

        {/* Primary Interactive Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs mb-8">
          <button
            onClick={() => {
              playClickBeep();
              onSelectTab('theater');
            }}
            className="flex items-center gap-2 rounded-xl bg-zinc-100 px-5 py-2.5 text-black font-bold hover:bg-white shadow-md transition-all hover:scale-[1.02]"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Episode Theater & Film</span>
          </button>

          <button
            onClick={() => {
              playHitSound();
              onSelectTab('characters');
            }}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-2.5 font-semibold text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700 transition-all hover:scale-[1.02]"
          >
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>Character Engine & Stats</span>
          </button>

          <button
            onClick={() => {
              playDomainClashSound();
              onSelectTab('clash');
            }}
            className="flex items-center gap-2 rounded-xl border border-amber-600/50 bg-amber-950/30 px-5 py-2.5 font-bold text-amber-300 hover:bg-amber-900/40 transition-all hover:scale-[1.02]"
          >
            <Flame className="h-4 w-4 text-amber-400" />
            <span>Domain Clash Simulator</span>
          </button>

          <button
            onClick={() => {
              playClickBeep();
              onSelectTab('forum');
            }}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-2.5 font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="h-4 w-4 text-emerald-400" />
            <span>Fan Forum & Polls</span>
          </button>

          <button
            onClick={() => {
              playClickBeep();
              onSelectTab('lore');
            }}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-2.5 font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all hover:scale-[1.02]"
          >
            <Lock className="h-4 w-4 text-amber-400" />
            <span>Hidden Lore Vault</span>
          </button>
        </div>

        {/* Canonical Episode Progression Timeline Bar */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Canonical Episodic Progression & Key Moments
            </span>
            <span className="font-mono text-[10px] text-zinc-500">4 Chapters + Movie</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                ep: 'PART 1',
                title: 'Long-Range Blitz',
                desc: 'Issac gains early +18% HP lead via ceiling sprint and Nerf dart volley.',
                tag: 'Issac Advantage',
                color: 'text-emerald-400 border-emerald-900/40',
              },
              {
                ep: 'PART 2',
                title: 'Hallway Choke CQC',
                desc: 'Zephyr lands devastating 63214 command grab slam into the mattress.',
                tag: 'Zephyr Reversal',
                color: 'text-rose-400 border-rose-900/40',
              },
              {
                ep: 'PART 3',
                title: 'Domain Clash',
                desc: '14,500 V/CI barrier explosion cancels both special domains into fistfight.',
                tag: 'Equal Resonance',
                color: 'text-amber-400 border-amber-900/40',
              },
              {
                ep: 'MOVIE',
                title: 'The Final Overdrive',
                desc: 'Zephyr absorbs final flurry and lands the match-ending knockout punch.',
                tag: 'Decisive Victor',
                color: 'text-rose-400 border-rose-900/40',
              },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playClickBeep();
                  onSelectTab('theater');
                }}
                className="text-left rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3 hover:bg-zinc-900 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center justify-between mb-1 font-mono text-[10px]">
                  <span className="font-bold text-zinc-300">{item.ep}</span>
                  <span className={`px-1.5 py-0.5 rounded border text-[9px] ${item.color}`}>{item.tag}</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase">{item.title}</h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
