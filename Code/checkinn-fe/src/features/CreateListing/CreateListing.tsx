import React, { useState, useMemo } from 'react';
import CModal from '../../components/UI/Modal/Modal';
import CButton from '../../components/UI/Button/Button';
import { Box } from '@mui/material';
import { flexCenter } from '../../assests/common-styles';
// import { styled } from '@mui/material';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const CreateListing = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => setStep((value) => value - 1);
  const onNext = () =>
    setStep((value) => {
      if (value === 5) return value;
      return value + 1;
    });

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create';
    return 'Next';
  }, [step]);

  return (
    <CModal title='List your property!' type='createListingModal' sx={{ width: '40vw' }}>
      <Box sx={{ ...flexCenter, flexDirection: 'column' }}>
        <Box sx={{ ...flexCenter, width: '80%', gap: '2rem' }}>
          {step !== STEPS.CATEGORY && (
            <CButton variant='outlined' sx={{ width: '50%' }} onClick={onBack}>
              Back
            </CButton>
          )}

          <CButton sx={{ width: step === STEPS.CATEGORY ? '80%' : '50%' }} onClick={onNext}>
            {actionLabel}
          </CButton>
        </Box>
      </Box>
    </CModal>
  );
};

export default CreateListing;
