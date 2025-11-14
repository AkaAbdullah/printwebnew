// store/slices/productSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { products as initialProducts } from "../../utils/products";

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

export type ProductState = {
  products: Record<string, Product[]>;
  selectedProduct?: Product;
};

const initialState: ProductState = {
  products: initialProducts,
  selectedProduct: undefined,
};
const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (
      state,
      action: PayloadAction<{ category: string; product: Product }>
    ) => {
      const { category, product } = action.payload;
      if (!state.products[category]) {
        state.products[category] = [];
      }
      state.products[category].push(product);
    },
    removeProduct: (
      state,
      action: PayloadAction<{ category: string; id: number }>
    ) => {
      const { category, id } = action.payload;
      if (state.products[category]) {
        state.products[category] = state.products[category].filter(
          (p) => p.id !== id
        );
      }
    },
    clearCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.products[category]) {
        state.products[category] = [];
      }
    },
    resetProducts: (state) => {
      state.products = initialProducts;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCategory,
  resetProducts,
  setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
