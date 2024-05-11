import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import getUserDetail from '@apis/user/mypage/getUserDetail';
import updateUserProfile from '@apis/user/mypage/updateUserProfile';
import checkBlobId from '@apis/user/sign/checkBlobId';

import { users } from './keys/userQueryKeys';

// 유저 상세(마이페이지) 정보
export function useDetailQueries(userId: number) {
  return useQuery({ queryKey: users.detail(userId).queryKey, queryFn: () => getUserDetail(userId) });
}

// TODO: 아이디 중복 체크- 사용안할듯..나중에 지울것
export function useCheckBlobIdQueries(blobId: string) {
  return useQuery({ queryKey: users.checkId(blobId).queryKey, queryFn: () => checkBlobId(blobId) });
}

// 프로필 업데이트
export function useUpdateUserProfile(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: ({ data, status }) => {
      console.log('프로필 수정 성공:', data);

      if (status === 200) {
        // TODO: 모달을 닫기 전에 성공했다고 alert창을 띄우는게 좋지 않을까?
        // 임시
        alert('프로필이 수정되었습니다.');
      }

      queryClient.invalidateQueries({ queryKey: users.detail(userId).queryKey });
    },
    onError: (error) => {
      console.error('실패ㅜㅜ:', error);
    },
  });
}
