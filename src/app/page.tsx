'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AnimatedDragonCurve } from '@/components/AnimatedDragonCurve';
import { CURVE_COLORS, COMPLEXITY_LABELS, generateInstructions } from '@/lib/dragonCurve';

export default function Home() {
  const [selectedCurve, setSelectedCurve] = useState<number | null>(null);
  const [animateAll, setAnimateAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Stagger animations on load
    const timeout = setTimeout(() => setAnimateAll(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse text-white/30 font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,107,107,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,107,107,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#ff6b6b] rounded-full blur-[200px] opacity-10 animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#4d96ff] rounded-full blur-[180px] opacity-10" />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-[#00ff88] rounded-full blur-[160px] opacity-10" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] via-[#ffd93d] to-[#00ff88]">
                  Dragon Curves
                </span>
              </h1>
              <span className="text-xs font-mono text-white/30 hidden sm:inline">
                ON-CHAIN L-SYSTEM FRACTALS
              </span>
            </div>
            <ConnectButton 
              showBalance={false}
              chainStatus="icon"
            />
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="block text-white/90">Mathematical</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#ff00ff]">
                Beauty
              </span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8 font-light">
              Fully on-chain generative fractals using the Dragon Curve L-system. 
              12 unique iterations. Each one doubles in complexity.
            </p>
            
            {/* L-System Rules Display */}
            <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Axiom</div>
                <div className="font-mono text-[#ffd93d]">F</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Rules</div>
                <div className="font-mono text-sm">
                  <span className="text-[#ff6b6b]">F</span>
                  <span className="text-white/40"> → </span>
                  <span className="text-[#ff6b6b]">F</span>
                  <span className="text-[#6bcb77]">+</span>
                  <span className="text-[#4d96ff]">G</span>
                  <span className="text-white/20 mx-2">|</span>
                  <span className="text-[#4d96ff]">G</span>
                  <span className="text-white/40"> → </span>
                  <span className="text-[#ff6b6b]">F</span>
                  <span className="text-[#9b59b6]">-</span>
                  <span className="text-[#4d96ff]">G</span>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Turns</div>
                <div className="font-mono text-xs">
                  <span className="text-[#6bcb77]">+</span>
                  <span className="text-white/30"> = 90° left</span>
                  <br />
                  <span className="text-[#9b59b6]">-</span>
                  <span className="text-white/30"> = 90° right</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((iteration, index) => (
                <div
                  key={iteration}
                  className="aspect-square rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  onClick={() => setSelectedCurve(iteration)}
                >
                  <AnimatedDragonCurve
                    iteration={iteration}
                    animate={animateAll}
                    showStats={true}
                    size={300}
                    onClick={() => setSelectedCurve(iteration)}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="px-6 pb-20 border-t border-white/5 pt-20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">
              About the Dragon Curve
            </h3>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-white/60 leading-relaxed text-center">
                The Dragon Curve is a space-filling fractal discovered by NASA physicist 
                John Heighway in the 1960s. It&apos;s generated using an L-system 
                (Lindenmayer system) — a parallel rewriting system that creates 
                complex patterns from simple rules.
              </p>
              <div className="grid grid-cols-3 gap-8 mt-12 text-center">
                <div>
                  <div className="text-4xl font-bold text-[#ff6b6b] mb-2">12</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">Unique Tokens</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#ffd93d] mb-2">4,096</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">Max Segments</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#00ff88] mb-2">100%</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">On-Chain</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <span>Built by</span>
              <a 
                href="https://x.com/Dragon_Bot_Z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#ff6b6b] hover:text-[#ff8e53] transition-colors"
              >
                @Dragon_Bot_Z
              </a>
              <span>🐉</span>
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/dragon-bot-z/dragon-curves" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://basescan.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Contract
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal for selected curve */}
      {selectedCurve !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          onClick={() => setSelectedCurve(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCurve(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              {/* Curve display */}
              <div className="flex justify-center mb-8">
                <AnimatedDragonCurve
                  iteration={selectedCurve}
                  animate={true}
                  showStats={false}
                  size={400}
                />
              </div>

              {/* Info */}
              <div className="text-center mb-8">
                <h4 className="text-3xl font-bold mb-2">
                  Dragon Curve #{selectedCurve}
                </h4>
                <p className="text-white/50">
                  {COMPLEXITY_LABELS[selectedCurve - 1]} • {Math.pow(2, selectedCurve).toLocaleString()} segments
                </p>
              </div>

              {/* Mint button */}
              <button
                className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${CURVE_COLORS[selectedCurve - 1]}, ${CURVE_COLORS[Math.min(selectedCurve, 11)]})`
                }}
              >
                Mint Dragon Curve #{selectedCurve}
              </button>

              {/* L-System preview */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                  L-System Instructions (First 100 chars)
                </div>
                <div className="font-mono text-xs text-white/50 break-all">
                  {generateInstructions(selectedCurve).slice(0, 100)}
                  {generateInstructions(selectedCurve).length > 100 && '...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
