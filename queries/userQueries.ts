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
