import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import CloseButton from '@icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

import CategoryFiltering, { Category } from '@components/Category/CategoryFiltering';
import SubCategoryFiltering from '@components/Category/SubCategoryFiltering';

import styles from './FilteringModal.module.scss';

const cx = classNames.bind(styles);

const categories: Category[] = ['추천', '비추천', '질문', '주의', '도움요청'];

const subCategories = ['날씨', '음식점', '숙소', '병원', '화장실', '약국', '교통', '박물관', '관광지', 'ATM'];

export default function FilteringModal() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('추천');

  const [selectedSubCategories, setSelectedSubCategories] = useState<Record<Category, string[]>>({
    추천: [],
    비추천: [],
    질문: [],
    주의: [],
    도움요청: [],
  });

  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const { toggleModal } = useModalStore();

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
                  isCategoryClicked={isCategoryClicked}
                  isArrowClicked={isArrowClicked}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubCategories({
                      ...selectedSubCategories,
                      [category]: [],
                    });
                    setIsCategoryClicked(!isCategoryClicked);
                    setIsArrowClicked(true);
                  }}
                />
              ))}
            </div>

            <div className={cx('sub-category-list-box')}>
              {isCategoryClicked && isArrowClicked && (
                <div className={cx('sub-category-list')}>
                  {subCategories.map((subcategory) => (
                    <SubCategoryFiltering
                      key={subcategory}
                      category={selectedCategory}
                      selectedSubCategories={selectedSubCategories[selectedCategory]}
                      filteringType='feed'
                      title={subcategory}
                      onClick={(subcategory) => {
                        const currentSubCategories = selectedSubCategories[selectedCategory];

                        if (currentSubCategories.includes(subcategory)) {
                          setSelectedSubCategories({
                            ...selectedSubCategories,
                            [selectedCategory]: currentSubCategories.filter(
                              (currentSubCategory) => currentSubCategory !== subcategory,
                            ),
                          });
                        } else {
                          setSelectedSubCategories({
                            ...selectedSubCategories,
                            [selectedCategory]: [...currentSubCategories, subcategory],
                          });
                        }
                      }}
                    />
                  ))}
                </div>
              )}
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
