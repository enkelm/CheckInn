import React, { useState, useMemo, useCallback } from 'react';
import CModal from '../../components/UI/Modal/Modal';
import CButton from '../../components/UI/Button/Button';
import { Box } from '@mui/material';
import { flexCenter } from '../../assests/common-styles';
import CategoryPicker from './CategoryStep/CategoryPicker';
import LocationStep from './LocationStep/LocationStep';
import InfoStep from './InfoStep/InfoStep';
import DescriptionStep from './DescriptionStep/DescriptionStep';
import { useAppSelector } from '../../hooks/store-hooks';
import RoomsStep from './RoomsStep/RoomsStep';
import ImageStep from './ImageStep/ImageStep';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  ROOMS = 3,
  DESCRIPTION = 4,
  IMAGES = 5,
}

export interface IForm {
  category: string;
}

const CreateListing = () => {
  const form = useAppSelector((state) => state.createListing);
  const [uploadImages, setUploadImages] = useState<File[][]>([]);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => setStep((value) => value - 1);
  const onNext = () =>
    setStep((value) => {
      if (value === 5) return value;
      return value + 1;
    });

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) return 'Create';
    return 'Next';
  }, [step]);

  const renderStep = useCallback(
    (step: number) => {
      switch (step) {
        case STEPS.CATEGORY:
          return <CategoryPicker />;

        case STEPS.LOCATION:
          return <LocationStep />;

        case STEPS.INFO:
          return <InfoStep />;

        case STEPS.ROOMS:
          return <RoomsStep />;

        case STEPS.DESCRIPTION:
          return <DescriptionStep />;

        case STEPS.IMAGES:
          return <ImageStep setImages={setUploadImages} />;

        default:
          break;
      }
    },
    [step],
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
  };

  return (
    <CModal type='createListingModal' sx={{ minWidth: '40vw', minHeight: '40vh' }}>
      <form onSubmit={submitHandler}>
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
            <CButton
              sx={{ width: step === STEPS.CATEGORY ? '100%' : '50%' }}
              type={step === STEPS.IMAGES ? 'submit' : 'button'}
              onClick={onNext}
            >
              {actionLabel}
            </CButton>
          </Box>
        </Box>
      </form>
    </CModal>
  );
};

export default CreateListing;
