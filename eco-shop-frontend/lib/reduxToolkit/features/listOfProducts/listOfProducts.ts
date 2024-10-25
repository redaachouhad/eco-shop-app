import { ProductDtoWithoutProperties } from "@ext/typings";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state

interface ListOfProducts {
  value: ProductDtoWithoutProperties[];
}

// Define the initial state using that type
const initialState: ListOfProducts = {
  value: [],
};

export const listOfProductsSlice = createSlice({
  name: "listOfProducts",
  initialState,
  reducers: {
    setListOfProductsFct: (
      state,
      action: PayloadAction<ProductDtoWithoutProperties[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setListOfProductsFct } = listOfProductsSlice.actions;

export default listOfProductsSlice.reducer;
