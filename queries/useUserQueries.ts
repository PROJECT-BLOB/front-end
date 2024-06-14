import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import signout from '@apis/oauth/signout';
import deleteProfileImage from '@apis/user/mypage/deleteProfileImage';
import getUserDetail from '@apis/user/mypage/getUserDetail';
import updateUserProfile from '@apis/user/mypage/updateUserProfile';
import checkBlobId from '@apis/user/sign/checkBlobId';
import deleteUser from '@apis/user/sign/deleteUser';
import { useUserStore } from '@stores/userStore';

import deleteCookies from '@utils/deleteCookies';

import { users } from './keys/userQueryKeys';

// 유저 상세(마이페이지) 정보
export function useDetailQueries(blobId: string) {
  return useQuery({
    queryKey: users.detail(blobId).queryKey,
    queryFn: () => getUserDetail(blobId),
  });
}

// TODO: 아이디 중복 체크- 사용안할듯..나중에 지울것
export function useCheckBlobIdQueries(blobId: string) {
  return useQuery({ queryKey: users.checkId(blobId).queryKey, queryFn: () => checkBlobId(blobId) });
}

// 프로필 업데이트
export function useUpdateUserProfile(blobId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: ({ status }) => {
      if (status === 200) {
        // TODO: 모달을 닫기 전에 성공했다고 alert창을 띄우는게 좋지 않을까?
      }

      queryClient.invalidateQueries({ queryKey: users.detail(blobId).queryKey });
    },
    onError: (error) => {
      console.error('업데이트실패ㅜㅜ:', error);
    },
  });
}

// 프로필 사진 삭제
export function useDeleteProfileImage(blobId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: users.detail(blobId).queryKey });
    },
    onError: (error) => {
      console.error('삭제실패ㅜㅜ:', error);
    },
  });
}

// 로그아웃
export function useSignout() {
  const queryClient = useQueryClient();
  const { signout: logout } = useUserStore();

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: users.all.queryKey });

      logout();
      deleteCookies();
      localStorage.clear();
    },
    onError: (error) => {
      console.error('로그아웃 실패ㅜㅜ:', error);
    },
  });
}

// 회원 탈퇴
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { signout: logout } = useUserStore();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: users.all.queryKey });

      logout();
      deleteCookies();
      localStorage.clear();
    },
    onError: (error) => {
      console.error('회원탈퇴 실패ㅜㅜ:', error);
    },
  });
}
