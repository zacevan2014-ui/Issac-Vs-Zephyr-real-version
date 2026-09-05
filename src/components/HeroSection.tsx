import React from 'react';
import { Play, Flame, Shield, ArrowRight, Zap, Award, Swords, MessageSquare, Eye, Lock, Unlock } from 'lucide-react';
import { playDomainClashSound, playHitSound, playClickBeep } from '../utils/soundEffects';

interface HeroSectionProps {
  onSelectTab: (tab: string) => void;
  onSelectFighter: (fighter: 'issac' | 'zephyr') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab, onSelectFighter }) => {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/80 bg-black pt-6 pb-12 sm:pt-8 sm:pb-16 text-zinc-300">
      {/* Dynamic Background Energy Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-rose-500/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-emerald-500/0 via-zinc-700/50 to-rose-500/0" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header & Dossier Classification */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase">
              ISSAC <span className="text-zinc-500 font-light italic">vs</span> ZEPHYR
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">
              Definitive Archival Dossier // Tactical Combat Engine // Section I-V
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1.5 rounded bg-zinc-900 px-2.5 py-1 text-zinc-400 border border-zinc-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: <strong className="text-zinc-200">CONCLUDED</strong>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded bg-rose-950/40 px-2.5 py-1 text-rose-400 border border-rose-900/40">
              VICTOR: <strong>ZEPHYR</strong>
            </span>
          </div>
        </div>

        {/* Master Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 mb-8">
          {/* TILE 1: ISSAC BENTO CARD (Cols 1-3 on desktop) */}
          <div className="md:col-span-3 bg-zinc-900/40 border border-emerald-900/30 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-colors group">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-mono font-bold tracking-wider">
                  PHANTOM VECTOR
                </span>
                <span className="text-emerald-500 font-mono text-xs font-bold">#01</span>
              </div>

              <h2 className="text-3xl font-black text-white italic leading-none mb-1">ISSAC</h2>
              <p className="text-[11px] text-zinc-400 mb-4 uppercase leading-snug">
                High-speed maneuverability & Zone control specialist
              </p>

              {/* Stat Meters */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    <span>Agility</span>
                    <span className="text-emerald-400">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    <span>Combat IQ</span>
                    <span className="text-emerald-300">90%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 transition-all" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    <span>Defense</span>
                    <span className="text-emerald-500">80%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 transition-all" style={{ width: '80%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    <span>Max Sprint Velocity</span>
                    <span className="text-zinc-200">16.5 m/s</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800/80">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5 font-mono">Domain Expansion</p>
              <p className="text-xs font-bold text-emerald-400 italic mb-3">VERDANT HORIZON (Spatial Echo)</p>
              <button
                onClick={() => {
                  playHitSound();
                  onSelectFighter('issac');
                  onSelectTab('characters');
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-800/40 rounded py-1.5 transition-colors"
              >
                <span>Inspect Full Frame Data</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* TILE 2: CENTER COMPARISON ENGINE & FRAME CLASH (Cols 4-9 on desktop) */}
          <div className="md:col-span-6 bg-zinc-900/20 border border-zinc-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4 text-center">
                Combat Comparison Engine
              </h3>

              {/* Big HP Comparison */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5 items-center">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black text-white">2,450</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase font-mono">Base HP (Issac)</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-zinc-700 bg-zinc-950 flex items-center justify-center font-black italic text-zinc-400 text-sm sm:text-base">
                    VS
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 mt-1">14,500 V/CI</span>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black text-white">2,900</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase font-mono">Base HP (Zephyr)</p>
                </div>
              </div>

              {/* Technical Frame Clash Preview Table */}
              <div className="bg-zinc-950/90 p-3 rounded-lg border border-zinc-800 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Technical Frame Clash</h4>
                  <span className="text-[9px] font-mono text-zinc-500">60 FPS Authenticated</span>
                </div>
                <table className="w-full text-[11px] font-mono">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800/80 text-[10px]">
                      <th className="text-left pb-1">MOVE</th>
                      <th className="text-center pb-1">STARTUP</th>
                      <th className="text-center pb-1">RECOVERY</th>
                      <th className="text-right pb-1">ADVANTAGE</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-400">
                    <tr className="border-b border-zinc-900/60">
                      <td className="py-1.5 text-emerald-400 font-semibold">Light Jab (5L)</td>
                      <td className="text-center py-1.5">3F</td>
                      <td className="text-center py-1.5">4F</td>
                      <td className="text-right text-emerald-400 font-bold py-1.5">+3 Safe</td>
                    </tr>
                    <tr className="border-b border-zinc-900/60">
                      <td className="py-1.5 text-rose-400 font-semibold">Body Palm (5H)</td>
                      <td className="text-center py-1.5">9F</td>
                      <td className="text-center py-1.5">16F</td>
                      <td className="text-right text-rose-400 font-bold py-1.5">+2 Crush</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-emerald-400 font-semibold">Bottle Sweep (2M)</td>
                      <td className="text-center py-1.5">7F</td>
                      <td className="text-center py-1.5">10F</td>
                      <td className="text-right text-zinc-400 font-bold py-1.5">-2 Safe</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Buff State Quick Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-emerald-950/20 rounded border border-emerald-800/30 p-2.5">
                  <p className="text-[9px] uppercase font-bold text-emerald-400 mb-0.5 font-mono">Issac Buff State</p>
                  <p className="text-[11px] leading-tight text-zinc-300 italic">
                    &apos;Flow State Level 3&apos; boosts max scaling HP to 3,100 with +25% sprint rate.
                  </p>
                </div>
                <div className="bg-rose-950/20 rounded border border-rose-800/30 p-2.5">
                  <p className="text-[9px] uppercase font-bold text-rose-400 mb-0.5 font-mono">Zephyr Buff State</p>
                  <p className="text-[11px] leading-tight text-zinc-300 italic">
                    &apos;Iron Will Trigger&apos; grants 100/100 Super Armor Poise with +30% defense.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500">Section I Numerical Engine Active</span>
              <button
                onClick={() => {
                  playClickBeep();
                  onSelectTab('characters');
                }}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <span>Open Head-to-Head Comparison</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* TILE 3: ZEPHYR BENTO CARD (Cols 10-12 on desktop) */}
          <div className="md:col-span-3 bg-zinc-900/40 border border-rose-900/30 rounded-xl p-4 sm:p-5 flex flex-col justify-between text-right hover:border-rose-500/40 transition-colors group">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-rose-500 font-mono text-xs font-bold">#02</span>
                <span className="bg-rose-500/10 text-rose-400 text-[10px] px-2 py-0.5 rounded border border-rose-500/20 uppercase font-mono font-bold tracking-wider">
                  APEX COLOSSUS
                </span>
              </div>

              <h2 className="text-3xl font-black text-white italic leading-none mb-1">ZEPHYR</h2>
              <p className="text-[11px] text-zinc-400 mb-4 uppercase leading-snug">
                Power-focused CQC Brawler & Endurance Master
              </p>

              {/* Stat Meters */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    <span className="text-rose-400">95%</span>
                    <span>Attack Power</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 ml-auto transition-all" style={{ width: '95%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    <span className="text-rose-300">92%</span>
                    <span>Defense</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 ml-auto transition-all" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    <span className="text-rose-500">94%</span>
                    <span>Special Aura</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 ml-auto transition-all" style={{ width: '94%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    <span className="text-zinc-200">850 HP</span>
                    <span>Finisher KO Damage</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800/80">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5 font-mono">Domain Expansion</p>
              <p className="text-xs font-bold text-rose-400 italic mb-3 uppercase">Malevolent Abyss (Pressure Core)</p>
              <button
                onClick={() => {
                  playHitSound();
                  onSelectFighter('zephyr');
                  onSelectTab('characters');
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-mono font-semibold text-rose-400 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-800/40 rounded py-1.5 transition-colors"
              >
                <ArrowRight className="h-3 w-3 rotate-180 transition-transform group-hover:-translate-x-1" />
                <span>Inspect Full Frame Data</span>
              </button>
            </div>
          </div>

          {/* TILE 4: EPISODE LOG BENTO (Cols 1-4 on desktop) */}
          <div className="md:col-span-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 font-mono">
                  Episode Combat Log
                </h3>
                <span className="text-[9px] font-mono text-zinc-500">4 Chapters + Film</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    playClickBeep();
                    onSelectTab('theater');
                  }}
                  className="w-full text-left flex items-center gap-3 bg-zinc-950/80 hover:bg-zinc-900/80 p-2.5 rounded border border-zinc-800 transition-colors"
                >
                  <div className="w-1 h-7 bg-zinc-600 rounded-full" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-white uppercase">Part 1: Long-Range Blitz</p>
                    <p className="text-[9px] text-zinc-400">+18% HP Lead (Issac Nerf Volley)</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    playClickBeep();
                    onSelectTab('theater');
                  }}
                  className="w-full text-left flex items-center gap-3 bg-zinc-950/80 hover:bg-zinc-900/80 p-2.5 rounded border border-zinc-800 transition-colors"
                >
                  <div className="w-1 h-7 bg-zinc-600 rounded-full" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-white uppercase">Part 2: CQC & Grapple</p>
                    <p className="text-[9px] text-zinc-400">Zephyr 63214 Command Grab Slam</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    playDomainClashSound();
                    onSelectTab('clash');
                  }}
                  className="w-full text-left flex items-center gap-3 bg-emerald-950/20 hover:bg-emerald-950/40 p-2.5 rounded border border-emerald-800/40 transition-colors"
                >
                  <div className="w-1 h-7 bg-emerald-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-white uppercase">Part 3: Climax (Domain Clash)</p>
                    <p className="text-[9px] text-emerald-400 font-mono">14,500 V/CI Barrier Collide → Zero MP</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    playClickBeep();
                    onSelectTab('theater');
                  }}
                  className="w-full text-left flex items-center gap-3 bg-rose-950/20 hover:bg-rose-950/40 p-2.5 rounded border border-rose-800/40 transition-colors"
                >
                  <div className="w-1 h-7 bg-rose-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-white uppercase">Movie: Finale & Overdrive</p>
                    <p className="text-[9px] text-rose-400 font-mono font-bold">DECISIVE VICTOR: ZEPHYR</p>
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                playClickBeep();
                onSelectTab('theater');
              }}
              className="mt-3 text-left text-[11px] font-mono text-zinc-400 hover:text-zinc-200 flex items-center justify-between pt-2 border-t border-zinc-800/80"
            >
              <span>Launch Theater & Video Player</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* TILE 5: FORUM INTEL BENTO (Cols 5-8 on desktop) */}
          <div className="md:col-span-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 font-mono">
                  Community Debates & Intel
                </h3>
                <span className="text-[9px] font-mono text-zinc-500">Live Archives</span>
              </div>

              <div
                onClick={() => {
                  playClickBeep();
                  onSelectTab('forum');
                }}
                className="cursor-pointer bg-zinc-950/90 rounded-lg p-3.5 border border-zinc-800/80 hover:border-zinc-700 transition-colors mb-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-purple-900/60 border border-purple-700/50 rounded-full flex items-center justify-center font-mono text-[9px] text-purple-300 font-bold">
                    P
                  </div>
                  <span className="text-[10px] font-bold text-zinc-300 uppercase font-mono">PhantomVectorStan</span>
                  <span className="text-[9px] text-zinc-500 font-mono">• 2h ago</span>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-300">
                  &ldquo;Did Issac throw Part 4 by closing distance instead of maintaining Nerf range? His 22.0 APS
                  Phantom Flurry was fast, but Zephyr’s Iron Will passive gave +30% defense...&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-zinc-500">
                  <span>42 Upvotes</span>
                  <span>•</span>
                  <span>Rematch Poll: 59% Zephyr / 41% Issac</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playClickBeep();
                onSelectTab('forum');
              }}
              className="text-left text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center justify-between pt-2 border-t border-zinc-800/80"
            >
              <span>Join Tactical Forum & Cast Ballot</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* TILE 6: SIGNATURE MOVES & CLASSIFIED VAULT (Cols 9-12 on desktop) */}
          <div className="md:col-span-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 font-mono">
                  Combat Signature Moves
                </h3>
                <span className="text-[9px] font-mono text-zinc-500">Peak Moves</span>
              </div>

              <div className="space-y-2.5">
                <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-800/80">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-bold text-emerald-400 uppercase font-mono">Issac</span>
                    <span className="text-[9px] font-mono text-zinc-500">22.0 APS</span>
                  </div>
                  <p className="text-xs text-white font-bold italic">Phantom Flurry & Bottle Sweep</p>
                  <p className="text-[10px] text-zinc-400 leading-tight">Spatial echo acceleration blitz.</p>
                </div>

                <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-800/80">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-bold text-rose-400 uppercase font-mono">Zephyr</span>
                    <span className="text-[9px] font-mono text-zinc-500">850 HP</span>
                  </div>
                  <p className="text-xs text-white font-bold italic">Overdrive Impact Finisher</p>
                  <p className="text-[10px] text-zinc-400 leading-tight">Unblockable match-ending physical blow.</p>
                </div>

                {/* Vault Classified Mini-Card */}
                <div
                  onClick={() => {
                    playClickBeep();
                    onSelectTab('lore');
                  }}
                  className="cursor-pointer bg-gradient-to-r from-amber-950/20 to-zinc-950 p-2.5 rounded border border-amber-900/30 hover:border-amber-700/60 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-amber-950/50 border border-amber-800/50 flex items-center justify-center text-amber-400">
                      <Lock className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-300 uppercase font-mono">Hidden Lore Vault</p>
                      <p className="text-[9px] text-zinc-500">Cipher & Topography Blueprint</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">LVL 5 →</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Section II Frame Specs</span>
              <button
                onClick={() => {
                  playHitSound();
                  onSelectTab('characters');
                }}
                className="text-zinc-200 hover:text-white flex items-center gap-1"
              >
                <span>Explore Tree</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Primary Interactive Module Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs">
          <button
            onClick={() => {
              playClickBeep();
              onSelectTab('theater');
            }}
            className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-zinc-950 font-bold hover:bg-white shadow-md transition-all hover:scale-[1.01]"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Watch Episodes & Movie</span>
          </button>

          <button
            onClick={() => {
              playDomainClashSound();
              onSelectTab('clash');
            }}
            className="flex items-center gap-2 rounded-lg border border-amber-600/50 bg-amber-950/30 px-4 py-2 font-bold text-amber-300 hover:bg-amber-900/40 transition-all hover:scale-[1.01]"
          >
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Simulate Domain Clash</span>
          </button>

          <button
            onClick={() => {
              playHitSound();
              onSelectTab('characters');
            }}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2 font-semibold text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
          >
            <Shield className="h-3.5 w-3.5 text-zinc-400" />
            <span>Character Engine & Stats</span>
          </button>

          <button
            onClick={() => {
              playClickBeep();
              onSelectTab('forum');
            }}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2 font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>Community Forum & Polls</span>
          </button>

          <button
            onClick={() => {
              playClickBeep();
              onSelectTab('lore');
            }}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2 font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Lock className="h-3.5 w-3.5 text-amber-400" />
            <span>Hidden Lore Vault</span>
          </button>
        </div>
      </div>
    </section>
  );
};
