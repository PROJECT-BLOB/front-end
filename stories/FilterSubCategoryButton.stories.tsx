import { Meta, StoryFn } from '@storybook/react';

import FilterSubCategoryButton, {
  FilterSubCategoryButtonProps,
} from '@components/Category/FilterCategoryButton/FilterSubCategoryButton';

export default {
  title: 'Components/FilterSubCategoryButton',
  component: FilterSubCategoryButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<FilterSubCategoryButtonProps> = (args: FilterSubCategoryButtonProps) => (
  <FilterSubCategoryButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  categoryIndex: 0,
  index: 0,
  filterType: 'FEED',
  categoriesWithSub: [
    {
      name: '추천',
      isSelectedCategory: false,
      isSelectedArrow: false,
      subCategories: [{ name: '날씨', isSelectedSubCategory: true }],
    },
  ],
  setCategoriesWithSub: () => {},
};
