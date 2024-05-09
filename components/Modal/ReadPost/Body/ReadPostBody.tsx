import { useFetchTargetPost } from '@queries/usePostQueries';
import useModalStore from '@stores/useModalStore';

import ImageContainer from './Image/ImageContainer';
import MainContainer from './Main/MainContainer';
import styles from './ReadPostBody.module.scss';

export default function ReadPostBody() {
  const { postId } = useModalStore();
  const { data: post } = useFetchTargetPost(postId);

  return (
    <section className={styles.main}>
      {post?.data && (
        <>
          <ImageContainer contentData={post.data} />
          <MainContainer contentData={post.data} />
        </>
      )}
    </section>
  );
}
