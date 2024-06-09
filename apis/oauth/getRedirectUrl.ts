import instance from '@apis/axios';

interface Url {
  redirectUrl: string;
}

export default async function getRedirectUrl(type: string): Promise<{ data: Url; status: number }> {
  const { data, status } = await instance.get(`/oauth/${type}`);
  // const { data, status } = await instance.get(`/oauth/local/${type}`);

  return { data, status };
}
