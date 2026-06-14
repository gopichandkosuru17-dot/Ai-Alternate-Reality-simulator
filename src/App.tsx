import { Component, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuantumStore } from './store';
import ParticleBackground from './components/ParticleBackground';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import SimulationView from './components/SimulationView';
import ResultsPage from './components/ResultsPage';

// Self-Healing Error Boundary wrapper to satisfy "never crash - error boundary"
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

class QuantumErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Quantum critical error caught by shield:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-black flex flex-col justify-center items-center text-white p-6 text-center select-none z-50">
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(244,63,94,0.1)_0%,rgba(0,0,0,1)_100%] pointer-events-none" />
          <div className="relative max-w-lg flex flex-col items-center">
            {/* Visual warning */}
            <div className="w-16 h-16 rounded-full border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.3)] mb-6">
              <span className="text-xl font-bold font-mono">!</span>
            </div>
            <span className="text-[10px] font-mono tracking-[0.4em] text-rose-500 uppercase mb-2">
              REALITY RECTIFICATION SHIELD ACTIVE
            </span>
            <h1 className="text-2xl font-bold tracking-tight mb-4 uppercase">Timeline Entanglement Blocked</h1>
            <p className="text-xs text-neutral-400 font-light max-w-xs leading-relaxed mb-8">
              A slight mathematical misalignment occurred in the stream calculations ({this.state.errorMsg}). The temporal buffer was deployed safely.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-8 py-3.5 rounded-xl border border-rose-500/20 bg-rose-950/10 hover:bg-rose-950/30 text-rose-400 text-xs font-mono tracking-widest uppercase transition-all cursor-pointer"
            >
              Rectify Entanglement
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default function App() {
  const currentStep = useQuantumStore((state) => state.currentStep);

  const renderActiveStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage />;
      case 'onboarding':
        return <Onboarding />;
      case 'simulation':
        return <SimulationView />;
      case 'results':
        return <ResultsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <QuantumErrorBoundary>
      <div className="relative min-h-screen bg-[#040208] text-white selection:bg-[#00E5FF]/20 selection:text-white font-sans antialiased overflow-x-hidden">
        
        {/* Glowing space atmosphere backing */}
        <ParticleBackground />

        {/* Cinematic Step Transition orchestrations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative min-h-screen w-full z-10"
          >
            {renderActiveStep()}
          </motion.div>
        </AnimatePresence>

      </div>
    </QuantumErrorBoundary>
  );
}
