export interface UserProfile {
  name: string;
  passion: string;
  goal: string;
  dreamLife: string;
  personality: string;
  decision: string;
}

export interface TimelinePoint {
  age: number;
  year: number;
  title: string;
  description: string;
  impactScale: 'minor' | 'major' | 'critical';
}

export interface AlternateReality {
  id: string; // 'reality_1', 'reality_2', 'reality_3'
  title: string; // Cinematic name (e.g. "The Cybernetic Hermit", "The Starlight Explorer", "The Corporate Overlord")
  age: number;
  occupation: string;
  mood: string;
  probability: number; // e.g. 74%
  description: string;
  story: string; // The high-fidelity description of this reality
  timeline: TimelinePoint[];
  futureSelfPrompt: string; // System instruction directive describing their exact behavioral tone and outlook
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'future_self';
  text: string;
  timestamp: string;
}

export interface AppState {
  // Navigation / Interface steps: 'landing' | 'onboarding' | 'simulation' | 'results'
  currentStep: 'landing' | 'onboarding' | 'simulation' | 'results';
  userProfile: UserProfile;
  realities: AlternateReality[];
  activeRealityId: string | null;
  activeQuestionIndex: number;
  simulationPhase: number; // 0: Idle, 1: Universe Creation, 2: Timeline Split, 3: Identity Gen, 4: Reality Merge
  isLoading: boolean;
  error: string | null;
  chatHistory: Record<string, ChatMessage[]>; // keyed by reality id

  // Action methods
  setStep: (step: 'landing' | 'onboarding' | 'simulation' | 'results') => void;
  updateProfile: (field: keyof UserProfile, value: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setSimulationPhase: (phase: number) => void;
  startSimulation: () => Promise<void>;
  setActiveRealityId: (id: string | null) => void;
  addChatMessage: (realityId: string, sender: 'user' | 'future_self', text: string) => void;
  sendChatMessage: (realityId: string, text: string) => Promise<void>;
  resetSimulation: () => void;
}
