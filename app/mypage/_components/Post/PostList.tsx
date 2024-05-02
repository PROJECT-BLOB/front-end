import { Post } from '@/types/Post';

import PostItem from './PostItem';

export default function PostList({ postList }: { postList: Post[] }) {
  return <>{postList && postList.map((post: Post) => <PostItem key={post.postId} post={post} />)}</>;
}
