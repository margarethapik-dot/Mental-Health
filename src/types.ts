export type StudentLevel = 'primary' | 'secondary';

export interface PersonalityArchetype {
  id: string;
  name: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: string[];
  stressSigns: string[];
  rechargeMethod: string;
  recommendedTools: string[];
  quote: string;
  accentColor: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtext?: string;
  options: {
    text: string;
    emoji?: string;
    archetypeId: string;
  }[];
}

export interface AnxietyQuestion {
  id: number;
  question: string;
  subtext?: string;
  category: 'physical' | 'thoughts' | 'social' | 'school' | 'future';
}

export type AnxietySeverity = 'minimal' | 'mild' | 'moderate' | 'elevated';

export interface AnxietyResult {
  score: number;
  maxScore: number;
  severity: AnxietySeverity;
  headline: string;
  interpretation: string;
  primaryTriggers: string[];
  supportAdvice: string;
}

export interface CopingResource {
  id: string;
  title: string;
  category: 'breathing' | 'grounding' | 'reframing' | 'somatic' | 'action';
  duration: string;
  description: string;
  tags: string[];
  suitableFor: StudentLevel[];
  bestForArchetypes?: string[];
  bestForSeverities?: AnxietySeverity[];
}

export interface CheckinRecord {
  id: string;
  date: string;
  timestamp: number;
  level: StudentLevel;
  studentName?: string;
  archetypeId: string;
  archetypeName: string;
  anxietyScore: number;
  maxScore: number;
  severity: AnxietySeverity;
  selectedTriggers: string[];
  favoriteTool?: string;
  personalNotes?: string;
}

export interface CalmActionPlan {
  studentName: string;
  level: StudentLevel;
  archetypeName: string;
  topTriggers: string[];
  calmingStrategies: string[];
  safePersonName: string;
  safePersonContact: string;
  favoriteSafePlace: string;
  empowermentMantra: string;
}
