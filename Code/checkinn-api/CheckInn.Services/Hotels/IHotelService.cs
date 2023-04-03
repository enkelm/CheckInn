using CheckInn.Services.Base;
using Entities.DTOs;
using Entities.Entities;

namespace CheckInn.Services.Hotels;

public interface IHotelService
{
    Task<IEnumerable<HotelDTO>> GetHotels();
    Task<HotelDTO> GetHotel(long id);
    Task<HotelDTO> Create(CreateHotelDTO hotelDto);
    Task<bool> Update(UpdateHotelDTO hotelDto);
    Task<bool> Delete(long id);
}