import { MarkerType } from '@/app/map/components/Marker';
import MarkerHighlight from '@/app/map/components/MarkerHighlight';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Map/MarkerHighlight',
  component: MarkerHighlight,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    markerType: { control: 'select', options: ['recommendation', 'blame', 'question', 'caution', 'help'] },
    title: { control: 'text' },
    createdAt: { control: 'text' },
    children: { control: 'text' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof MarkerHighlight>;

export default meta;
type Story = StoryObj<typeof meta>;
// type Story = StoryObj<typeof MarkerHighlight>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const MarkerHighlight_Default: Story = {
  args: {
    markerType: 'recommendation' as MarkerType,
    title: '제목이 없습니다.',
    createdAt: '3시간전',
    children: '내용이 없습니다.',
  },
};
