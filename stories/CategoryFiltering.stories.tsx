import { Meta, StoryFn } from '@storybook/react';

import CategoryFiltering, { CategoryFilteringProps } from '@components/Category/CategoryFiltering';

export default {
  title: 'Components/CategoryFiltering',
  component: CategoryFiltering,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<CategoryFilteringProps> = (args: CategoryFilteringProps) => <CategoryFiltering {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  category: '추천',
  filteringType: 'writing',
  subcategory: '날씨',
};
