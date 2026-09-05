import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EpisodeTheater } from './components/EpisodeTheater';
import { CharacterEngine } from './components/CharacterEngine';
import { DomainClashSimulator } from './components/DomainClashSimulator';
import { FanForum } from './components/FanForum';
import { HiddenLoreVault } from './components/HiddenLoreVault';
import { setAudioMuted, playUnlockSound, playClickBeep } from './utils/soundEffects';
import { ExternalLink, Shield, Film, Flame, Users, BookOpen, Key, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('theater');
  const [selectedFighter, setSelectedFighter] = useState<'issac' | 'zephyr'>('issac');
  const [isAudioMutedState, setIsAudioMutedState] = useState<boolean>(false);
  const [isLoreUnlocked, setIsLoreUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('issac_vs_zephyr_lore_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [isSecretModalOpen, setIsSecretModalOpen] = useState<boolean>(false);
  const [modalPasscode, setModalPasscode] = useState<string>('');
  const [modalError, setModalError] = useState<string>('');

  const handleMuteToggle = (muted: boolean) => {
    setIsAudioMutedState(muted);
    setAudioMuted(muted);
  };

  const handleUnlockLore = () => {
    setIsLoreUnlocked(true);
    try {
      localStorage.setItem('issac_vs_zephyr_lore_unlocked', 'true');
    } catch (e) {
      console.warn('Could not save unlock state', e);
    }
  };

  const handleModalCipherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = modalPasscode.trim().toUpperCase();
    const validCodes = ['RESONANCE', 'VERDANT', 'ABYSS', 'OVERDRIVE', 'PHANTOM', 'COLOSSUS', '3.8'];
    if (validCodes.includes(clean)) {
      playUnlockSound();
      handleUnlockLore();
      setIsSecretModalOpen(false);
      setModalPasscode('');
      setModalError('');
      setActiveTab('lore');
    } else {
      setModalError('INVALID FREQUENCY CIPHER. TRY "RESONANCE" OR "VERDANT"');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isAudioMutedState}
        setIsMuted={handleMuteToggle}
        isLoreUnlocked={isLoreUnlocked}
        onOpenSecretModal={() => setIsSecretModalOpen(true)}
      />

      <main>
        {/* Cinematic Clash Hero Banner */}
        <HeroSection
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 480, behavior: 'smooth' });
          }}
          onSelectFighter={(fighter) => {
            setSelectedFighter(fighter);
            setActiveTab('characters');
          }}
        />

        {/* Tab View Routing */}
        <div className="relative">
          {activeTab === 'theater' && (
            <EpisodeTheater onJumpToClash={() => setActiveTab('clash')} />
          )}

          {activeTab === 'characters' && (
            <CharacterEngine initialFighter={selectedFighter} />
          )}

          {activeTab === 'clash' && (
            <DomainClashSimulator />
          )}

          {activeTab === 'forum' && (
            <FanForum />
          )}

          {activeTab === 'lore' && (
            <HiddenLoreVault isUnlocked={isLoreUnlocked} onUnlock={handleUnlockLore} />
          )}
        </div>
      </main>

      {/* Secret Cipher Key Modal */}
      {isSecretModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl relative">
            <button
              onClick={() => {
                playClickBeep();
                setIsSecretModalOpen(false);
              }}
              className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Key className="h-5 w-5 text-amber-400" />
              <h3 className="text-base font-bold text-zinc-100 uppercase tracking-tight">
                Vault Security Clearance Terminal
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Enter the classified battle frequency cipher to decrypt all Level 5 dossiers.
            </p>

            <form onSubmit={handleModalCipherSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Enter cipher (e.g. RESONANCE)..."
                value={modalPasscode}
                onChange={(e) => {
                  setModalPasscode(e.target.value);
                  setModalError('');
                }}
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 uppercase"
              />

              {modalError && (
                <p className="text-[11px] font-mono text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/60">
                  {modalError}
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-amber-500 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-400"
                >
                  DECRYPT VAULT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playUnlockSound();
                    handleUnlockLore();
                    setIsSecretModalOpen(false);
                    setActiveTab('lore');
                  }}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-mono text-zinc-300 hover:bg-zinc-700"
                >
                  Bypass Lock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-10 mt-16 text-xs text-zinc-400 font-mono">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-zinc-800">
            <div className="md:col-span-2">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2">
                ISSAC VS ZEPHYR // ARCHIVAL DOSSIER
              </h4>
              <p className="text-zinc-400 leading-relaxed max-w-md font-sans text-xs">
                Dedicated combat database and fan archive for the Issac vs Zephyr martial arts series. Built with
                canonical frame data tables, Section I & II numerical engines, interactive domain expansion
                simulations, and classified lore repositories.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-zinc-200 uppercase mb-3">Saga Video Links</h5>
              <ul className="space-y-1.5 text-zinc-400">
                <li>
                  <a
                    href="https://youtu.be/ry3cbG1u7fA?is=1FSqxrgJaPL-FoMa"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 flex items-center gap-1"
                  >
                    <span>Part 1: Long-Range Blitz</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtu.be/iwCfRKtJCPo?is=VY8kCVBQtqSx6G4R"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 flex items-center gap-1"
                  >
                    <span>Part 2: CQC & Grapple</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtu.be/5af1bD_ItGg?is=VfAy_VrlNerykTvL"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-purple-400 flex items-center gap-1"
                  >
                    <span>Part 3: Domain Clash</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtu.be/AlT4N5d1oHs?is=JcEsUzDEFZ4TzAbL"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-rose-400 flex items-center gap-1"
                  >
                    <span>Part 4: Overdrive Finale</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtu.be/mqumiyrVyfs?is=CEG71PHB5OCjp-nJ"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <span>The Movie (Full Cut)</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-zinc-200 uppercase mb-3">Quick Dossier Tabs</h5>
              <ul className="space-y-1.5 text-zinc-400">
                <li>
                  <button onClick={() => setActiveTab('theater')} className="hover:text-zinc-200">
                    Episode Summaries
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('characters')} className="hover:text-zinc-200">
                    Character Biographies & Frame Data
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('clash')} className="hover:text-zinc-200">
                    Domain Expansion Engine
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('forum')} className="hover:text-zinc-200">
                    Fan Forum & Polls
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('lore')} className="hover:text-zinc-200">
                    Hidden Lore Vault
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[11px]">
            <div>© Canonical Issac vs Zephyr Archive Project • Section I - V Certified</div>
            <div className="flex items-center gap-4">
              <span>Overall Victor: Zephyr (The Apex Colossus)</span>
              <span>•</span>
              <span>Domain Collision: 14,500 V/CI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
