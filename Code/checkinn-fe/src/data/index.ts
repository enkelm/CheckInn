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

export interface CreateListingDTO extends Omit<Listing, 'imageUrl' | 'rooms'> {
  imageUrl: File | null;
  rooms: CreateRoomDTO[];
}

export interface CreateRoomDTO extends Omit<Room, 'imagesUrl'> {
  imagesUrl: File[];
}

export interface Listing {
  id: number;
  hotelName: string;
  location: CountrySelectValue | null;
  category: string;
  listingApproved: boolean;
  description: string;
  rating: number | null;
  occupancy: number;
  occupied: number;
  hotelType: HotelType;
  fullyBooked: boolean;
  imageUrl: string[];
  createdDate: string;
  updatedDate: string;
  hotelAmenities: ListingAmenities;
  rooms: Room[];
  reservations: Reservation[];
}

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: [number, number];
  region: string;
  value: string;
};

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
  minimumBookingTime: number;
  defaultBookingTime: number;
  roomType: RoomType;
  imagesUrl: string[];
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
  bedType: BedType;
  tv: boolean;
}

export enum BedType {
  Single = 0,
  Double = 1,
  Couch = 2,
}

export interface Reservation {
  id: number;
  userId: string;
  hotelId: number;
  approved: boolean;
  totalPrice: number;
  startDate: string;
  endDate: string;
  rooms: Room[] | null;
}

export const initialRoom: CreateRoomDTO = {
  id: 0,
  hotelId: 0,
  description: '',
  occupancy: 1,
  pricePerNight: 0,
  minimumBookingTime: 1,
  defaultBookingTime: 1,
  roomType: RoomType.Bedroom,
  imagesUrl: [],
  roomAmenities: {
    id: 0,
    roomId: 0,
    kitchen: false,
    privateBathroom: false,
    balcony: false,
    bedType: 0,
    tv: false,
  },
};

export const initialReservation: Reservation = {
  id: 0,
  userId: '',
  hotelId: 0,
  approved: false,
  totalPrice: 0,
  startDate: '',
  endDate: '',
  rooms: null,
};

export const initialListing: CreateListingDTO = {
  id: 0,
  hotelName: '',
  location: null,
  category: '',
  listingApproved: false,
  description: '',
  rating: null,
  occupancy: 1,
  occupied: 0,
  hotelType: HotelType.Apartment,
  fullyBooked: false,
  imageUrl: null,
  createdDate: '',
  updatedDate: '',
  hotelAmenities: {
    hotelId: 0,
    wifi: false,
    pets: false,
    parking: false,
    smoking: false,
    ac: false,
  },
  rooms: [initialRoom],
  reservations: [],
};
