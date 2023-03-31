using CheckInn.Services.Base;
using Entities.DTOs;

namespace CheckInn.Services.Hotels;

public interface IHotelService
{
    Task<IEnumerable<HotelDTO>> GetHotels();
    Task<HotelDTO> GetHotel(long id);
    Task<bool> Update(UpdateHotelDTO hotelDto);
}