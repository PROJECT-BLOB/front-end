import React, { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import Image from 'next/image';

import { ContentField } from '../../_hooks/useCreateForm';

interface ModalImageProps {
  setValue: UseFormSetValue<ContentField>;
}

export default function ModalImage({ setValue }: ModalImageProps) {
  const [imageList, setImageList] = useState<string[]>([]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newImage = Array.from(e.target.files) as File[];
      const images = [...imageList, URL.createObjectURL(newImage[0])];

      if (imageList.length + newImage.length > 5) {
        // alert('이미지는 5개까지만 업로드 가능합니다.');
        return;
      }

      setImageList((prevImages) => [...prevImages, URL.createObjectURL(newImage[0])]);

      setValue('image', images);
    }
  }

  return (
    <>
      {imageList &&
        imageList.map((image) => (
          <Image
            key={image}
            src={image}
            alt='이미지'
            width={100} // 원하는 너비를 설정하세요
            height={100} // 원하는 높이를 설정하세요
          />
        ))}
      <label htmlFor='inputFile'>이미지</label>
      <input type='file' id='inputFile' accept='image/*' multiple onChange={handleImageChange} />
    </>
  );
}
