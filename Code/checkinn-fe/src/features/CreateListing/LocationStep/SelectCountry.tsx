import React, { useEffect, useRef } from 'react';
import Select from 'react-select';
import useCountries from '../../../hooks/useCountries';
import { CountrySelectValue } from '../../../data';
import { useAppSelector } from '../../../hooks/store-hooks';

interface CountrySelectProps {
  onChange: (value: CountrySelectValue) => void;
}

const SelectCountry: React.FC<CountrySelectProps> = ({ onChange }) => {
  const value = useAppSelector((state) => state.createListing.location);
  const { getAll } = useCountries();

  return (
    <Select
      placeholder='Anywhere'
      isClearable
      autoFocus
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: any) => (
        <div
          className='
          flex flex-row items-center gap-3'
          style={{ zIndex: 100 }}
        >
          <div>{option.flag}</div>
          <div>
            {option.label},<span className='text-neutral-500 ml-1'>{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6',
        },
      })}
    />
  );
};

export default SelectCountry;
