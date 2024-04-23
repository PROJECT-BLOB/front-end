import instance from '@apis/axios';

interface ProfileImage {
  imageUrl: string;
}

export default async function deleteProfileImage(userId: number) {
  const { data } = await instance.delete<ProfileImage>(`/users/${userId}/profile-image`);

  return data;
}
