import instance from '@apis/axios';

interface ProfileVisibility {
  visibility: boolean;
}

export default async function updateProfileVisibility(userId: number, visibility: boolean) {
  const { data } = await instance.patch<ProfileVisibility>(`/users/${userId}/profile-visibility`, {
    visibility,
  });

  return data;
}
