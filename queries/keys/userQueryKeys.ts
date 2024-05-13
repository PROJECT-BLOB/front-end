import { createQueryKeys } from '@lukemorales/query-key-factory';

export const users = createQueryKeys('users', {
  // all: null, // master-key 사용 관련해서는 추가 확인 필요.
  detail: (blobId: string) => ['userDetail', [blobId]],
  checkId: (blobId: string) => ['checkBlobId', [blobId]],
  updateProfile: (blobId: string) => ['updateProfile', [blobId]],
});
