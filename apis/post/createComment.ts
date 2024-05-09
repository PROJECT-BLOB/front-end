import instance from '@apis/axios';

interface PostCommentProps {
  postId: number;
  body: { content: string };
}

export default async function createComment({ postId, body }: PostCommentProps) {
  const { data, status } = await instance.post(`/comment/post/${postId}`, body);

  return { data, status };
}
