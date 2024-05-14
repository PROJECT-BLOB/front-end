import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import { Errors } from '@/types/Errors';
import createPost from '@apis/post/createPost';
import { posts } from '@queries/usePostQueries';
import { useMapStore } from '@stores/useMapStore';

export interface ContentField {
  title: string;
  content: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
  cityLat: number;
  cityLng: number;
  actualLat: number;
  actualLng: number;
  category: string;
  subcategory: string;
  address: string;
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
  const [currentPosition, setCurrentPosition] = useState<LatLngLiteralOrNull>({ lat: 0, lng: 0 });
  const queryClient = useQueryClient();
  const mapState = useMapStore((state) => state);
  const { lastSearchCity } = mapState;

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
      cityLat: lastSearchCity?.location?.lat ?? 0, // 시티 레벨 검색바에서 가져오기 => 어떻게 해야할까???
      cityLng: lastSearchCity?.location?.lng ?? 0, // 시티 레벨 검색바에서 가져오기
      city: lastSearchCity?.city ?? '', // 시티 레벨 검색바에서 가져오기
      country: lastSearchCity?.country ?? '', // 시티 레벨 검색바에서 가져오기
      actualLat: currentPosition?.lat ?? 0, // 현재 정보 가져온거에서 가져오기
      actualLng: currentPosition?.lng ?? 0, // 현재 정보 가져온거에서 가져오기
      lat: lastSearchCity?.location?.lat ?? 0, // 상세 주소 좌표 -> 미니맵에서 가져오기
      lng: lastSearchCity?.location?.lng ?? 0, // 상세 주소 좌표 -> 미니맵에서 가져오기
      category: 'QUESTION', // 카테고리 중복선택 이슈
      subcategory: 'WEATHER',
    };

    try {
      if (currentPosition) {
        const formDataToSend = new FormData();

        // 이미지 파일 추가
        for (let i = 0; i < formData.image.length; i++) {
          formDataToSend.append('file', formData.image[i]);
        }

        // 데이터 추가
        formDataToSend.append('data', new Blob([JSON.stringify(formData)]));

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
