import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { ContentField } from '@/app/map/_hooks/useCreateForm';

interface UploadImageProps {
  // TODO: 오류가 난다...
  // type: 'post' | 'comment';
  setValue: UseFormSetValue<ContentField>;
}

export default function useUploadImage({ setValue }: UploadImageProps) {
  const [imageList, setImageList] = useState<File[]>([]);

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newImage = Array.from(e.target.files);
      const currentImageList = [...imageList, ...newImage];
      // setValue('image', newImage);

      if (imageList.length + newImage.length > 5) {
        // alert('이미지는 5개까지만 업로드 가능합니다.');
        return;
      }

      // 임시..
      setImageList(currentImageList);
      setValue('image', currentImageList); // setValue 함수의 인수를 FileList로 변경
    }
  }

  return { imageList, handleChangeImage };
}
