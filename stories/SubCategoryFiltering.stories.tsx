import { Meta, StoryFn } from '@storybook/react';

import SubCategoryFiltering, { SubCategoryFilteringProps } from '@components/Category/SubCategoryFiltering';

export default {
  title: 'Components/SubCategoryFiltering',
  component: SubCategoryFiltering,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<SubCategoryFilteringProps> = (args: SubCategoryFilteringProps) => (
  <SubCategoryFiltering {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  category: '추천',
  filteringType: 'writing',
  title: '날씨',
};
