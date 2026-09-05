import React, { useState } from 'react';
import {
  Shield,
  Zap,
  Flame,
  Award,
  Swords,
  ChevronRight,
  Sparkles,
  Search,
  Crosshair,
  SlidersHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import { ISSAC_PROFILE, ZEPHYR_PROFILE, HEAD_TO_HEAD_COMPARISON } from '../data/seriesData';
import { CharacterProfile, FrameDataMove, SkillNode } from '../types';
import { playClickBeep, playHitSound } from '../utils/soundEffects';

interface CharacterEngineProps {
  initialFighter?: 'issac' | 'zephyr';
}

export const CharacterEngine: React.FC<CharacterEngineProps> = ({ initialFighter = 'issac' }) => {
  const [activeFighterId, setActiveFighterId] = useState<'issac' | 'zephyr' | 'compare'>(initialFighter);
  const [scalingMode, setScalingMode] = useState<'base' | 'scaled'>('scaled');
  const [frameSearch, setFrameSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

  const currentProfile: CharacterProfile = activeFighterId === 'zephyr' ? ZEPHYR_PROFILE : ISSAC_PROFILE;

  // Filter frame data based on search
  const filteredFrameData = (fighter: CharacterProfile) => {
    if (!frameSearch.trim()) return fighter.frameData;
    const query = frameSearch.toLowerCase();
    return fighter.frameData.filter(
      (m) =>
        m.moveName.toLowerCase().includes(query) ||
        m.input.toLowerCase().includes(query) ||
        m.onBlock.toLowerCase().includes(query) ||
        m.tags?.some((t) => t.toLowerCase().includes(query))
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Engine Title & Controls Header */}
      <div className="mb-8 border-b border-zinc-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Section I & II Engine
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Complete Numerical Specs & Frame Data</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-100 uppercase">
            Character Biographies & Combat Engine
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Examine authentic base values, max scaling buff states, fighting game frame advantage, and canonical skill
            branches.
          </p>
        </div>

        {/* Fighter View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-zinc-900/90 p-1.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => {
              playClickBeep();
              setActiveFighterId('issac');
            }}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-mono font-bold transition-all ${
              activeFighterId === 'issac'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            ISSAC (Phantom Vector)
          </button>

          <button
            onClick={() => {
              playClickBeep();
              setActiveFighterId('zephyr');
            }}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-mono font-bold transition-all ${
              activeFighterId === 'zephyr'
                ? 'bg-rose-950 text-rose-300 border border-rose-700/80 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            ZEPHYR (Apex Colossus)
          </button>

          <button
            onClick={() => {
              playClickBeep();
              setActiveFighterId('compare');
            }}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-bold transition-all ${
              activeFighterId === 'compare'
                ? 'bg-amber-950 text-amber-300 border border-amber-700/80 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Swords className="h-3.5 w-3.5" />
            Head-to-Head Comparison
          </button>
        </div>
      </div>

      {/* VIEW A & B: SINGLE FIGHTER DEEP DIVE (ISSAC OR ZEPHYR) */}
      {activeFighterId !== 'compare' ? (
        <div className="space-y-8">
          {/* Top Dossier Header Card */}
          <div
            className={`relative rounded-xl border p-5 sm:p-7 backdrop-blur-md overflow-hidden ${
              currentProfile.id === 'issac'
                ? 'border-emerald-900/40 bg-zinc-900/40'
                : 'border-rose-900/40 bg-zinc-900/40'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded border tracking-wider ${
                      currentProfile.id === 'issac'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}
                  >
                    {currentProfile.alias}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">{currentProfile.role}</span>
                  {currentProfile.id === 'zephyr' && (
                    <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-400 border border-amber-500/20 uppercase">
                      <Award className="h-3 w-3" /> OFFICIAL VICTOR
                    </span>
                  )}
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                  {currentProfile.name}
                  <span
                    className={`ml-3 text-lg sm:text-2xl font-light italic ${
                      currentProfile.id === 'issac' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    — {currentProfile.epithet}
                  </span>
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
                  {currentProfile.overview}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 uppercase text-[10px]">Signature Move:</span>
                    <span className="text-zinc-100 font-semibold">{currentProfile.signatureMove}</span>
                  </div>
                  <span className="text-zinc-700">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 uppercase text-[10px]">Fight Style:</span>
                    <span className="text-zinc-100 font-semibold">{currentProfile.fightStyle}</span>
                  </div>
                  <span className="text-zinc-700">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 uppercase text-[10px]">Domain:</span>
                    <span
                      className={`font-semibold ${
                        currentProfile.id === 'issac' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {currentProfile.domainName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Scaling Toggle Control */}
              <div className="shrink-0 bg-zinc-950/90 p-3.5 rounded-xl border border-zinc-800 flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-semibold text-center">
                  Engine Telemetry Scaling
                </span>
                <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
                  <button
                    onClick={() => {
                      playClickBeep();
                      setScalingMode('base');
                    }}
                    className={`rounded-md px-3 py-1 text-xs font-mono font-bold transition-all ${
                      scalingMode === 'base'
                        ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    [BASE VALUE]
                  </button>
                  <button
                    onClick={() => {
                      playClickBeep();
                      setScalingMode('scaled');
                    }}
                    className={`rounded-md px-3 py-1 text-xs font-mono font-bold transition-all ${
                      scalingMode === 'scaled'
                        ? currentProfile.id === 'issac'
                          ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                          : 'bg-rose-500 text-zinc-950 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    [MAX SCALING / BUFF]
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION I: 100-POINT ATTRIBUTE RATINGS MATRIX */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-5 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
              Canonical Attribute Ratings & Notes (100 Point Scale)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {currentProfile.ratings.map((rating, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs sm:text-sm text-zinc-100 uppercase tracking-wide">{rating.name}</span>
                      <span
                        className={`font-mono text-xs font-extrabold ${
                          currentProfile.id === 'issac' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {rating.rating} / 100
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          currentProfile.id === 'issac'
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${rating.rating}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{rating.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NUMERICAL COMBAT ENGINE TABLE */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="p-5 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <Crosshair className="h-4 w-4 text-emerald-400" />
                  Canonical Numerical Engine Telemetry
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Active Display Mode:{' '}
                  <strong className="text-zinc-200">
                    {scalingMode === 'base' ? 'Standard Base Unbuffed State' : 'Max Scaling / Flow State & Buff Trigger'}
                  </strong>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <span>Green indicates peak advantage parameter</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400">
                    <th className="py-3 px-4 font-semibold uppercase">Statistic Engine Key</th>
                    <th className="py-3 px-4 font-semibold uppercase">Base Telemetry Value</th>
                    <th className="py-3 px-4 font-semibold uppercase">Max Scaling / Buff State</th>
                    <th className="py-3 px-4 font-semibold uppercase">Power Index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70">
                  {currentProfile.numericalStats.map((stat, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-zinc-900/40 transition-colors ${
                        scalingMode === 'scaled' ? 'bg-zinc-950/80' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-zinc-200">
                        {stat.label}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          scalingMode === 'base'
                            ? 'font-bold text-zinc-100'
                            : 'text-zinc-400 line-through decoration-zinc-700'
                        }`}
                      >
                        {stat.baseValue}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          scalingMode === 'scaled'
                            ? currentProfile.id === 'issac'
                              ? 'font-extrabold text-emerald-400'
                              : 'font-extrabold text-rose-400'
                            : 'text-zinc-400'
                        }`}
                      >
                        {stat.scaledValue}
                      </td>
                      <td className="py-3 px-4 w-48">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                currentProfile.id === 'issac' ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${stat.percentScore || 75}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-zinc-400">{stat.percentScore}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION II: FIGHTING GAME FRAME DATA & HITBOX ARCHITECTURE */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <Swords className="h-4 w-4 text-emerald-400" />
                  Section II: Fighting Game Frame Data Table
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  60 FPS fighting game frame architecture, startup/active/recovery windows, and on-block frame advantage.
                </p>
              </div>

              {/* Frame Data Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter moves (e.g. 5L, Safe, Dropkick)..."
                  value={frameSearch}
                  onChange={(e) => setFrameSearch(e.target.value)}
                  className="rounded-md border border-zinc-700 bg-zinc-950 pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400">
                    <th className="py-3 px-4 font-semibold uppercase">Move Name</th>
                    <th className="py-3 px-4 font-semibold uppercase">Input</th>
                    <th className="py-3 px-4 font-semibold uppercase">Startup</th>
                    <th className="py-3 px-4 font-semibold uppercase">Active</th>
                    <th className="py-3 px-4 font-semibold uppercase">Recovery</th>
                    <th className="py-3 px-4 font-semibold uppercase">On-Block Adv.</th>
                    <th className="py-3 px-4 font-semibold uppercase">Damage Output</th>
                    <th className="py-3 px-4 font-semibold uppercase">Tags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredFrameData(currentProfile).map((move, idx) => {
                    const isSafe =
                      move.onBlock.includes('Safe') ||
                      move.onBlock.includes('+') ||
                      move.onBlock.includes('Advantage');
                    const isPunishable = move.onBlock.includes('Punishable');
                    return (
                      <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="py-3 px-4 font-bold text-zinc-100">{move.moveName}</td>
                        <td className="py-3 px-4">
                          <span className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] font-bold text-zinc-300 border border-zinc-700">
                            {move.input}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-zinc-300">{move.startup}</td>
                        <td className="py-3 px-4 text-zinc-400">{move.active}</td>
                        <td className="py-3 px-4 text-zinc-400">{move.recovery}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                              isSafe
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                                : isPunishable
                                ? 'bg-rose-950 text-rose-300 border border-rose-800/80'
                                : 'bg-amber-950 text-amber-300 border border-amber-800/80'
                            }`}
                          >
                            {move.onBlock}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-zinc-100">{move.damage}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {move.tags?.map((t, tidx) => (
                              <span
                                key={tidx}
                                className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400 border border-zinc-800"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION III: COMPREHENSIVE SKILL TREE */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  Section III: Master Ability Tree Architecture
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Hierarchical skill progression. Click any node to inspect detailed combat behavior.
                </p>
              </div>
              <span className="font-mono text-xs text-zinc-400 font-bold bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
                {currentProfile.skillTree.title}
              </span>
            </div>

            {/* Visual Ability Tree Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mb-8">
              {/* Branch 1 */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <h5 className="font-mono text-sm font-bold text-zinc-100 uppercase">
                    {currentProfile.skillTree.branch1.branchName}
                  </h5>
                </div>

                <div className="space-y-3">
                  {currentProfile.skillTree.branch1.skills.map((skill, sIdx) => {
                    const isSelected = selectedSkill?.title === skill.title;
                    return (
                      <div
                        key={sIdx}
                        onClick={() => {
                          playHitSound();
                          setSelectedSkill(skill);
                        }}
                        className={`cursor-pointer rounded-lg border p-3.5 transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                            : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[11px] font-bold text-emerald-400">{skill.rank}</span>
                          <span className="text-[10px] uppercase tracking-wider text-zinc-400">Tactical Ability</span>
                        </div>
                        <h6 className="font-bold text-sm text-zinc-100">{skill.title}</h6>
                        <p className="text-xs text-zinc-400 mt-1 leading-snug">{skill.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Branch 2 */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <h5 className="font-mono text-sm font-bold text-zinc-100 uppercase">
                    {currentProfile.skillTree.branch2.branchName}
                  </h5>
                </div>

                <div className="space-y-3">
                  {currentProfile.skillTree.branch2.skills.map((skill, sIdx) => {
                    const isSelected = selectedSkill?.title === skill.title;
                    return (
                      <div
                        key={sIdx}
                        onClick={() => {
                          playHitSound();
                          setSelectedSkill(skill);
                        }}
                        className={`cursor-pointer rounded-lg border p-3.5 transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[11px] font-bold text-amber-400">{skill.rank}</span>
                          <span className="text-[10px] uppercase tracking-wider text-zinc-400">Arsenal Vector</span>
                        </div>
                        <h6 className="font-bold text-sm text-zinc-100">{skill.title}</h6>
                        <p className="text-xs text-zinc-400 mt-1 leading-snug">{skill.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Ultimate Skill Node (Converging Apex) */}
            <div className="relative pt-6 border-t border-zinc-800 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-800/80 bg-purple-950/60 px-3 py-1 text-xs font-mono font-bold text-purple-300 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                CONVERGENT APEX ULTIMATE
              </div>

              <div
                onClick={() => {
                  playHitSound();
                  setSelectedSkill(currentProfile.skillTree.ultimate);
                }}
                className={`w-full max-w-2xl cursor-pointer rounded-xl border p-5 transition-all ${
                  selectedSkill?.title === currentProfile.skillTree.ultimate.title
                    ? 'border-purple-500 bg-purple-950/40 shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                    : 'border-purple-900/60 bg-gradient-to-r from-zinc-950 via-purple-950/20 to-zinc-950 hover:border-purple-700'
                }`}
              >
                <div className="font-mono text-xs font-bold text-purple-400 mb-1">
                  {currentProfile.skillTree.ultimate.rank}: {currentProfile.skillTree.ultimate.title}
                </div>
                <h5 className="text-lg font-black text-zinc-100 mb-2">{currentProfile.domainName}</h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {currentProfile.skillTree.ultimate.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW C: HEAD-TO-HEAD COMPARISON MATRIX */
        <div className="space-y-8">
          {/* Winner Banner */}
          <div className="rounded-xl border border-amber-600/60 bg-gradient-to-r from-amber-950/40 via-zinc-900 to-rose-950/40 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="h-4 w-4" /> Canonical Archival Verdict
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-100 mt-1">
                  Overall Winner: {HEAD_TO_HEAD_COMPARISON.overallWinner}
                </h3>
              </div>
              <span className="rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 font-mono text-xs font-semibold text-zinc-200">
                {HEAD_TO_HEAD_COMPARISON.winnerReason}
              </span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/70 p-4 rounded-lg border border-zinc-800">
              {HEAD_TO_HEAD_COMPARISON.matchupDynamic}
            </p>
          </div>

          {/* Metric Comparison Bars */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                Direct Metric Confrontation (Issac vs Zephyr)
              </h4>
              <div className="flex items-center gap-4 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Issac (Speed/Mobility)
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> Zephyr (Poise/Power)
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {HEAD_TO_HEAD_COMPARISON.metrics.map((metric, idx) => {
                const total = metric.issac + metric.zephyr;
                const issacPct = (metric.issac / total) * 100;
                const zephyrPct = (metric.zephyr / total) * 100;
                const isIssacLead = metric.issac > metric.zephyr;

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-semibold text-zinc-300">{metric.label}</span>
                      <span className="text-zinc-400">
                        Issac: <strong className="text-emerald-400">{metric.issac}</strong> vs Zephyr:{' '}
                        <strong className="text-rose-400">{metric.zephyr}</strong> (
                        <span className={isIssacLead ? 'text-emerald-300' : 'text-rose-300'}>
                          {metric.advantage}
                        </span>
                        )
                      </span>
                    </div>

                    <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800">
                      <div
                        className="bg-emerald-500 transition-all duration-500"
                        style={{ width: `${issacPct}%` }}
                        title={`Issac: ${metric.issac}`}
                      />
                      <div
                        className="bg-rose-500 transition-all duration-500"
                        style={{ width: `${zephyrPct}%` }}
                        title={`Zephyr: ${metric.zephyr}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Archetype Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-900/60 bg-zinc-900/40 p-5">
              <h5 className="font-mono text-sm font-bold text-emerald-400 mb-2">ISSAC'S TACTICAL FORMULA</h5>
              <ul className="text-xs text-zinc-300 space-y-2">
                <li>• Maximize distance using bed vaults (+40% jump height).</li>
                <li>• Exploit 0.28m reduced low-profile hitbox to evade command grabs.</li>
                <li>• Suppress incoming rush with 236S Nerf multi-dart chip advantage (+8f on block).</li>
                <li>• Weakness: Fragile under corner pressure (112 Base DEF, punishable on whiffed dropkick).</li>
              </ul>
            </div>

            <div className="rounded-xl border border-rose-900/60 bg-zinc-900/40 p-5">
              <h5 className="font-mono text-sm font-bold text-rose-400 mb-2">ZEPHYR'S TACTICAL FORMULA</h5>
              <ul className="text-xs text-zinc-300 space-y-2">
                <li>• Walk forward with 92 Poise armor; convert blocked damage into counter-bursts.</li>
                <li>• Corner target in narrow hallway chokepoints (0.9m width) to nullify speed vectors.</li>
                <li>• Execute unblockable 63214 Hallway Slam (340 HP) or 5H Heavy Palm (+2f Guard Crush).</li>
                <li>• Decisive Edge: Iron Will passive (+30% DEF below 50% HP) guarantees survival for 850 HP finisher.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
