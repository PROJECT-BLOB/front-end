import { Category } from '@/types/Post';

import styles from './CategoryBox.module.scss';

enum CATEGORY_COLOR {
  RECOMMENDED = 'pink',
  NOT_RECOMMENDED = 'red',
  HELP = 'green',
  QUESTION = 'blue',
  WARNING = 'yellow',
}

interface CategoryBoxProps {
  category: Category;
  subcategory: string;
}

export default function CategoryBox({ category, subcategory }: CategoryBoxProps) {
  const color = CATEGORY_COLOR[category];

  return (
    <p className={`${styles.category} ${styles[color]}`}>
      {subcategory} {category}
    </p>
  );
}
