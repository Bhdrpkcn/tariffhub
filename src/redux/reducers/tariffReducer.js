import { createSlice } from "@reduxjs/toolkit";

export const tariffSlice = createSlice({
  name: "tariffRedux",
  initialState: {
    tariffs: [],
    isLoading: false,
    sortingFilter: "Sort by",
    speedFilters: [],
    filteredTariffs: [],
    initialLoad: true,
    brandFilters: [],
  },
  reducers: {
    setTariffRedux: (state, action) => {
      state.tariffs = action.payload;
      state.filteredTariffs = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSortingFilter: (state, action) => {
      state.sortingFilter = action.payload;
    },
    setBrandFilters: (state, action) => {
      state.brandFilters = action.payload;
    },
    sortTariffs: (state) => {
      const { tariffs, sortingFilter } = state;

      const customSort = (a, b) => {
        if (sortingFilter === "price") {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
          return priceA - priceB;
        } else if (
          sortingFilter === "download_speed" ||
          sortingFilter === "upload_speed"
        ) {
          const speedA = parseFloat(a[sortingFilter].replace(/\D/g, ""));
          const speedB = parseFloat(b[sortingFilter].replace(/\D/g, ""));
          return speedB - speedA;
        }
        return 0;
      };

      state.tariffs = [...tariffs].sort(customSort);
    },

    setCalculateTariffs: (state, action) => {
      state.maxDownloadSpeed = action.payload.maxDownloadSpeed;
      state.maxUploadSpeed = action.payload.maxUploadSpeed;
    },
    setSpeedFilters: (state, action) => {
      state.speedFilters = action.payload;
    },
    filterTariffs: (state) => {
      if (
        (state.speedFilters.length > 0 || state.brandFilters.length > 0) &&
        !state.initialLoad
      ) {
        state.filteredTariffs = state.tariffs.filter((tariff) => {
          const downloadSpeed = parseInt(tariff.download_speed, 10);

          const speedFilterResult =
            state.speedFilters.length === 0 ||
            state.speedFilters.some((filter) => {
              switch (filter) {
                case "upTo10Mbps":
                  return downloadSpeed <= 10;
                case "10to25Mbps":
                  return downloadSpeed >= 10 && downloadSpeed <= 25;
                case "30MbpsOrHigher":
                  return downloadSpeed >= 30;
                default:
                  return false;
              }
            });

          const brandFilterResult =
            state.brandFilters.length === 0 ||
            state.brandFilters.includes(tariff.brand);

          return speedFilterResult && brandFilterResult;
        });
      } else {
        state.filteredTariffs = state.tariffs;
      }

      state.initialLoad = false;
    },

    filterBrandTariffs: (state) => {
      if (state.brandFilters.length > 0 && !state.initialLoad) {
        state.filteredTariffs = state.tariffs.filter((tariff) =>
          state.brandFilters.includes(tariff.brand)
        );
      } else {
        state.filteredTariffs = state.tariffs;
      }
      state.initialLoad = false;
    },
  },
});

export const {
  setTariffRedux,
  setLoading,
  setSortingFilter,
  sortTariffs,
  setCalculateTariffs,
  setSpeedFilters,
  filterTariffs,
  filterBrandTariffs,
  setBrandFilters,
} = tariffSlice.actions;

export default tariffSlice.reducer;
