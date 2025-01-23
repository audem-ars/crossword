import React from 'react';

const OceanWaves = ({ className }) => {
  const uniqueId = Math.random().toString(36).substring(2, 9);
  
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Stars background - increased count and spread throughout */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`, // Now stars spread across full height
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
              transform: `scale(${Math.random() * 0.5 + 0.5})`, // Varying star sizes
            }}
          />
        ))}
      </div>
      
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`wave-gradient-1-${uniqueId}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.7" />
          </linearGradient>
          
          <linearGradient id={`wave-gradient-2-${uniqueId}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id={`wave-gradient-3-${uniqueId}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1E40AF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id={`wave-gradient-4-${uniqueId}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#1E3A8A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FB923C" stopOpacity="0.15" />
          </linearGradient>

          {/* Add filters for glow effects */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background wave - slowest, largest movement */}
        <path
          d="M0,100 C320,150,480,50,720,76 C960,102,1120,160,1440,140 V400 H0"
          fill={`url(#wave-gradient-1-${uniqueId})`}
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M0,100 C320,150,480,50,720,76 C960,102,1120,160,1440,140 V400 H0;
              M0,120 C320,70,480,130,720,100 C960,70,1120,130,1440,120 V400 H0;
              M0,100 C320,150,480,50,720,76 C960,102,1120,160,1440,140 V400 H0
            "
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </path>

        {/* Back wave - slow, large movement */}
        <path
          d="M0,128 C320,180,480,70,720,96 C960,122,1120,180,1440,160 V400 H0"
          fill={`url(#wave-gradient-2-${uniqueId})`}
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,128 C320,180,480,70,720,96 C960,122,1120,180,1440,160 V400 H0;
              M0,150 C320,90,480,150,720,120 C960,90,1120,150,1440,140 V400 H0;
              M0,128 C320,180,480,70,720,96 C960,122,1120,180,1440,160 V400 H0
            "
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </path>

        {/* Middle wave - medium speed, medium movement */}
        <path
          d="M0,160 C320,200,480,140,720,160 C960,180,1120,140,1440,180 V400 H0"
          fill={`url(#wave-gradient-3-${uniqueId})`}
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M0,160 C320,200,480,140,720,160 C960,180,1120,140,1440,180 V400 H0;
              M0,180 C320,150,480,200,720,180 C960,160,1120,200,1440,160 V400 H0;
              M0,160 C320,200,480,140,720,160 C960,180,1120,140,1440,180 V400 H0
            "
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </path>

        {/* Front wave - faster speed, smaller movement */}
        <path
          d="M0,200 C320,220,480,180,720,200 C960,220,1120,180,1440,220 V400 H0"
          fill={`url(#wave-gradient-4-${uniqueId})`}
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,200 C320,220,480,180,720,200 C960,220,1120,180,1440,220 V400 H0;
              M0,220 C320,180,480,220,720,200 C960,180,1120,220,1440,200 V400 H0;
              M0,200 C320,220,480,180,720,200 C960,220,1120,180,1440,220 V400 H0
            "
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </path>
      </svg>
    </div>
  );
};

export default OceanWaves;