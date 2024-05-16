/* eslint-disable react/destructuring-assignment */
import { IMarker } from '@apis/map/getMarkers';
import useModalStore from '@stores/useModalStore';

import CategoryBox from '@components/CategoryBox';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './PostItem.module.scss';

export default function PostItem({ content, postId: id }: { content: IMarker; postId: number }) {
  const { isOpen, setPostId, setCurrentName, toggleModal } = useModalStore();

  const handleClickItem = () => {
    if (isOpen) {
      toggleModal();

      return;
    }

    setCurrentName('read');
    setPostId(id);
    toggleModal();
  };

  return (
    // eslint-disable-next-line
    <div className={styles.content} onClick={handleClickItem}>
      <CategoryBox category={content.category} subcategory={content.subcategory} />
      <p className={styles.mention}>{content.title}</p>
      <div className={styles.information}>
        <span>{content.author?.nickname}</span>
        <span>{calculateTimePastSinceItCreated(content.createdDate)}</span>
      </div>
    </div>
  );
}
