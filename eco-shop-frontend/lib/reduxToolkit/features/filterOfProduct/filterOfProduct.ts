import { FilterOfProduct } from "@ext/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterOfProductValue {
  value: FilterOfProduct;
}

// Define the initial state using that type
const initialState: FilterOfProductValue = {
  value: {
    size: 10,
    page: 0,
    filterMinPrice: 0,
    filterMaxPrice: 0,
    filterCategory: 0,
    filterSortedBy: 0,
  },
};

export const filterOfProductSlice = createSlice({
  name: "filterOfProduct",
  initialState,
  reducers: {
    setFilterOfProductFct: (state, action: PayloadAction<FilterOfProduct>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilterOfProductFct } = filterOfProductSlice.actions;

export default filterOfProductSlice.reducer;
