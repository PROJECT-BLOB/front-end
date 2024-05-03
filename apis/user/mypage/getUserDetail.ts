import { UserDetail } from '@/types/User';
import instance from '@apis/axios';

export default async function getUserDetail(blobId: string): Promise<{ data: UserDetail; status: number }> {
  const { data, status } = await instance.get<UserDetail>(`/user/${blobId}/blob`);

  return { data, status };
}
