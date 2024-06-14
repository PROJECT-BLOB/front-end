import instance, { BASE_URL } from '@apis/axios';

interface OAuthToken {
  state: string;
  blobId: string;
  accessToken: string;
  refreshToken: string;
}

export default async function getOAuthData(
  providerType: 'naver' | 'kakao' | 'google',
  code: string | null,
): Promise<{ data: OAuthToken; status: number }> {
  const { data, status } = await instance.get(`${BASE_URL}/oauth/${providerType}/callback?code=${code}`);
  // const { data, status } = await instance.get(`${BASE_URL}/oauth/local/${providerType}/callback?code=${code}`);

  return { data, status };
}
