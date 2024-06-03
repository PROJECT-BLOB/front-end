import { Meta, StoryFn } from '@storybook/react';

import FilterCategoryButton, {
  FilterCategoryButtonProps,
} from '@components/Category/FilterCategoryButton/FilterCategoryButton';

export default {
  title: 'Components/FilterCategoryButton',
  component: FilterCategoryButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<FilterCategoryButtonProps> = (args: FilterCategoryButtonProps) => (
  <FilterCategoryButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: '추천',
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
};
