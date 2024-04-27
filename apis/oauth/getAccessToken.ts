import instance, { BASE_URL } from '@apis/axios';

interface Token {
  oauthId: string;
  accessToken: string;
  refreshToken: string;
}

export default async function getAccessToken(
  type: string,
  code: string | null,
): Promise<{ data: Token; status: number }> {
  const { data, status } = await instance.get(`${BASE_URL}/oauth/${type}/callback?code=${code}`);

  return { data, status };
}
