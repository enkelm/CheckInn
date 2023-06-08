import React from 'react';
import Heading from '../../../components/UI/TextFromat/Heading';
import { links } from '../../../assests/image-links';
import CategoryInput from './CategoryInput';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { updateForm } from '../../../store/listingForm-slice';

const CategoryPicker = () => {
  const form = useAppSelector((state) => state.createListing);
  const dispatch = useAppDispatch();
  return (
    <div className='flex flex-col gap-8'>
      <Heading title='Which of these best describes your place?' subtitle='Pick a category' />
      <div
        className='
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        '
      >
        {links.map((item, key) => (
          <div key={key} className='col-span-1'>
            <CategoryInput
              onClick={(category) =>
                dispatch(updateForm({ propName: 'category', newValue: category }))
              }
              selected={form.category === item.label}
              label={item.label}
              icon={item.imgSrc}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPicker;
