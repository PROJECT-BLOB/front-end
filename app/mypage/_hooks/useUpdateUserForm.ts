/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Errors } from '@/types/Errors';
import updateUserProfile, { UpdateUser } from '@apis/user/mypage/updateUserProfile';
import useModalStore from '@stores/useModalStore';

export default function useUpdateUserForm(initialData: UpdateUser) {
  const { toggleModal } = useModalStore();
  const [isPublic, setIsPublic] = useState(initialData.isPublic);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  // TODO: 토글에 작은 버그있음....나중에 고쳐야지
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: initialData,
  });

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(userProfileData: FieldValues) {
    const { nickname, bio } = userProfileData;
    const jsonData = { nickname, bio, isPublic, lat: 12, lng: 12 };

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(jsonData)]));

    if (selectedImage) {
      formData.append('file', selectedImage);
    }

    const { data, status } = await updateUserProfile(formData);
    console.log('data', data);

    if (status === 200) {
      console.log('프로필 수정 성공');
      // TODO: 모달을 닫기 전에 성공했다고 alert창을 띄우는게 좋지 않을까?
      toggleModal();

      return;
    }

    toggleModal();
  }

  const onChangeToggle = (checked: boolean) => {
    setIsPublic(checked);
  };

  useEffect(() => {
    const subscirbe = watch((data, { name }) => console.log(''));

    return () => subscirbe.unsubscribe();
  }, [watch]);

  return {
    register,
    handleSubmit,
    onSubmit,
    cancelForm,
    watch,
    isPublic,
    onChangeToggle,
    selectedImage,
    setSelectedImage,
    handleChangeImage,
    errors: errors as Errors,
  };
}
