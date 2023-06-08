import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import userSlice from './user-slice';
import listingSlice from './listings-slice';
import listingFormSlice from './listingForm-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    listings: listingSlice.reducer,
    createListing: listingFormSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
