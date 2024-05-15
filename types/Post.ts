export type Category = 'RECOMMENDED' | 'NOT_RECOMMENDED' | 'HELP' | 'QUESTION' | 'WARNING';

export type SubCategory =
  | 'WEATHER'
  | 'RESTAURANT'
  | 'ACCOMMODATION'
  | 'HOSPITAL'
  | 'TOILET'
  | 'PHARMACY'
  | 'TRANSPORT'
  | 'MUSEUM'
  | 'ATTRACTIONS'
  | 'ATM';

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
  subcategory: SubCategory;
  author: Author;
  country: string;
  city: string;
  cityLat: number;
  cityLng: number;
  lat: number;
  lng: number;
  address: string;
  actualLat: number;
  actualLng: number;
  distFromActual: number;
  views: number;
  createdDate: string;
  expiresAt: string;
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
