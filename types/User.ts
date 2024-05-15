export interface UserDetail {
  userId: 0;
  email: string;
  blobId: string;
  nickname: string;
  bio: string;
  profileUrl: string;
  state: 'COMPLETE' | 'INCOMPLETE' | 'DELETED';
  postCount: 0;
  likedCount: 0;
  commentCount: 0;
  isPublic: boolean;
  coordinate: {
    lat: 0;
    lng: 0;
  };
  oauthType: 'GOOGLE' | 'KAKAO' | 'NAVER';
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}
