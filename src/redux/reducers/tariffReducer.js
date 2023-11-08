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

      const customSort = (a, b) => {
        if (sortingFilter === "price") {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
          return priceA - priceB;
        }
        //seperated price because of the sorting reverse mech. !
        else if (
          sortingFilter === "download_speed" ||
          sortingFilter === "upload_speed"
        ) {
          console.log("speed sort", tariffs);
          const speedA = parseFloat(a[sortingFilter].replace(/\D/g, ""));
          const speedB = parseFloat(b[sortingFilter].replace(/\D/g, ""));
          return speedB - speedA;
        }
        console.log("abort sort");
        return 0;
      };

      state.tariffs = [...tariffs].sort(customSort);
    },

    setCalculateTariffs: (state, action) => {
      state.maxDownloadSpeed = action.payload.maxDownloadSpeed;
      state.maxUploadSpeed = action.payload.maxUploadSpeed;
    },
  },
});

export const {
  setTariffRedux,
  setLoading,
  setSortingFilter,
  sortTariffs,
  setCalculateTariffs,
} = tariffSlice.actions;

export default tariffSlice.reducer;
