import instance from '@apis/axios';

interface Url {
  redirectUrl: string;
}

export default async function getRedirectUrl(type: string): Promise<{ data: Url; status: number }> {
  const { data, status } = await instance.get(`/oauth/${type}`);

  return { data, status };
}
