import { Post } from '@/types/Post';

import styles from './CategoryBox.module.scss';

enum CATEGORY_COLOR {
  추천해요 = 'pink',
  도와주세요 = 'green',
  궁금해요 = 'blue',
  조심하세요 = 'yellow',
  비추천해요 = 'red',
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
