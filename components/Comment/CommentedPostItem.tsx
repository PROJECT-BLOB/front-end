import { useEffect, useState } from 'react';

import { Comment, Post } from '@/types/Post';
import getReplyList from '@apis/post/getReplyList';
import { useFetchTargetPostComment } from '@queries/usePostQueries';
import { useUserStore } from '@stores/userStore';

import Loading from '@components/Loading/Loading';

import CommentItem from './CommentItem';

export default function CommentedPostItem({ commentedPost }: { commentedPost: Post }) {
  const { blobId } = useUserStore();
  const [targetComments, setTargetComments] = useState<Comment[]>([]);
  const { data: commentsData, isPending, isError } = useFetchTargetPostComment(commentedPost.postId);

  useEffect(() => {
    const fetchTargetComments = async () => {
      if (commentsData) {
        const allComments: Comment[] = [];
        const replyPromises: Promise<Comment[]>[] = [];

        for (const page of commentsData.pages) {
          const commentsOnPage = page.data.content.filter((c: Comment) => c.author.blobId === blobId);
          allComments.push(...commentsOnPage);

          page.data.content.forEach((comment: Comment) => {
            if (comment.replyCount > 0) {
              const promise = getReplyList({ commentId: comment.commentId, page: 0, size: 100 }).then((replies) =>
                replies.data.content.filter((reply: Comment) => reply.author.blobId === blobId),
              );
              replyPromises.push(promise);
            }
          });
        }

        const replies = await Promise.all(replyPromises);
        replies.forEach((replyArray) => allComments.push(...replyArray));

        setTargetComments(allComments);
      }
    };

    fetchTargetComments();
  }, [commentsData, blobId]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  return (
    <>
      {targetComments.map((comment: Comment) => (
        <CommentItem key={comment.commentId} commentedPost={commentedPost} comment={comment} />
      ))}
    </>
  );
}
