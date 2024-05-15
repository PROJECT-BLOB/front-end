import Image from 'next/image';

import { Category, SubCategory } from '@/types/Post';
import deleteIcon from '@public/icons/category-x.svg';
import optionDeleteIcon from '@public/icons/x.svg';

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

enum SUB_CATEGORY {
  WEATHER = '날씨',
  RESTAURANT = '음식점',
  ACCOMMODATION = '숙소',
  HOSPITAL = '병원',
  TOILET = '화장실',
  PHARMACY = '약국',
  TRANSPORT = '교통',
  MUSEUM = '박물관',
  ATTRACTIONS = '관광지',
  ATM = 'ATM',
}

interface CategoryBoxProps {
  optionData?: string;
  category?: Category;
  subcategory?: SubCategory;
  isFeed?: boolean;
  handleClickDelete?: () => void;
}

export default function CategoryBox({
  optionData,
  category,
  subcategory,
  isFeed,
  handleClickDelete,
}: CategoryBoxProps) {
  const color = category && CATEGORY_COLOR[category];

  return (
    <div className={`${styles.category} ${color && styles[color]} ${optionData ? styles.option : ''}`}>
      <p>
        {optionData || `${(subcategory && SUB_CATEGORY[subcategory]) || ''} ${category && MAIN_CATEGORY[category]}`}
      </p>
      {isFeed && (
        <button type='button' onClick={handleClickDelete} className={styles['image-wrapper']}>
          <Image src={optionData ? optionDeleteIcon : deleteIcon} alt='x' width={16} height={16} />
        </button>
      )}
    </div>
  );
}
