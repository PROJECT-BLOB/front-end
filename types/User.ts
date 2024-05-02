export interface UserDetail {
  userId: 0;
  email: string;
  blobId: string;
  nickName: string;
  bio: 'string';
  profileUrl: string;
  state: 'COMPLETE' | 'INCOMPLETE';
  postCount: 0;
  likedCount: 0;
  isPrivate: true;
  coordinate: {
    lat: 0;
    lng: 0;
  };
  oauthType: 'GOOGLE';
  role: 'ROLE_USER';
}
