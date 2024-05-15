import { Comment } from '@/types/Post';
import instance from '@apis/axios';

export interface CommentList {
  content: Array<Comment>;
  count: number;
  currentPage: number;
  hasMore: boolean;
  remaining: number;
}

export interface CommentListProps {
  blobId: string;
  page: number;
  size: number;
}

export default async function getUserCommentList(
  body: CommentListProps,
): Promise<{ data: CommentList; status: number }> {
  const { data, status } = await instance.get<CommentList>(`/user/${body.blobId}/commented`, {
    params: { page: body.page, size: body.size },
  });

  return { data, status };
}
