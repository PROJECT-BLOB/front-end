import { useFetchTargetPost } from '@queries/usePostQueries';
import useModalStore from '@stores/useModalStore';

import ReadPostHeader from '@components/ReadPost/Header/ReadPostHeader';
import ImageContainer from '@components/ReadPost/Image/ImageContainer';
import MainContainer from '@components/ReadPost/Main/MainContainer';

import styles from './ReadPostModal.module.scss';

export default function ReadPostModal() {
  const { postId } = useModalStore();
  const { data: post } = useFetchTargetPost(postId);

  return (
    <main className={styles['read-modal']}>
      <ReadPostHeader />
      <section className={styles.main}>
        {post?.data && (
          <>
            <ImageContainer contentData={post.data} />
            <MainContainer contentData={post.data} />
          </>
        )}
      </section>
    </main>
  );
}
