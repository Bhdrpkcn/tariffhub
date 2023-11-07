import { createSlice } from "@reduxjs/toolkit";

export const tariffSlice = createSlice({
  name: "tariffRedux",
  initialState: {
    tariffs: [],
    isLoading: false,
    sortingFilter: "Sort by",
  },
  reducers: {
    setTariffRedux: (state, action) => {
      state.tariffs = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSortingFilter: (state, action) => {
      state.sortingFilter = action.payload;
    },
    sortTariffs: (state) => {
      const { tariffs, sortingFilter } = state;
      const numericSort = (a, b) => {
        const getValue = (tariff) => {
          const value = tariff[sortingFilter].replace(/\D/g, ""); // Remove non-numeric characters
          return parseInt(value, 10);
        };
        return getValue(a) - getValue(b);
      };
      state.tariffs = [...tariffs].sort(numericSort);
    },
  },
});

export const {
  setTariffRedux,
  setLoading,
  setSortingFilter,
  sortTariffs
} = tariffSlice.actions;

export default tariffSlice.reducer;


