export type Category = 'RECOMMENDED' | 'NOT_RECOMMENDED' | 'HELP' | 'QUESTION' | 'WARNING';

export interface Author {
  userId: number;
  blobId: string;
  nickname: string;
  profileUrl: string;
  likedCount: number;
}

export interface Post {
  postId: number;
  title: string;
  content: string;
  category: Category;
  subcategory: string;
  author: Author;
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
  likeCount: number;
  commentCount: number;
  canDelete: boolean;
}

export interface Comment {
  commentId: number;
  postId: number;
  content: string;
  author: Author;
  createdDate: string;
  liked: boolean;
  likeCount: number;
  canDelete: boolean;
}
