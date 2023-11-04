import { createSlice } from "@reduxjs/toolkit";

export const tariffSlice = createSlice({
  name: "tariffRedux",
  initialState: {
    tariffs: [],
    isLoading: false,
  },
  reducers: {
    setTariffRedux: (state, action) => {
      state.tariffs = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTariffRedux, setLoading } = tariffSlice.actions;

export default tariffSlice.reducer;
