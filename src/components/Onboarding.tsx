import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuantumStore } from '../store';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react';

interface QuestionConfig {
  key: 'name' | 'passion' | 'goal' | 'dreamLife' | 'personality' | 'decision';
  label: string;
  placeholder: string;
  creativePrompt: string;
  example: string;
}

const QUESTIONS: QuestionConfig[] = [
  {
    key: 'name',
    label: 'What is your name?',
    placeholder: 'Enter your name...',
    creativePrompt: 'The name or designation by which you are known in this current reality.',
    example: 'Sarah Jenkins, Alex Rivera, or Dr. Emily Chen',
  },
  {
    key: 'passion',
    label: 'What is your main passion?',
    placeholder: 'A hobby, career, or interest...',
    creativePrompt: 'The core activity, design, or focus that brings you the most excitement.',
    example: 'Indie game design, baking pastries, space medicine, or acoustic guitar',
  },
  {
    key: 'goal',
    label: 'What is your biggest life goal?',
    placeholder: 'Your ultimate lifetime achievement...',
    creativePrompt: 'The pinnacle benchmark you want to reach or create in your lifetime.',
    example: 'Launch a self-funded software app, publish a sci-fi novel, or build an eco-friendly cabin',
  },
  {
    key: 'dreamLife',
    label: 'What is your dream life?',
    placeholder: 'Quiet nature, luxury city, space explorer...',
    creativePrompt: 'The ideal lifestyle or daily ecosystem where you would feel completely happy.',
    example: 'Living in a solar-powered loft in Tokyo, or having a cozy farmhouse with a huge garden',
  },
  {
    key: 'personality',
    label: 'How would you describe your personality?',
    placeholder: 'Logical, creative, quiet, bold, dreamer...',
    creativePrompt: 'Select a few words or attributes that accurately represent your mindset.',
    example: 'Calm and analytical but secretly dreaming big, or full of quick fiery ideas but quiet',
  },
  {
    key: 'decision',
    label: 'What is the biggest decision you have made or face?',
    placeholder: 'Changing jobs, taking a big risk, moving, speaking up...',
    creativePrompt: 'A key choice, turning point, or leap of faith that alters your timeline.',
    example: 'Choosing to leave my high-security day job to build my own business, or moving to Europe',
  },
];

export default function Onboarding() {
  const {
    userProfile,
    activeQuestionIndex,
    updateProfile,
    nextQuestion,
    prevQuestion,
    startSimulation,
    setStep,
  } = useQuantumStore();

  const currentQuestion = QUESTIONS[activeQuestionIndex];
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load current value from store when question shifts
  useEffect(() => {
    setInputValue(userProfile[currentQuestion.key] || '');
    setValidationError(null);
    // Autofocus input for premium seamless UI
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  }, [activeQuestionIndex, currentQuestion.key, userProfile]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setValidationError('This coordinate cannot remain empty.');
      return;
    }

    // Save in Zustand store
    updateProfile(currentQuestion.key, trimmed);

    if (activeQuestionIndex < QUESTIONS.length - 1) {
      nextQuestion();
    } else {
      // Trigger quantum universe split sequence!
      startSimulation();
    }
  };

  const handleBack = () => {
    if (activeQuestionIndex > 0) {
      prevQuestion();
    } else {
      setStep('landing');
    }
  };

  const progressPercentage = ((activeQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div id="onboarding_view" className="relative min-h-screen flex flex-col justify-between items-center text-white p-6 md:p-12 z-10 select-none">
      
      {/* Tiny elegant neon-gradient progress indicator bar */}
      <div id="progress_rail" className="fixed top-0 left-0 w-full h-[3px] bg-black/50 overflow-hidden z-50">
        <motion.div
          id="progress_indicator"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF4FD8] shadow-[0_0_12px_rgba(0,229,255,0.8)]"
        />
      </div>

      {/* Header Accent */}
      <div className="w-full max-w-5xl flex justify-between items-center mt-4 text-[#00E5FF] font-mono text-xs tracking-widest uppercase">
        <button 
          id="onboarding_back_nav"
          onClick={handleBack}
          className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronLeft size={14} /> BACK
        </button>
        <span id="quantum_mesh_status" className="opacity-50 font-mono text-center sm:text-right hidden sm:inline">
          QUANTUM NEURAL ALIGNMENT: STEP {activeQuestionIndex + 1} OF 6
        </span>
      </div>

      {/* Cinematic Onboarding Core Question */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-3xl px-4 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center text-center"
          >
            {/* Elegant category tag */}
            <span className="text-xs font-mono tracking-[0.4em] text-purple-400 uppercase mb-3 drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
              BRANCH METRIC {activeQuestionIndex + 1}
            </span>

            {/* Main high-contrast beautiful question label */}
            <h2 id="onboarding_question_label" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-200">
              {currentQuestion.label}
            </h2>

            {/* Mind-expanding sub description */}
            <p id="onboarding_question_subtext" className="text-sm md:text-base font-light text-neutral-400 max-w-xl mb-12 tracking-wide leading-relaxed">
              {currentQuestion.creativePrompt}
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-xl relative flex flex-col items-center">
              <div className="w-full relative group">
                <input
                  id={`onboarding_input_${currentQuestion.key}`}
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder={currentQuestion.placeholder}
                  className="w-full bg-neutral-900/40 border border-white/10 rounded-2xl px-6 py-5 text-lg md:text-xl font-light tracking-wide text-white placeholder-white/30 focus:outline-none focus:border-[#00E5FF]/60 focus:bg-neutral-900/60 transition-all duration-300 focus:shadow-[0_0_40px_rgba(0,229,255,0.15)] backdrop-blur-xl pr-14"
                  autoComplete="off"
                />
                
                {/* Micro submit arrow indicator inside the input field */}
                <button
                  id="submit_answer_inline_btn"
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/40 text-neutral-300 hover:text-white transition-all cursor-pointer group-hover:scale-105 active:scale-95"
                >
                  <Send size={18} className="text-[#00E5FF]" />
                </button>
              </div>

              {/* Dynamic easy visual helper guide example directly below input box */}
              <div className="w-full flex justify-start pl-3 mt-2 text-left">
                <span className="text-xs text-neutral-400 font-normal leading-relaxed opacity-85">
                  <span className="text-[#00E5FF] font-mono font-semibold mr-1.5 uppercase tracking-wider text-[10px]">E.g.</span>
                  {currentQuestion.example}
                </span>
              </div>

              {/* Graceful error display beneath the box to eliminate layout shifts */}
              <div className="h-6 mt-3">
                <AnimatePresence>
                  {validationError && (
                    <motion.p
                      id="onboarding_validation_msg"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-mono text-rose-400 tracking-wider"
                    >
                      {validationError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer controls: Elegant and spacious */}
      <div className="w-full max-w-xs flex flex-col items-center pb-8">
        <button
          id="transmit_coordinate_btn"
          onClick={() => handleSubmit()}
          className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/10 bg-transparent text-[#00E5FF] hover:text-white hover:bg-[#00E5FF]/10 text-xs font-mono tracking-[0.3em] uppercase w-full max-w-xs cursor-pointer hover:border-[#00E5FF]/40 transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.05)] hover:shadow-[0_0_40px_rgba(0,229,255,0.2)]"
        >
          {activeQuestionIndex === QUESTIONS.length - 1 ? 'INITIATE SIMULATION' : 'TRANSMIT COORDINATE'}
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
