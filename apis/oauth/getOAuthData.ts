import instance, { BASE_URL } from '@apis/axios';

interface OAuthToken {
  state: string;
  blobId: string;
  accessToken: string;
  refreshToken: string;
}
let isLocal = true;

if (typeof window !== 'undefined')
  isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');

export default async function getOAuthData(
  providerType: 'naver' | 'kakao' | 'google',
  code: string | null,
): Promise<{ data: OAuthToken; status: number }> {
  const { data, status } = isLocal
    ? await instance.get(`${BASE_URL}/oauth/local/${providerType}/callback?code=${code}`)
    : await instance.get(`${BASE_URL}/oauth/${providerType}/callback?code=${code}`);
  // const { data, status } = await instance.get(`${BASE_URL}/oauth/local/${providerType}/callback?code=${code}`);

  return { data, status };
}
