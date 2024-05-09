import React from 'react';

import classNames from 'classnames/bind';

import { Comment, Post } from '@/types/Post';

import PostItem from './PostItem';
import styles from './PostList.module.scss';
import CommentItem from '../Comment/CommentItem';

const cx = classNames.bind(styles);

interface PostListProps {
  postsData: any;
  isCommentList?: boolean;
  isFetchingNextPage: boolean;
  scrollRef: any;
}

// const ForwardedPostList = React.forwardRef<HTMLDivElement, PostListProps>(function PostListForwarded(
//   { postsData, isCommentList = false, isFetchingNextPage }: PostListProps,
//   ref,
// ) {
export default function PostList({ postsData, isCommentList, isFetchingNextPage, scrollRef }: PostListProps) {
  return (
    <div className={cx('container')}>
      {
        isCommentList
          ? postsData.pages?.map((postsPage: any) =>
              // TODO: post-title, category 정보도 같이 보내야 함
              postsPage.data.content.map((post: Comment) => <CommentItem key={post.commentId} post={post} />),
            )
          : postsData.pages?.map((postsPage: any) =>
              postsPage.data.content.map((post: Post) => <PostItem key={post.postId} post={post} />),
            )
        // postsData?.map((post: any) => <PostItem key={post.postId} post={post} />)
      }
      {/* //TODO: 무한스크롤이 또 안되는 현상 발생..ㅠㅠ 제 pc에서만 이상한거 같기도 하고 모르겠네요ㅠ */}
      {isFetchingNextPage ? <div className={styles.loading}>로딩 중...</div> : <div ref={scrollRef} />}
    </div>
  );
}

// export default ForwardedPostList;

// postlist 안에서 데이터 불러오는 버전
// import classNames from 'classnames/bind';

// import { Comment, Post } from '@/types/Post';
// import { useFetchBookmarkList, useFetchCommentList, useFetchPostList } from '@queries/usePostQueries';

// import PostItem from './PostItem';
// import styles from './PostList.module.scss';
// import CommentItem from '../Comment/CommentItem';

// const cx = classNames.bind(styles);

// export default function PostList({ userId, selectedTab }: { userId: number; selectedTab: string }) {
//   let fetchDataFunction;
//   switch (selectedTab) {
//     case 'MyPosts':
//       fetchDataFunction = useFetchPostList;
//       break;
//     case 'Bookmarks':
//       fetchDataFunction = useFetchBookmarkList;
//       break;
//     case 'MyComments':
//       fetchDataFunction = useFetchCommentList;
//       break;
//     default:
//       fetchDataFunction = useFetchPostList; // 기본값으로 내가 쓴 글을 가져오도록 설정
//       break;
//   }

//   const { data, isPending, isError, isFetchingNextPage, ref } = fetchDataFunction(userId);

//   if (isPending) {
//     // TODO 스켈레톤 UI 추가
//     return <div>loading...</div>;
//   }

//   if (isError) {
//     return <div>데이터 불러오는 중, 에러 발생</div>;
//   }

//   const postsPages = data?.pages ?? [];
//   console.log('데이터', postsPages);

//   return (
//     <div className={cx('container')}>
//       {fetchDataFunction === useFetchCommentList
//         ? postsPages.map((postsPage) =>
//             // TODO: post-title, category 정보도 같이 보내야 함
//             postsPage.data.content.map((post: Comment) => <CommentItem key={post.commentId} post={post} />),
//           )
//         : postsPages.map((postsPage) =>
//             postsPage.data.content.map((post: Post) => <PostItem key={post.postId} post={post} />),
//           )}

//       {/*  TODO 로딩 인디케이터 추가 */}

//       {isFetchingNextPage ? <div>로딩 중...</div> : <div ref={ref} />}
//     </div>
//   );
// }
