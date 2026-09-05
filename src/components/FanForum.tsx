import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  PlusCircle,
  Search,
  Tag,
  Send,
  User,
  Vote,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';
import { ForumThread, ForumComment } from '../types';
import { playClickBeep, playHitSound, playUnlockSound } from '../utils/soundEffects';

const INITIAL_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    title: 'Did Issac throw Part 4 by closing distance instead of maintaining Nerf range?',
    author: 'PhantomVectorStan',
    authorAvatar: 'I',
    category: 'Theories',
    content:
      'In Part 1, Issac established a clean +18% HP lead purely through furniture vaults and 236S Nerf suppressive fire. In Part 4, after the domain collapse burned out their cursed energy pools, Issac charged straight into CQC with his 22.0 APS Phantom Flurry. If he had spaced out and made Zephyr walk him down, could he have prevented the Overdrive Finisher?',
    timestamp: '2 hours ago',
    likes: 42,
    views: 380,
    pinned: true,
    comments: [
      {
        id: 'c1',
        author: 'ZephyrColossus_Main',
        avatarBadge: 'Z',
        content:
          'No chance. People forget that Part 4 took place in a closed bedroom layout with narrow doorway egress. Once cursed energy was depleted to 0, Issac lost his Ghost Step evasion. Zephyr’s Iron Will passive gave him +30% defense anyway—Zephyr was going to corner him regardless.',
        timestamp: '1 hour ago',
        likes: 19,
      },
      {
        id: 'c2',
        author: 'FrameDataJunkie',
        avatarBadge: 'F',
        content:
          'Also look at the frame data table: Zephyr’s 5H has +2 on block. Even if Issac blocked, he was in minus frames in that tight space.',
        timestamp: '45 mins ago',
        likes: 11,
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'Verdant Horizon vs Malevolent Abyss: What if the barriers did not shatter?',
    author: 'DomainTheorist_99',
    authorAvatar: 'D',
    category: 'Episode Debate',
    content:
      'At 0.35s in Part 3, both domains collided with identical 14,500 Volts/Cursed Index output, creating the neutral void fracture. But what if Issac’s 42.0 m/s expansion speed had enclosed Zephyr 0.05s earlier? Could spatial echo strikes pierce through Zephyr’s raw armor before the high-gravity compression locked in?',
    timestamp: '5 hours ago',
    likes: 29,
    views: 295,
    comments: [
      {
        id: 'c3',
        author: 'ShorthairLoyalist',
        avatarBadge: 'I',
        content:
          'Verdant Horizon is spatial echo striking—it multiplies hits from empty coordinates. If Issac won the refinement tug of war, Zephyr would have eaten 18 hits every 0.5s with guaranteed sure-hit. Zephyr’s armor is strong, but infinite cuts shred poise.',
        timestamp: '3 hours ago',
        likes: 14,
      },
    ],
  },
  {
    id: 'thread-3',
    title: 'Frame Data Analysis: Issac’s 22 Special (Phantom Step Counter) is 1-Frame Startup!',
    author: 'HitboxLab_Tech',
    authorAvatar: 'H',
    category: 'Frame Data & Tech',
    content:
      'I was reviewing Section II of the archival dossier and noticed Issac’s 22 Special has 1 startup frame and +15 on block for a hard knockdown (290 HP). That is literally a tournament-level DP/counter move! How did Zephyr even bait this out in Part 2?',
    timestamp: '1 day ago',
    likes: 38,
    views: 450,
    comments: [
      {
        id: 'c4',
        author: 'TacticalZephyr',
        avatarBadge: 'Z',
        content:
          'Zephyr used the 63214 Command Grab. Command grabs beat counter states in almost all fighting game architectures. Zephyr baited the counter animation and went for the unblockable Hallway Slam.',
        timestamp: '18 hours ago',
        likes: 24,
      },
    ],
  },
  {
    id: 'thread-4',
    title: 'The sound design and choreography in The Movie cut is peak cinema',
    author: 'AnimeChoreoNerd',
    authorAvatar: 'A',
    category: 'Lore & Analysis',
    content:
      'Watching the full movie link (mqumiyrVyfs) in one sitting makes you appreciate the narrative arc. It starts like a playful bedroom nerf battle, transitions into tense hallway CQC, explodes into anime domain expansions, and ends with raw exhaustion and high-speed arm parries. Pure masterpiece.',
    timestamp: '2 days ago',
    likes: 54,
    views: 610,
    comments: [],
  },
];

export const FanForum: React.FC = () => {
  const [threads, setThreads] = useState<ForumThread[]>(() => {
    try {
      const saved = localStorage.getItem('issac_vs_zephyr_threads');
      return saved ? JSON.parse(saved) : INITIAL_THREADS;
    } catch {
      return INITIAL_THREADS;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [newCommentAuthor, setNewCommentAuthor] = useState<string>('');
  const [isCreatingThread, setIsCreatingThread] = useState<boolean>(false);

  // New Thread Form state
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState<'Theories' | 'Episode Debate' | 'Frame Data & Tech' | 'Lore & Analysis'>('Theories');
  const [newContent, setNewContent] = useState('');

  // Community Poll state
  const [pollVotes, setPollVotes] = useState<{ issac: number; zephyr: number; userVoted: string | null }>(() => {
    try {
      const savedPoll = localStorage.getItem('issac_vs_zephyr_poll');
      return savedPoll ? JSON.parse(savedPoll) : { issac: 128, zephyr: 184, userVoted: null };
    } catch {
      return { issac: 128, zephyr: 184, userVoted: null };
    }
  });

  // Sync threads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('issac_vs_zephyr_threads', JSON.stringify(threads));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [threads]);

  // Sync poll to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('issac_vs_zephyr_poll', JSON.stringify(pollVotes));
    } catch (e) {
      console.warn('Could not save poll to localStorage', e);
    }
  }, [pollVotes]);

  const categories = ['All', 'Theories', 'Episode Debate', 'Frame Data & Tech', 'Lore & Analysis'];

  const filteredThreads = threads.filter((t) => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const handleUpvote = (threadId: string) => {
    playHitSound();
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const isLiked = t.likedByUser;
          return {
            ...t,
            likes: isLiked ? t.likes - 1 : t.likes + 1,
            likedByUser: !isLiked,
          };
        }
        return t;
      })
    );
  };

  const handleAddComment = (threadId: string) => {
    if (!newCommentText.trim()) return;
    playClickBeep();
    const comment: ForumComment = {
      id: `comment-${Date.now()}`,
      author: newCommentAuthor.trim() || 'CombatAnalyst',
      avatarBadge: (newCommentAuthor.trim() || 'C').charAt(0).toUpperCase(),
      content: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0,
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            comments: [...t.comments, comment],
          };
        }
        return t;
      })
    );

    setNewCommentText('');
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    playUnlockSound();

    const created: ForumThread = {
      id: `thread-${Date.now()}`,
      title: newTitle.trim(),
      author: newAuthor.trim() || 'AnonymousDuelist',
      authorAvatar: (newAuthor.trim() || 'A').charAt(0).toUpperCase(),
      category: newCategory,
      content: newContent.trim(),
      timestamp: 'Just now',
      likes: 1,
      views: 1,
      comments: [],
      likedByUser: true,
    };

    setThreads([created, ...threads]);
    setIsCreatingThread(false);
    setNewTitle('');
    setNewAuthor('');
    setNewContent('');
    setSelectedThreadId(created.id);
  };

  const handleVotePoll = (fighter: 'issac' | 'zephyr') => {
    playHitSound();
    if (pollVotes.userVoted) return;
    setPollVotes((prev) => ({
      ...prev,
      [fighter]: prev[fighter] + 1,
      userVoted: fighter,
    }));
  };

  const totalVotes = pollVotes.issac + pollVotes.zephyr;
  const issacPollPct = Math.round((pollVotes.issac / totalVotes) * 100);
  const zephyrPollPct = 100 - issacPollPct;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Forum Header */}
      <div className="mb-8 border-b border-zinc-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Community Combat Archives
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Interactive Fan Forum & Rematch Polls</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-100 uppercase">
            Fan Discussions & Battle Theories
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Debate match outcomes, analyze frame traps, test hypothetical fight scenarios, and engage with fellow
            lore analysts.
          </p>
        </div>

        <button
          onClick={() => {
            playClickBeep();
            setIsCreatingThread(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          <span>START NEW THREAD</span>
        </button>
      </div>

      {/* Community Poll Widget */}
      <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800 text-amber-400">
              <Vote className="h-4 w-4" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em]">
                Active Community Debate Poll
              </span>
              <h4 className="text-sm sm:text-base font-black tracking-tight text-white uppercase mt-0.5">
                Courtyard Rematch: Who wins with zero furniture obstacles?
              </h4>
            </div>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            Total Ballots Cast: <strong className="text-zinc-200">{totalVotes}</strong>
          </span>
        </div>

        {/* Voting Bars & Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Issac Vote */}
          <button
            onClick={() => handleVotePoll('issac')}
            disabled={pollVotes.userVoted !== null}
            className={`rounded-xl border p-4 text-left transition-all relative overflow-hidden ${
              pollVotes.userVoted === 'issac'
                ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                ISSAC (The Phantom Vector)
              </span>
              <span className="font-mono text-xs font-extrabold text-white">
                {issacPollPct}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${issacPollPct}%` }}
              />
            </div>
            <p className="text-xs text-zinc-400">
              Argument: Infinite kiting space to maintain Nerf projectile lead without getting cornered.
            </p>
          </button>

          {/* Zephyr Vote */}
          <button
            onClick={() => handleVotePoll('zephyr')}
            disabled={pollVotes.userVoted !== null}
            className={`rounded-xl border p-4 text-left transition-all relative overflow-hidden ${
              pollVotes.userVoted === 'zephyr'
                ? 'border-rose-500 bg-rose-950/40 ring-1 ring-rose-500'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-rose-400 uppercase">
                ZEPHYR (The Apex Colossus)
              </span>
              <span className="font-mono text-xs font-extrabold text-white">
                {zephyrPollPct}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-rose-500 transition-all duration-700"
                style={{ width: `${zephyrPollPct}%` }}
              />
            </div>
            <p className="text-xs text-zinc-400">
              Argument: Without beds to launch off, Issac loses his 16.5 m/s apex elevation vector; Zephyr’s poise wins out.
            </p>
          </button>
        </div>

        {pollVotes.userVoted && (
          <p className="font-mono text-[10px] text-emerald-400 mt-3 text-center uppercase tracking-wider">
            ✓ Your ballot has been recorded into the canonical community registry.
          </p>
        )}
      </div>

      {/* New Thread Modal */}
      {isCreatingThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-1">Create New Archive Discussion</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Submit your theories or tactical inquiries to the community dossier.
            </p>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Discussion Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Could Issac have parried the Overdrive Finisher?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Author Alias</label>
                  <input
                    type="text"
                    placeholder="e.g. BedVaultAnalyst"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(
                        e.target.value as 'Theories' | 'Episode Debate' | 'Frame Data & Tech' | 'Lore & Analysis'
                      )
                    }
                    className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Theories">Theories</option>
                    <option value="Episode Debate">Episode Debate</option>
                    <option value="Frame Data & Tech">Frame Data & Tech</option>
                    <option value="Lore & Analysis">Lore & Analysis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Post Content & Argument</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail your combat argument, frame timing observation, or tactical breakdown..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsCreatingThread(false)}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-emerald-500 px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400"
                >
                  Publish Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Forum Split: Left Threads List (7 cols) + Right Selected Thread Comments (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Threads List Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClickBeep();
                    setActiveCategory(cat);
                  }}
                  className={`rounded-md px-2.5 py-1 text-xs font-mono whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-zinc-100 text-zinc-950 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-44 rounded-md border border-zinc-700 bg-zinc-950 pl-8 pr-3 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Threads Cards */}
          <div className="space-y-3">
            {filteredThreads.map((thread) => {
              const isSelected = selectedThreadId === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    playClickBeep();
                    setSelectedThreadId(thread.id);
                  }}
                  className={`cursor-pointer rounded-xl border p-5 transition-all ${
                    isSelected
                      ? 'border-emerald-500/80 bg-zinc-900/90 shadow-md ring-1 ring-emerald-500/40'
                      : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 font-mono text-xs font-bold text-zinc-300">
                        {thread.authorAvatar}
                      </span>
                      <span className="font-mono text-xs text-zinc-300 font-semibold">{thread.author}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-[11px] text-zinc-500">{thread.timestamp}</span>
                    </div>

                    <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400 border border-zinc-700">
                      {thread.category}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-zinc-100 mb-2 leading-snug">
                    {thread.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {thread.content}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(thread.id);
                        }}
                        className={`flex items-center gap-1.5 transition-colors ${
                          thread.likedByUser ? 'text-emerald-400 font-bold' : 'hover:text-zinc-200'
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{thread.likes}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>{thread.comments.length} replies</span>
                      </div>
                    </div>

                    <span className="text-[11px] text-zinc-500">View Thread & Debates →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Thread & Comments Column */}
        <div className="lg:col-span-5">
          {selectedThread ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between backdrop-blur-sm sticky top-20">
              <div>
                {/* Thread Header */}
                <div className="border-b border-zinc-800 pb-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
                      {selectedThread.category}
                    </span>
                    <span className="text-xs text-zinc-500">{selectedThread.timestamp}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-zinc-100 mb-2">{selectedThread.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-3">
                    <span>Initiated by: <strong className="text-zinc-200">{selectedThread.author}</strong></span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/70 p-3.5 rounded-lg border border-zinc-800/80">
                    {selectedThread.content}
                  </p>
                </div>

                {/* Comments List */}
                <div className="mb-6">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center justify-between">
                    <span>Replies ({selectedThread.comments.length})</span>
                    <span className="text-[10px] text-zinc-500">Encrypted Fan Transmissions</span>
                  </h4>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {selectedThread.comments.length === 0 ? (
                      <p className="text-xs text-zinc-500 italic py-3 text-center">
                        No responses yet. Be the first tactician to reply.
                      </p>
                    ) : (
                      selectedThread.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 text-xs"
                        >
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                            <span className="font-bold text-zinc-200">{comment.author}</span>
                            <span className="text-zinc-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-zinc-300 leading-relaxed">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Add Comment Box */}
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <input
                  type="text"
                  placeholder="Your Analyst Handle (e.g. DomainScout)"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Submit reply to this thread..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(selectedThread.id);
                    }}
                    className="flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => handleAddComment(selectedThread.id)}
                    className="rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 border-dashed bg-zinc-950/40 p-8 text-center text-zinc-500 text-xs">
              Select any debate thread on the left to read tactical exchanges or contribute your analysis.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
