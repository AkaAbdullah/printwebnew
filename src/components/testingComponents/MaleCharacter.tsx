export const MaleCharacter = ({
  shirtColor = "#3498db",
  pantsColor = "#2c3e50",
  shoeColor = "#000000",
  hairColor = "#2c1608",
  skinColor = "#fdbcb4",
  width = 300,
  height = 400,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 400"
    width={width}
    height={height}
    className="character"
  >
    {/* Body with improved realistic proportions */}
    <g id="body">
      {/* Torso with more natural shape */}
      <path
        d="M75 180 Q100 160 125 180 L125 260 Q100 280 75 260 Z"
        fill={skinColor}
      />
      {/* Shoulders */}
      <ellipse cx={70} cy={185} rx={10} ry={8} fill={skinColor} />
      <ellipse cx={130} cy={185} rx={10} ry={8} fill={skinColor} />
      {/* Arms with muscle definition */}
      <path
        d="M60 185 Q55 200 60 220 Q65 225 65 225 L70 220 Q65 200 70 185 Z"
        fill={skinColor}
      />
      <path
        d="M140 185 Q145 200 140 220 Q135 225 135 225 L130 220 Q135 200 130 185 Z"
        fill={skinColor}
      />
      {/* Hands with more detail */}
      <path d="M60 225 Q58 230 62 232 Q65 233 65 230 Z" fill={skinColor} />
      <path d="M140 225 Q142 230 138 232 Q135 233 135 230 Z" fill={skinColor} />
      {/* Legs with improved shape */}
      <path
        d="M80 260 Q85 320 80 370 L70 370 Q75 320 70 260 Z"
        fill={skinColor}
      />
      <path
        d="M120 260 Q115 320 120 370 L130 370 Q125 320 130 260 Z"
        fill={skinColor}
      />
    </g>

    {/* Neck with improved shape */}
    <path d="M95 165 Q100 150 105 165 L105 180 L95 180 Z" fill={skinColor} />

    {/* T-shirt with improved fit and details */}
    <g id="tshirt">
      <path
        d="M70 180 Q100 170 130 180 L135 190 L135 260 Q100 275 65 260 L65 190 Z"
        fill={shirtColor}
      />
      {/* Sleeves with better shape */}
      <path
        d="M65 185 Q60 195 65 205 L70 200 Q68 190 70 185 Z"
        fill={shirtColor}
      />
      <path
        d="M135 185 Q140 195 135 205 L130 200 Q132 190 130 185 Z"
        fill={shirtColor}
      />
      {/* Shirt folds and shadows */}
      <path
        d="M85 190 Q90 195 95 190 Q100 195 105 190 Q110 195 115 190 L115 210 Q100 215 85 210 Z"
        fill={shirtColor}
        opacity="0.8"
      />
      <path
        d="M100 180 Q105 182 105 185 Q100 187 95 185 Q95 182 100 180 Z"
        fill={shirtColor}
        opacity="0.7"
      />
    </g>

    {/* Jeans with improved details */}
    <g id="pants">
      <path
        d="M75 260 Q85 265 80 370 L70 370 Q65 265 75 260 Z"
        fill={pantsColor}
      />
      <path
        d="M125 260 Q115 265 120 370 L130 370 Q135 265 125 260 Z"
        fill={pantsColor}
      />
      {/* Waistband */}
      <rect x={75} y={255} width={50} height={5} fill={pantsColor} />
      {/* Belt loops */}
      <rect x={80} y={255} width={5} height={8} fill="#1a252f" />
      <rect x={95} y={255} width={5} height={8} fill="#1a252f" />
      <rect x={110} y={255} width={5} height={8} fill="#1a252f" />
      {/* Pockets with better shape */}
      <path
        d="M78 270 Q80 275 85 275 Q90 275 92 270 Q90 265 85 265 Q80 265 78 270 Z"
        fill="#1a252f"
        opacity="0.3"
      />
      <path
        d="M108 270 Q110 275 115 275 Q120 275 122 270 Q120 265 115 265 Q110 265 108 270 Z"
        fill="#1a252f"
        opacity="0.3"
      />
      {/* Seam lines */}
      <path
        d="M80 260 Q82 370 80 370"
        stroke="#1a252f"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M120 260 Q118 370 120 370"
        stroke="#1a252f"
        strokeWidth="1"
        fill="none"
      />
    </g>

    {/* Sneakers with improved details */}
    <g id="shoes">
      {/* Left shoe */}
      <path
        d="M70 370 Q75 375 80 375 Q85 375 90 370 L90 380 Q85 385 80 385 Q75 385 70 380 Z"
        fill={shoeColor}
      />
      <ellipse cx={80} cy={372} rx={12} ry={5} fill="#fff" />
      <path
        d="M75 372 Q80 370 85 372"
        stroke={shoeColor}
        strokeWidth="2"
        fill="none"
      />
      {/* Right shoe */}
      <path
        d="M110 370 Q115 375 120 375 Q125 375 130 370 L130 380 Q125 385 120 385 Q115 385 110 380 Z"
        fill={shoeColor}
      />
      <ellipse cx={120} cy={372} rx={12} ry={5} fill="#fff" />
      <path
        d="M115 372 Q120 370 125 372"
        stroke={shoeColor}
        strokeWidth="2"
        fill="none"
      />
    </g>

    {/* Improved Curly Hair */}
    <g id="hair">
      <path
        d="M70 120 C65 80, 85 60, 100 55 C115 60, 135 80, 130 120 Q125 100 115 105 Q105 95 100 100 Q95 95 85 105 Q75 100 70 120 Z"
        fill={hairColor}
      />
      {/* Hair texture and curls */}
      <path
        d="M75 100 Q78 95 80 100 Q82 105 85 100 Q87 95 90 100"
        stroke={hairColor}
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M110 100 Q113 95 115 100 Q117 105 120 100 Q122 95 125 100"
        stroke={hairColor}
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <circle cx="85" cy="90" r="3" fill={hairColor} opacity="0.6" />
      <circle cx="115" cy="90" r="3" fill={hairColor} opacity="0.6" />
    </g>

    {/* Face with improved realistic features */}
    <g id="face">
      {/* Head shape */}
      <ellipse cx={100} cy={135} rx={25} ry={30} fill={skinColor} />

      {/* Eyes with more detail */}
      <ellipse cx={90} cy={130} rx={4} ry={3.5} fill="#fff" />
      <ellipse cx={110} cy={130} rx={4} ry={3.5} fill="#fff" />
      <circle cx={90} cy={130} r={2} fill="#4a4a4a" />
      <circle cx={110} cy={130} r={2} fill="#4a4a4a" />
      <circle cx={90.5} cy={129} r={0.8} fill="#fff" />
      <circle cx={110.5} cy={129} r={0.8} fill="#fff" />
      {/* Eyelids */}
      <path
        d="M86 127 Q90 126 94 127"
        stroke="#e09574"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M106 127 Q110 126 114 127"
        stroke="#e09574"
        strokeWidth="1"
        fill="none"
      />

      {/* Eyebrows */}
      <path
        d="M85 125 Q90 122 95 125"
        stroke={hairColor}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M105 125 Q110 122 115 125"
        stroke={hairColor}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Nose with improved shape */}
      <path d="M100 135 Q98 142 100 145 Q102 142 100 135 Z" fill="#f4a688" />
      <ellipse cx={99} cy={140} rx={1} ry={0.5} fill="#e09574" />
      <ellipse cx={101} cy={140} rx={1} ry={0.5} fill="#e09574" />

      {/* Mouth with more detail */}
      <path
        d="M94 150 Q100 153 106 150"
        stroke="#d4756b"
        strokeWidth={2}
        fill="none"
      />
      <path
        d="M94 150 Q96 152 100 152 Q104 152 106 150"
        stroke="#f8d7d7"
        strokeWidth={1}
        fill="none"
      />

      {/* Ears */}
      <path
        d="M75 130 Q70 135 72 140 Q74 142 75 140 Q76 135 75 130 Z"
        fill={skinColor}
      />
      <path
        d="M125 130 Q130 135 128 140 Q126 142 125 140 Q124 135 125 130 Z"
        fill={skinColor}
      />

      {/* Facial contours and shading */}
      <path
        d="M80 145 Q100 165 120 145"
        stroke="#e09574"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
      <ellipse cx={85} cy={140} rx={3} ry={2} fill="#ffadad" opacity="0.1" />
      <ellipse cx={115} cy={140} rx={3} ry={2} fill="#ffadad" opacity="0.1" />
    </g>
  </svg>
);
