import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getListingThunk } from '../store/listings-slice';
import { Listing } from '../data';
import { Box } from '@mui/material';
import ListingHeader from '../features/ListingPage/ListingHeader';

const ListingDetails = () => {
  const listingId = useParams().listingId;
  const listings = useAppSelector((state) => state.listings);
  const [listing, setListing] = useState<Listing | undefined>(
    listings.find((listing) => listingId && listing.id === parseInt(listingId)),
  );
  const dispatch = useAppDispatch();

  let cleanUp = false;
  useEffect(() => {
    !cleanUp &&
      listingId &&
      listing === undefined &&
      dispatch(
        getListingThunk({
          id: parseInt(listingId),
          setLisiting: setListing,
          cancelToken: undefined,
        }),
      );
    return () => {
      cleanUp = true;
    };
  }, []);
  return (
    <Box sx={{ margin: '0 20%' }}>
      <ListingHeader listing={listing} />
    </Box>
  );
};

export default ListingDetails;
