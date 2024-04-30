import Marker, { MarkerType } from '@/app/map/_components/Marker';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Map/Marker',
  component: Marker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // opacity: { control: 'number', min: 25, max: 100 },
    opacity: { control: 'select', options: [25, 50, 75, 100] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Marker>;

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<typeof Marker>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Marker_Default: Story = {
  args: {
    markerType: 'recommendation' as MarkerType,
    opacity: 100,
  },
};
