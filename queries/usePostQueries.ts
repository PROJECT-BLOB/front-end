import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import createComment from '@apis/post/createComment';
import createReply from '@apis/post/creatReply';
import deleteComment from '@apis/post/deleteComment';
import deletePost from '@apis/post/deletePost';
import getCommentList from '@apis/post/getCommentList';
import getFeed from '@apis/post/getFeed';
import getPost from '@apis/post/getPost';
import getReplyList from '@apis/post/getReplyList';
import postBookmark from '@apis/post/updateBookmark';
import updateCommentLike from '@apis/post/updateCommentLike';
import updatePostLike from '@apis/post/updatePostLike';
import getUserBookmarkList from '@apis/user/mypage/getUserBookmarkList';
import getUserCommentList from '@apis/user/mypage/getUserCommentList';
import getUserPostList from '@apis/user/mypage/getUserPostList';
import { COMMENTS_PAGE_LIMIT, POSTS_PAGE_LIMIT } from '@constants/pageValues';
import { FilteredData } from '@stores/useFilteringStore';

import useInfiniteScrollQuery from './useInfiniteScrollQuery';

export const posts = createQueryKeys('posts', {
  all: (blobId: string) => ['readPostList', blobId],
  detail: (postId: number) => ['readPost', postId],
  bookmark: (blobId: string) => ['bookmarkList', blobId],
  commentList: (blobId: string) => ['readCommentList', blobId],
  feedList: () => ['feedPost'],
  comment: (postId: number) => ['readComment', postId],
  reply: (commentId: number) => ['readReply', commentId],
});

// 조회
export function useFetchPostList(blobId: string) {
  return useInfiniteScrollQuery({
    queryKey: posts.all(blobId).queryKey,
    queryFn: (page: number) => getUserPostList({ blobId, page, size: POSTS_PAGE_LIMIT }),
  });
}

export function useFetchBookmarkList(blobId: string) {
  return useInfiniteScrollQuery({
    queryKey: posts.bookmark(blobId).queryKey,
    queryFn: (page: number) => getUserBookmarkList({ blobId, page, size: POSTS_PAGE_LIMIT }),
  });
}

export function useFetchCommentList(blobId: string) {
  return useInfiniteScrollQuery({
    queryKey: posts.commentList(blobId).queryKey,
    queryFn: (page: number) => getUserCommentList({ blobId, page, size: POSTS_PAGE_LIMIT }),
  });
}

export function useFetchFeedList(filteredData: FilteredData) {
  return useInfiniteScrollQuery({
    queryKey: posts.feedList().queryKey,
    queryFn: (page: number) =>
      getFeed({
        ...filteredData,
        page,
        size: COMMENTS_PAGE_LIMIT,
        country: '',
        city: '',
      }),
  });
}

export function useFetchTargetPost(postId: number) {
  return useQuery({ queryKey: posts.detail(postId).queryKey, queryFn: () => getPost(postId) });
}

export function useFetchTargetPostComment(postId: number) {
  return useInfiniteScrollQuery({
    queryKey: posts.comment(postId).queryKey,
    queryFn: (page: number) => getCommentList({ postId, page, size: COMMENTS_PAGE_LIMIT }),
  });
}

export function useFetchTargetCommentReply(commentId: number) {
  return useInfiniteScrollQuery({
    queryKey: posts.reply(commentId).queryKey,
    queryFn: (page) => getReplyList({ commentId, page, size: COMMENTS_PAGE_LIMIT }),
  });
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
    mutationFn: updateCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posts.comment(postId).queryKey });
    },
  });
}

export function useUpdateReplyLike(commentId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posts.reply(commentId).queryKey });
    },
  });
}

// 삭제
export function useDeleteComment(postId?: number, commentId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (postId) queryClient.invalidateQueries({ queryKey: posts.comment(postId).queryKey });

      if (commentId) queryClient.invalidateQueries({ queryKey: posts.reply(commentId).queryKey });
    },
  });
}

export function useDeletePost(postId?: number, blobId?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // 피드에서 삭제하면 피드 쿼리 다시 불러옴
      postId && queryClient.invalidateQueries({ queryKey: posts.feedList().queryKey });

      // 마이페이지에서 내가 쓴 글이나 북마크삭제 시 목록 다시 불러옴
      if (blobId) {
        queryClient.invalidateQueries({ queryKey: posts.all(blobId).queryKey });
        queryClient.invalidateQueries({ queryKey: posts.bookmark(blobId).queryKey });
      }

      router.back();
    },
  });
}
