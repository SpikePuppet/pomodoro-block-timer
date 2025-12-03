import React from 'react';
import type { TimerPhase, TimerStatus } from '../types';

interface TomatoMascotProps {
  phase: TimerPhase;
  status: TimerStatus;
  size?: number;
}

export function TomatoMascot({ phase, status, size = 120 }: TomatoMascotProps) {
  const isWorking = phase === 'work' && status === 'running';
  const isResting = phase !== 'work';
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`tomato-mascot ${status === 'running' ? 'bouncing' : ''}`}
    >
      {/* Stem */}
      <path
        d="M50 8 Q45 15 42 12 Q48 18 50 22 Q52 18 58 12 Q55 15 50 8"
        fill="#4a7c23"
      />
      
      {/* Leaf */}
      <ellipse
        cx="58"
        cy="14"
        rx="8"
        ry="4"
        fill="#5a9c2d"
        transform="rotate(-30 58 14)"
      />
      
      {/* Main tomato body */}
      <ellipse
        cx="50"
        cy="55"
        rx="38"
        ry="35"
        fill={isResting ? '#ff7b7b' : '#ff6b6b'}
      />
      
      {/* Highlight */}
      <ellipse
        cx="35"
        cy="42"
        rx="8"
        ry="5"
        fill="rgba(255,255,255,0.3)"
        transform="rotate(-30 35 42)"
      />
      
      {/* Eyes */}
      <g className="eyes">
        {/* Left eye */}
        <ellipse cx="38" cy="50" rx="6" ry={isWorking ? 7 : 6} fill="white" />
        <circle cx="39" cy="51" r="3" fill="#333" />
        <circle cx="40" cy="49" r="1" fill="white" />
        
        {/* Right eye */}
        <ellipse cx="62" cy="50" rx="6" ry={isWorking ? 7 : 6} fill="white" />
        <circle cx="63" cy="51" r="3" fill="#333" />
        <circle cx="64" cy="49" r="1" fill="white" />
      </g>
      
      {/* Blush */}
      <ellipse cx="28" cy="60" rx="6" ry="4" fill="rgba(255,150,150,0.5)" />
      <ellipse cx="72" cy="60" rx="6" ry="4" fill="rgba(255,150,150,0.5)" />
      
      {/* Mouth */}
      {isResting ? (
        <path
          d="M42 68 Q50 78 58 68"
          stroke="#333"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M42 65 Q50 73 58 65"
          stroke="#333"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
