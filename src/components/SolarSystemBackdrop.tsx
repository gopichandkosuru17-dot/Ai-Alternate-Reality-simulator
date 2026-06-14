import { motion } from 'motion/react';

interface PlanetConfig {
  name: string;
  distance: number;
  size: number;
  color: string;
  speed: number; // Duration of full year in seconds
  angleOffset: number;
  glow: string;
  hasRings?: boolean;
}

const PLANETS: PlanetConfig[] = [
  {
    name: "CYANUS",
    distance: 90,
    size: 10,
    color: "#00E5FF",
    speed: 15,
    angleOffset: 45,
    glow: "rgba(0, 229, 255, 0.4)",
  },
  {
    name: "AETHRA",
    distance: 140,
    size: 14,
    color: "#8B5CF6",
    speed: 25,
    angleOffset: 120,
    glow: "rgba(139, 92, 246, 0.4)",
    hasRings: true,
  },
  {
    name: "SOLARIA",
    distance: 195,
    size: 12,
    color: "#FF4FD8",
    speed: 35,
    angleOffset: 280,
    glow: "rgba(255, 79, 216, 0.4)",
  },
  {
    name: "CHRONOS Prime",
    distance: 260,
    size: 18,
    color: "#6EE7B7",
    speed: 55,
    angleOffset: 15,
    glow: "rgba(110, 231, 183, 0.3)",
    hasRings: true,
  }
];

export default function SolarSystemBackdrop() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-45 select-none">
      
      {/* Absolute center container containing the entire scale-adjusted vector system */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center scale-75 md:scale-100 transition-transform duration-500">
        
        {/* Radar-like faint crosshair grids */}
        <div className="absolute w-[500px] h-[1px] bg-white/[0.03]" />
        <div className="absolute h-[500px] w-[1px] bg-white/[0.03]" />
        
        {/* Nested concentric compass grids */}
        <div className="absolute w-[440px] h-[440px] border border-white/[0.02] rounded-full" />
        <div className="absolute w-[280px] h-[280px] border border-white/[0.02] rounded-full" />
        
        {/* Subtle geometric rotational tick markers */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] border border-[#00E5FF]/5 border-dashed rounded-full flex justify-between items-center text-[7px] font-mono text-[#00E5FF]/20 p-2"
        >
          <span>ASCENSION-X</span>
          <span>DEC-Y</span>
        </motion.div>

        {/* Central Star (The Matrix Nexus Core) with infinite heartbeat breath */}
        <div className="absolute relative flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.9, 0.6],
              boxShadow: [
                "0 0 35px rgba(255, 255, 255, 0.15)",
                "0 0 55px rgba(0, 229, 255, 0.35)",
                "0 0 35px rgba(255, 255, 255, 0.15)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#00E5FF]/40"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 via-[#8B5CF6] to-white opacity-90 blur-xs" />
          </motion.div>
          
          {/* Faint rotating solar flares */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-16 h-16 border border-white/5 border-double rounded-full"
          />
        </div>

        {/* Planetary orbits rendering */}
        {PLANETS.map((planet) => {
          return (
            <div key={planet.name} className="absolute inset-0 flex items-center justify-center">
              
              {/* Circular orbital path track */}
              <div 
                style={{ width: `${planet.distance * 2}px`, height: `${planet.distance * 2}px` }}
                className="absolute border border-white/[0.06] rounded-full pointer-events-none"
              />
              
              {/* Dynamic rotating orbits */}
              <motion.div
                initial={{ rotate: planet.angleOffset }}
                animate={{ rotate: planet.angleOffset + 360 }}
                transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
                style={{ width: `${planet.distance * 2}px`, height: `${planet.distance * 2}px` }}
                className="absolute flex items-center justify-end"
              >
                {/* Orbital planet node */}
                <div className="relative flex items-center justify-center translate-x-1/2">
                  
                  {/* Planet body */}
                  <div
                    style={{
                      width: `${planet.size}px`,
                      height: `${planet.size}px`,
                      backgroundColor: planet.color,
                      boxShadow: `0 0 25px ${planet.glow}`
                    }}
                    className="rounded-full relative z-10 border border-white/20 transition-all duration-300"
                  >
                    {/* Shadow crescent of the planet */}
                    <div className="absolute inset-0 rounded-full bg-black/40 skew-x-3" />
                  </div>

                  {/* Secondary Orbiting Satellite (Moon) of Mars/Aethra/Chronos */}
                  {planet.size > 11 && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                      className="absolute w-7 h-7 flex items-center justify-end"
                    >
                      <div className="w-2 h-2 rounded-full bg-slate-300 shadow-[0_0_4px_white] mr-[-4px]" />
                    </motion.div>
                  )}

                  {/* Retro-futuristic planet naming label (fades in slightly) */}
                  <span className="absolute left-6 text-[8px] font-mono tracking-widest text-neutral-400 opacity-60 uppercase font-medium whitespace-nowrap hidden md:inline">
                    {planet.name}
                    <span className="text-[6px] text-neutral-600 block">
                      T_V: {(100 / planet.speed).toFixed(2)}m/s
                    </span>
                  </span>

                  {/* Ring System overlay (if present) */}
                  {planet.hasRings && (
                    <div 
                      style={{ 
                        width: `${planet.size * 2.2}px`, 
                        height: `${planet.size * 0.4}px`,
                        borderColor: planet.color,
                        boxShadow: `0 0 10px ${planet.glow}`
                      }}
                      className="absolute border border-white/20 rounded-full rotate-[15deg] pointer-events-none z-0 opacity-70"
                    />
                  )}
                  
                  {/* Planetary trail line */}
                  <div className="absolute right-0 h-[1px] w-20 bg-gradient-to-l from-transparent via-[#00E5FF]/10 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          );
        })}

        {/* Ambient background telemetry ticks */}
        <div className="absolute top-12 left-12 text-[7px] font-mono text-neutral-600 tracking-wider text-left hidden md:block leading-relaxed">
          SYS_MODEL: ORBITAL_HEURISTICS_v2.4<br />
          PLANETARY_VECTOR: STABLE<br />
          COORDINATS: [0.032, 1.843, -9.102]
        </div>

        <div className="absolute bottom-12 right-12 text-[7px] font-mono text-neutral-600 tracking-wider text-right hidden md:block leading-relaxed">
          GRAV_STABILIZATION: 1.000G<br />
          ECLIPTIC_TILT: 23.44°<br />
          ENTROPY_INDEX: 4.881e-12
        </div>

      </div>

    </div>
  );
}
