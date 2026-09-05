import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles, Zap, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import { DOMAIN_CLASH_FRAMES } from '../data/seriesData';
import { DomainClashFrame } from '../types';
import { playDomainClashSound, playHitSound } from '../utils/soundEffects';

export const DomainClashSimulator: React.FC = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentFrame: DomainClashFrame = DOMAIN_CLASH_FRAMES[currentFrameIndex];

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrameIndex((prev) => {
          if (prev >= DOMAIN_CLASH_FRAMES.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          const next = prev + 1;
          if (next === 3 || next === 5) {
            playDomainClashSound();
          } else {
            playHitSound();
          }
          return next;
        });
      }, 2200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Render visual clash simulation on HTML5 canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      const w = canvas.width;
      const h = canvas.height;

      // Dark futuristic arena backdrop
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 0.5;
      const gridSize = 24;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const progress = currentFrameIndex / (DOMAIN_CLASH_FRAMES.length - 1);

      // Issac Emerald Barrier (Left Side)
      const issacRadius = Math.min(w * 0.52, (currentFrameIndex + 1) * 75 + Math.sin(time * 3) * 6);
      const issacGrad = ctx.createRadialGradient(w * 0.25, h * 0.5, 10, w * 0.25, h * 0.5, issacRadius);
      issacGrad.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
      issacGrad.addColorStop(0.7, 'rgba(5, 150, 105, 0.2)');
      issacGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.fillStyle = issacGrad;
      ctx.beginPath();
      ctx.arc(w * 0.25, h * 0.5, issacRadius, 0, Math.PI * 2);
      ctx.fill();

      // Issac Barrier Perimeter Rings
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(w * 0.25, h * 0.5, issacRadius * 0.9, 0, Math.PI * 2);
      ctx.stroke();

      // Zephyr Crimson Barrier (Right Side)
      const zephyrRadius = Math.min(w * 0.52, (currentFrameIndex + 1) * 70 + Math.cos(time * 3) * 6);
      const zephyrGrad = ctx.createRadialGradient(w * 0.75, h * 0.5, 10, w * 0.75, h * 0.5, zephyrRadius);
      zephyrGrad.addColorStop(0, 'rgba(244, 63, 94, 0.45)');
      zephyrGrad.addColorStop(0.7, 'rgba(225, 29, 72, 0.2)');
      zephyrGrad.addColorStop(1, 'rgba(244, 63, 94, 0)');

      ctx.fillStyle = zephyrGrad;
      ctx.beginPath();
      ctx.arc(w * 0.75, h * 0.5, zephyrRadius, 0, Math.PI * 2);
      ctx.fill();

      // Zephyr Barrier Perimeter Rings
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(w * 0.75, h * 0.5, zephyrRadius * 0.9, 0, Math.PI * 2);
      ctx.stroke();

      // Clash Fracture Line (at center when frameIndex >= 2)
      if (currentFrameIndex >= 2) {
        const midX = w * 0.5;
        ctx.strokeStyle = currentFrameIndex === 5 ? '#f59e0b' : '#38bdf8';
        ctx.lineWidth = currentFrameIndex === 5 ? 4 : 2;
        ctx.shadowColor = currentFrameIndex === 5 ? '#f59e0b' : '#38bdf8';
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.moveTo(midX, 20);
        for (let y = 20; y < h - 20; y += 15) {
          const jitter = (Math.random() - 0.5) * (currentFrameIndex === 5 ? 24 : 12);
          ctx.lineTo(midX + jitter, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      // Shatter Particles on Frame 5 (2.10s)
      if (currentFrameIndex === 5) {
        ctx.fillStyle = '#fbbf24';
        for (let p = 0; p < 25; p++) {
          const px = w * 0.5 + (Math.sin(p + time) * w * 0.4);
          const py = h * 0.5 + (Math.cos(p * 2 + time) * h * 0.4);
          ctx.fillRect(px, py, 3, 3);
        }
      }

      // Center Node Icons
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('VERDANT HORIZON (42 m/s)', 16, 28);

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('MALEVOLENT ABYSS (35 m/s)', w - 210, 28);

      if (currentFrameIndex >= 3) {
        ctx.fillStyle = '#e4e4e7';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('REFINE RATE: 14,500 V/CI', w * 0.5 - 75, h - 20);
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [currentFrameIndex]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-semibold tracking-wider text-purple-400 uppercase">
              Section IV Technical Engine
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Frame-By-Frame Domain Expansion Climax</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-100 uppercase">
            Part 3 Domain Clash Simulator
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Simulate the high-density spatial vs gravity barrier collision that burnt out both combatants’ cursed energy
            to absolute zero.
          </p>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2 bg-zinc-900/90 p-1.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => {
              if (!isPlaying) playDomainClashSound();
              setIsPlaying(!isPlaying);
            }}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-mono font-bold transition-colors ${
              isPlaying
                ? 'bg-amber-500 text-zinc-950'
                : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200'
            }`}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
            <span>{isPlaying ? 'PAUSE CLASH' : 'AUTO SIMULATE'}</span>
          </button>

          <button
            onClick={() => {
              playHitSound();
              setCurrentFrameIndex(0);
              setIsPlaying(false);
            }}
            title="Reset to 0.00s"
            className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1.5 text-xs font-mono text-zinc-300 hover:bg-zinc-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Canvas Visualizer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full h-auto block aspect-video"
            />

            {/* Inset Badge */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-zinc-950/80 backdrop-blur border border-zinc-800 rounded-full px-3 py-1 font-mono text-xs text-zinc-300 flex items-center gap-2">
              <span className="font-bold text-amber-400">T = {currentFrame.timestamp}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">{currentFrame.clashStatus}</span>
            </div>
          </div>

          {/* Timeline Scrubbing Bar */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Timeline Micro-Scrubber</span>
              <span className="text-zinc-200 font-bold">{currentFrame.timestamp} / 2.10s</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {DOMAIN_CLASH_FRAMES.map((f, idx) => {
                const isActive = currentFrameIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      playHitSound();
                      setCurrentFrameIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`rounded-lg p-2.5 text-center font-mono transition-all border ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100 shadow-sm'
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="text-[10px] font-bold">{f.timestamp}</div>
                    <div className="text-[9px] truncate text-zinc-500">{f.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Telemetry Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em]">
                  Phase Sequence // Step {currentFrameIndex + 1} of 6
                </span>
                <h3 className="text-xl font-black tracking-tight text-white uppercase mt-0.5">{currentFrame.title}</h3>
              </div>
              <span className="font-mono text-xs bg-zinc-800/80 text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-700">
                {currentFrame.timestamp}
              </span>
            </div>

            {/* Event Description */}
            <div className="mb-4 bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800">
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{currentFrame.event}</p>
            </div>

            {/* Combatant Vector Breakdown */}
            <div className="space-y-3 mb-4">
              {/* Issac Action */}
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3">
                <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-1">
                  <span className="font-bold uppercase text-[10px] tracking-wider">ISSAC (VERDANT HORIZON)</span>
                  <span className="text-[11px]">ENERGY: {currentFrame.issacEnergy}%</span>
                </div>
                <p className="text-xs text-zinc-300 font-sans">{currentFrame.issacAction}</p>
                <div className="mt-2 h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${currentFrame.issacEnergy}%` }}
                  />
                </div>
              </div>

              {/* Zephyr Action */}
              <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-3">
                <div className="flex items-center justify-between font-mono text-xs text-rose-400 mb-1">
                  <span className="font-bold uppercase text-[10px] tracking-wider">ZEPHYR (MALEVOLENT ABYSS)</span>
                  <span className="text-[11px]">ENERGY: {currentFrame.zephyrEnergy}%</span>
                </div>
                <p className="text-xs text-zinc-300 font-sans">{currentFrame.zephyrAction}</p>
                <div className="mt-2 h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 transition-all duration-300"
                    style={{ width: `${currentFrame.zephyrEnergy}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Technical Bullet Details */}
            <div className="space-y-1.5 text-xs text-zinc-400 mb-4 font-mono">
              <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Field Telemetry Parameters:
              </h5>
              {currentFrame.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2 bg-zinc-950/40 p-1.5 rounded border border-zinc-800/60">
                  <span className="text-zinc-600 font-mono">•</span>
                  <span className="text-zinc-300 font-sans text-xs">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800 gap-2 font-mono text-xs">
            <button
              disabled={currentFrameIndex === 0}
              onClick={() => {
                playHitSound();
                setCurrentFrameIndex((p) => Math.max(0, p - 1));
              }}
              className="rounded-lg bg-zinc-800 px-3 py-1.5 text-zinc-300 disabled:opacity-30 hover:bg-zinc-700 transition-colors"
            >
              PREVIOUS
            </button>

            <span className="text-zinc-500 text-[11px]">Step {currentFrameIndex + 1} of 6</span>

            <button
              disabled={currentFrameIndex === DOMAIN_CLASH_FRAMES.length - 1}
              onClick={() => {
                playHitSound();
                setCurrentFrameIndex((p) => Math.min(DOMAIN_CLASH_FRAMES.length - 1, p + 1));
              }}
              className="rounded-lg bg-zinc-100 text-zinc-950 font-bold px-3 py-1.5 disabled:opacity-30 hover:bg-white transition-colors"
            >
              NEXT FRAME
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
