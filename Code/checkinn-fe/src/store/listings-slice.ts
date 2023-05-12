import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllListings } from '../data/listings';
import { Listing } from '../data';

const initialState: Listing[] | undefined = [];

export const getListingsThunk = createAsyncThunk<Listing[]>(
  'listings/getAllAsync',
  async (params, { dispatch }) => {
    return await getAllListings({ dispatch });
  },
);

const listingSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {
    addAllListings(state, action: PayloadAction<Listing[] | undefined>) {
      if (!action?.payload) return;
      const { payload } = action;
      payload.forEach((item) => {
        const listingExists = state.find((listing) => item.id === listing.id);
        !listingExists && state.push(item);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getListingsThunk.fulfilled,
      (state, action: PayloadAction<Listing[] | undefined>) => {
        if (!action?.payload) return;
        const { payload } = action;
        payload.forEach((item) => {
          const listingExists = state.find((listing) => item.id === listing.id);
          !listingExists && state.push(item);
        });
      },
    );
  },
});

export const { addAllListings } = listingSlice.actions;

export default listingSlice;
