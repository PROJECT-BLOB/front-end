import instance from '@apis/axios';

export default async function createPost(formData: FormData) {
  const { data, status } = await instance.post(`/post`, formData);

  return { data, status };
}
