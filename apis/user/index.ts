import instance from '@apis/axios';

interface UserDetail {
  userId: number;
  blobId: string;
  nickName: string;
  postCount: number;
  bio: string;
  likedCount: number;
  profileImageUrl: string;
  isPrivate: boolean;
}

export default async function getUserDetail(userId: number) {
  const { data } = await instance.get<UserDetail>(`/users/${userId}`);

  return data;
}

// 1시 전까지 pr 필수!!
// ===마이페이지 조회(예진)
// 유저정보 - getUserDetail(userId: number)
// 유저 게시글- getUserPostList(userId:number)
// 유저 북마크- getUserBookmarkList(userId:number)
// 유저 댓글- getUserCommentList(uerId:number)

// === 내정보 수정 (해용)
// 프로필 사진 삭제 -deleteProfileImage(userId:number)
// 프로필사진 수정 - updateProfileImage(userId:number)
// 바이오 수정 -updateBio(userId:number)
// 닉네임 수정 -updateNickname(userId:number)
// 아이디 공개 비공개전환 - updateProfileVisibility(userId:number)

// ===회원 가입시 // 인덕
// 닉네임,아이디 등록(필수) - createUser(nickname: string, id: string)
// 닉네임 중복 확인 -checkNickname(nickname: string)
// 아이디 중복확인 - checkBlobId(id: string)
// 바이오 등록 - updateBio(bio: string)

// ===회원 탈퇴
// 회원 탈퇴 - deleteUser()
