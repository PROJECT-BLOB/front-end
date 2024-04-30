import { Meta, StoryFn } from '@storybook/react';

import Button, { ButtonProps } from '../components/Button/BlobButton';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'BLOB',
  type: 'button',
  color: 'button-colord-contain',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: '취소',
  type: 'button',
  color: 'button-gray-outlined',
};
