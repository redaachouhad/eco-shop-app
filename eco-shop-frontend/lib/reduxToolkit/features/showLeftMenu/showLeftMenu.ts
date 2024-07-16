import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ShowLeftMenuState {
  value: boolean;
}

// Define the initial state using that type
const initialState: ShowLeftMenuState = {
  value: false,
};

export const showLeftMenuSlice = createSlice({
  name: "showLeftMenu",
  initialState,
  reducers: {
    showLeftMenuFct: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { showLeftMenuFct } = showLeftMenuSlice.actions;

export default showLeftMenuSlice.reducer;
