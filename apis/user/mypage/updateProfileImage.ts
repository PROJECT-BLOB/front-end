import instance from '@apis/axios';

interface ProfileImage {
  imageUrl: string;
}

export default async function updateProfileImage(userId: number, imageUrl: File) {
  const { data } = await instance.patch<ProfileImage>(`/users/${userId}/profile-image`, {
    imageUrl,
  });

  return data;
}
