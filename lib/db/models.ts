export type Archetype = 
  | 'wizard'   // AI focus, generative AI and logical reasoning
  | 'warrior'  // Data Science
  | 'trickster'// Game Development
  | 'rogue'    // Cybersecurity tools (red team)
  | 'ranger'   // Web Development
  | 'healer'   // Cybersecurity (blue team)
  | 'tank';    // Software Development

export interface ArchetypeDetails {
  id: Archetype;
  name: string;
  roleTitle: string;
  focusArea: string;
  icon: string;
  description: string;
  traitBonus: string;
  starterSpell: string;
}

export const ARCHETYPES: Record<Archetype, ArchetypeDetails> = {
  wizard: {
    id: 'wizard',
    name: 'Wizard',
    roleTitle: 'Archmage of Neural Logic',
    focusArea: 'AI & Generative Reasoning',
    icon: '🧙‍♂️',
    description: 'Master of machine learning incantations, LLM prompts, and automated intelligence.',
    traitBonus: '+15% Mana efficiency on AI & algorithmic puzzles.',
    starterSpell: 'Promptic Bolt'
  },
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    roleTitle: 'Titan of Data Analytics',
    focusArea: 'Data Science & Matrix Cleaving',
    icon: '⚔️',
    description: 'Conqueror of vast datasets, matrix transformations, and statistical battlefields.',
    traitBonus: '+20% Critical Hit damage when solving list & dataframe array challenges.',
    starterSpell: 'Data Cleave'
  },
  trickster: {
    id: 'trickster',
    name: 'Trickster',
    roleTitle: 'Master of Game Engines',
    focusArea: 'Game Development & Animation Logic',
    icon: '🃏',
    description: 'Weaver of physics loops, sprite collisions, and interactive gaming worlds.',
    traitBonus: 'Dodge 1 failed execution per daily challenge with Illusion Shield.',
    starterSpell: 'Sprite Warp'
  },
  rogue: {
    id: 'rogue',
    name: 'Rogue',
    roleTitle: 'Red Team Cyber Shadow',
    focusArea: 'Offensive Security & Penetration Testing',
    icon: '🗡️',
    description: 'Infiltrator of networks, payload craftsperson, and security exploit creator.',
    traitBonus: 'Uncovers secret hints and backdoor exploit solutions.',
    starterSpell: 'Shadow Infiltration'
  },
  ranger: {
    id: 'ranger',
    name: 'Ranger',
    roleTitle: 'Web Realm Navigator',
    focusArea: 'Web Development & RESTful API Architecture',
    icon: '🏹',
    description: 'Builder of web services, API endpoints, microservices, and client interfaces.',
    traitBonus: '+15% Speed bonus when building REST endpoints and string builders.',
    starterSpell: 'HTTP Arrow'
  },
  healer: {
    id: 'healer',
    name: 'Healer',
    roleTitle: 'Blue Team Sentinel',
    focusArea: 'Defensive Security & Threat Hunting',
    icon: '🛡️',
    description: 'Guardian of log streams, anomaly detection, firewall scripts, and system resilience.',
    traitBonus: 'Restores 25 HP upon resolving try/except error handling challenges.',
    starterSpell: 'Sanctuary Ward'
  },
  tank: {
    id: 'tank',
    name: 'Tank',
    roleTitle: 'Architect of Software Engineering',
    focusArea: 'Systems Design & OOP Engineering',
    icon: '🏰',
    description: 'Sturdy builder of clean code, object-oriented design patterns, and enterprise tools.',
    traitBonus: 'Absorbs syntax errors with Ironclad Refactoring.',
    starterSpell: 'OOP Bastion'
  }
};

export interface SubQuest {
  id: string;
  title: string;
  narrative: string;
  conceptExplanation: string;
  codeTask: string;
  starterCode: string;
  solutionCode: string;
  testAssertion: string; // JavaScript / Pyodide assertion check code
  xpReward: number;
  hints: string[];
  archetypeVariant?: Partial<Record<Archetype, {
    title?: string;
    narrative?: string;
    codeTask?: string;
    starterCode?: string;
    solutionCode?: string;
    testAssertion?: string;
  }>>;
}

export interface MiniBoss {
  id: string;
  bossName: string;
  bossTitle: string;
  bossAvatar: string;
  bossHp: number;
  narrative: string;
  combatTask: string;
  starterCode: string;
  solutionCode: string;
  testAssertion: string;
  xpReward: number;
  lootReward: string;
}

export interface Quest {
  _id?: string;
  dayNumber: number;
  title: string;
  subtitle: string;
  chapterWeek: number; // 1, 2, 3, or 4
  category: string;
  isWeeklyBossDay: boolean; // true for Days 7, 14, 21, 28
  subQuests: SubQuest[];
  miniBoss?: MiniBoss;
}

export interface WeeklyBossQuestion {
  id: string;
  title: string;
  prompt: string;
  combatPhase: string; // e.g. "Phase 1: Armor Break"
  starterCode: string;
  solutionCode: string;
  testAssertion: string;
  damageValue: number;
}

export interface WeeklyBoss {
  _id?: string;
  weekNumber: number; // 1, 2, 3, 4
  dayNumber: number; // 7, 14, 21, 28
  bossName: string;
  bossTitle: string;
  bossAvatar: string;
  bossHp: number;
  narrative: string;
  questions: WeeklyBossQuestion[];
  xpReward: number;
  lootBadge: string;
}

export interface UserProfile {
  _id?: string;
  username: string;
  displayName: string;
  archetype?: Archetype;
  characterClass?: string;
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  currentDay: number;
  completedSubQuestIds: string[];
  completedMiniBossDays: number[];
  completedWeeklyBossWeeks: number[];
  lootInventory: string[];
  userCodeSubmissions: Record<string, string>; // questId/subQuestId -> user's code
  createdAt: Date;
  updatedAt: Date;
}
