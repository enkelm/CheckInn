import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ListingCard from './ListingCard';
import { getListingsThunk } from '../../store/listings-slice';

const ListingsContainer = () => {
  const listings = useAppSelector((state) => state.listings);
  const dispatch = useAppDispatch();

  let cleanUp = false;
  useEffect(() => {
    console.log('start', cleanUp);
    (async () => {
      if (!cleanUp) {
        const action = await dispatch(getListingsThunk());
        return action;
      }
    })().then((res) => res?.meta.requestStatus === 'fulfilled');

    // return cleanUpFunction(isFullilled, controllBool);
    return () => {
      cleanUp = true;
    };
  }, []);

  return (
    <>
      {listings.map((listing, key) => (
        <ListingCard key={key} listing={listing} />
      ))}
      {'bruh'}
    </>
  );
};

export default ListingsContainer;
