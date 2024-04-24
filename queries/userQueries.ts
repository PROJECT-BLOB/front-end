// ===마이페이지 조회
// 유저정보 - getUserDetail(userId: number)
// 유저 게시글- getUserPostList(userId:number)
// 유저 북마크- getUserBookmarkList(userId:number)
// 유저 댓글- getUserCommentList(uerId:number)

// === 내정보 수정
// 프로필 사진 삭제 -deleteProfileImage(userId:number)
// 프로필사진 수정 - updateProfileImage(userId:number)
// 닉네임 수정 -updateNickname(userId:number)
// 아이디 공개 비공개전환 - updateProfileVisibility(userId:number)

// ===회원 가입시
// 닉네임,아이디 등록(필수) - createUser(nickname: string, id: string)
// 닉네임 중복 확인 -checkNickname(nickname: string)
// 아이디 중복확인 - checkBlobId(id: string)
// 바이오 등록 - updateBio(bio: string)

// ===회원 탈퇴
// 회원 탈퇴 - deleteUser()

// import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

// const userKeys = {
//   all: ['todos'] as const,
// lists: () => [...todoKeys.all, 'list'] as const,
// list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
// details: () => [...todoKeys.all, 'detail'] as const,
// detail: (id: number) => [...todoKeys.details(), id] as const,
// };

// apis...
// userName(nickName)
// 프로필사진url
//
// ...

// const todoKeys = {
//     all: ['todos'] as const,
//     lists: () => [...todoKeys.all, 'list'] as const,
//     list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
//     details: () => [...todoKeys.all, 'detail'] as const,
//     detail: (id: number) => [...todoKeys.details(), id] as const,
//   };

// export const users = createQueryKeys('users', {
//   all: null,
//   detail: (userId: string) => ({
//     queryKey: [userId],
//     queryFn: () => api.getUserDetail(userId),
//   }),
// });

// export const todos = createQueryKeys('todos', {
//   detail: (todoId: string) => [todoId],
//   list: (filters: TodoFilters) => ({
//     queryKey: [{ filters }],
//     queryFn: (ctx) => api.getTodos({ filters, page: ctx.pageParam }),
//     contextQueries: {
//       search: (query: string, limit = 15) => ({
//         queryKey: [query, limit],
//         queryFn: (ctx) =>
//           api.getSearchTodos({
//             page: ctx.pageParam,
//             filters,
//             limit,
//             query,
//           }),
//       }),
//     },
//   }),
// });
