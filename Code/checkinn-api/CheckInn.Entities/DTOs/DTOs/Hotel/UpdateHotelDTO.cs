using System.ComponentModel.DataAnnotations;
using Entities.DTOs.Amenities;

namespace Entities.DTOs;

public class UpdateHotelDTO : CreateHotelDTO
{
    [Required] public long Id { get; set; }

    public UpdateHotelDTO()
    {
        HotelAmenities = new UpdateHotelAmenitiesDTO()
        {
            HotelId = Id
        };
    }
}