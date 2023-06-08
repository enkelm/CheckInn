import React, { useState } from 'react';
import Heading from '../../../components/UI/TextFromat/Heading';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import Input from '../../../components/UI/Input/Input';
import { updateForm } from '../../../store/listingForm-slice';
import { roomsCopy } from '../../../store';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RoomsStep = () => {
  const rooms = useAppSelector((state) => state.createListing.rooms);
  const [bedType, setBedType] = useState({ label: '', value: '' });
  const dispatch = useAppDispatch();

  return (
    <>
      <Heading title='Setup your rooms' subtitle='What amenities do they have?' />
      <div className='flex flex-col gap-1 min-w-[45vw] min-h-[50vh] max-h-[50vh] overflow-y-auto py-0.5'>
        {rooms.map((room, key) => (
          <Accordion key={key} sx={{ width: '100%' }} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>{`Room ${key + 1}`}</div>
            </AccordionSummary>
            <AccordionDetails className='grid grid-cols-2 gap-x-16 gap-y-8'>
              <Input
                type='text'
                label='Description'
                value={room.description}
                onChange={(e) =>
                  dispatch(
                    updateForm({
                      propName: 'rooms',
                      newValue: roomsCopy('description', e.target.value, key),
                    }),
                  )
                }
              />

              <Input
                type='number'
                label='Number of Guests'
                required
                value={room.occupancy}
                onChange={(e) =>
                  dispatch(
                    updateForm({
                      propName: 'rooms',
                      newValue: roomsCopy('occupancy', e.target.value, key),
                    }),
                  )
                }
              />

              <Input
                type='number'
                label='Minimum days per booking'
                required
                value={room.minimumBookingTime}
                onChange={(e) =>
                  dispatch(
                    updateForm({
                      propName: 'rooms',
                      newValue: roomsCopy('minimumBookingTime', e.target.value, key),
                    }),
                  )
                }
              />

              <Input
                type='number'
                label='Default days per Booking'
                required
                value={room.defaultBookingTime}
                onChange={(e) =>
                  dispatch(
                    updateForm({
                      propName: 'rooms',
                      newValue: roomsCopy('defaultBookingTime', e.target.value, key),
                    }),
                  )
                }
              />

              <Input
                type='number'
                label='Price per night'
                required
                value={room.pricePerNight}
                onChange={(e) =>
                  dispatch(
                    updateForm({
                      propName: 'rooms',
                      newValue: roomsCopy('pricePerNight', e.target.value, key),
                    }),
                  )
                }
                // style={{ gridColumn: '1 / -1' }}
                endAdornment={<span style={{ marginLeft: '1rem' }}>LEK</span>}
              />

              <Select
                options={[
                  { label: 'Single', value: 'Single' },
                  { label: 'Double', value: 'Double' },
                  { label: 'Couch', value: 'Couch' },
                ]}
                value={bedType}
                onChange={(value) => {
                  if (!value) return;
                  setBedType(value);
                  dispatch(
                    updateForm({
                      propName: 'rooms',
                      newValue: roomsCopy('roomAmenities', value.value, key),
                    }),
                  );
                }}
                formatOptionLabel={(option) => (
                  <div className='flex flex-row items-center gap-3' style={{ zIndex: 100 }}>
                    <div>{option.label}</div>
                    {/* <div>
                      {option},<span className='text-neutral-500 ml-1'>{option}</span>
                    </div> */}
                  </div>
                )}
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

              <FormControl className='col-span-full'>
                <FormLabel>Room Amenities</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  onChange={(e) => {
                    dispatch(
                      updateForm({
                        propName: 'rooms',
                        newValue: roomsCopy('roomAmenities', e.target.value, key),
                      }),
                    );
                  }}
                >
                  <FormControlLabel
                    value='kitchen'
                    control={<Radio checked={room.roomAmenities.kitchen} />}
                    label='Kitchen'
                  />
                  <FormControlLabel
                    value='privateBathroom'
                    control={<Radio checked={room.roomAmenities.privateBathroom} />}
                    label='Private Bath'
                  />
                  <FormControlLabel
                    value='balcony'
                    control={<Radio checked={room.roomAmenities.balcony} />}
                    label='Balcony'
                  />
                  <FormControlLabel
                    value='tv'
                    control={<Radio checked={room.roomAmenities.tv} />}
                    label='TV'
                  />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default RoomsStep;
