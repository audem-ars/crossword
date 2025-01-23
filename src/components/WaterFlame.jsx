import React from 'react';

const WaterFlame = () => {
  const uniqueId = Math.random().toString(36).substring(2, 9);

  return (
    <div className="relative w-full h-full">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 40 40"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={`waterRipple-${uniqueId}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.15"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="8s"
                values="0.02 0.15;0.015 0.12;0.02 0.15"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
          </filter>

          <linearGradient id={`waterGradient-${uniqueId}`} x1="0" y1="1" x2="0" y2="0">
  <stop offset="0%" stopColor="#40E0D0">
    <animate
      attributeName="stopColor"
      values="#40E0D0;#48D1CC;#40E0D0"
      dur="4s"
      repeatCount="indefinite"
    />
  </stop>
  <stop offset="50%" stopColor="#48D1CC">
    <animate
      attributeName="stopColor"
      values="#48D1CC;#7FFFD4;#48D1CC"
      dur="4s"
      repeatCount="indefinite"
    />
  </stop>
  <stop offset="100%" stopColor="#7FFFD4">
    <animate
      attributeName="stopColor"
      values="#7FFFD4;#48D1CC;#7FFFD4"
      dur="4s"
      repeatCount="indefinite"
    />
  </stop>
</linearGradient>

          <filter id={`glow-${uniqueId}`}>
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          d="M20 2 
             C 25 15, 35 15, 35 25
             C 35 35, 25 38, 20 38
             C 15 38, 5 35, 5 25
             C 5 15, 15 15, 20 2"
          fill={`url(#waterGradient-${uniqueId})`}
          filter={`url(#waterRipple-${uniqueId})`}
          stroke="#FFD700"
strokeWidth="0.5"
        >
          <animate
            attributeName="d"
            dur="3s"
            repeatCount="indefinite"
            values="
              M20 2 C25 15,35 15,35 25 C35 35,25 38,20 38 C15 38,5 35,5 25 C5 15,15 15,20 2;
              M20 2 C28 15,38 18,35 25 C32 35,25 38,20 38 C15 38,8 35,5 25 C2 18,12 15,20 2;
              M20 2 C25 15,35 15,35 25 C35 35,25 38,20 38 C15 38,5 35,5 25 C5 15,15 15,20 2
            "
          />
        </path>

        <g filter={`url(#glow-${uniqueId})`}>
          {[...Array(3)].map((_, i) => (
            <circle
              key={i}
              className="water-drop"
              cx={20 + (i - 1) * 8}
              cy={25}
              r={1.5}
              fill="rgba(255,255,255,0.4)"
            >
              <animate
                attributeName="cy"
                dur={`${2 + i * 0.5}s`}
                values="30;20;30"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                dur={`${2 + i * 0.5}s`}
                values="1.5;2;1.5"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                dur={`${2 + i * 0.5}s`}
                values="0.4;0.6;0.4"
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        <circle
          cx="20"
          cy="25"
          r="3"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter={`url(#glow-${uniqueId})`}
        >
          <animate
            attributeName="r"
            dur="3s"
            values="3;6;3"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            dur="3s"
            values="0.2;0;0.2"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default WaterFlame;