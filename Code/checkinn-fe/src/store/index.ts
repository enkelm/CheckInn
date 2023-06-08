import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import userSlice from './user-slice';
import listingSlice from './listings-slice';
import listingFormSlice from './listingForm-slice';
import { BedType, CreateRoomDTO, Room } from '../data';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    listings: listingSlice.reducer,
    createListing: listingFormSlice.reducer,
  },
});

export function roomsCopy(propName: keyof Room, value: any, key: number): CreateRoomDTO[] {
  const newRooms = structuredClone(store.getState().createListing.rooms);

  if (propName === 'roomAmenities') {
    if (value === 'Single' || value === 'Double' || value === 'Couch') {
      newRooms[key] = {
        ...newRooms[key],
        [propName]: { ...newRooms[key][propName], bedType: BedType[value] },
      };
    } else {
      newRooms[key] = {
        ...newRooms[key],
        [propName]: { ...newRooms[key][propName], [value]: !newRooms[key][propName][value] },
      };
    }
    return newRooms;
  }

  newRooms[key] = { ...newRooms[key], [propName]: value };
  return newRooms;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
