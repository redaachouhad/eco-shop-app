import { CartWithProduct } from "@ext/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListIdsOfCartToDeleteInterface {
  value: CartWithProduct[];
}

// Define the initial state using that type
const initialState: ListIdsOfCartToDeleteInterface = {
  value: [],
};

export const listIdsOfCartToDeleteSlice = createSlice({
  name: "listIdsOfCartToDelete",
  initialState,
  reducers: {
    setListIdsOfCartToDeleteFct: (
      state,
      action: PayloadAction<CartWithProduct[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setListIdsOfCartToDeleteFct } =
  listIdsOfCartToDeleteSlice.actions;

export default listIdsOfCartToDeleteSlice.reducer;
