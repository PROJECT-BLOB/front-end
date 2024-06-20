import instance from '@apis/axios';

import { isLocal } from './getOAuthData';

interface Url {
  redirectUrl: string;
}

export default async function getRedirectUrl(type: string): Promise<{ data: Url; status: number }> {
  const { data, status } = isLocal ? await instance.get(`/oauth/local/${type}`) : await instance.get(`/oauth/${type}`);

  return { data, status };
}
