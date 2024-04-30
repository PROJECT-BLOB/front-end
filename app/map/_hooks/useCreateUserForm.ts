import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import createUser from '@apis/user/sign/createUser';
import { useOAuthStore } from '@stores/useOAuthStore';

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
    // data: {
    //     "email": "string",
    //     "blobId": "string",
    //     "nickName": "string",
    //     "profileUrl": "string",
    //     "state": "COMPLETE"
    //   }

    if (status === 200) {
      console.log('회원가입 성공');
      // 성공 시, 맵으로 이동
      router.push('/map');

      return;
    }

    toggleModal();
  }

  return { register, handleSubmit, onSubmit, cancelForm };
}
