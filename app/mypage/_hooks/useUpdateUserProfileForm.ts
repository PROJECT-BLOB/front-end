import { ChangeEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Errors } from '@/types/Errors';
import { UpdateUser } from '@apis/user/mypage/updateUserProfile';
import { useDeleteProfileImage, useUpdateUserProfile } from '@queries/useUserQueries';
import useModalStore from '@stores/useModalStore';
import { useUserStore } from '@stores/userStore';

export default function useUpdateUserProfileForm(initialData: UpdateUser) {
  const { blobId } = useUserStore();
  const { toggleModal } = useModalStore();
  const { mutate: updateUserProfileMutate } = useUpdateUserProfile(blobId);
  const { mutate: deleteUserProfileMutate } = useDeleteProfileImage(blobId);

  const [isPublic, setIsPublic] = useState(initialData.isPublic);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDeleteProfileImage, setIsDeleteProfileImage] = useState(false);

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedImage(file);
      setIsDeleteProfileImage(false);
    } else {
      // 업로드 취소할 경우
      setSelectedImage(null);
    }
  };

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
    const jsonData = { nickname, bio, isPublic };

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(jsonData)]));

    if (selectedImage) {
      formData.append('file', selectedImage);
    }

    updateUserProfileMutate(formData);

    if (isDeleteProfileImage) {
      deleteUserProfileMutate();
    }

    toggleModal();
  }

  const onChangeToggle = (checked: boolean) => {
    setIsPublic(checked);
  };

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
    isDeleteProfileImage,
    setIsDeleteProfileImage,
    errors: errors as Errors,
  };
}
