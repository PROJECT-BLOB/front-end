import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Errors } from '@/types/Errors';
import createUser from '@apis/user/sign/createUser';
import { useUserStore } from '@stores/userStore';

export interface ContentField {
  id: string;
  nickname: string;
}

export default function useCreateUserForm(toggleModal: () => void) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentField>({ mode: 'onBlur' });
  const { signin } = useUserStore();

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(userData: ContentField) {
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

  return { register, handleSubmit, onSubmit, cancelForm, errors: errors as Errors };
}
