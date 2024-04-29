import instance from '@apis/axios';

interface UserDetail {
  userId: number;
  blobId: string;
  nickName: string;
  postCount: number;
  bio: string;
  likedCount: number;
  profileImageUrl: string;
  isPrivate: boolean;
}

export default async function getUserDetail(userId: number): Promise<{ data: UserDetail; status: number }> {
  const { data, status } = await instance.get<UserDetail>(`/users/${userId}`);

  return { data, status };
}
