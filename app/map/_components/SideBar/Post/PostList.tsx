/* eslint-disable react/jsx-key */
import { IMarker } from '@apis/map/getMarkers';
import { useGetSidebarItems } from '@queries/useBlobmapQueries';
import { useMapStore } from '@stores/useMapStore';

import PostItem from './PostItem';
import styles from './PostList.module.scss';

export default function PostList() {
  const lastBound = useMapStore((state) => state.lastBound);

  const { data } = useGetSidebarItems('QUESTION', lastBound, 0, 100, 'recent');

  return (
    <div className={styles['content-list']}>
      {data?.data.content?.map((item: IMarker) => <PostItem key={item.postId} content={item} />)}
    </div>
  );
}
