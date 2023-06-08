import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ListingAmenities,
  Reservation,
  initialListing,
  HotelType,
  CountrySelectValue,
  CreateListingDTO,
  CreateRoomDTO,
} from '../data';
// import store from '.';

const initialState: CreateListingDTO = initialListing;

type T = keyof CreateListingDTO;

const listingFormSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {
    updateForm(state, action: PayloadAction<{ propName: T; newValue: CreateListingDTO[T] }>) {
      const { propName, newValue } = action.payload;
      if (!state) return;
      if (propName === 'category' || propName === 'hotelName' || propName === 'description')
        state[propName] = newValue as string;
      if (propName === 'imageUrl') state[propName] = newValue as File;
      if (propName === 'id' || propName === 'occupancy' || propName === 'occupied')
        state[propName] = newValue as number;
      if (propName === 'listingApproved' || propName === 'fullyBooked')
        state[propName] = newValue as boolean;
      if (propName === 'hotelType') state[propName] = newValue as HotelType;
      if (propName === 'createdDate' || propName === 'updatedDate')
        state[propName] = newValue as string;
      if (propName === 'hotelAmenities') state[propName] = newValue as ListingAmenities;
      if (propName === 'rooms') state[propName] = newValue as CreateRoomDTO[];
      if (propName === 'reservations') state[propName] = newValue as Reservation[];
      if (propName === 'location') state[propName] = newValue as CountrySelectValue;
    },
    updateLocation(state, action: PayloadAction<[number, number]>) {
      if (!state.location) return;
      state.location.latlng = action.payload;
    },
  },
});

export const { updateForm, updateLocation } = listingFormSlice.actions;

export default listingFormSlice;
