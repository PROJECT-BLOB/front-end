export interface UserDetail {
  userId: 0;
  email: string;
  blobId: string;
  nickName: string;
  bio: string;
  profileUrl: string;
  state: 'COMPLETE' | 'INCOMPLETE';
  postCount: 0;
  likedCount: 0;
  commentCount: 0;
  isPrivate: boolean;
  coordinate: {
    lat: 0;
    lng: 0;
  };
  oauthType: 'GOOGLE' | 'KAKAO' | 'NAVER';
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}
