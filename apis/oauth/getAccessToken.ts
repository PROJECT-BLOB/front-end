import instance, { BASE_URL } from '@apis/axios';

export default async function getAccessToken(type: string, code: string | null) {
  const { data } = await instance.get(`${BASE_URL}/oauth/${type}/callback?code=${code}`);

  return data;
}
