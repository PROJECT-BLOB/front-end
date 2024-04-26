import instance from '@apis/axios';

export default async function getRedirectUrl(type: string) {
  const { data, status } = await instance.get(`/oauth/${type}`);

  return { data, status };
}
