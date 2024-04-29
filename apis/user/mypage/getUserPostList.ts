import instance from '@apis/axios';

export interface Post {
  postId: number;
  title: string;
  content: string;
  category: string;
  subcategory: string;
  author: {
    blobId: string; // blobId를 사용할지 userId를 사용할지...
    nickname: string;
    profileUrl: string;
  };
  country: string;
  city: string;
  lat: number;
  lng: number;
  distFromActual: number;
  views: number;
  createdDate: string;
  imageUrl: string[];
  liked: boolean;
  bookmarked: boolean;
}

export type PostSummary = Pick<Post, 'postId' | 'author' | 'title' | 'content'>;

// getUserPostList : 유저가 작성한 글 모음
export default async function getUserPostList(userId: number): Promise<{ data: PostSummary[]; status: number }> {
  const { data, status } = await instance.get<PostSummary[]>(`/users/${userId}/posts`);

  return { data, status };
}
