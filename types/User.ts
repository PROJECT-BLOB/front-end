export interface UserDetail {
  // 빠진 목록
  // userId: number;
  // postCount: number;
  // bio: string; 일단 보류
  // likedCount: number;
  // isPrivate: boolean;

  email: string;
  blobId: string;
  nickName: string;
  profileUrl: string;
  state: 'COMPLETE' | 'INCOMPLETE';
}
