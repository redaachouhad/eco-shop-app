import { Category } from "@ext/typings";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state

interface ListOfCategories {
  value: Category[];
}

// Define the initial state using that type
const initialState: ListOfCategories = {
  value: [],
};

export const listOfCategoriesSlice = createSlice({
  name: "listOfCategories",
  initialState,
  reducers: {
    addListOfCategoriesFct: (state, action: PayloadAction<Category[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addListOfCategoriesFct } = listOfCategoriesSlice.actions;

export default listOfCategoriesSlice.reducer;
