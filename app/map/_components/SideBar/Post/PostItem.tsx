/* eslint-disable react/destructuring-assignment */
import { IMarker } from '@apis/map/getMarkers';

import CategoryBox from '@components/CategoryBox';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './PostItem.module.scss';

export default function PostItem({ content }: { content: IMarker }) {
  return (
    <div className={styles.content}>
      <CategoryBox category={content.category} subcategory={content.subcategory} />
      <p className={styles.mention}>{content.title}</p>
      <div className={styles.information}>
        <span>{content.author?.nickname}</span>
        <span>{calculateTimePastSinceItCreated(content.createdDate)}</span>
      </div>
    </div>
  );
}
