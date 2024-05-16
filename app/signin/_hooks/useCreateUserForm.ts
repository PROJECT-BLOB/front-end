// import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Errors } from '@/types/Errors';
import createUser from '@apis/user/sign/createUser';
import useModalStore from '@stores/useModalStore';
import { useUserStore } from '@stores/userStore';

export default function useCreateUserForm() {
  const router = useRouter();
  const { toggleModal } = useModalStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onBlur' });
  const { signin, setBlobId } = useUserStore();

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(userData: FieldValues) {
    const { id, nickname } = userData;

    // 회원가입 요청
    const { status } = await createUser({ id, nickname });

    if (status === 200) {
      // 회원가입 성공하면 로컬스토리지에 블롭아이디 저장
      setBlobId(id);
      signin();
      toggleModal();
      router.push('/map');

      return;
    }

    toggleModal();
  }

  // useEffect(() => {
  //   const subscirbe = watch((data, { name }) => console.log(data, name));

  //   return () => subscirbe.unsubscribe();
  // }, [watch]);

  return { register, handleSubmit, onSubmit, cancelForm, watch, errors: errors as Errors };
}
