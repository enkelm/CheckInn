import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllListings, getListingById } from '../data/listings';
import { Listing } from '../data';
import { CancelTokenSource } from 'axios';

const initialState: Listing[] | undefined = [];

export const getListingsThunk = createAsyncThunk<Listing[], CancelTokenSource | undefined>(
  'listings/getAllAsync',
  async (cancelToken, { dispatch, rejectWithValue }) => {
    return await getAllListings({ cancelToken, dispatch, rejectWithValue });
  },
);

interface IGetListingThunk {
  id: number;
  setLisiting: React.Dispatch<React.SetStateAction<Listing | undefined>>;
  cancelToken: CancelTokenSource | undefined;
}

export const getListingThunk = createAsyncThunk<Listing, IGetListingThunk>(
  'listings/getById',
  async ({ id, setLisiting, cancelToken }, { dispatch, rejectWithValue }) => {
    return await getListingById(id, setLisiting, { cancelToken, dispatch, rejectWithValue });
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
    builder.addCase(getListingsThunk.fulfilled, (state, action: PayloadAction<Listing[]>) => {
      if (!action?.payload) return;
      const { payload } = action;
      Array.isArray(payload) &&
        payload.forEach((item) => {
          const listingExists = state.find((listing) => item.id === listing.id);
          !listingExists && state.push(item);
        });
    });
    builder.addCase(getListingThunk.fulfilled, (state, action: PayloadAction<Listing>) => {
      if (!action?.payload) return;
      const { payload } = action;
      const listingExists = state.find((listing) => payload.id === listing.id);
      !listingExists && state.push(payload);
    });
  },
});

export const { addAllListings } = listingSlice.actions;

export default listingSlice;
