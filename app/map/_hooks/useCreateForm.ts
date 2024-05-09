import { useState } from 'react';
import { useForm } from 'react-hook-form';

import createPost from '@apis/post/createPost';

export interface ContentField {
  title: string;
  content: string;
  lat: number;
  lng: number;
  cityName: string;
  image: string[];
}

// 수정된 onSubmit 함수
type LatLngLiteralOrNull = google.maps.LatLngLiteral | null;

export default function useCreateForm(toggleModal: () => void) {
  const { register, handleSubmit, reset, setValue } = useForm<ContentField>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPosition, setCurrentPosition] = useState<LatLngLiteralOrNull>(null);

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(formData: ContentField) {
    try {
      if (currentPosition) {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('lat', String(currentPosition.lat));
        formDataToSend.append('lng', String(currentPosition.lng));
        formData.image.forEach((image, index) => {
          formDataToSend.append(`image${index}`, image);
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

  return { register, setValue, handleSubmit, onSubmit, cancelForm };
}
