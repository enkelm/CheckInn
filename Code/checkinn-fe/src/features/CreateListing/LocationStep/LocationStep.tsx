import React from 'react';
import Heading from '../../../components/UI/TextFromat/Heading';
import SelectCountry from './SelectCountry';
import Map from './Map';
import { useAppDispatch } from '../../../hooks/store-hooks';
import { updateForm, updateLocation } from '../../../store/listingForm-slice';
import { CountrySelectValue } from '../../../data';

const LocationStep = () => {
  const dispatch = useAppDispatch();

  const positionHandler = (value: CountrySelectValue) =>
    dispatch(updateForm({ propName: 'location', newValue: value }));

  return (
    <div className='flex flex-col gap-8'>
      <Heading title='Where is your place located?' subtitle='Help guests find you!' />
      <SelectCountry onChange={positionHandler} />
      <Map onClick={(value: [number, number]) => dispatch(updateLocation(value))} />
    </div>
  );
};

export default LocationStep;
