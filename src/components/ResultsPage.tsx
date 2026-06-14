import { motion, AnimatePresence } from 'motion/react';
import { useQuantumStore } from '../store';
import QuantumTimeline from './QuantumTimeline';
import SolarSystemBackdrop from './SolarSystemBackdrop';
import { ChevronLeft, RefreshCw, Sparkles, Orbit, Compass } from 'lucide-react';

export default function ResultsPage() {
  const { realities, activeRealityId, setActiveRealityId, resetSimulation, userProfile } = useQuantumStore();

  const handlePortalClick = (id: string) => {
    setActiveRealityId(id);
  };

  const handleBackToPortals = () => {
    setActiveRealityId(null);
  };

  const activeReality = realities.find((r) => r.id === activeRealityId);

  // Layout color palette according to item id indexes
  const getColors = (id: string) => {
    if (id === 'reality_1') return { name: 'Cyanshift', main: '#00E5FF', glow: 'rgba(0, 229, 255, 0.45)', radial: 'from-[#00E5FF]/10' };
    if (id === 'reality_2') return { name: 'Purpleshift', main: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.45)', radial: 'from-[#8B5CF6]/10' };
    return { name: 'Pinkshift', main: '#FF4FD8', glow: 'rgba(255, 79, 216, 0.45)', radial: 'from-[#FF4FD8]/10' };
  };

  return (
    <div id="results_view" className="relative min-h-screen flex flex-col justify-between items-center text-white p-6 md:p-12 z-10 select-none overflow-hidden">
      
      {/* Immersive animated solar system telemetry projection in the background */}
      <SolarSystemBackdrop />
      
      {/* Dynamic Header Block */}
      <div className="w-full max-w-6xl flex justify-between items-center mt-4 relative z-20">
        {activeRealityId ? (
          <button
            id="back_to_portals_nav"
            onClick={handleBackToPortals}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} className="text-[#00E5FF]" /> BACK TO TIMELINES
          </button>
        ) : (
          <span className="text-xs font-mono tracking-[0.3em] text-[#00E5FF] uppercase">
            EXPLORER DESIGNATION: {userProfile.name || 'TRAVELER'}
          </span>
        )}

        <button
          id="collapse_matrix_btn"
          onClick={resetSimulation}
          className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF4FD8] hover:text-white uppercase transition-colors cursor-pointer bg-transparent border border-[#FF4FD8]/20 hover:border-[#FF4FD8] px-4 py-2 rounded-xl"
        >
          <RefreshCw size={12} className="animate-spin [animation-duration:12s]" /> RESTART MATRIX
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!activeRealityId ? (
          // MAIN STATE: Grid of 3 FLOATING PORTALS (Floating sphere items)
          <motion.div
            key="portal_grid_list"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center items-center w-full max-w-6xl py-12"
          >
            {/* Minimalist instructions header */}
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-[0.5em] text-purple-400 uppercase">
                COORDINATES LOCKED // SPLIT DETECTED
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3 uppercase leading-none">
                Choose a Destiny Horizon
              </h2>
              <p className="text-xs text-neutral-500 font-mono uppercase mt-4 tracking-widest">
                Hover to focus. Click to enter the stream.
              </p>
            </div>

            {/* Float Space Container for the 3 portals */}
            <div id="portals_container" className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full px-4 items-center">
              {realities.map((reality, idx) => {
                const colors = getColors(reality.id);
                return (
                  <motion.div
                    id={`destiny_portal_${reality.id}`}
                    key={reality.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -12, scale: 1.03 }}
                    onClick={() => handlePortalClick(reality.id)}
                    className="relative flex flex-col items-center p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-3xl cursor-pointer hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(255,255,255,0.02)] group overflow-hidden"
                  >
                    {/* Glowing radial beam backdrop */}
                    <div className={`absolute inset-0 bg-radial-to-b ${colors.radial} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    {/* Floating Portal Sphere Design Element */}
                    <div className="w-40 h-40 rounded-full relative flex items-center justify-center mb-8 border border-white/10 p-0.5 group-hover:border-white/35 transition-all duration-500">
                      
                      {/* Orbital ring path */}
                      <div className="absolute inset-2 border border-dashed border-white/5 rounded-full animate-spin [animation-duration:15s]" />

                      {/* Moving outer glow ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10 + idx * 2, repeat: Infinity, ease: 'linear' }}
                        style={{ borderTopColor: colors.main, borderRightColor: colors.main }}
                        className="absolute inset-0 rounded-full border border-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Sphere core */}
                      <div 
                        style={{ boxShadow: `inset 0 0 40px ${colors.glow}, 0 0 30px ${colors.glow}30` }}
                        className="w-32 h-32 rounded-full bg-gradient-to-tr from-black via-neutral-950 to-neutral-900 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
                      >
                        {/* Probability large readout inside sphere */}
                        <span className="text-3xl font-black tracking-tight text-white flex items-baseline select-none">
                          {reality.probability}
                          <span className="text-xs font-light text-neutral-400">%</span>
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-[#00E5FF] uppercase mt-1">
                          PROBABILITY
                        </span>

                        {/* Cosmic shine strip */}
                        <div className="absolute top-0 left-[-40px] w-6 h-40 bg-white/5 rotate-45 skew-x-12 translate-x-[-40px] group-hover:animate-[shine_1.8s_ease-out_infinite]" />
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="text-center relative z-10 w-full flex flex-col items-center">
                      <span className="text-[10px] font-mono tracking-[0.3em] uppercase py-1 px-3 border border-white/5 rounded-full bg-white/5 mb-3 text-neutral-400 group-hover:text-white transition-colors">
                        {reality.occupation.split('&')[0].trim()}
                      </span>

                      <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-[#00E5FF] transition-colors leading-tight">
                        {reality.title}
                      </h3>

                      <p className="text-xs text-neutral-400 font-light tracking-wide line-clamp-2 max-w-xs leading-relaxed min-h-[36px]">
                        {reality.description}
                      </p>

                      <div className="mt-6 flex gap-6 items-center border-t border-white/5 pt-4 w-full justify-center text-[10px] font-mono text-neutral-500">
                        <span>AGE {reality.age}</span>
                        <span className="h-2 w-[1px] bg-white/10" />
                        <span className="uppercase text-neutral-400">{reality.mood.split('&')[0].trim()}</span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          // DETAILED STATE: 3D Timeline & Neural chatbot loaded for selected Portal
          <motion.div
            key="detailed_portal_scope"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-center w-full max-w-6xl py-8 gap-12"
          >
            {/* Expanded Portal Summary Hero Dashboard */}
            <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 border-b border-white/5 pb-8">
              
              {/* Circular Portal Lens on left */}
              <div className="relative shrink-0">
                <div 
                  style={{ boxShadow: `0 0 50px ${getColors(activeReality.id).glow}` }}
                  className="w-36 h-36 rounded-full border border-white/10 bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                  <span className="text-4xl font-extrabold text-white flex items-baseline">
                    {activeReality.probability}
                    <span className="text-sm font-light text-neutral-400">%</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#00E5FF] uppercase mt-1">
                    STABILITY INDEX
                  </span>
                </div>
                <div className="absolute inset-[-4px] border border-dashed border-[#00E5FF]/20 rounded-full animate-spin [animation-duration:16s]" />
              </div>

              {/* Big Text details on right */}
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-wrap gap-3 justify-center md:justify-start items-center mb-3">
                  <span className="text-xs font-mono tracking-widest text-[#00E5FF]">
                    TIMELINE BRANCH IDENTIFIED
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span className="text-xs font-mono tracking-widest text-[#FF4FD8] uppercase">
                    AGE {activeReality.age} OCCUPATION
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none mb-4">
                  {activeReality.title}
                </h2>

                <p className="text-sm text-neutral-300 font-light tracking-wide max-w-3xl leading-relaxed">
                  {activeReality.story}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 justify-center md:justify-start text-xs font-mono text-neutral-400">
                  <span>OCCUPATION: <span className="text-white font-bold">{activeReality.occupation}</span></span>
                  <span>TEMPORAL MOOD: <span className="text-purple-400 font-bold">{activeReality.mood}</span></span>
                </div>
              </div>
            </div>

            {/* Section 1: The 3D Timeline milestones */}
            <QuantumTimeline timeline={activeReality.timeline} />

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
