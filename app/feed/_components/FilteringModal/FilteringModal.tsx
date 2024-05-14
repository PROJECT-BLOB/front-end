import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import CloseButton from '@icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

import CategoryFiltering, { Category } from '@components/Category/CategoryFiltering';
import SubCategoryFiltering, { subCategories, SubCategory } from '@components/Category/SubCategoryFiltering';

import styles from './FilteringModal.module.scss';

const cx = classNames.bind(styles);
// 커밋 테스트

const categories: Category[] = ['추천', '비추천', '질문', '주의', '도움요청'];

export default function FilteringModal() {
  const { toggleModal } = useModalStore();

  // TODO 추천, 비추천 등 한 줄로 줄여보기
  const [selectedCategories, setSelectedCategories] = useState<Record<Category, SubCategory[]>>({
    추천: [],
    비추천: [],
    질문: [],
    주의: [],
    도움요청: [],
  });

  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const handleSubCategoryClick = (category: Category, subcategory: SubCategory) => {
    setSelectedCategories((prevState) => {
      const prevSubCategories = prevState[category];
      const isAlreadySelected = prevSubCategories.includes(subcategory);

      if (isAlreadySelected) {
        return {
          ...prevState,
          [category]: prevSubCategories.filter((sc) => sc !== subcategory),
        };
      }

      return {
        ...prevState,
        [category]: [...prevSubCategories, subcategory],
      };
    });
  };

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  return (
    <>
      <div className={cx('modal')}>
        <header className={cx('header')}>
          <h1 className={cx('title')}>필터링</h1>
          <div className={cx('close')}>
            <Image src={CloseButton} fill alt='닫기' onClick={toggleModal} />
          </div>
        </header>

        <form className={cx('form')}>
          <section className={cx('category-box')}>
            <h2 className={cx('sub-title')}>카테고리</h2>
            <div className={cx('category-list')}>
              {categories.map((category) => (
                <CategoryFiltering
                  key={category}
                  category={category}
                  filteringType='feed'
                  setSelectedCategories={setSelectedCategories}
                  setActiveCategory={setActiveCategory}
                >
                  {category === activeCategory && (
                    <div className={cx('sub-category-list')}>
                      {subCategories.map((subcategory) => (
                        <SubCategoryFiltering
                          key={subcategory}
                          category={category}
                          filteringType='feed'
                          subcategory={subcategory}
                          onClick={() => handleSubCategoryClick(category, subcategory)}
                          selectedSubCategories={selectedCategories[category]}
                        />
                      ))}
                    </div>
                  )}
                </CategoryFiltering>
              ))}
            </div>
          </section>

          <h2 className={cx('sub-title')}>날짜 선택</h2>
          <h2 className={cx('sub-title')}>추가 옵션</h2>

          <button type='button' className={cx('submit')}>
            취소
          </button>
          <button type='submit' className={cx('submit')}>
            완료
          </button>
        </form>
      </div>
    </>
  );
}
