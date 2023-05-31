import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ListingCard from './ListingCard';
import { getListingsThunk } from '../../store/listings-slice';
import { Box, Grid } from '@mui/material';

const ListingsContainer = () => {
  const listings = useAppSelector((state) => state.listings);
  const dispatch = useAppDispatch();

  let cleanUp = false;
  useEffect(() => {
    cleanUp && dispatch(getListingsThunk());

    return () => {
      cleanUp = true;
    };
  }, []);

  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {listings.map((listing, key) => (
          <Grid key={listing.id} item xs={12} sm={4} md={4} lg={3}>
            <ListingCard key={key} location={listing} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListingsContainer;
