// TODO: module css에서 적용할 방법 확인

import { zIndex } from './z-index';

const palette = {
  color: {},
  zIndex,
} as const;

export type Palette = typeof palette;

// &:hover {
//   background-color: ${({ theme }) => theme.color.bg};
// }

export { palette };
