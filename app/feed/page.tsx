'use client';

import styles from './Feed.module.scss';

// TODO: 이 부분은 추후에 수정이 필요합니다. 어떻게 데이터를 보낼 지 생각해보기..
// const BODY = {
//   country: '대한민국',
//   city: '서울',
//   sortBy: 'string',
//   page: 0,
//   size: POSTS_PAGE_LIMIT,
//   categories: 'QUESTION',
//   startDate: '2024-05-05',
//   endDate: '2024-05-05',
//   hasImage: true,
//   hasLocation: true,
//   minLikes: 0,
//   keyword: '',
// };

export default function Feed() {
  // TODO 쿼리 키를 어떻게 설정할 지 고민해보기. 무현님 쿼리 키 코드 참고해야 함.
  // const postsPages = data?.pages ?? [];

  return (
    <>
      <h1 className={styles.title}>피드 페이지</h1>

      {/* {postsPages.map((postsPage) =>
        postsPage.data.content.map((post: Post) => (
          <div key={post.postId}>
            <div className={styles.title}>{post.postId}</div>
          </div>
        )),
      )} */}

      {/* TODO 로딩 인디케이터 추가 */}
      {/* {isFetchingNextPage ? <div className={styles.loading}>로딩 중...</div> : <div ref={ref} />} */}
    </>
  );
}
