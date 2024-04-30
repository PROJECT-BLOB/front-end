import React from 'react';

import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from '.';

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

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const LongSlim = Template.bind({});
LongSlim.args = {
  uiType: 'longSlim',
  text: 'Long text in my button',
};

export const ShortBulky = Template.bind({});
ShortBulky.args = {
  uiType: 'shortBulky',
  text: 'Short Text',
};
