import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Errors } from '@/types/Errors';
import createPost from '@apis/post/createPost';

export interface ContentField {
  title: string;
  content: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
  category: string;
  image: File[];
}

// 수정된 onSubmit 함수
type LatLngLiteralOrNull = google.maps.LatLngLiteral | null;

export default function useCreateForm(toggleModal: () => void) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContentField>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPosition, setCurrentPosition] = useState<LatLngLiteralOrNull>({ lat: 12, lng: 12 });
  console.log('currentPosition', currentPosition);

  function cancelForm() {
    reset();
    toggleModal();
  }

  useEffect(() => {
    setCurrentPosition({ lat: 12, lng: 12 });
  }, []);

  async function onSubmit(formData: ContentField) {
    console.log(formData);

    formData = {
      ...formData,
      city: '서울',
      country: '대한민국',
      // title: '제목',
      // content: '내용',
      category: 'QUESTION',
    };

    try {
      if (currentPosition) {
        const formDataToSend = new FormData();

        formDataToSend.append('data', new Blob([JSON.stringify(formData)]));

        formData.image.forEach((image) => {
          // formDataToSend.append(`image${index}`, image);
          formDataToSend.append(`file`, image);
        });
        await createPost(formDataToSend);
        console.log('Post created successfully');
      } else {
        console.error('Current position is null');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }

    toggleModal();
  }

  return { register, setValue, handleSubmit, onSubmit, cancelForm, errors: errors as Errors };
}
