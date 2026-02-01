export function StrangerThingsLogo({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 600 150" className="w-full h-full overflow-visible">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Main hollow text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="none"
          stroke="#ff0000"
          strokeWidth="2"
          filter="url(#glow)"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '90px',
            fontWeight: 'bold',
            letterSpacing: '4px',
            textTransform: 'uppercase'
          }}
        >
          {text}
        </text>
        {/* Inner stroke for sharpness */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="none"
          stroke="#ffcccc"
          strokeWidth="0.5"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '90px',
            fontWeight: 'bold',
            letterSpacing: '4px',
            textTransform: 'uppercase'
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
