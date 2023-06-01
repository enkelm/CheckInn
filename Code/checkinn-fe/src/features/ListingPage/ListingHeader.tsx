import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Listing } from '../../data';
import { flexBetween, flexBetweenCenter, flexCenter } from '../../assests/common-styles';

interface ListingHeaderProps {
  listing: Listing | undefined;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ listing }) => {
  return (
    <Box sx={{ ...flexBetweenCenter }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: '0' }}>{listing?.hotelName}</h1>

        <Box sx={{ ...flexBetweenCenter }}>
          <Box sx={{ ...flexCenter }}>
            <StarIcon sx={{ fontSize: '0.9rem' }} />
            <p>{listing?.rating === null ? 'New' : listing?.rating}</p>
          </Box>
        </Box>
      </Box>

      <div>bruh</div>
    </Box>
  );
};

export default ListingHeader;
