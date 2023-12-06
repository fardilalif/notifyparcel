import { configureStore } from "@reduxjs/toolkit";
import parcelReducer from "./features/parcel/parcelSlice.js";
import userReducer from "./features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    parcelState: parcelReducer,
  },
});
