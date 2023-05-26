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
  hotelType: HotelType;
  fullyBooked: boolean;
  imageUrl: string[];
  createdDate: Date;
  updatedDate: Date;
  hotelAmenities: ListingAmenities;
  rooms: Room[];
  reservations: Reservation[];
}

export enum HotelType {
  Apartment = 0,
  House = 1,
}

export interface ListingAmenities {
  hotelId: number;
  wifi: boolean;
  pets: boolean;
  parking: boolean;
  smoking: boolean;
  ac: boolean;
}

export interface Room {
  id: number;
  hotelId: number;
  description: string;
  occupancy: number;
  pricePerNight: number;
  minimumBookingTime: Date;
  defaultBookingTime: Date;
  roomType: RoomType;
  imagesUrl: string;
  roomAmenities: RoomAmenities;
}

export enum RoomType {
  Bedroom = 0,
  Livingroom = 1,
  Studio = 2,
  EntireHotle = 3,
}

export interface RoomAmenities {
  id: number;
  roomId: number;
  kitchen: boolean;
  privateBathroom: boolean;
  balcony: boolean;
  bedType: number;
  tv: boolean;
}

export interface Reservation {
  id: number;
  userId: string;
  hotelId: number;
  approved: boolean;
  totalPrice: number;
  startDate: Date;
  endDate: Date;
  rooms: Room[] | null;
}
