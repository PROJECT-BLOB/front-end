import { createQueryKeys } from '@lukemorales/query-key-factory';

export const users = createQueryKeys('users', {
  // all: null, // master-key 사용 관련해서는 추가 확인 필요.
  detail: (userId: number) => ['userDetail', [userId]],
  checkId: (blobId: string) => ['checkBlobId', [blobId]],
  updateProfile: (userId: number) => ['updateProfile', [userId]],
});
