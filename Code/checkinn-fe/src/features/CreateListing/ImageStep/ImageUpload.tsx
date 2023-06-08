import React, { useState, useEffect } from 'react';

interface ImageUploadProps {
  setUploadImages: React.Dispatch<React.SetStateAction<File[][]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setUploadImages }) => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: string[] = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageUrls(newImageUrls);
  }, [images]);

  const seperateImages = (images: File[]) => {
    const slices = [];
    slices.push([images[0]]);
    for (let i = 1; i < images.length; i += 2) {
      const slice = images.slice(i, i + 2);
      slices.push(slice);
    }

    return slices;
  };

  return (
    <>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={(e) => {
          const files = e.target.files;
          files && setImages([...files]);
          files && setUploadImages(seperateImages([...files]));
        }}
      />
      <div className='flex gap-8 justify-center align-center'>
        {imageUrls.map((src, key) => (
          <img key={key} src={src} className='w-[20%] h-[20%]' />
        ))}
      </div>
    </>
  );
};

export default ImageUpload;
