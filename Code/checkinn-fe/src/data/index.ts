import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CancelTokenSource } from 'axios';
import {
  AnyAsyncThunk,
  RejectedWithValueActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';

export interface ReqConfig {
  cancelToken?: CancelTokenSource;
  dispatch?: ThunkDispatch<unknown, unknown, AnyAction>;
  rejectWithValue?: (value: unknown) => RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>;
}

export interface Listing {
  id: number;
  hotelName: string;
  listingApproved: boolean;
  description: string;
  rating: number;
  occupancy: number;
  occupied: number;
  hotelType: number;
  fullyBooked: boolean;
  imageUrl: string;
  createdDate: Date;
  updatedDate: Date;
  hotelAmenities: ListingAmenities;
  rooms: Room[];
}

interface ListingAmenities {
  hotelId: number;
  wifi: boolean;
  pets: boolean;
  parking: boolean;
  smoking: boolean;
  ac: boolean;
}

interface Room {
  id: number;
  hotelId: number;
  description: string;
  occupancy: number;
  pricePerNight: number;
  roomType: number;
  imagesUrl: string;
  roomAmenities: RoomAmenities;
}

interface RoomAmenities {
  id: number;
  roomId: number;
  kitchen: boolean;
  privateBathroom: boolean;
  balcony: boolean;
  bedType: number;
  tv: boolean;
}
