import { useEffect, useRef } from 'react';
import { useQuantumStore } from '../store';

interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

interface NebulaParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simulationPhase = useQuantumStore((state) => state.simulationPhase);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Instantiate stars for the 3D starfield
    const starsNum = 160;
    const stars: Star[] = [];
    const colors = ['#00E5FF', '#8B5CF6', '#FF4FD8', '#FFFFFF', '#A78BFA'];

    for (let i = 0; i < starsNum; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 0.5,
      });
    }

    // Floating large dust/nebula particles
    const particlesNum = 20;
    const particles: NebulaParticle[] = [];
    for (let i = 0; i < particlesNum; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 80 + 40,
        alpha: Math.random() * 0.15 + 0.05,
        pulseSpeed: 0.005 + Math.random() * 0.01,
        color: colors[Math.floor(Math.random() * 3)], // cyan, purple, pink
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Main animation loop
    const render = () => {
      // Background gradient to deep black empty space
      ctx.fillStyle = 'rgba(4, 2, 8, 1)';
      ctx.fillRect(0, 0, width, height);

      // Determine warp speed multiplier depending on simulated timeline phasing
      let warpSpeed = 1.0;
      if (simulationPhase === 1) warpSpeed = 8.0;
      if (simulationPhase === 2) warpSpeed = 16.0;
      if (simulationPhase === 3) warpSpeed = 24.0;
      if (simulationPhase === 4) warpSpeed = 32.0;

      // Draw large volumetric nebula dust with radial gradients
      particles.forEach((p) => {
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.002;
        p.alpha = Math.max(0.01, Math.min(0.25, p.alpha));

        p.x += p.vx * (warpSpeed > 2 ? warpSpeed * 0.1 : 1);
        p.y += p.vy * (warpSpeed > 2 ? warpSpeed * 0.1 : 1);

        // Boundary wrap
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color + '26'); // transparent hex-glow
        grad.addColorStop(0.5, p.color + '0C');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3D Starfield travel / warp tunnel logic
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= warpSpeed * 1.5; // speed up star travel during warm tunnels

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - cx;
          star.y = Math.random() * height - cy;
        }

        // Project coordinate math to 2D
        const px = (star.x / star.z) * cx + cx;
        const py = (star.y / star.z) * cy + cy;

        // Tail lines for motion blur
        const tailLength = warpSpeed * 1.5;
        const prevPx = (star.x / (star.z + tailLength)) * cx + cx;
        const prevPy = (star.y / (star.z + tailLength)) * cy + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.strokeStyle = star.color;
          ctx.lineWidth = star.size * (warpSpeed > 2 ? 1.5 : 1);
          ctx.lineCap = 'round';
          ctx.moveTo(px, py);
          ctx.lineTo(prevPx, prevPy);
          ctx.stroke();

          // Subtle glow points inside active portal
          if (warpSpeed < 5) {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(px, py, star.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [simulationPhase]);

  return (
    <div id="quantum_canvas_container" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Absolute overlay ambient glowing dust fog gradients */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(11,2,22,0.1)_0%,rgba(4,2,8,0.95)_100%] mix-blend-screen pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black to-transparent opacity-90 pointer-events-none" />
    </div>
  );
}
