import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import Button, { ButtonProps } from '@/components/Button/BlobButton';
// import Button, { ButtonProps } from '.';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    text: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const LongSlim = Template.bind({});
LongSlim.args = {
  type: 'button',
  text: 'BLOB',
};

export const ShortBulky = Template.bind({});
ShortBulky.args = {
  type: 'button',
  text: '취소',
};
