import { useEffect } from 'react';
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
  const { signin } = useUserStore();

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(userData: FieldValues) {
    const { id, nickname } = userData;
    // 회원가입 요청

    const { data, status } = await createUser({ id, nickname });
    console.log('data', data);

    if (status === 200) {
      console.log('회원가입 성공');
      // TODO: 일단 마이페이지로 이동시킴. 나중에 맵으로 이동하는 것으로 변경예정
      signin();
      router.push('/mypage');
      // router.push('/map');

      return;
    }

    toggleModal();
  }

  useEffect(() => {
    const subscirbe = watch((data, { name }) => console.log(data, name));

    return () => subscirbe.unsubscribe();
  }, [watch]);

  return { register, handleSubmit, onSubmit, cancelForm, watch, errors: errors as Errors };
}
