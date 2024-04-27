import { useQuery } from '@tanstack/react-query';

import { users } from './keys/userQueryKeys';

// 유저 상세(마이페이지) 정보
export function useDetailQueries(userId: number) {
  return useQuery(users.detail(userId)); // ['users', 'detail', 'userId']
}

// 아이디 중복 체크
export function useCheckIdQueries(input: string) {
  return useQuery(users.checkId(input));
}

// 닉네임 중복체크
export function useCheckNicknameQueries(input: string) {
  return useQuery(users.checkNickname(input));
}
