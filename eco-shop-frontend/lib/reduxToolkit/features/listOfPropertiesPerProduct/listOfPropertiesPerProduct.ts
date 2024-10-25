import { Property } from "@ext/typings";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state

interface ListOfPropertiesPerProduct {
  value: Property[];
}

// Define the initial state using that type
const initialState: ListOfPropertiesPerProduct = {
  value: [],
};

export const listOfPropertiesPerProductSlice = createSlice({
  name: "listOfPropertiesPerProduct",
  initialState,
  reducers: {
    setListOfPropertiesPerProductFct: (
      state,
      action: PayloadAction<Property[]>
    ) => {
      state.value = action.payload;
    },
    deletePropertyFromListFct: (state, action: PayloadAction<number>) => {
      state.value.splice(action.payload, 1);
    },
  },
});

export const { setListOfPropertiesPerProductFct, deletePropertyFromListFct } =
  listOfPropertiesPerProductSlice.actions;

export default listOfPropertiesPerProductSlice.reducer;
