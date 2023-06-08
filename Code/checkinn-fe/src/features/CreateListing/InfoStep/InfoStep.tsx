import React, { useState } from 'react';
import Heading from '../../../components/UI/TextFromat/Heading';
import Counter from '../../../components/UI/Input/Counter';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { updateForm } from '../../../store/listingForm-slice';
import { initialRoom } from '../../../data';

const InfoStep = () => {
  const guestCount = useAppSelector((state) => state.createListing.occupancy);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const dispatch = useAppDispatch();
  return (
    <div className='flex flex-col gap-8'>
      <Heading title='Share some basics about your place' subtitle='What amenitis do you have?' />
      <Counter
        onChange={(value) => dispatch(updateForm({ propName: 'occupancy', newValue: value }))}
        value={guestCount}
        title='Guests'
        subtitle='How many guests do you allow?'
      />
      <hr />
      <Counter
        onChange={(value) => {
          setRoomCount(value);
          dispatch(updateForm({ propName: 'rooms', newValue: Array(value).fill(initialRoom) }));
        }}
        value={roomCount}
        title='Rooms'
        subtitle='How many rooms do you have?'
      />
      <hr />
      <Counter
        onChange={(value) => setBathroomCount(value)}
        value={bathroomCount}
        title='Bathrooms'
        subtitle='How many bathrooms do you have?'
      />
    </div>
  );
};

export default InfoStep;
