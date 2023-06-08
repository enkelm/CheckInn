import React from 'react';
import Heading from '../../../components/UI/TextFromat/Heading';
import ImageUpload from './ImageUpload';

interface ImageStepProps {
  setImages: React.Dispatch<React.SetStateAction<File[][]>>;
}

const ImageStep: React.FC<ImageStepProps> = ({ setImages }) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Add a photo of your place'
        subtitle='Show guests what your place looks like!'
      />
      <ImageUpload setUploadImages={setImages} />
    </div>
  );
};

export default ImageStep;
