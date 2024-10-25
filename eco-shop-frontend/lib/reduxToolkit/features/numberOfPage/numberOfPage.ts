import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageNumberInterface {
  value: number;
}

// Define the initial state using that type
const initialState: PageNumberInterface = {
  value: 0,
};

export const pageNumberSlice = createSlice({
  name: "pageNumber",
  initialState,
  reducers: {
    setPageNumberFct: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setPageNumberFct } = pageNumberSlice.actions;

export default pageNumberSlice.reducer;
