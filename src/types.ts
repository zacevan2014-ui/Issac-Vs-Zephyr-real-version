export interface StatRating {
  name: string;
  rating: number; // out of 100
  notes: string;
}

export interface NumericalStat {
  key: string;
  label: string;
  baseValue: string;
  scaledValue: string;
  category: 'vitality' | 'combat' | 'mobility' | 'mechanics';
  unit?: string;
  percentScore?: number; // for visual progress bar
}

export interface FrameDataMove {
  moveName: string;
  input: string;
  startup: string;
  active: string;
  recovery: string;
  onBlock: string;
  damage: string;
  tags?: string[];
}

export interface SkillNode {
  rank: string;
  title: string;
  description: string;
  iconType: 'dash' | 'strike' | 'shield' | 'range' | 'buff' | 'ultimate';
}

export interface SkillBranch {
  branchName: string;
  skills: SkillNode[];
}

export interface CharacterProfile {
  id: 'issac' | 'zephyr';
  name: string;
  alias: string;
  epithet: string;
  tagline: string;
  role: string;
  avatarColor: string;
  accentColor: string; // Tailwind color class or hex
  glowColor: string;
  domainName: string;
  domainType: string;
  signatureMove: string;
  fightStyle: string;
  overview: string;
  auraTheme: string;
  ratings: StatRating[];
  numericalStats: NumericalStat[];
  frameData: FrameDataMove[];
  skillTree: {
    title: string;
    branch1: SkillBranch;
    branch2: SkillBranch;
    ultimate: SkillNode;
  };
}

export interface EpisodeItem {
  id: number;
  partKey: string;
  title: string;
  subtitle: string;
  youtubeId: string;
  youtubeUrl: string;
  durationEstimate: string;
  phase: string;
  tacticalSummary: string;
  keyEvents: string[];
  hpShift: string;
  highlightMove: string;
  winnerOrPacing: string;
}

export interface DomainClashFrame {
  timestamp: string;
  seconds: number;
  title: string;
  event: string;
  issacAction: string;
  issacEnergy: number; // 0 to 100
  zephyrAction: string;
  zephyrEnergy: number; // 0 to 100
  clashStatus: string;
  fxType: 'initiation' | 'expansion' | 'collision' | 'overlay' | 'shatter';
  details: string[];
}

export interface ForumComment {
  id: string;
  author: string;
  authorRole?: string;
  avatarBadge: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: 'Theories' | 'Episode Debate' | 'Frame Data & Tech' | 'Lore & Analysis';
  content: string;
  timestamp: string;
  likes: number;
  views: number;
  pinned?: boolean;
  comments: ForumComment[];
  likedByUser?: boolean;
}

export interface HiddenLoreEntry {
  id: string;
  clearanceLevel: string;
  dossierCode: string;
  title: string;
  category: string;
  excerpt: string;
  fullReport: string[];
  tacticalData: Record<string, string>;
  unlockedByDefault?: boolean;
}
