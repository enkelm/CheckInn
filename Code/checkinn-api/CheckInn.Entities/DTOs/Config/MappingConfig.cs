using AutoMapper;
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

        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<User, LoginUserDTO>().ReverseMap();
    }
}