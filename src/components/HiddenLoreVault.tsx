import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  FileText,
  Terminal,
  Compass,
  AlertTriangle,
  Copy,
  Check,
  Layers,
  MapPin,
} from 'lucide-react';
import { HIDDEN_LORE_ARCHIVES } from '../data/loreData';
import { HiddenLoreEntry } from '../types';
import { playClickBeep, playUnlockSound, playHitSound } from '../utils/soundEffects';

interface HiddenLoreVaultProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const HiddenLoreVault: React.FC<HiddenLoreVaultProps> = ({ isUnlocked, onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedLore, setSelectedLore] = useState<HiddenLoreEntry>(HIDDEN_LORE_ARCHIVES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>('alpha');

  const validCodes = ['RESONANCE', 'VERDANT', 'ABYSS', 'OVERDRIVE', 'PHANTOM', 'COLOSSUS', '3.8'];

  const handleAttemptUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toUpperCase();
    if (validCodes.includes(clean)) {
      playUnlockSound();
      setErrorMessage('');
      onUnlock();
    } else {
      playHitSound();
      setErrorMessage('ACCESS DENIED: Invalid Cursed Frequency Cipher. Hint: Try "RESONANCE" or "VERDANT"');
    }
  };

  const handleCopyDossier = (dossier: HiddenLoreEntry) => {
    playClickBeep();
    const text = `${dossier.dossierCode}: ${dossier.title}\nClearance: ${dossier.clearanceLevel}\n\n${dossier.fullReport.join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dossier.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">
              Classified Level 5 Repository
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Tactical Physics & Unreleased Battlefield Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-100 uppercase flex items-center gap-3">
            <span>Hidden Lore & Black-Box Archives</span>
            {isUnlocked ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400 border border-emerald-700/80">
                <Unlock className="h-3.5 w-3.5" /> DECRYPTED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-950 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-400 border border-amber-700/80">
                <Lock className="h-3.5 w-3.5" /> CIPHER LOCKED
              </span>
            )}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Declassified records detailing the fluid mechanics of improvised dual hydro-bottles, ceiling launch vectors,
            and the bedroom battlefield topography.
          </p>
        </div>
      </div>

      {/* LOCKED STATE TERMINAL */}
      {!isUnlocked ? (
        <div className="mx-auto max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-400 mx-auto mb-4">
            <Lock className="h-6 w-6" />
          </div>

          <div className="text-center mb-6">
            <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em]">
              Security Verification Protocol
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mt-1">
              Classified Access Cipher Required
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 max-w-md mx-auto leading-relaxed">
              This archival chamber contains sensitive ballistic evaluations and domain paradox records. Enter a
              valid combat frequency keycode to authorize decryption.
            </p>
          </div>

          {/* Cipher Input Form */}
          <form onSubmit={handleAttemptUnlock} className="space-y-4 max-w-md mx-auto">
            <div>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Enter access cipher (e.g. RESONANCE)..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 pl-9 pr-3 py-2.5 text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 uppercase tracking-widest"
                />
              </div>

              {errorMessage && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/60">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-amber-500 py-2.5 text-xs font-mono font-bold text-zinc-950 hover:bg-amber-400 transition-colors uppercase tracking-wider shadow-md"
              >
                Authenticate Clearance
              </button>

              <button
                type="button"
                onClick={() => {
                  playUnlockSound();
                  onUnlock();
                }}
                className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs font-mono text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Bypass Lock (Guest Access)
              </button>
            </div>
          </form>

          {/* Decryption Clues Terminal Box */}
          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-2 text-[10px] tracking-widest uppercase">
              <Terminal className="h-3.5 w-3.5" />
              <span>TERMINAL CLUES FOR AGENTS:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-zinc-400">
              <li>• Clue #1: The equal frequency clash at 0.35s is called: <strong className="text-zinc-200">RESONANCE</strong></li>
              <li>• Clue #2: Issac’s emerald spatial domain name: <strong className="text-zinc-200">VERDANT</strong></li>
              <li>• Clue #3: Zephyr’s crimson pressure domain name: <strong className="text-zinc-200">ABYSS</strong></li>
              <li>• Clue #4: The movie’s match-ending strike: <strong className="text-zinc-200">OVERDRIVE</strong></li>
            </ul>
          </div>
        </div>
      ) : (
        /* UNLOCKED STATE: DOSSIER VAULT */
        <div className="space-y-8">
          {/* Topography Battlefield Blueprint Map Matrix */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-emerald-400" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-200">
                  Declassified Topographic Layout: Bedroom Arena (18.4 m²)
                </h4>
              </div>
              <span className="font-mono text-xs text-zinc-500">Sector BD-04A</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { id: 'alpha', name: 'Zone Alpha: Bed Springboard', desc: '16.5 m/s ceiling launch trajectory & high ground nerf perch' },
                { id: 'beta', name: 'Zone Beta: Hallway Choke', desc: '0.92m narrow corridor where Zephyr landed 63214 Command Grab' },
                { id: 'gamma', name: 'Zone Gamma: Wardrobe Blind Spot', desc: 'Poise recovery shelter utilized to tank projectile chip damage' },
                { id: 'omega', name: 'Zone Omega: Clash Epicenter', desc: 'Center rug domain expansion 14,500 V/CI barrier burnout site' },
              ].map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    playClickBeep();
                    setSelectedZone(zone.id);
                  }}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    selectedZone === zone.id
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-white uppercase">{zone.name}</span>
                    <MapPin className={`h-3.5 w-3.5 ${selectedZone === zone.id ? 'text-emerald-400' : 'text-zinc-600'}`} />
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug">{zone.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dossiers Grid & Detailed Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Dossier Selector List (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-amber-400" />
                Decrypted Archives ({HIDDEN_LORE_ARCHIVES.length})
              </h4>

              {HIDDEN_LORE_ARCHIVES.map((dossier) => {
                const isSelected = selectedLore.id === dossier.id;
                return (
                  <div
                    key={dossier.id}
                    onClick={() => {
                      playClickBeep();
                      setSelectedLore(dossier);
                    }}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-amber-500/80 bg-zinc-900/90 shadow-md ring-1 ring-amber-500/40'
                        : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                      <span className="font-bold text-amber-400">{dossier.dossierCode}</span>
                      <span className="text-zinc-500">{dossier.clearanceLevel}</span>
                    </div>

                    <h5 className="text-sm font-bold text-zinc-100 mb-1 leading-snug uppercase">{dossier.title}</h5>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{dossier.excerpt}</p>
                  </div>
                );
              })}
            </div>

            {/* Dossier Detailed Reader (7 cols) */}
            <div className="lg:col-span-7 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-7 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs mb-1">
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 font-bold text-amber-400 border border-amber-500/20">
                      {selectedLore.dossierCode}
                    </span>
                    <span className="text-zinc-500">{selectedLore.clearanceLevel}</span>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{selectedLore.title}</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-0.5">{selectedLore.category}</p>
                </div>

                <button
                  onClick={() => handleCopyDossier(selectedLore)}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:bg-zinc-700 transition-colors"
                >
                  {copiedId === selectedLore.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY DOSSIER</span>
                    </>
                  )}
                </button>
              </div>

              {/* Full Narrative Text */}
              <div className="space-y-3 mb-6 text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/80 p-4 sm:p-5 rounded-lg border border-zinc-800">
                {selectedLore.fullReport.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Tactical Data Field Specs */}
              <div>
                <h5 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-emerald-400" />
                  Telemetry Field Parameters
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  {Object.entries(selectedLore.tacticalData).map(([k, v], idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center rounded-lg bg-zinc-950/80 border border-zinc-800 px-3 py-2"
                    >
                      <span className="text-zinc-400">{k}:</span>
                      <span className="font-bold text-zinc-100">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
