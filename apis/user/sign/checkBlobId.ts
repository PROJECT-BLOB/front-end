import instance from '@apis/axios';

export default async function checkBlobId(blobId: string) {
  const { data, status } = await instance.get(`/user/${blobId}/check`);

  return { data, status };
}
