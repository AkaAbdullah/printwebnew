import { mediaData } from "./mediaData";

type Size = "small" | "medium" | "large" | "xl";

type Price = {
  currentPrice: number;
  discount: number;
};

export type Product = {
  id: number;
  image: string;
  name: string;
  description: string;
  color: string;
  size: Size;
  price: Price;
};

export const products: Record<string, Product[]> = {
  Cups: [
    {
      id: 1,
      image: mediaData.cup1,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "White",
      size: "large",
      price: { currentPrice: 12.99, discount: 10 },
    },
    {
      id: 2,
      image: mediaData.cup2,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Blue",
      size: "large",
      price: { currentPrice: 12.99, discount: 5 },
    },
    {
      id: 3,
      image: mediaData.cup3,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Red",
      size: "large",
      price: { currentPrice: 12.99, discount: 0 },
    },
    {
      id: 4,
      image: mediaData.cup4,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Black",
      size: "large",
      price: { currentPrice: 12.99, discount: 15 },
    },
    {
      id: 5,
      image: mediaData.cup5,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Green",
      size: "large",
      price: { currentPrice: 12.99, discount: 0 },
    },
    {
      id: 6,
      image: mediaData.cup6,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Yellow",
      size: "large",
      price: { currentPrice: 12.99, discount: 10 },
    },
    {
      id: 7,
      image: mediaData.cup7,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Purple",
      size: "large",
      price: { currentPrice: 12.99, discount: 0 },
    },
    {
      id: 8,
      image: mediaData.cup8,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Orange",
      size: "large",
      price: { currentPrice: 12.99, discount: 20 },
    },
    {
      id: 9,
      image: mediaData.cup9,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Pink",
      size: "large",
      price: { currentPrice: 12.99, discount: 0 },
    },
    {
      id: 10,
      image: mediaData.cup10,
      name: "Avatar Graphic Cup",
      description: "A high-quality ceramic mug with vibrant graphic print.",
      color: "Gray",
      size: "large",
      price: { currentPrice: 12.99, discount: 5 },
    },
  ],
  Shirts: [
    {
      id: 1,
      image: mediaData.Tshirt1,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#fff",
      size: "medium",
      price: { currentPrice: 300, discount: 10 },
    },
    {
      id: 2,
      image: mediaData.Tshirt2,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#b5281f",
      size: "medium",
      price: { currentPrice: 300, discount: 0 },
    },
    {
      id: 3,
      image: mediaData.Tshirt3,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#39195c",
      size: "medium",
      price: { currentPrice: 300, discount: 15 },
    },
    {
      id: 4,
      image: mediaData.Tshirt4,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#1b3e28",
      size: "medium",
      price: { currentPrice: 300, discount: 5 },
    },
    {
      id: 5,
      image: mediaData.Tshirt5,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#1f472d",
      size: "medium",
      price: { currentPrice: 300, discount: 0 },
    },
    {
      id: 6,
      image: mediaData.Tshirt6,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#adadad",
      size: "medium",
      price: { currentPrice: 300, discount: 20 },
    },
    {
      id: 7,
      image: mediaData.Tshirt7,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#aa4162",
      size: "medium",
      price: { currentPrice: 300, discount: 0 },
    },
    {
      id: 8,
      image: mediaData.Tshirt8,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#f1c727",
      size: "medium",
      price: { currentPrice: 300, discount: 10 },
    },
    {
      id: 9,
      image: mediaData.Tshirt9,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#141726",
      size: "medium",
      price: { currentPrice: 300, discount: 0 },
    },
    {
      id: 10,
      image: mediaData.Tshirt10,
      name: "Avatar Graphic T-shirt",
      description:
        "This avatar t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      color: "#dadada",
      size: "medium",
      price: { currentPrice: 300, discount: 5 },
    },
  ],
  Hoodies: [],
};

export const TShirtSizes = [
  { id: 1, title: "Small", value: "small" },
  { id: 2, title: "Medium", value: "medium" },
  { id: 3, title: "Large", value: "large" },
  { id: 4, title: "XL", value: "xl" },
];

export const tShirtColors = [
  { id: 1, value: "#fff" },
  { id: 1, value: "#000" },
  { id: 1, value: "#ddd" },
  { id: 1, value: "#666" },
];
