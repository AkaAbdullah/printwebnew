// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./slices/characterSlice";
import productReducer from "./slices/productSlice";
import templateReducer from "./slices/templateSlice";
import customizationSlice from "./slices/customizationSlice";
import checkoutSlice from "./slices/checkoutSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    character: characterReducer,
    template: templateReducer,
    customization: customizationSlice,
    checkout: checkoutSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
