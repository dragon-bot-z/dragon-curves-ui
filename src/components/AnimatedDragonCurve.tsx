'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { generateDragonCurve, CURVE_COLORS, COMPLEXITY_LABELS } from '@/lib/dragonCurve';

interface AnimatedDragonCurveProps {
  iteration: number;
  animate?: boolean;
  showStats?: boolean;
  size?: number;
  onClick?: () => void;
  className?: string;
}

export function AnimatedDragonCurve({
  iteration,
  animate = true,
  showStats = true,
  size = 300,
  onClick,
  className = ''
}: AnimatedDragonCurveProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  
  const curveData = useMemo(() => generateDragonCurve(iteration), [iteration]);
  const color = CURVE_COLORS[iteration - 1];
  const complexity = COMPLEXITY_LABELS[iteration - 1];
  const segments = Math.pow(2, iteration);
  
  // Calculate animation duration based on complexity
  const animationDuration = Math.min(0.5 + iteration * 0.3, 4);
  
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      
      if (animate) {
        setIsAnimating(true);
        // Reset animation
        pathRef.current.style.strokeDasharray = `${length}`;
        pathRef.current.style.strokeDashoffset = `${length}`;
        
        // Trigger reflow
        pathRef.current.getBoundingClientRect();
        
        // Start animation
        pathRef.current.style.transition = `stroke-dashoffset ${animationDuration}s ease-out`;
        pathRef.current.style.strokeDashoffset = '0';
        
        const timeout = setTimeout(() => setIsAnimating(false), animationDuration * 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [iteration, animate, animationDuration]);
  
  // Calculate viewBox to fit the curve
  const viewBox = `0 0 ${curveData.bounds.width} ${curveData.bounds.height}`;
  
  return (
    <div 
      className={`relative group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{ 
          background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)` 
        }}
      />
      
      {/* SVG Container */}
      <svg
        viewBox={viewBox}
        width={size}
        height={size}
        className="relative z-10"
        style={{ 
          filter: isAnimating ? `drop-shadow(0 0 8px ${color})` : `drop-shadow(0 0 3px ${color}60)`,
          transition: 'filter 0.5s ease-out'
        }}
      >
        {/* Grid background */}
        <defs>
          <pattern id={`grid-${iteration}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path 
              d="M 20 0 L 0 0 0 20" 
              fill="none" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${iteration})`} />
        
        {/* The Dragon Curve */}
        <path
          ref={pathRef}
          d={curveData.path}
          fill="none"
          stroke={color}
          strokeWidth={Math.max(1.5, 3 - iteration * 0.15)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Stats overlay */}
      {showStats && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-white/70">
              #{iteration}
            </span>
            <span 
              className="font-semibold tracking-wide"
              style={{ color }}
            >
              {complexity}
            </span>
          </div>
          <div className="text-[10px] text-white/40 font-mono mt-1">
            {segments.toLocaleString()} segments
          </div>
        </div>
      )}
      
      {/* Hover overlay */}
      {onClick && (
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span 
            className="text-sm font-medium px-4 py-2 rounded-full border backdrop-blur-sm"
            style={{ 
              borderColor: color,
              color: color,
              backgroundColor: `${color}15`
            }}
          >
            Mint
          </span>
        </div>
      )}
    </div>
  );
}
