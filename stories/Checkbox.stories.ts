import Checkbox from '@components/Checkbox/Checkbox';

export default {
  title: 'Design System/Checkbox',
  component: Checkbox,
  argTypes: {
    checkedItemHandler: { action: 'checkedItemHandler' },
    disabled: { control: 'boolean', description: '체크박스를 클릭하지 못하도록 함' },
  },
};

export const Default = {
  args: {
    value: 'default',
    children: '체크박스-Default',
  },
};

export const Disabled = {
  args: { value: 'disabled', children: '체크박스-Disabled', disabled: true },
};
