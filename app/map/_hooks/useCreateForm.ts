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
  actualLat: number | null | undefined;
  actualLng: number | null | undefined;
  category: string;
  subcategory: string;
  address: string;
  image: File[];
}

export default function useCreateForm(toggleModal: () => void, formatArray: () => string) {
  const { currentPosition } = useMapStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContentField>();
  const queryClient = useQueryClient();
  const mapState = useMapStore((state) => state);
  const { lastSearchCity, lastMapCenter } = mapState;
  const formattedCategories = formatArray();
  const [category, subcategory] = formattedCategories.split(':');

  console.log('currentPosition', currentPosition);

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(formData: ContentField) {
    formData = {
      ...formData,
      cityLat: lastSearchCity?.location?.lat ?? 0,
      cityLng: lastSearchCity?.location?.lng ?? 0,
      city: lastSearchCity?.city ?? '',
      country: lastSearchCity?.country ?? '',
      actualLat: currentPosition?.lat,
      actualLng: currentPosition?.lng,
      lat: lastMapCenter?.lat ?? 0,
      lng: lastMapCenter?.lng ?? 0,
      category: category ?? '',
      subcategory: subcategory ?? '',
    };

    // const formattedCategories = formatArray();
    // formData.category = formattedCategories;

    // 현재위치 누르면 lat, lng도 현재위치로 바뀜
    try {
      const formDataToSend = new FormData();

      if (formData.image) {
        for (let i = 0; i < formData.image.length; i++) {
          formDataToSend.append('file', formData.image[i]);
        }
      }

      formDataToSend.append('data', new Blob([JSON.stringify(formData)]));

      await createPost(formDataToSend);
      queryClient.invalidateQueries({ queryKey: posts.feedList().queryKey });
      console.log('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
    }

    toggleModal();
  }

  return { register, setValue, handleSubmit, onSubmit, cancelForm, errors: errors as Errors };
}
