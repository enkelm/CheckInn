import React, { useState, useMemo, useCallback } from 'react';
import CModal from '../../components/UI/Modal/Modal';
import CButton from '../../components/UI/Button/Button';
import { Box } from '@mui/material';
import { flexCenter } from '../../assests/common-styles';
import CategoryPicker from './CategoryStep/CategoryPicker';
import LocationStep from './LocationStep/LocationStep';
// import { useAppSelector } from '../../../hooks/hooks';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export interface IForm {
  category: string;
}

const CreateListing = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  // const form = useAppSelector((state) => state.createListing);

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

  const renderStep = useCallback(
    (step: number) => {
      switch (step) {
        case STEPS.CATEGORY:
          return <CategoryPicker />;

        case STEPS.LOCATION:
          return <LocationStep></LocationStep>;

        default:
          break;
      }
    },
    [step],
  );

  return (
    <CModal
      // title='List your property!'
      type='createListingModal'
      sx={{ width: '40vw', minHeight: '40vh' }}
    >
      <form>
        <Box sx={{ ...flexCenter, flexDirection: 'column' }}>
          {renderStep(step)}
          <Box
            sx={{
              ...flexCenter,
              alignItems: 'end',
              width: '80%',
              gap: '2rem',
              marginTop: '2rem',
            }}
          >
            {step !== STEPS.CATEGORY && (
              <CButton variant='outlined' sx={{ width: '50%' }} onClick={onBack}>
                Back
              </CButton>
            )}
            <CButton sx={{ width: step === STEPS.CATEGORY ? '100%' : '50%' }} onClick={onNext}>
              {actionLabel}
            </CButton>
          </Box>
        </Box>
      </form>
    </CModal>
  );
};

export default CreateListing;
