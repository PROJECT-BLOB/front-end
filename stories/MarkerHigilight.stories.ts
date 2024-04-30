import { MarkerType } from '@/app/map/_components/Marker';
import MarkerHighlight from '@/app/map/_components/MarkerHighlight';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Map/MarkerHighlight',
  component: MarkerHighlight,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  argTypes: {
    markerType: { control: 'select', options: ['recommendation', 'blame', 'question', 'caution', 'help'] },
    title: { control: 'text' },
    createdAt: { control: 'text' },
    children: { control: 'text' },
  },
  args: {},
} satisfies Meta<typeof MarkerHighlight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MarkerHighlight_Default: Story = {
  args: {
    markerType: 'recommendation' as MarkerType,
    title: '제목이 없습니다.',
    createdAt: '3시간전',
    children: '내용이 없습니다.',
  },
};
