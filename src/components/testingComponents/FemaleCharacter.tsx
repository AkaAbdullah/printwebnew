// src/components/testingComponents/FemaleCharacter.tsx
import { svgData } from "../../utils/svgData";

export const FemaleCharacter = ({
  width = 300,
  height = 400,
  hairId = null,
  tshirtId = null,
  headId = null,
  shirtColor = "#e91e63",
  // pantsColor = "#2c3e50",
  // shoeColor = "#000000",
  // hairColor = "#8d5524",
}) => {
  // Get SVG components safely
  const Hair = hairId !== null ? svgData.girlHair[hairId - 1] : null;
  const Tshirt = tshirtId !== null ? svgData.tshirts[tshirtId - 1] : null;
  const Head = headId !== null ? svgData.heads[headId - 1] : null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 400"
      width={width}
      height={height}
    >
      {/* Base body */}
      <rect width="200" height="400" fill="none" />

      {/* Skin tone */}
      <ellipse cx={100} cy={135} rx={22} ry={28} fill="#fdbcb4" />

      {/* Render dynamic head if available */}
      {Head && (
        <g transform="translate(88, 110) scale(0.8)">
          <Head />
        </g>
      )}

      {/* Render dynamic hair */}
      {Hair && (
        <g transform="translate(88, 100) scale(0.85)">
          <Hair />
        </g>
      )}

      {/* T-Shirt */}
      {Tshirt ? (
        <g transform="translate(75, 180) scale(0.9)">
          <Tshirt />
        </g>
      ) : (
        <path
          d="M75 180 Q100 160 125 180 L130 190 L130 260 Q100 275 70 260 L70 190 Z"
          fill={shirtColor}
        />
      )}

      {/* Rest of body... */}
      {/* Add pants, shoes, etc. if not replaced */}
    </svg>
  );
};
