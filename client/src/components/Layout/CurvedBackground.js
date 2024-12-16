const CurvedBackground = () => (
  <div className="curved-background-wrapper">
    <svg
      className="curved-lines"
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.4, // Increased opacity from 0.3 to 0.4
      }}
    >
      <path
        d="M0,160 C320,300,420,240,720,120 C1020,0,1320,80,1440,160L1440,800 L0,800 Z"
        fill="#cce7ff" // Darker shade of blue
      />
      <path
        d="M0,320 C320,400,420,340,720,280 C1020,220,1320,280,1440,320L1440,800 L0,800 Z"
        fill="#99ceff" // Darker middle layer
      />
      <path
        d="M0,480 C320,500,420,440,720,400 C1020,360,1320,480,1440,480L1440,800 L0,800 Z"
        fill="#66b5ff" // Darkest bottom layer
      />
    </svg>
  </div>
);

export default CurvedBackground;
