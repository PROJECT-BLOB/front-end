import { UseFormSetValue } from 'react-hook-form';

import Image from 'next/image';

import uploadImage from '@utils/uploadImage';

import { ContentField } from '../app/map/_hooks/useCreateForm';

interface ModalImageProps {
  setValue: UseFormSetValue<ContentField>;
}

export default function ImageUploader({ setValue }: ModalImageProps) {
  const { imageList, handleImageChange } = uploadImage({ setValue });

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
