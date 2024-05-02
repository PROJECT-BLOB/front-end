// import { Post } from '@/types/Post';

// import PostItem from './PostItem';

// export default function PostList({ postList }: { postList: Post[] }) {
//   return <>{postList && postList.map((post: Post) => <PostItem key={post.postId} post={post} />)}</>;
// }
// PostList.tsx
import classNames from 'classnames/bind';

import { Post } from '@/types/Post';

import PostItem from './PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

export default function PostList({ postList }: { postList: Post[] }) {
  return (
    <div className={cx('container')}>
      {postList && postList.map((post: Post) => <PostItem key={post.postId} post={post} />)}
    </div>
  );
}
