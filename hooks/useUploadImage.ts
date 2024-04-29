import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { ContentField } from '@/app/map/_hooks/useCreateForm';

interface UploadImageProps {
  setValue: UseFormSetValue<ContentField>;
}

export default function useUploadImage({ setValue }: UploadImageProps) {
  const [imageList, setImageList] = useState<string[]>([]);

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newImage = Array.from(e.target.files) as File[];
      const currentImageList = [...imageList, URL.createObjectURL(newImage[0])];

      // TODO: 상황에 따라 이미지 업로드되는 파일이 1개도 될 수 있게 수정

      if (imageList.length + newImage.length > 5) {
        // alert('이미지는 5개까지만 업로드 가능합니다.');
        return;
      }

      setImageList((previousImages) => [...previousImages, URL.createObjectURL(newImage[0])]);

      setValue('image', currentImageList); // hook form 사용시 사용, 추후 hook form 사용 안하는 데이터 있을 시 로직 추가
    }
  }

  return { imageList, handleChangeImage };
}
