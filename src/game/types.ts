export type Difficulty = "measured" | "pointed" | "adversarial";

export interface Choice {
  id: string;
  tag: string;
  line: string;
  points: number; // -3..+6
  standing: number; // delta
  momentum: number; // delta
  reaction: string;
  principle: string;
  keywords?: string[];
  goto?: string;
  setFlag?: string;
}

export interface ConditionalPrompt {
  default: string;
  ifStandingBelow?: [number, string];
  ifFlag?: [string, string];
}

export interface Stage {
  id: string;
  prompt: string | ConditionalPrompt;
  choices: Choice[];
  freeformFallback?: {
    points: number;
    standing: number;
    momentum: number;
    reaction: string;
    principle: string;
  };
}

export interface EndingCondition {
  momentumAtLeast?: number;
  standingAtLeast?: number;
  momentumBelow?: number;
  standingBelow?: number;
  flag?: string;
}

export interface Ending {
  id: string;
  when: EndingCondition;
  result: "won" | "partial" | "lost";
  baseGrade: string;
  resolution: string;
  lessons: string[];
}

export interface Opponent {
  name: string;
  role: string;
  archetype: string;
  blurb: string;
}

export interface Encounter {
  id: string;
  title: string;
  opponent: Opponent;
  difficulty: Difficulty;
  scene: string;
  objective: string;
  startStanding: number;
  startMomentum: number;
  stages: Stage[];
  endings: Ending[];
}
