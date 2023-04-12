using AutoMapper;
using Entities.DTOs.Amenities;
using Entities.DTOs.DTOs.Reservation;
using Entities.DTOs.DTOs.Room;
using Entities.DTOs.DTOs.Room.Amenities;
using Entities.DTOs.DTOs.User;
using Entities.Entities;

namespace Entities.DTOs.Config;

public class MappingConfig : Profile
{
    public MappingConfig()
    {
        CreateMap<Hotel, HotelDTO>().ReverseMap();
        CreateMap<Hotel, CreateHotelDTO>().ReverseMap();
        CreateMap<Hotel, UpdateHotelDTO>().ReverseMap();

        CreateMap<HotelAmenities, HotelAmenitiesDTO>().ReverseMap();
        CreateMap<HotelAmenities, CreateHotelAmenitiesDTO>().ReverseMap();
        CreateMap<HotelAmenities, UpdateHotelAmenitiesDTO>().ReverseMap();

        CreateMap<Room, RoomDTO>().ReverseMap();
        CreateMap<Room, CreateRoomDTO>().ReverseMap();
        CreateMap<Room, UpdateRoomDTO>().ReverseMap();

        CreateMap<RoomAmenities, RoomAmenitiesDTO>().ReverseMap();
        CreateMap<RoomAmenities, CreateRoomAmenitiesDTO>().ReverseMap();
        CreateMap<RoomAmenities, UpdateRoomAmenitiesDTO>().ReverseMap();

        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<User, LoginUserDTO>().ReverseMap();

        CreateMap<Reservations, ReservationDTO>().ReverseMap();
        CreateMap<Reservations, CreateReservationDTO>().ReverseMap();
        CreateMap<Reservations, UpdateReservationDTO>().ReverseMap();
    }
}