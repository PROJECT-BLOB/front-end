import { createQueryKeys } from '@lukemorales/query-key-factory';

export const users = createQueryKeys('users', {
  all: null,
  detail: (blobId: string) => ['userDetail', [blobId]],
  checkId: (blobId: string) => ['checkBlobId', [blobId]],
  updateProfile: (blobId: string) => ['updateProfile', [blobId]],
});
