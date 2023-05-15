import React, { FC, useState } from 'react';
import Box from '@mui/material/Box/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import SwipeableViews, { OnChangeIndexCallback } from 'react-swipeable-views';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  carouselDot,
  carouselImage,
  dFlex,
  fixedBottom,
  fixedIcon,
  flexBetween,
} from '../../assests/common-styles';
import CButton from '../../components/UI/Button/Button';
import './ListingCard.css';

interface ListingCardProps {
  location: {
    id: number;
    locationImages: {
      id: number;
      url: string;
    }[];
    location: string;
    days: string;
    price: string;
    isNew: boolean;
    rating: number;
  };
}

const ListingCard: FC<ListingCardProps> = ({ location }) => {
  const [activeStep, setActiveStep] = useState(0);

  const maxSteps = location.locationImages.length; // so that we know how many dots

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange: OnChangeIndexCallback | undefined = (step) => {
    step && setActiveStep(step); // handle swipe change
  };

  return (
    <Box
      className='carouselCard'
      sx={{
        flexGrow: 1,
        position: 'relative',
      }}
    >
      <Box sx={{ ...fixedIcon, '&:hover': { cursor: 'pointer' } }}>
        <FavoriteBorderIcon sx={{ fontSize: 24, color: 'white' }} />
      </Box>

      {location.locationImages.length !== 0 && (
        <SwipeableViews
          axis={'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {location.locationImages.map((step, index) => {
            return (
              <div key={index}>
                <Box component='img' sx={carouselImage} src={step.url} alt={step.url} />
              </div>
            );
          })}
        </SwipeableViews>
      )}

      <Box sx={fixedBottom}>
        <MobileStepper
          sx={{ backgroundColor: 'transparent' }}
          steps={maxSteps}
          position='static'
          activeStep={activeStep}
          nextButton={
            <CButton
              size='small'
              sx={carouselDot}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </CButton>
          }
          backButton={
            <CButton size='small' sx={carouselDot} onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
            </CButton>
          }
        />
      </Box>

      <Box sx={flexBetween}>
        <Box sx={{ mt: 2 }}>
          <Typography component='h3'> {location.location}</Typography>
          <Typography component='h4'> {location.days}</Typography>
          <Typography component='h5'> {location.price}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ ...dFlex, alignItems: 'center', justifyContent: 'center' }}>
            {location.isNew ? (
              <>
                <Typography component='h5'>New</Typography>
                <StarIcon sx={{ fontSize: 18 }} />
              </>
            ) : (
              <>
                <Typography component='h5'> {location.rating}</Typography>
                <StarIcon sx={{ fontSize: 18 }} />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;
