import { redirect } from 'next/navigation';

import { useUserStore } from '@stores/userStore';

// 유저의 로그인된 상태를 확인하여, 로그인한 유저를 지정하는 url로 리다이렉트 시킨다.
export default function useRedirectSigninUserTo(redirctUrl: string) {
  const { isSignin } = useUserStore();

  function redirectSigninUser() {
    if (isSignin) {
      redirect(`/${redirctUrl}`);
    }
  }

  return redirectSigninUser;
}
