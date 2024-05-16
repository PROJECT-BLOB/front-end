/* eslint-disable react/jsx-key */
import { IMarker } from '@apis/map/getMarkers';
import { useGetSidebarItems } from '@queries/useBlobmapQueries';
import { useCategoryStore } from '@stores/useCategoryStore';
import { useMapStore } from '@stores/useMapStore';

import PostItem from './PostItem';
import styles from './PostList.module.scss';

export default function PostList() {
  const lastBound = useMapStore((state) => state.lastBound);
  const categoryString = useCategoryStore((state) => state.getCategoryString());

  const { data } = useGetSidebarItems(categoryString, lastBound, 0, 100, 'recent');

  return (
    <div className={styles['content-list']}>
      {data?.data.content?.map((item: IMarker) => <PostItem key={item.postId} content={item} postId={item.postId} />)}
    </div>
  );
}
