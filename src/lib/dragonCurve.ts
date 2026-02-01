/**
 * Dragon Curve L-System Implementation
 * 
 * Axiom: F
 * Rules: F → F+G, G → F-G
 * + = turn left 90°, - = turn right 90°
 */

export interface Point {
  x: number;
  y: number;
}

export interface DragonCurveData {
  path: string;
  points: Point[];
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    width: number;
    height: number;
  };
  segments: number;
}

/**
 * Generate L-system instructions for Dragon Curve
 */
export function generateInstructions(iterations: number): string {
  if (iterations === 0) return 'F';
  
  let current = 'F';
  
  for (let i = 0; i < iterations; i++) {
    let next = '';
    for (const char of current) {
      if (char === 'F') {
        next += 'F+G';
      } else if (char === 'G') {
        next += 'F-G';
      } else {
        next += char;
      }
    }
    current = next;
  }
  
  return current;
}

/**
 * Execute turtle graphics to generate path points
 */
export function executeTurtle(instructions: string, scale: number = 10): DragonCurveData {
  // Direction: 0=right, 1=up, 2=left, 3=down
  const dx = [1, 0, -1, 0];
  const dy = [0, -1, 0, 1];
  
  let dir = 0;
  let x = 0;
  let y = 0;
  
  const points: Point[] = [{ x: 0, y: 0 }];
  
  let minX = 0, maxX = 0, minY = 0, maxY = 0;
  
  for (const cmd of instructions) {
    if (cmd === 'F' || cmd === 'G') {
      x += dx[dir] * scale;
      y += dy[dir] * scale;
      points.push({ x, y });
      
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    } else if (cmd === '+') {
      dir = (dir + 1) % 4;
    } else if (cmd === '-') {
      dir = (dir + 3) % 4;
    }
  }
  
  // Add padding
  const padding = scale * 2;
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;
  
  // Normalize points to positive coordinates with padding
  const normalizedPoints = points.map(p => ({
    x: p.x - minX + padding,
    y: p.y - minY + padding
  }));
  
  // Build SVG path
  let path = `M${normalizedPoints[0].x},${normalizedPoints[0].y}`;
  for (let i = 1; i < normalizedPoints.length; i++) {
    path += `L${normalizedPoints[i].x},${normalizedPoints[i].y}`;
  }
  
  return {
    path,
    points: normalizedPoints,
    bounds: { minX, maxX, minY, maxY, width, height },
    segments: points.length - 1
  };
}

/**
 * Generate complete Dragon Curve data for a given iteration
 */
export function generateDragonCurve(iteration: number): DragonCurveData {
  const instructions = generateInstructions(iteration);
  // Scale decreases with iterations to keep reasonable size
  const scale = Math.max(5, Math.floor(100 / iteration));
  return executeTurtle(instructions, scale);
}

// Colors matching the contract
export const CURVE_COLORS = [
  '#ff6b6b', // 1 - bright red
  '#ff8e53', // 2 - orange
  '#ffd93d', // 3 - gold
  '#6bcb77', // 4 - green
  '#4d96ff', // 5 - blue
  '#9b59b6', // 6 - purple
  '#e74c3c', // 7 - crimson
  '#00ff88', // 8 - dragon green
  '#ff00ff', // 9 - magenta
  '#00ffff', // 10 - cyan
  '#ff4444', // 11 - fire red
  '#ffffff', // 12 - white (final form)
];

export const COMPLEXITY_LABELS = [
  'Simple', 'Simple', 'Simple',           // 1-3
  'Moderate', 'Moderate', 'Moderate',      // 4-6
  'Complex', 'Complex', 'Complex',         // 7-9
  'Legendary', 'Legendary', 'Legendary'    // 10-12
];
