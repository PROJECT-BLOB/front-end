import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Errors } from '@/types/Errors';
import updateUserProfile, { UpdateUser } from '@apis/user/mypage/updateUserProfile';
import useModalStore from '@stores/useModalStore';

export default function useUpdateUserForm(initialData: UpdateUser) {
  const { toggleModal } = useModalStore();
  const [isPublic, setIsPublic] = useState(initialData.isPublic);

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
    const { profileUrl, nickname, bio } = userProfileData;

    const formData = {
      // profileUrl,
      nickname,
      bio,
      isPublic,
    };
    console.log('formData', formData);
    // TODO: 지금 500 에러뜸.. 확인 필요
    const { data, status } = await updateUserProfile(formData);
    console.log('data', data);

    // 나머지 코드...
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
    const subscirbe = watch((data, { name }) => console.log(data, name));

    return () => subscirbe.unsubscribe();
  }, [watch]);

  return { register, handleSubmit, onSubmit, cancelForm, watch, isPublic, onChangeToggle, errors: errors as Errors };
}
