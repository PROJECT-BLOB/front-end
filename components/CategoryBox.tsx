import Image from 'next/image';

import { Category } from '@/types/Post';
import deleteIcon from '@public/icons/category-x.svg';

import styles from './CategoryBox.module.scss';

enum CATEGORY_COLOR {
  RECOMMENDED = 'pink',
  NOT_RECOMMENDED = 'red',
  HELP = 'green',
  QUESTION = 'blue',
  WARNING = 'yellow',
}

enum MAIN_CATEGORY {
  RECOMMENDED = '추천해요',
  NOT_RECOMMENDED = '비추천해요',
  HELP = '도와주세요',
  QUESTION = '궁금해요',
  WARNING = '조심하세요',
}

interface CategoryBoxProps {
  category: Category;
  subcategory: string;
  isFeed?: boolean;
  handleClickDelete?: () => void;
}

export default function CategoryBox({ category, subcategory, isFeed, handleClickDelete }: CategoryBoxProps) {
  const color = CATEGORY_COLOR[category];

  return (
    <div className={`${styles.category} ${styles[color]}`}>
      <p>{`${subcategory || ''} ${MAIN_CATEGORY[category]}`}</p>
      {isFeed && (
        <button type='button' onClick={handleClickDelete}>
          <Image src={deleteIcon} alt='x' />
        </button>
      )}
    </div>
  );
}
