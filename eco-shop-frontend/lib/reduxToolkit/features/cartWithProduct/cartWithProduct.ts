import { CartWithProduct } from "@ext/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartWithProductValue {
  value: CartWithProduct[];
}

// Define the initial state using that type
const initialState: CartWithProductValue = {
  value: [],
};

export const CartWithProductSlice = createSlice({
  name: "cartWithProduct",
  initialState,
  reducers: {
    setCartWithProductFct: (
      state,
      action: PayloadAction<CartWithProduct[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setCartWithProductFct } = CartWithProductSlice.actions;

export default CartWithProductSlice.reducer;
