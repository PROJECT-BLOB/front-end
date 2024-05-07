import classNames from 'classnames/bind';

import PostItem from './PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

// TODO: 화면이 안 바뀌는 버그 수정 필요..
export default function PostList({ postList }: { postList: any }) {
  return (
    <div className={cx('container')}>
      {postList.map((post: any) => (
        <PostItem key={post.postId} post={post} />
      ))}
    </div>
  );
}
// export default function PostList({ userId, selectedTab }: { userId: number; selectedTab: string }) {
//   console.log('selectedTab', selectedTab);
//   let fetchDataFunction;
//   switch (selectedTab) {
//     case 'MyPosts':
//       fetchDataFunction = useFetchPostList;
//       console.log('1. 탭 이름 저장: MyPosts');
//       break;
//     case 'Bookmarks':
//       fetchDataFunction = useFetchBookmarkList;
//       console.log('1. 탭 이름 저장: Bookmarks');
//       break;
//     case 'MyComments':
//       fetchDataFunction = useFetchCommentList;
//       console.log('1. 탭 이름 저장: MyComments');
//       break;
//     default:
//       fetchDataFunction = useFetchPostList; // 기본값으로 내가 쓴 글을 가져오도록 설정
//       break;
//   }

//   console.log('현재 가져올 데이터:', fetchDataFunction);

//   // TODO: 여기서 fetchDataFunction이 제대로 안 들어감!!!!!!!!!!!!!!!!!!!왜그럴까
//   // 순서가 문제인듯... 데이터가 가져오기 전에  data를 저장해서... async await 이 필요할듯?
//   const { data, isPending, isError, isFetchingNextPage, ref } = fetchDataFunction(userId);

//   if (isPending) {
//     // TODO 스켈레톤 UI 추가
//     return <div>loading...</div>;
//   }

//   if (isError) {
//     return <div>데이터 불러오는 중, 에러 발생</div>;
//   }

//   const postsPages = data?.pages ?? [];
//   console.log('2. 탭에 맞는 데이터 가져옴', postsPages);

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

//       {isFetchingNextPage ? <div>로딩 중...</div> : <div ref={ref}>더 가져오기..</div>}
//     </div>
//   );
// }
