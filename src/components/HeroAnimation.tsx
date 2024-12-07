import { useEffect, useRef } from "react";
import { ArrowDownToLine } from "lucide-react";

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particles = Array.from({ length: 100 }, (_, i) => {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 rounded-full bg-purple-500/60 animate-particle";

      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random transform variables
      particle.style.setProperty("--tx", `${(Math.random() - 0.5) * 100}px`);
      particle.style.setProperty("--ty", `${(Math.random() - 0.5) * 100}px`);
      particle.style.setProperty("--r", `${Math.random() * 360}deg`);

      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 2}s`;

      return particle;
    });

    particles.forEach((particle) => container.appendChild(particle));

    return () => {
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Particle container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Central download arrow visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse-glow" />

          {/* Download arrow container */}
          <div className="relative bg-black/80 p-8 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <ArrowDownToLine className="w-16 h-16 text-purple-400 animate-pulse-glow" />
          </div>
        </div>
      </div>

      {/* Floating archived tweets - positioned in a perfect circle */}
      {[...Array(10)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 10;
        const radius = 200;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={i}
            className="absolute animate-float opacity-80"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%) scale(0.6)",
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <div className="bg-zinc-800/60 backdrop-blur-sm rounded-lg p-2 border border-purple-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500/60 to-pink-500/20" />
                <div className="space-y-1">
                  <div className="w-16 h-1.5 bg-purple-500/20 rounded" />
                  <div className="w-12 h-1.5 bg-purple-500/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
