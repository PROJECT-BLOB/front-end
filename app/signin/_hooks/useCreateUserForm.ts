import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Errors } from '@/types/Errors';
import createUser from '@apis/user/sign/createUser';
import useModalStore from '@stores/useModalStore';
import { useUserStore } from '@stores/userStore';

export interface ContentField {
  id: string;
  nickname: string;
}

export default function useCreateUserForm() {
  const router = useRouter();
  const { toggleModal } = useModalStore();

  // TODO: value를 state로 관리하지 않으니 입력한 글자 길이를 표시할 때 문제가 있음..
  // getValues를 사용하면 focus out 될 때만 글자 길이가 업데이트 됨 ㅜㅜ 그래서 mode를 onChange로 해야하나 고민중ㅜㅜ
  const {
    register,
    handleSubmit,
    reset,
    getValues,
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

  return { register, handleSubmit, onSubmit, cancelForm, getValues, errors: errors as Errors };
}
