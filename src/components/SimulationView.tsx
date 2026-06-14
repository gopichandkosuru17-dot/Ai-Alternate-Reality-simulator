import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuantumStore } from '../store';
import { Sparkles, HelpCircle, Split, ShieldAlert } from 'lucide-react';

interface PhaseConfig {
  number: number;
  label: string;
  subLabel: string;
  glowColor: string;
  icon: ReactNode;
}

const PHASES: PhaseConfig[] = [
  {
    number: 1,
    label: "Universe Creation",
    subLabel: "FORGING A NEW DIMENSIONAL FABRIC",
    glowColor: "rgba(0, 229, 255, 0.4)",
    icon: <Sparkles className="w-8 h-8 text-[#00E5FF]" />
  },
  {
    number: 2,
    label: "Timeline Split",
    subLabel: "CALCULATING TEMPORAL BRANCH ANGLES",
    glowColor: "rgba(139, 92, 246, 0.4)",
    icon: <Split className="w-8 h-8 text-[#8B5CF6]" />
  },
  {
    number: 3,
    label: "Identity Generation",
    subLabel: "SYNTHESIZING CELLULAR MEMORIES & ADVICE",
    glowColor: "rgba(255, 79, 216, 0.4)",
    icon: <HelpCircle className="w-8 h-8 text-[#FF4FD8]" />
  },
  {
    number: 4,
    label: "Reality Merge",
    subLabel: "COLLAPSING WAVE COGNITIONS STABLY",
    glowColor: "rgba(255, 255, 255, 0.4)",
    icon: <ShieldAlert className="w-8 h-8 text-white" />
  }
];

export default function SimulationView() {
  const simulationPhase = useQuantumStore((state) => state.simulationPhase);
  const userProfile = useQuantumStore((state) => state.userProfile);

  const currentPhaseConfig = PHASES.find(p => p.number === simulationPhase) || PHASES[0];

  return (
    <div id="simulation_view" className="relative min-h-screen flex flex-col justify-center items-center text-white p-6 z-10 overflow-hidden select-none">
      
      {/* Background ambient circular pulse ring that gets bigger or vibrates per phase */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          key={simulationPhase}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.4, 1], 
            opacity: [0, 0.3, 0],
            borderColor: currentPhaseConfig.number === 1 ? '#00E5FF' : currentPhaseConfig.number === 2 ? '#8B5CF6' : currentPhaseConfig.number === 3 ? '#FF4FD8' : '#FFFFFF'
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          className="absolute w-96 h-96 rounded-full border-2 border-transparent mix-blend-screen"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[500px] h-[500px] border border-dashed border-white/5 rounded-full"
        />
      </div>

      <div className="relative flex flex-col items-center text-center max-w-2xl px-4 z-20">
        
        {/* Massive elegant central warping crystal geometry or particle container */}
        <div className="mb-12 relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={simulationPhase}
              initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 45, scale: 1, opacity: 1 }}
              exit={{ rotate: 185, scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{ boxShadow: `0 0 60px ${currentPhaseConfig.glowColor}` }}
              className="w-24 h-24 rounded-2xl border border-white/20 bg-black/50 backdrop-blur-3xl flex items-center justify-center"
            >
              {currentPhaseConfig.icon}
            </motion.div>
          </AnimatePresence>

          {/* Orbiting sub-atoms around the central node */}
          <div className="absolute w-36 h-36 border border-white/10 rounded-full animate-spin [animation-duration:6s]" />
          <div className="absolute w-44 h-44 border border-[#00E5FF]/5 rounded-full animate-spin [animation-duration:10s] [animation-direction:reverse]" />
        </div>

        {/* Dynamic high contrast Phase text reveal */}
        <div className="h-28 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={simulationPhase}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <h3 
                id="sim_phase_title" 
                className={`text-4xl md:text-5xl font-black tracking-tight uppercase ${
                  currentPhaseConfig.number === 1 ? 'text-[#00E5FF] text-glow-cyan' :
                  currentPhaseConfig.number === 2 ? 'text-[#8B5CF6] text-glow-purple' :
                  currentPhaseConfig.number === 3 ? 'text-[#FF4FD8] text-glow-pink' :
                  'text-white text-glow-white'
                }`}
              >
                {currentPhaseConfig.label}
              </h3>
              <p id="sim_phase_subtitle" className="text-[10px] font-mono tracking-[0.4em] text-neutral-400 uppercase mt-4 mb-2">
                {currentPhaseConfig.subLabel}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Linear Elegant Progress Level indicators */}
        <div className="w-80 flex gap-2 justify-center mt-6">
          {[1, 2, 3, 4].map((step) => {
            const isActive = step <= simulationPhase;
            return (
              <div 
                key={step} 
                className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={false}
                  animate={{ 
                    width: isActive ? '100%' : '0%',
                    backgroundColor: step === 1 ? '#00E5FF' : step === 2 ? '#8B5CF6' : step === 3 ? '#FF4FD8' : '#FFFFFF'
                  }}
                  transition={{ duration: 0.8 }}
                  className="h-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                />
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
