import React from 'react';
import Heading from '../../../components/UI/TextFromat/Heading';
import Input from '../../../components/UI/Input/Input';

const DescriptionStep = () => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading title='How would you describe your place?' subtitle='Short and sweet works best!' />
      <Input label='Title' required type='text' />
      <hr />
      <Input label='Description' required type='text' />
    </div>
  );
};

export default DescriptionStep;
