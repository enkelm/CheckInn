using AutoMapper;
using Entities.Entities;

namespace Entities.DTOs.Config;

public class MappingConfig : Profile
{
    public MappingConfig()
    {
        CreateMap<Hotel, HotelDTO>().ReverseMap();
        CreateMap<Hotel, CreateHotelDTO>().ReverseMap();
        CreateMap<Hotel, UpdateHotelDTO>().ReverseMap();
    }
}