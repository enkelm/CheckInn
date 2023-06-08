import React from 'react';
import Heading from '../../../components/UI/TextFromat/Heading';
import Input from '../../../components/UI/Input/Input';

const PriceStep = () => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading title='Now, set your price' subtitle='How much do you charge per night?' />
      <Input
        label='Price'
        type='number'
        required
        endAdornment={<span style={{ marginLeft: '1rem' }}>LEK</span>}
      />
    </div>
  );
};

export default PriceStep;
