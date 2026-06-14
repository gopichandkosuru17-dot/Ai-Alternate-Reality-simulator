import { motion } from 'motion/react';
import { TimelinePoint } from '../types';
import { Milestone, Flag, AlertTriangle } from 'lucide-react';

interface QuantumTimelineProps {
  timeline: TimelinePoint[];
}

export default function QuantumTimeline({ timeline }: QuantumTimelineProps) {
  return (
    <div id="quantum_timeline" className="w-full max-w-5xl py-8 px-4 flex flex-col items-center">
      
      {/* Title block */}
      <div className="text-center mb-12">
        <span className="text-[10px] font-mono tracking-[0.4em] text-[#00E5FF] uppercase">
          TEMPORAL MILESTONE MAP
        </span>
        <h4 className="text-2xl font-extrabold tracking-tight text-white mt-1 uppercase">
          Your Future Trajectory
        </h4>
      </div>

      {/* Futuristic Timeline Layout */}
      <div id="timeline_grid" className="relative flex flex-col md:flex-row items-stretch justify-center w-full gap-8 md:gap-4">
        
        {/* Horizontal Connector Line for Desktop */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block -translate-y-1/2" />

        {/* Vertical Connector Line for Mobile */}
        <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:hidden" />

        {timeline.map((point, index) => {
          // Color based on milestone critical impact scale
          const isCritical = point.impactScale === 'critical';
          const isMajor = point.impactScale === 'major';
          const nodeColor = isCritical 
            ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] bg-rose-950/40 text-rose-400' 
            : isMajor 
            ? 'border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)] bg-purple-950/40 text-purple-400' 
            : 'border-cyan-500 shadow-[0_0_15px_rgba(0,229,255,0.4)] bg-cyan-950/40 text-cyan-400';

          return (
            <motion.div
              id={`timeline_node_${index}`}
              key={point.age}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative flex-1 bg-neutral-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between hover:border-white/15 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] transition-all duration-300 md:min-h-[220px] ml-12 md:ml-0 group"
            >
              
              {/* Timeline bubble node anchor */}
              <div 
                className={`absolute left-[-48px] md:left-1/2 md:top-[-20px] md:-translate-x-1/2 w-10 h-10 rounded-full border-2 ${nodeColor} flex items-center justify-center text-xs font-mono font-bold z-10 bg-black transition-transform duration-300 group-hover:scale-110`}
              >
                {point.age}
              </div>

              {/* Content text */}
              <div className="flex flex-col flex-1">
                {/* Year tag & Impact level */}
                <div className="flex justify-between items-center gap-2 mb-3">
                  <span className="text-xs font-mono tracking-widest text-[#00E5FF]">
                    YEAR {point.year}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                    {point.impactScale} SPLIT
                  </span>
                </div>

                {/* Event Name */}
                <h5 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#00E5FF] transition-colors">
                  {point.title}
                </h5>

                {/* Event Detail */}
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {point.description}
                </p>
              </div>

            </motion.div>
          );
        })}

      </div>
    </div>
  );
}
