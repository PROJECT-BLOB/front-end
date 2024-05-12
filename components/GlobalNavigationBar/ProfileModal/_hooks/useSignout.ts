import { useRouter } from 'next/navigation';

import signout from '@apis/user/sign/signout';
import useModalStore from '@stores/useModalStore';
import { useUserStore } from '@stores/userStore';

export default function useSignout() {
  const { signout: logout } = useUserStore();
  const router = useRouter();
  const { toggleModal } = useModalStore();

  const handleSignout = async () => {
    const { status, data } = await signout();

    if (status === 200) {
      console.log(data);
      logout();
      deleteCookies();

      localStorage.clear();

      // 랜딩페이지로 이동합니다.
      router.push('/');
      toggleModal();
    }
    // 에러핸들링
  };

  return { handleSignout };
}

function deleteCookies() {
  document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
