import React from 'react';
import { Shield, Sparkles, Volume2, VolumeX, Flame, Film, BookOpen, Users, Lock, Unlock } from 'lucide-react';
import { playClickBeep } from '../utils/soundEffects';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isLoreUnlocked: boolean;
  onOpenSecretModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  isLoreUnlocked,
  onOpenSecretModal,
}) => {
  const navItems = [
    { id: 'theater', label: 'Episodes & Movie', icon: Film },
    { id: 'characters', label: 'Character Engine & Stats', icon: Shield },
    { id: 'clash', label: 'Domain Clash Sim', icon: Flame },
    { id: 'forum', label: 'Fan Forum & Polls', icon: Users },
    { id: 'lore', label: 'Classified Lore', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          onClick={() => {
            playClickBeep();
            setActiveTab('theater');
          }}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800 shadow-inner group-hover:border-zinc-600 transition-colors">
            <span className="font-mono text-xs font-black text-emerald-400">I</span>
            <span className="text-[10px] font-bold text-zinc-600">vs</span>
            <span className="font-mono text-xs font-black text-rose-500">Z</span>
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Archive Dossier</span>
              <span className="inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
                v3.8
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-black tracking-tight text-white uppercase">
              ISSAC <span className="text-zinc-500 font-light italic">vs</span> ZEPHYR
            </h1>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickBeep();
                  setActiveTab(item.id);
                }}
                className={`relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm border border-zinc-700'
                    : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
                {item.id === 'lore' && (
                  <span
                    className={`ml-1 flex h-4 w-4 items-center justify-center rounded text-[9px] ${
                      isLoreUnlocked
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
                        : 'bg-zinc-800 text-amber-400 border border-amber-800/60'
                    }`}
                  >
                    {isLoreUnlocked ? <Unlock className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Sound FX Toggle & Secret Lore Key */}
        <div className="flex items-center gap-2">
          {/* Secret Dossier Trigger Button */}
          <button
            onClick={() => {
              playClickBeep();
              onOpenSecretModal();
            }}
            title={isLoreUnlocked ? 'Classified Archives Decrypted' : 'Security Clearance Lock'}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono font-medium transition-all ${
              isLoreUnlocked
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 hover:bg-emerald-900/60'
                : 'bg-amber-950/50 text-amber-300 border border-amber-700/50 hover:bg-amber-900/50'
            }`}
          >
            {isLoreUnlocked ? (
              <>
                <Unlock className="h-3 w-3 text-emerald-400" />
                <span className="hidden sm:inline">VAULT: UNLOCKED</span>
              </>
            ) : (
              <>
                <Lock className="h-3 w-3 text-amber-400" />
                <span className="hidden sm:inline">VAULT: CIPHER LOCK</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playClickBeep();
              setIsMuted(!isMuted);
            }}
            title={isMuted ? 'Unmute Combat Audio FX' : 'Mute Audio FX'}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-zinc-500" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="flex md:hidden overflow-x-auto border-t border-zinc-800/60 bg-zinc-950 px-3 py-1.5 no-scrollbar gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playClickBeep();
                setActiveTab(item.id);
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${
                isActive ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
