export const DogCharacter = ({
  bodyColor = "#a1887f",
  earColor = "#8d6e63",
  collarColor = "#2196f3",
  noseColor = "#546e7a",
  width = 200,
  height = 200,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width={width}
    height={height}
    className="character"
  >
    {/* Dog Body */}
    <g id="body">
      {/* Main body */}
      <ellipse cx={100} cy={120} rx={40} ry={30} fill={bodyColor} />
      {/* Neck */}
      <rect x={85} y={90} width={30} height={20} rx={5} fill={bodyColor} />
      {/* Legs */}
      <ellipse cx={75} cy={150} rx={8} ry={15} fill={bodyColor} />
      <ellipse cx={125} cy={150} rx={8} ry={15} fill={bodyColor} />
      <ellipse cx={75} cy={150} rx={5} ry={10} fill="#8d6e63" opacity="0.3" />
      <ellipse cx={125} cy={150} rx={5} ry={10} fill="#8d6e63" opacity="0.3" />
      {/* Tail */}
      <path d="M140 110 Q160 90 150 70 Q140 80 140 110 Z" fill={bodyColor} />
    </g>

    {/* Collar */}
    <g id="collar">
      <rect x={85} y={100} width={30} height={8} fill={collarColor} rx={2} />
      <circle cx={100} cy={104} r={3} fill="#ffd700" />
    </g>

    {/* Head */}
    <g id="head">
      <ellipse cx={100} cy={80} rx={25} ry={20} fill={bodyColor} />

      {/* Muzzle */}
      <ellipse cx={100} cy={85} rx={15} ry={10} fill="#e0e0e0" />

      {/* Nose */}
      <ellipse cx={100} cy={85} rx={5} ry={3} fill={noseColor} />
      <circle cx={101} cy={84} r={1} fill="#fff" opacity="0.5" />

      {/* Mouth */}
      <path
        d="M95 90 Q100 92 105 90"
        stroke="#795548"
        strokeWidth="1"
        fill="none"
      />

      {/* Eyes */}
      <ellipse cx={90} cy={75} rx={3} ry={2} fill="#fff" />
      <ellipse cx={110} cy={75} rx={3} ry={2} fill="#fff" />
      <circle cx={90} cy={75} r={1.5} fill="#000" />
      <circle cx={110} cy={75} r={1.5} fill="#000" />
      <circle cx={90.5} cy={74.5} r={0.5} fill="#fff" />
      <circle cx={110.5} cy={74.5} r={0.5} fill="#fff" />

      {/* Eyebrows */}
      <path
        d="M85 70 Q88 68 90 70"
        stroke="#5d4037"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M110 70 Q113 68 115 70"
        stroke="#5d4037"
        strokeWidth="1"
        fill="none"
      />
    </g>

    {/* Ears */}
    <g id="ears">
      <path d="M80 65 Q70 50 75 40 Q85 45 85 60 Z" fill={earColor} />
      <path d="M120 65 Q130 50 125 40 Q115 45 115 60 Z" fill={earColor} />
      <path
        d="M82 55 Q75 50 78 45 Q82 48 82 55 Z"
        fill="#d7ccc8"
        opacity="0.5"
      />
      <path
        d="M118 55 Q125 50 122 45 Q118 48 118 55 Z"
        fill="#d7ccc8"
        opacity="0.5"
      />
    </g>

    {/* Fur details */}
    <g id="fur">
      <path
        d="M95 70 Q100 65 105 70"
        stroke="#d7ccc8"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M75 120 Q70 115 75 110"
        stroke="#d7ccc8"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M125 120 Q130 115 125 110"
        stroke="#d7ccc8"
        strokeWidth="1"
        fill="none"
      />
    </g>
  </svg>
);
