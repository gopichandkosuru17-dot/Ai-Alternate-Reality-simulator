import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuantumStore } from '../store';
import { Rocket, Orbit, Sparkles, Navigation, ShieldAlert, Cpu } from 'lucide-react';

const STARS_DATA = Array.from({ length: 85 }).map((_, i) => ({
  id: i,
  top: `${(i * 17.3) % 100}%`,
  left: `${(i * 27.7) % 100}%`,
  size: (i % 4 === 0) ? '3px' : (i % 4 === 1) ? '1.5px' : (i % 4 === 2) ? '2.5px' : '2px',
  color: (i % 5 === 0) ? '#00E5FF' : (i % 5 === 1) ? '#FF4FD8' : (i % 5 === 2) ? '#8B5CF6' : (i % 5 === 3) ? '#F59E0B' : '#FFFFFF',
  delay: `${(i * 0.18).toFixed(2)}s`,
  duration: i % 2 === 0 ? '4s' : '2.5s'
}));

const SHOOTING_STARS_DATA = [
  { id: 1, top: '12%', left: '8%', delay: '1.5s' },
  { id: 2, top: '44%', left: '38%', delay: '6.5s' },
  { id: 3, top: '68%', left: '22%', delay: '11.5s' },
  { id: 4, top: '30%', left: '75%', delay: '4s' },
  { id: 5, top: '85%', left: '60%', delay: '9s' }
];

export default function LandingPage() {
  const setStep = useQuantumStore((state) => state.setStep);
  const [isExpanding, setIsExpanding] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Normalized offset from -1 to 1, scaled for subtle offset movement distance (up to 15px/25px max offset)
    const x = ((clientX - w / 2) / (w / 2)) * 25;
    const y = ((clientY - h / 2) / (h / 2)) * 25;
    setMousePos({ x, y });
  };

  const handleEnter = () => {
    setIsExpanding(true);
    // Wait for portal expansion animation to complete before moving to onboarding
    setTimeout(() => {
      setStep('onboarding');
    }, 1200);
  };

  return (
    <div 
      id="landing_view" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between items-center text-white overflow-hidden p-6 md:p-12 select-none z-10 animate-fade-in"
    >
      
      {/* ADDITIONAL SPACE STUFF BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* PARALLAX LAYER - Rocket and UFO Silhouettes tracking cursor with slow spring offsets */}
        <motion.div
          animate={{
            x: mousePos.x * -1.2,
            y: mousePos.y * -1.2,
          }}
          transition={{ type: 'spring', damping: 45, stiffness: 45 }}
          className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden"
        >
          {/* Parallax Silhouette 1: Giant Retro UFO Silhouetted Mother-Disc following a huge orbit */}
          <motion.div
            animate={{
              x: ['5vw', '45vw', '85vw', '45vw', '5vw'],
              y: ['15vh', '65vh', '15vh', '20vh', '15vh'],
              rotate: [0, 90, 180, 270, 360],
              scale: [0.8, 1.1, 0.8, 0.9, 0.8],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute pointer-events-none flex flex-col items-center justify-center opacity-[0.14] text-[#8B5CF6]/50"
          >
            {/* UFO Outline/Silhouette */}
            <svg viewBox="0 0 100 100" className="w-[120px] h-[120px] filter drop-shadow-[0_0_12px_rgba(139,92,246,0.3)]">
              <ellipse cx="50" cy="40" rx="18" ry="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <ellipse cx="50" cy="50" rx="42" ry="10" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="20" cy="51" r="2" fill="currentColor" />
              <circle cx="35" cy="53" r="2" fill="currentColor" />
              <circle cx="50" cy="54" r="2" fill="currentColor" />
              <circle cx="65" cy="53" r="2" fill="currentColor" />
              <circle cx="80" cy="51" r="2" fill="currentColor" />
            </svg>
            <span className="text-[7px] font-mono tracking-widest mt-1 uppercase text-neutral-600">MOTHERBOARD_ANOMALY__</span>
          </motion.div>

          {/* Parallax Silhouette 2: Sleek Multi-thruster Rocket silhouette slicing downwards through sectors */}
          <motion.div
            animate={{
              x: ['95vw', '50vw', '5vw', '50vw', '95vw'],
              y: ['75vh', '40vh', '70vh', '30vh', '75vh'],
              rotate: [-135, -90, -45, 90, -135],
              scale: [1, 0.7, 1.1, 0.8, 1],
            }}
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute pointer-events-none flex flex-col items-center justify-center opacity-[0.12] text-[#00E5FF]/50"
          >
            {/* Elegant retro Rocket Outline/Silhouette with thruster rings */}
            <svg viewBox="0 0 100 100" className="w-[100px] h-[100px] filter drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
              <path d="M50,15 C54,30 55,55 55,75 L45,75 C45,55 46,30 50,15 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M45,60 L30,75 L45,70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M55,60 L70,75 L55,70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="35" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M47,78 L50,90 L53,78" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
            </svg>
            <span className="text-[7px] font-mono tracking-widest mt-1 uppercase text-neutral-600">SECTOR_RUNNER_XI__</span>
          </motion.div>

          {/* Parallax Silhouette 3: Spinning high-tech saucer probe orbiting in upper sectors */}
          <motion.div
            animate={{
              x: ['50vw', '10vw', '80vw', '50vw'],
              y: ['5vh', '25vh', '10vh', '5vh'],
              rotate: [360, 180, 0, -360],
              scale: [0.6, 0.9, 0.6, 0.6],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute pointer-events-none flex flex-col items-center justify-center opacity-[0.14] text-[#FF4FD8]/50"
          >
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(255,79,216,0.2)]">
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5,3" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-[6px] font-mono tracking-widest mt-1 uppercase text-neutral-600">AUX_PROBE__</span>
          </motion.div>
        </motion.div>

        {/* Futuristic Blueprint Coordinate Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
        
        {/* Massive atmospheric nebula glowing colors */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#00E5FF]/5 via-[#8B5CF6]/5 to-transparent blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#FF4FD8]/5 via-[#8B5CF6]/5 to-transparent blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '8s' }} />

        {/* Concentric telemetry orbit compass rings in the dead center */}
        <div className="absolute inset-x-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.015] rounded-full pointer-events-none flex items-center justify-center">
          <div className="w-[550px] h-[550px] border border-[#00E5FF]/5 rounded-full border-dashed animate-spin" style={{ animationDuration: '140s' }} />
          <div className="w-[350px] h-[350px] border border-[#FF4FD8]/5 rounded-full animate-spin" style={{ animationDuration: '80s' }} />
          <div className="w-[180px] h-[180px] border border-dashed border-[#8B5CF6]/10 rounded-full animate-pulse" />
        </div>

        {/* Constellation Nodes and connected vector lines */}
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none">
          {/* Constellation Group 1 (Left Field) */}
          <line x1="8%" y1="15%" x2="18%" y2="28%" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3,3" />
          <line x1="18%" y1="28%" x2="12%" y2="55%" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="1,2" />
          <line x1="12%" y1="55%" x2="28%" y2="65%" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.75" />
          
          {/* Constellation Group 2 (Right Field) */}
          <line x1="88%" y1="18%" x2="78%" y2="38%" stroke="#FF4FD8" strokeWidth="0.75" strokeDasharray="2,2" />
          <line x1="78%" y1="38%" x2="92%" y2="58%" stroke="#FF4FD8" strokeWidth="0.75" strokeDasharray="3,1" />

          {/* Constellation Group 3 (Central bottom field) */}
          <line x1="22%" y1="78%" x2="38%" y2="88%" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="4,4" />
          <line x1="38%" y1="88%" x2="50%" y2="85%" stroke="#00E5FF" strokeWidth="0.5" strokeDasharray="2,2" />
        </svg>

        {/* Side-margin telemetry stats lists (Enriches negative space gutters) */}
        <div className="absolute left-6 top-1/4 bottom-1/4 w-48 font-mono text-[8px] text-neutral-500 tracking-widest hidden xl:flex flex-col justify-between pointer-events-none opacity-50">
          <div className="space-y-4">
            <div>
              <span className="text-[#00E5FF] font-semibold flex items-center gap-1">📍 SYSTEM STATUS</span>
              <p className="text-neutral-600 mt-1">LOG: TSX_DEV_PROT</p>
              <p className="text-neutral-600">SECTOR CODES: GREEN // ACTIVE</p>
            </div>
            <div>
              <span className="text-[#8B5CF6] font-semibold flex items-center gap-1">🔄 MULTIVERSE STREAM</span>
              <p className="text-neutral-600 mt-1">DIVERGENCE: OBSERVED</p>
              <p className="text-neutral-600">ENTROPY: 4.881e-12</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[#FF4FD8] font-semibold flex items-center gap-1">📊 ACTIVE_TIMELINES</span>
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#FF4FD8]/40 to-transparent my-1" />
              <p className="text-neutral-600">T_01_PRIME: DIVERGING</p>
              <p className="text-neutral-600">T_02_CYAN: STABLE_FLUX</p>
              <p className="text-neutral-600">T_03_CHRON: EMBEDDED</p>
            </div>
          </div>
        </div>

        <div className="absolute right-6 top-1/4 bottom-1/4 w-48 font-mono text-[8px] text-neutral-500 tracking-widest hidden xl:flex flex-col justify-between items-end text-right pointer-events-none opacity-50">
          <div className="space-y-4">
            <div>
              <span className="text-neutral-400 font-semibold flex items-center gap-1 justify-end">📡 CALIBRATOR_FEED</span>
              <p className="text-neutral-600 mt-1">ORBITAL: SECURE_10G</p>
              <p className="text-neutral-600">SPEED_INDEX: 4.01e3/s</p>
            </div>
            <div>
              <span className="text-[#00E5FF] font-semibold flex items-center gap-1 justify-end">⚖️ RESONANCE COEFF</span>
              <p className="text-neutral-600 mt-1">GOLDEN_RATIO: 1.618</p>
              <p className="text-neutral-600">WAVE_RECONSTRUCTION: OK</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-[#00E5FF] font-bold animate-pulse flex items-center gap-1 justify-end">● LINK ACTIVE</span>
              <p className="text-neutral-600 mt-1">99.98% COHERENCE_RT</p>
              <p className="text-neutral-600">TEMPORAL LATENCY: 2ms</p>
            </div>
          </div>
        </div>
        
        {/* Twinkling Stars Overlays for instant high-contrast cosmic depth */}
        {STARS_DATA.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-twinkle opacity-50"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}

        {/* Shooting Stars across vectors */}
        {SHOOTING_STARS_DATA.map((s) => (
          <div
            key={s.id}
            className="absolute h-[1.5px] w-48 bg-gradient-to-r from-white via-[#00E5FF]/50 to-transparent animate-shooting-star"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
            }}
          />
        ))}

        {/* Continuous Traversing Rocket Ship A */}
        <motion.div
          initial={{ x: '-15%', y: '110%', rotate: 45 }}
          animate={{ x: '115%', y: '-15%' }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
            delay: 1
          }}
          className="absolute z-10 pointer-events-none"
        >
          <div className="relative flex items-center justify-center">
            {/* Engine glow flame light */}
            <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-tr from-amber-500 to-red-500 rounded-full blur-[2px] animate-pulse" />
            <div className="absolute top-5 right-5 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
            <Rocket className="w-8 h-8 text-[#00E5FF] drop-shadow-[0_0_12px_rgba(0,229,255,0.8)] transform rotate-45" />
          </div>
        </motion.div>

        {/* Dynamic Flying Rocket Ship B (Smaller, trailing lower path) */}
        <motion.div
          initial={{ x: '-20%', y: '50%', rotate: 20 }}
          animate={{ x: '120%', y: '10%' }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
            delay: 9
          }}
          className="absolute z-10 pointer-events-none opacity-80"
        >
          <div className="relative flex items-center justify-center">
            <Rocket className="w-6 h-6 text-[#FF4FD8] drop-shadow-[0_0_8px_rgba(255,79,216,0.6)] transform rotate-45" />
            <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full blur-[1px] animate-pulse" />
          </div>
        </motion.div>

        {/* Glowing Levitating UFO Saucer (Smooth Sine Wave Undulating Path) */}
        <motion.div
          initial={{ x: '115%', y: '30%' }}
          animate={{
            x: '-15%',
            y: ['25%', '35%', '20%', '30%', '25%']
          }}
          transition={{
            x: { duration: 25, repeat: Infinity, ease: 'linear', delay: 2 },
            y: { duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }
          }}
          className="absolute z-20 pointer-events-none"
        >
          <div className="relative flex flex-col items-center justify-center filter drop-shadow-[0_0_18px_rgba(139,92,246,0.7)]">
            {/* UFO central dome cockpit */}
            <div className="w-7 h-4 bg-gradient-to-t from-[#8B5CF6]/90 via-white/80 to-[#00E5FF]/40 rounded-t-full border border-white/30 relative z-30 flex items-center justify-center">
              <span className="w-1 h-1 bg-white animate-ping text-[2px]" />
            </div>
            {/* Saucer wide metallic body flange disc */}
            <div className="w-16 h-3.5 bg-neutral-900 rounded-full border border-[#00E5FF]/40 relative -mt-1.5 z-20 flex items-center justify-around px-2.5 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              {/* Blinking alien beacon node indicators */}
              <div className="w-1 h-1 rounded-full bg-[#00E5FF] animate-ping" />
              <div className="w-1 h-1 rounded-full bg-[#FF4FD8] animate-pulse delay-100" />
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-ping delay-200" />
              <div className="w-1 h-1 rounded-full bg-[#00E5FF] animate-pulse delay-300" />
            </div>
            {/* Glowing vertical engine core beam path */}
            <div className="w-8 h-10 bg-gradient-to-b from-[#00E5FF]/30 to-transparent blur-[2px] absolute top-5 z-10 rounded-b-full animate-pulse" />
          </div>
        </motion.div>

        {/* Orbiting space-station/mothership radar probe */}
        <motion.div
          initial={{ x: '-15%', y: '15%' }}
          animate={{
            x: '115%',
            y: ['12%', '18%', '10%', '15%']
          }}
          transition={{
            x: { duration: 32, repeat: Infinity, ease: 'linear', delay: 5 },
            y: { duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 5 }
          }}
          className="absolute z-10 pointer-events-none opacity-50 scale-75"
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute"
            >
              <Orbit className="w-11 h-11 text-[#00E5FF]" />
            </motion.div>
            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#00E5FF] border border-[#00E5FF]/50 relative" />
          </div>
        </motion.div>

      </div>

      {/* Hero Content Block with beautiful interactive orbital ring animations */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl px-4 relative mt-12 md:mt-20 z-20">
        
        {/* Deep Ambient Plasma Glow in Background */}
        <div className="absolute w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-radial from-[#8B5CF6]/10 via-[#00E5FF]/5 to-transparent blur-3xl pointer-events-none -z-10 animate-pulse" />

        {/* Elegant Geometric Vector Orbits to impress viewers */}
        <div className="absolute -z-10 flex items-center justify-center opacity-60">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-white/5 border-dashed"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 md:w-[480px] md:h-[480px] rounded-full border border-[#00E5FF]/10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]" />
          </motion.div>
          <motion.div 
            animate={{ rotate: 180 }}
            className="absolute w-96 h-96 md:w-[600px] md:h-[600px] rounded-full border border-[#FF4FD8]/5"
          >
            <div className="absolute bottom-10 right-1/4 w-1.5 h-1.5 rounded-full bg-[#FF4FD8] shadow-[0_0_10px_#FF4FD8]" />
          </motion.div>
        </div>

        {/* Massive elegant typography reveal matching design principle */}
        <h1 
          id="hero_heading"
          className="text-6xl md:text-8xl lg:text-[9.5rem] font-black tracking-tighter font-sans leading-[0.85] flex flex-col items-center select-none"
        >
          <motion.span
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-glow-white tracking-widest uppercase mb-1"
          >
            AI
          </motion.span>
          
          {/* Main attractive animated alternate heading with colored cyber glow and holographic sweep line shimmer */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-2 font-black tracking-[-0.04em] filter hover:scale-105 transition-transform duration-500 cursor-pointer holo-text select-none text-glow-cyan overflow-hidden"
          >
            ALTERNATE
            {/* Holographic shimmer beam sweeping across */}
            <span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
              style={{
                animation: 'holographicSweepLine 3s infinite ease-in-out',
                mixBlendMode: 'overlay',
                width: '60%'
              }}
            />
          </motion.span>
          
          {/* Visually balanced REALITY: slightly smaller & more elegant so it doesn't compete with ALTERNATE */}
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-3xl md:text-5xl lg:text-5xl tracking-[0.25em] font-light text-glow-white uppercase mt-4 block"
          >
            REALITY
          </motion.span>
        </h1>

        <motion.p
          id="hero_subtitle"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 0.7, letterSpacing: '0.3em' }}
          transition={{ duration: 1.8, delay: 0.9 }}
          className="mt-10 text-xs md:text-sm font-mono text-neutral-400 uppercase max-w-md leading-relaxed tracking-[0.3em]"
        >
          Discover your diverging timelines inside the multiverse.
        </motion.p>
      </div>

      {/* Button expands into portal segment - positioned with extra comfort margins with high z-index prioritisation */}
      <div className="relative z-50 pointer-events-auto pb-28 md:pb-36 flex flex-col items-center justify-center">
        <AnimatePresence>
          {!isExpanding ? (
            <div className="flex flex-col items-center gap-4 relative z-50 pointer-events-auto mt-20 md:mt-28">
              
              {/* Swirling micro space sparks floating up behind and around the button */}
              <div className="absolute -inset-x-12 -inset-y-20 pointer-events-none z-0 overflow-visible">
                {Array.from({ length: 14 }).map((_, idx) => {
                  const delay = (idx * 0.22).toFixed(2);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ y: 0, x: (idx - 6.5) * 18, opacity: 0, scale: 0.4 }}
                      animate={{
                        y: [-20, -70, -120],
                        x: [
                          (idx - 6.5) * 18,
                          (idx - 6.5) * 18 + (idx % 2 === 0 ? 15 : -15),
                          (idx - 6.5) * 18 + (idx % 2 === 0 ? 30 : -30)
                        ],
                        opacity: [0, 1, 0],
                        scale: [0.4, 0.9, 0.3]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: parseFloat(delay),
                        ease: "easeOut"
                      }}
                      style={{
                        backgroundColor: idx % 3 === 0 ? '#00E5FF' : idx % 3 === 1 ? '#FF4FD8' : '#8B5CF6',
                        boxShadow: `0 0 10px ${idx % 3 === 0 ? '#00E5FF' : idx % 3 === 1 ? '#FF4FD8' : '#8B5CF6'}`
                      }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    />
                  );
                })}
              </div>

              {/* Glowing physical sweep border wrapper (Conic sweep gradient) */}
              <div className="relative p-[1.5px] rounded-full overflow-hidden animate-border-sweep bg-transparent shadow-[0_0_40px_rgba(0,229,255,0.25)] hover:shadow-[0_0_65px_rgba(0,229,255,0.65)] transition-shadow duration-500 z-10">
                <motion.button
                  id="enter_portal_btn"
                  onClick={handleEnter}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative z-10 px-16 py-6 rounded-full bg-neutral-950/95 text-white text-xs md:text-sm font-semibold tracking-[0.45em] uppercase cursor-pointer backdrop-blur-2xl transition-all duration-300 group flex items-center justify-center gap-1"
                >
                  {/* Glowing inner core gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 via-[#8B5CF6]/15 to-[#FF4FD8]/15 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative z-10 text-white flex items-center gap-2 group-hover:text-glow-cyan transition-all duration-300">
                    <Sparkles className="w-4 h-4 text-[#00E5FF] animate-pulse" />
                    ENTER THE PORTAL
                    <Sparkles className="w-4 h-4 text-[#FF4FD8] animate-pulse" />
                  </span>
                </motion.button>
              </div>


            </div>
          ) : (
            // The Portal itself scaling up to fully occupy the browser viewport
            <motion.div
              id="expanding_portal"
              layoutId="portal-ring"
              initial={{ width: 64, height: 64, opacity: 0 }}
              animate={{ 
                width: window.innerWidth * 2, 
                height: window.innerWidth * 2, 
                opacity: 1,
                borderWidth: '12px'
              }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute pointer-events-none rounded-full border border-[#00E5FF] shadow-[0_0_120px_rgba(0,229,255,0.8),_inset_0_0_100px_rgba(139,92,246,0.6)] mix-blend-screen bg-transparent flex items-center justify-center"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.0 }}
                className="text-white text-base font-mono tracking-[0.2em] uppercase absolute"
              >
                DIVERTING CONSCIOUSNESS
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
