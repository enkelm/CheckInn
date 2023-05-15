import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ListingCard from './ListingCard';
import { getListingsThunk } from '../../store/listings-slice';

const ListingsContainer = () => {
  const listings = useAppSelector((state) => state.listings);
  // const [isFulfilled, setIsFulfilled] = useState(false);
  const dispatch = useAppDispatch();

  let cleanUp = false;
  useEffect(() => {
    cleanUp && dispatch(getListingsThunk());

    return () => {
      cleanUp = true;
    };
  }, []);

  return (
    <>
      {listings.map((listing, key) => (
        <ListingCard key={key} listing={listing} />
      ))}
    </>
  );
};

export default ListingsContainer;
