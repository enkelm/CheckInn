using AutoMapper;
using Entities.DTOs.Amenities;
using Entities.DTOs.DTOs.Reservation;
using Entities.DTOs.DTOs.Room;
using Entities.DTOs.DTOs.Room.Amenities;
using Entities.DTOs.DTOs.User;
using Entities.Entities;
using Newtonsoft.Json;

namespace Entities.DTOs.Config;

public class MappingConfig : Profile
{
    public MappingConfig()
    {
        CreateMap<Hotel, HotelDTO>()
            .ForMember(hotelDto => hotelDto.ImageUrl, d => d.MapFrom(src => JsonConvert.DeserializeObject(src.ImageUrl)))
            .ReverseMap()
            .ForMember(hotel => hotel.ImageUrl, d => d.MapFrom(src => JsonConvert.SerializeObject(src.ImageUrl)));
        CreateMap<Hotel, CreateHotelDTO>()
            .ForMember(createHotelDto => createHotelDto.ImageUrl, d => d.MapFrom(src => JsonConvert.DeserializeObject(src.ImageUrl) ))
            .ReverseMap()
            .ForMember(hotel => hotel.ImageUrl, d => d.MapFrom(src => JsonConvert.SerializeObject(src.Rooms.SelectMany(x => x.ImagesUrl).Concat(src.ImageUrl)) ));
        CreateMap<Hotel, UpdateHotelDTO>().ReverseMap();

        CreateMap<HotelAmenities, HotelAmenitiesDTO>().ReverseMap();
        CreateMap<HotelAmenities, CreateHotelAmenitiesDTO>().ReverseMap();
        CreateMap<HotelAmenities, UpdateHotelAmenitiesDTO>().ReverseMap();

        CreateMap<Room, RoomDTO>()
            .ForMember(roomDto => roomDto.ImagesUrl, d => d.MapFrom(src => JsonConvert.DeserializeObject(src.ImagesUrl)))
            .ReverseMap()
            .ForMember(room => room.ImagesUrl, d => d.MapFrom(src => JsonConvert.SerializeObject(src.ImagesUrl)));
        CreateMap<Room, CreateRoomDTO>()
            .ForMember(createRoomDto => createRoomDto.ImagesUrl, d => d.MapFrom(src => JsonConvert.SerializeObject(src.ImagesUrl) ))
            .ReverseMap()
            .ForMember(room => room.ImagesUrl, d => d.MapFrom(src => JsonConvert.SerializeObject(src.ImagesUrl) ));
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