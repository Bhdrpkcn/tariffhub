import { configureStore } from "@reduxjs/toolkit";
import tariffReducer from "../reducers/tariffReducer";

const store = configureStore({
  reducer: {
    tariffRedux: tariffReducer,
  },
});

export default store;
