import { createSlice } from "@reduxjs/toolkit";

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  useAsBilling: boolean;
}

export interface Order {
  id: number;
  product: string;
  payment: string;
  productImage: string;
  paymentStatus: "Pending" | "Paid";
  type: "Delivery";
  typeStatus: "Processing" | "Shipped" | "Delivered";
  total: number;
  date: string;
  shippingAddress: ShippingAddress;
}
const initialState = {
  productInfo: {
    id: "",
    productName: "",
    productImage: "",
    size: "medium",
    color: "#fff",
    quantity: 1,
    orderPrice: 0,
  },
  orders: [] as Order[],
};

// Helper to calculate total price
const calculateTotalPrice = (pricePerUnit: any, quantity: any) => {
  return pricePerUnit * quantity;
};

const checkoutSlice = createSlice({
  name: "checkoutSlice",
  initialState,
  reducers: {
    updateSize: (state, action) => {
      state.productInfo.size = action.payload;
    },

    addQuantity: (state) => {
      const pricePerUnit =
        state.productInfo.orderPrice / state.productInfo.quantity;
      state.productInfo.quantity += 1;
      state.productInfo.orderPrice = calculateTotalPrice(
        pricePerUnit,
        state.productInfo.quantity
      );
    },

    removeQuantity: (state) => {
      if (state.productInfo.quantity > 1) {
        const pricePerUnit =
          state.productInfo.orderPrice / state.productInfo.quantity;
        state.productInfo.quantity -= 1;
        state.productInfo.orderPrice = calculateTotalPrice(
          pricePerUnit,
          state.productInfo.quantity
        );
      }
    },

    updateProductImage: (state, action) => {
      state.productInfo.productImage = action.payload;
    },

    updateProductName: (state, action) => {
      state.productInfo.productName = action.payload;
    },

    updateProductPrice: (state, action) => {
      const { currentPrice, discount } = action.payload;
      const discountedPrice = currentPrice - (currentPrice * discount) / 100;
      state.productInfo.orderPrice =
        discountedPrice * state.productInfo.quantity;
    },

    updateProductColor: (state, action) => {
      state.productInfo.color = action.payload;
    },
    saveOrder: (state, action) => {
      const { shippingAddress, paymentMethod, totalAmount } = action.payload;

      const newOrder: Order = {
        id: Date.now(),
        product: state.productInfo.productName,
        productImage: state.productInfo.productImage,
        payment: paymentMethod,
        paymentStatus:
          paymentMethod === "By Cash" || paymentMethod === "Cash on Delivery"
            ? "Pending"
            : "Paid",
        type: "Delivery",
        typeStatus: "Processing",
        total: totalAmount,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        shippingAddress,
      };

      state.orders.push(newOrder);
    },

    resetState: (state) => {
      state.productInfo = initialState.productInfo;
    },

    deleteOrder: (state, action) => {
      state.orders.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  updateSize,
  addQuantity,
  removeQuantity,
  updateProductColor,
  updateProductImage,
  updateProductName,
  saveOrder,
  resetState,
  deleteOrder,
  updateProductPrice,
} = checkoutSlice.actions;

export default checkoutSlice;
