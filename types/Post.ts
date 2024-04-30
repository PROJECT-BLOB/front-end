export type Category = '추천해요' | '도와주세요' | '궁금해요' | '조심하세요' | '비추천해요';

export interface Author {
  blobId: string;
  nickname: string;
  profileUrl: string;
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
