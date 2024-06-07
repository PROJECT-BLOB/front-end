import { CategoryState } from '@components/Category/CategoryList';

const MAIN_CATEGORY = {
  추천: 'RECOMMENDED',
  비추천: 'NOT_RECOMMENDED',
  도움요청: 'HELP',
  질문: 'QUESTION',
  주의: 'WARNING',
};

const SUB_CATEGORY = {
  날씨: 'WEATHER',
  음식점: 'RESTAURANT',
  숙소: 'ACCOMMODATION',
  병원: 'HOSPITAL',
  화장실: 'TOILET',
  약국: 'PHARMACY',
  교통: 'TRANSPORT',
  박물관: 'MUSEUM',
  관광지: 'ATTRACTIONS',
  ATM: 'ATM',
};

export default function convertCategoriesWithSub(categoriesWithSub: CategoryState[]) {
  return categoriesWithSub
    .filter((category) => category.isSelectedCategory)
    .flatMap((category) => {
      const mainCategory = MAIN_CATEGORY[category.name];

      const categoriesWithSub = category.subCategories
        .filter((subCategory) => subCategory.isSelectedSubCategory)
        .map((subCategory) => `${mainCategory}:${SUB_CATEGORY[subCategory.name]}`);

      return categoriesWithSub.length > 0 ? categoriesWithSub : mainCategory;
    })
    .join(',');
}
