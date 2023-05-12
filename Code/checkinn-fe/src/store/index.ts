import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import userSlice from './user-slice';
import listingSlice from './listings-slice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, user: userSlice.reducer, listings: listingSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
