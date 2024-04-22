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

export default async function getUserDetail(userId: number) {
  const { data } = await instance.get<UserDetail>(`/users/${userId}`);

  return data;
}

export default async function (userId: number) {
    const { data } = await instance.get<UserDetail>(`/users/${userId}`);
  
    return data;
  }
  