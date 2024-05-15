/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';

import classNames from 'classnames/bind';

import { Post } from '@/types/Post';
import { useFetchBookmarkList, useFetchFeedList, useFetchPostList } from '@queries/usePostQueries';
import { FilteredData } from '@stores/useFilteringStore';

import CtaComponent from '@components/CtaComponent/CtaComponent';
import Loading from '@components/Loading/Loading';

import PostItem from './PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

interface GetPostListProps {
  blobId?: string;
  selectedTab?: string;
  filteredData?: FilteredData;
}

// TODO: 이 파일 전체 리팩토링 해야됨
export default function PostList({ blobId, selectedTab, filteredData }: GetPostListProps) {
  // 찾아야함
  let fetchDataFunction: any;
  switch (selectedTab) {
    case 'MyPosts':
      fetchDataFunction = useFetchPostList;
      break;
    case 'Bookmarks':
      fetchDataFunction = useFetchBookmarkList;
      break;
    case 'Feed':
      fetchDataFunction = useFetchFeedList;
      break;
    default:
      fetchDataFunction = useFetchPostList; // 기본값으로 내가 쓴 글을 가져오도록 설정함
      break;
  }

  const {
    data: postsData,
    isPending,
    isError,
    isFetchingNextPage,
    ref,
    refetch,
  } = blobId ? fetchDataFunction(blobId) : fetchDataFunction(filteredData);

  useEffect(() => {
    refetch();
    console.log(filteredData);
  }, [filteredData, refetch]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const postsPages = postsData?.pages ?? [];

  console.log('postsPages', postsPages);

  return (
    <div className={cx('container')}>
      {postsPages[0]?.data?.content?.length > 0 ? (
        postsPages.map((postsPage: { data: { content: Post[] } }) =>
          postsPage.data.content.map((post: Post) => <PostItem key={post.postId} post={post} />),
        )
      ) : (
        <CtaComponent />
      )}

      {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
    </div>
  );
}
