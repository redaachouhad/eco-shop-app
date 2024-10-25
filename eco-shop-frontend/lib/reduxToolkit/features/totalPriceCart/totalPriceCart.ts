import { CartWithProduct } from "@ext/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TotalPriceCartInterface {
  value: number;
}

// Define the initial state using that type
const initialState: TotalPriceCartInterface = {
  value: 0,
};

export const totalPriceCartSlice = createSlice({
  name: "totalPriceCart",
  initialState,
  reducers: {
    setTotalPriceCartFct: (state, action: PayloadAction<CartWithProduct[]>) => {
      const total = action.payload.reduce(
        (acc, curr) =>
          acc + curr.product.productPrice * curr.cart.selectedProductQuantity,
        0
      );
      state.value = total;
    },
  },
});

export const { setTotalPriceCartFct } = totalPriceCartSlice.actions;

export default totalPriceCartSlice.reducer;
