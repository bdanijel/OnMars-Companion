export type PlayerColor = 'yellow' | 'red';

export interface PlayerInfo {
  name: string;
  color: PlayerColor;
  hexColor: string;
  badgeBg: string;
  badgeBorder: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface GameAction {
  id: string;
  title: string;
  titleEn: string;
  side: 'orbit' | 'colony' | 'executive';
  requiresRedColonist: boolean;
  costDescription: string;
  boostOptions?: string[];
  shortDesc: string;
  steps: string[];
  importantNotes: string[];
  referencePage: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'setup' | 'actions' | 'colonists' | 'tech' | 'lss' | 'contracts' | 'endgame' | 'twoplayer';
  pageRef?: number;
  highlight?: boolean;
}

export interface ComponentItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'building' | 'resource' | 'unit' | 'card' | 'track' | 'mechanic';
  icon: string;
  description: string;
  rulesDetail: string;
  pageRef: number;
  twoPlayerNote?: string;
}

export interface SetupStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  isTwoPlayerSpecial: boolean;
  twoPlayerNote?: string;
  pageRef: number;
}

export interface PlayerScoreState {
  inGameOP: number;
  progressCubes: number; // 0 to 5 (scores 0, 1, 2, 4, 7, 11)
  hangarShips: number; // 3 OP each
  colonistHighestOP: number; // e.g. 0, 1, 2, 3, 5, 8, 12...
  techTilesOP: number; // sum of tech column OP
  builtLvl1Blueprints: number; // +3 OP each
  builtLvl3Blueprints: number; // +5 OP each
  unbuiltLvl1Blueprints: number; // -3 OP each
  unbuiltLvl3Blueprints: number; // -5 OP each
  scientistsOP: number; // 3 OP per matching advanced building on Mars
  contractsCompletedOP: number; // positive OP
  contractsFailedPenalty: number; // negative OP penalty
  // Tie breakers:
  crystalsCount: number;
  advancedBuildingsCount: number;
}
