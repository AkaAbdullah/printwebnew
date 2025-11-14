import { svgData } from "./svgData";

export const characterHeads = svgData.heads.map((imageUrl, index) => ({
  id: index + 1,
  imageUrl,
}));

export const characterHairs = svgData.girlHair.map((imageUrl, index) => ({
  id: index + 1,
  imageUrl,
}));

export const characterTshirts = svgData.tshirts.map((imageUrl, index) => ({
  id: index + 1,
  imageUrl,
}));

export const characterJeans = svgData.jeans.map((imageUrl, index) => ({
  id: index + 1,
  imageUrl,
}));
