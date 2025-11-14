export const ChildCharacter = ({
  shirtColor = "#4caf50",
  pantsColor = "#ff9800",
  shoeColor = "#795548",
  hairColor = "#5d4037",
  width = 250,
  height = 350,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 180 350"
    width={width}
    height={height}
    className="character"
  >
    {/* Body with child proportions (larger head, shorter limbs) */}
    <g id="body">
      {/* Torso */}
      <ellipse cx={90} cy={180} rx={20} ry={25} fill="#fdbcb4" />
      {/* Arms */}
      <ellipse cx={65} cy={170} rx={6} ry={18} fill="#fdbcb4" />
      <ellipse cx={115} cy={170} rx={6} ry={18} fill="#fdbcb4" />
      {/* Hands */}
      <circle cx={65} cy={190} r={5} fill="#fdbcb4" />
      <circle cx={115} cy={190} r={5} fill="#fdbcb4" />
      {/* Legs */}
      <ellipse cx={75} cy={250} rx={10} ry={35} fill="#fdbcb4" />
      <ellipse cx={105} cy={250} rx={10} ry={35} fill="#fdbcb4" />
    </g>

    {/* Neck */}
    <ellipse cx={90} cy={150} rx={6} ry={8} fill="#fdbcb4" />

    {/* T-shirt */}
    <g id="tshirt">
      <path
        d="M70 160 Q90 155 110 160 L115 170 L115 210 Q90 220 65 210 L65 170 Z"
        fill={shirtColor}
      />
      {/* Sleeves */}
      <ellipse cx={65} cy={170} rx={8} ry={6} fill={shirtColor} />
      <ellipse cx={115} cy={170} rx={8} ry={6} fill={shirtColor} />
    </g>

    {/* Shorts */}
    <g id="pants">
      <path
        d="M70 210 Q90 215 110 210 L112 250 L105 255 L105 230 L75 230 L75 255 L68 250 Z"
        fill={pantsColor}
      />
      {/* Waistband */}
      <rect x={70} y={205} width={40} height={5} fill={pantsColor} />
    </g>

    {/* Shoes */}
    <g id="shoes">
      {/* Left shoe */}
      <ellipse cx={75} cy={285} rx={12} ry={6} fill={shoeColor} />
      <ellipse cx={75} cy={282} rx={10} ry={4} fill="#fff" />
      {/* Right shoe */}
      <ellipse cx={105} cy={285} rx={12} ry={6} fill={shoeColor} />
      <ellipse cx={105} cy={282} rx={10} ry={4} fill="#fff" />
    </g>

    {/* Child Hair */}
    <g id="hair">
      <path
        d="M70 110 C60 80, 80 60, 90 65 C100 60, 120 80, 110 110 Q105 95 100 100 Q95 95 85 100 Q75 95 70 110 Z"
        fill={hairColor}
      />
      {/* Hair details */}
      <circle cx="80" cy="95" r="3" fill={hairColor} opacity="0.8" />
      <circle cx="100" cy="90" r="2" fill={hairColor} opacity="0.8" />
    </g>

    {/* Face with childlike features */}
    <g id="face">
      {/* Head shape (larger for child) */}
      <circle cx={90} cy={125} r={25} fill="#fdbcb4" />

      {/* Eyes (larger for child) */}
      <ellipse cx={80} cy={120} rx={5} ry={4} fill="#fff" />
      <ellipse cx={100} cy={120} rx={5} ry={4} fill="#fff" />
      <circle cx={80} cy={120} r={2.5} fill="#4a4a4a" />
      <circle cx={100} cy={120} r={2.5} fill="#4a4a4a" />
      <circle cx={81} cy={119} r={1} fill="#fff" />
      <circle cx={101} cy={119} r={1} fill="#fff" />

      {/* Eyebrows */}
      <path
        d="M75 115 Q80 113 85 115"
        stroke="#2c1608"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M95 115 Q100 113 105 115"
        stroke="#2c1608"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Nose */}
      <circle cx={90} cy={130} r={3} fill="#f4a688" />

      {/* Mouth */}
      <circle cx={90} cy={140} r={3} fill="#d4756b" />

      {/* Rosy cheeks */}
      <circle cx={70} cy={125} r={5} fill="#ffadad" opacity="0.3" />
      <circle cx={110} cy={125} r={5} fill="#ffadad" opacity="0.3" />
    </g>
  </svg>
);
