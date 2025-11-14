const SVGComponent = ({ activeIndex = 0, ...props }) => {
  const characters = [];

  const CHARACTER_WIDTH = 100; // Approximate width for spacing
  const TOTAL_WIDTH = 400;
  const VIEWBOX_WIDTH = 400;
  const VIEWBOX_HEIGHT = 600;

  for (let i = 0; i < 4; i++) {
    const x = (TOTAL_WIDTH / 4 - CHARACTER_WIDTH) / 2 + i * (TOTAL_WIDTH / 4);

    const isActive = i === activeIndex;

    characters.push(
      <g key={i} transform={`translate(${x}, 0)`}>
        {/* Apply dim effect to inactive characters */}
        <g opacity={isActive ? 1 : 0.3}>
          {/* Head */}
          <path
            d="M200,80 
               C180,70 160,80 150,100 
               C145,130 150,180 160,230 
               C170,260 185,270 200,270 
               C215,270 230,260 240,230 
               C250,180 255,130 250,100 
               C240,80 220,70 200,80 Z"
            fill="url(#skin)"
            stroke="#c9a87e"
            strokeWidth={1}
          />
          <ellipse cx={185} cy={140} rx={8} ry={10} fill="#fff" />
          <circle cx={185} cy={142} r={4} fill="#000" />
          <ellipse cx={215} cy={140} rx={8} ry={10} fill="#fff" />
          <circle cx={215} cy={142} r={4} fill="#000" />
          <path d="M200,150 L195,170 L205,170 Z" fill="url(#skin)" />
          <path d="M195,170 L200,175 L205,175 L200,170 Z" fill="url(#skin)" />
          <path
            d="M190,190 C195,200 205,200 210,190"
            stroke="#8b4513"
            strokeWidth={2}
            fill="none"
          />

          {/* Hair */}
          <path
            d="M150,100 
               C140,80 160,60 180,60 
               C190,55 210,55 220,60 
               C240,60 260,80 250,100 
               C245,90 230,85 215,85 
               C200,85 185,85 170,90 
               C160,95 155,100 150,100 Z"
            fill="url(#hair)"
          />
          <path
            d="M180,85 
               C185,80 195,78 200,80 
               C205,82 215,80 220,85 
               L215,100 
               C210,98 205,98 200,100 
               C195,98 190,98 185,100 
               Z"
            fill="url(#hair)"
          />

          {/* T-Shirt */}
          <path
            d="M170,270 
               C160,300 150,350 160,400 
               C170,430 185,440 200,440 
               C215,440 230,430 240,400 
               C250,350 240,300 230,270 
               L170,270 Z"
            fill="url(#tshirt)"
            stroke="#2c5a7a"
            strokeWidth={1}
          />
          <ellipse
            cx={155}
            cy={320}
            rx={20}
            ry={40}
            fill="url(#tshirt)"
            transform="rotate(-20 155 320)"
          />
          <ellipse
            cx={245}
            cy={320}
            rx={20}
            ry={40}
            fill="url(#tshirt)"
            transform="rotate(20 245 320)"
          />

          {/* Pants */}
          <path
            d="M170,400 
               C160,450 165,500 170,550 
               C175,560 180,560 185,550 
               C190,500 185,450 190,400 
               Z"
            fill="url(#pants)"
            stroke="#1a1a1a"
            strokeWidth={1}
          />
          <path
            d="M230,400 
               C240,450 235,500 230,550 
               C225,560 220,560 215,550 
               C210,500 215,450 210,400 
               Z"
            fill="url(#pants)"
            stroke="#1a1a1a"
            strokeWidth={1}
          />
          <path d="M190,400 L210,400 L210,410 L190,410 Z" fill="url(#pants)" />

          {/* Shoes */}
          <ellipse cx={175} cy={560} rx={15} ry={8} fill="#000" />
          <ellipse cx={225} cy={560} rx={15} ry={8} fill="#000" />
        </g>
      </g>
    );
  }

  return (
    <svg
      width={400}
      height={600}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="skin" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#f1d2b5" />
          <stop offset="100%" stopColor="#d9a578" />
        </linearGradient>
        <linearGradient id="hair" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#3e2d1b" />
          <stop offset="100%" stopColor="#2a1d12" />
        </linearGradient>
        <linearGradient id="tshirt" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#4a7ca5" />
          <stop offset="100%" stopColor="#3a5f85" />
        </linearGradient>
        <linearGradient id="pants" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#2c2c2c" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>

      {/* Render 4 characters */}
      {characters}
    </svg>
  );
};

export default SVGComponent;
