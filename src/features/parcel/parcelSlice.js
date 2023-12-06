import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parcels: [],
  count: 0,
};

const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {
    getParcels: (state, action) => {
      const { parcels, count } = action.payload;

      state.parcels = parcels;
      state.count = count;
    },
    editParcel: (state, action) => {},
  },
});

export const { getParcels, editParcel } = parcelSlice.actions;
export default parcelSlice.reducer;
