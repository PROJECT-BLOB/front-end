import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import { Errors } from '@/types/Errors';
import createPost from '@apis/post/createPost';
import { posts } from '@queries/usePostQueries';

export interface ContentField {
  title: string;
  content: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
  cityLat: number;
  cityLng: number;
  category: string;
  address: string;
  image: FileList; // FileList로 변경하여 다중 파일을 처리
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
  const [currentPosition, setCurrentPosition] = useState<LatLngLiteralOrNull>({ lat: 0, lng: 0 });
  const queryClient = useQueryClient();

  console.log('currentPosition', currentPosition);

  function cancelForm() {
    reset();
    toggleModal();
  }

  useEffect(() => {
    // 페이지가 로드될 때 현재 위치 가져오기
    getCurrentPosition();
  }, []);

  const getCurrentPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current position', error);
        },
      );
    } else {
      console.error('Geolocation is not available');
    }
  };

  async function onSubmit(formData: ContentField) {
    console.log(formData);

    formData = {
      ...formData,
      cityLat: 37.5518911,
      cityLng: 126.9917937,
      city: '서울', // 임시값, 선택된 도시로 대체할 것
      country: '대한민국', // 임시값, 선택된 국가로 대체할 것
      category: 'QUESTION', // 임시값, 선택된 카테고리로 대체할 것
    };

    try {
      if (currentPosition) {
        const formDataToSend = new FormData();

        // 이미지 파일 추가
        for (let i = 0; i < formData.image.length; i++) {
          formDataToSend.append('file', formData.image[i]);
        }

        // 데이터 추가
        formDataToSend.append('data', JSON.stringify(formData));

        await createPost(formDataToSend);
        // 임시: 만들어졌을 시 피드 업데이트
        queryClient.invalidateQueries({ queryKey: posts.feedList().queryKey });
        console.log('Post created successfully');
      } else {
        console.error('Current position is null');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }

    toggleModal();
  }

  return { getCurrentPosition, register, setValue, handleSubmit, onSubmit, cancelForm, errors: errors as Errors };
}
