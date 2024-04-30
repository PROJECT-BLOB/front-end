import instance from '@apis/axios';

interface DeletePost {
  postId: number;
  message: string;
}

export default async function deletePost(postId: number) {
  const { data, status } = await instance.delete<DeletePost>(`/post/${postId}`);

  return { data, status };
}
