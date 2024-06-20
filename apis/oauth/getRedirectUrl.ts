import instance from '@apis/axios';

interface Url {
  redirectUrl: string;
}

let isLocal = true;

if (typeof window !== 'undefined')
  isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');

export default async function getRedirectUrl(type: string): Promise<{ data: Url; status: number }> {
  const { data, status } = isLocal ? await instance.get(`/oauth/local/${type}`) : await instance.get(`/oauth/${type}`);

  return { data, status };
}
