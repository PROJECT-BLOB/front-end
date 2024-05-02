import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import createUser from '@apis/user/sign/createUser';
import { useOAuthStore } from '@stores/useOAuthStore';
// import { useUserStore } from '@stores/userStore';

export interface ContentField {
  id: string;
  nickname: string;
}

export default function useCreateUserForm(toggleModal: () => void) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<ContentField>();
  const { oauthId } = useOAuthStore();

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(userData: ContentField) {
    const { id, nickname } = userData;
    // 회원가입 요청

    const { data, status } = await createUser({ oauthId, id, nickname });
    console.log('data', data);

    if (status === 200) {
      console.log('회원가입 성공');
      // 성공 시, 로그인 처리하고 맵으로 이동

      router.push('/map');

      return;
    }

    toggleModal();
  }

  return { register, handleSubmit, onSubmit, cancelForm };
}
