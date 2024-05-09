import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, reset, setValue } = useForm<ContentField>();
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
      title: '제목',
      content: '내용',
      category: 'QUESTION',
    };

    try {
      if (currentPosition) {
        const formDataToSend = new FormData();

        // const formData2 = {
        //   title: formData.title,
        //   content: formData.content,
        //   lat: String(currentPosition.lat),
        //   lng: String(currentPosition.lng),
        // };

        // formDataToSend.append('title', formData.title);
        // formDataToSend.append('content', formData.content);
        // formDataToSend.append('lat', String(currentPosition.lat));
        // formDataToSend.append('lng', String(currentPosition.lng));

        formDataToSend.append('data', new Blob([JSON.stringify(formData)]));

        formData.image.forEach((image) => {
          // formDataToSend.append(`image${index}`, image);
          formDataToSend.append(`file`, image);
        });
        // //

        // const jsonData = { nickname, bio, isPublic, lat: 12, lng: 12 };

        // const formData = new FormData();
        // formData.append('data', new Blob([JSON.stringify(jsonData)]));
        // // formData.append('data', jsonData);

        // if (selectedImage) {
        //   formData.append('file', selectedImage);
        // }

        // console.log({ ...formData });
        // //
        await createPost(formDataToSend);
        console.log('Post created successfully');
      } else {
        console.error('Current position is null');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }

    // toggleModal();
  }

  return { register, setValue, handleSubmit, onSubmit, cancelForm };
}
