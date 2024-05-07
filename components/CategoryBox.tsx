import { Post } from '@/types/Post';

import styles from './CategoryBox.module.scss';

enum CATEGORY_COLOR {
  RECOMMENDED = 'pink',
  NOT_RECOMMENDED = 'red',
  HELP = 'green',
  QUESTION = 'blue',
  WARNING = 'yellow',
}

interface CategoryBoxProps {
  contentData: Post;
}

export default function CategoryBox({ contentData }: CategoryBoxProps) {
  const color = CATEGORY_COLOR[contentData.category];

  return (
    <p className={`${styles.category} ${styles[color]}`}>
      {contentData.subcategory} {contentData.category}
    </p>
  );
}
