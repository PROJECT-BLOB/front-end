import { createQueryKeys } from '@lukemorales/query-key-factory';

import checkNickname from '@apis/user/checkNickName';
import getUserDetail from '@apis/user/mypage/getUserDetail';
import checkBlobId from '@apis/user/sign/checkBlobId';

export const users = createQueryKeys('users', {
  // all: null, // master-key 사용 관련해서는 추가 확인 필요.
  detail: (blobId: string) => ({
    queryKey: [blobId],
    queryFn: () => getUserDetail(blobId),
  }),
  checkId: (input: string) => ({
    queryKey: [input],
    queryFn: () => checkBlobId(input),
  }),
  checkNickname: (input: string) => ({
    queryKey: [input],
    queryFn: () => checkNickname(input),
  }),
});
