import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import createComment from '@apis/post/createComment';
import createReply from '@apis/post/creatReply';
import deleteComment from '@apis/post/deleteComment';
import deletePost from '@apis/post/deletePost';
import getCommentList from '@apis/post/getCommentList';
import getPost from '@apis/post/getPost';
import getReplyList from '@apis/post/getReplyList';
import postBookmark from '@apis/post/postBookmark';
import postCommentLike from '@apis/post/postCommentLike';
import updatePostLike from '@apis/post/updatePostLike';

export const posts = createQueryKeys('posts', {
  detail: (postId: number) => ['readPost', postId],
  comment: (postId: number) => ['readComment', postId],
  reply: (commentId: number) => ['readReply', commentId],
});

// 조회
export function useFetchTargetPost(postId: number) {
  return useQuery({ queryKey: posts.detail(postId).queryKey, queryFn: () => getPost(postId) });
}

export function useFetchTargetPostComment(postId: number) {
  return useQuery({ queryKey: posts.comment(postId).queryKey, queryFn: () => getCommentList(postId) });
}

export function useFetchTargetCommentReply(commentId: number) {
  return useQuery({ queryKey: posts.reply(commentId).queryKey, queryFn: () => getReplyList(commentId) });
}

// 생성
export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posts.comment(postId).queryKey });
    },
  });
}

export function useCreateReply(commentId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posts.reply(commentId).queryKey });
    },
  });
}

// 업데이트
export function useUpdatePostLike(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostLike,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: posts.detail(postId).queryKey }),
  });
}

export function useUpdatePostBookmark(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBookmark,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: posts.detail(postId).queryKey }),
  });
}

export function useUpdateCommentLike(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posts.comment(postId).queryKey });
    },
  });
}

export function useUpdateReplyLike(commentId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posts.reply(commentId).queryKey });
    },
  });
}

// 삭제
export function useDeleteComment(postId?: number, commentId?: number, replyId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (postId) queryClient.invalidateQueries({ queryKey: posts.comment(postId).queryKey });

      if (commentId && replyId) queryClient.invalidateQueries({ queryKey: posts.reply(commentId).queryKey });
    },
  });
}

export function useDeletePost(postId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      postId && queryClient.invalidateQueries({ queryKey: posts.detail(postId).queryKey });
    },
  });
}
