import Checkbox from '@components/Checkbox/Checkbox';

export default {
  title: 'Design System/Checkbox',
  component: Checkbox,
  argTypes: {
    checkedItemHandler: { action: 'checked' }, // 이벤트 핸들러 액션 추가
  },
};

// const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

// export const Unselected = Template.bind({});
export const Unselected = {
  args: {
    value: 'Unselected',
    children: '체크박스-unselected',
    // checkedItemHandler: (value, isChecked) => console.log(`Checkbox value: ${value}, isChecked: ${isChecked}`),
  },
};

// export const Disabled = Template.bind({});
export const Disabled = {
  args: { value: 'Disabled', children: '체크박스-Disabled' },
};

// export const AlreadySelected = Template.bind({});
// AlreadySelected.args = {
//   value: 'unselected',
//   children: 'Checkbox Label',
//   checkedItemHandler: (value, isChecked) => console.log(`Checkbox value: ${value}, isChecked: ${isChecked}`),
// };

// export const Indeterminated = Template.bind({});
// Indeterminated.args = {
//   value: 'unselected',
//   children: 'Checkbox Label',
//   checkedItemHandler: (value, isChecked) => console.log(`Checkbox value: ${value}, isChecked: ${isChecked}`),
// };

// export const Selected = Template.bind({});
// Selected.args = {
//   value: 'unselected',
//   children: 'Checkbox Label',
//   checkedItemHandler: (value, isChecked) => console.log(`Checkbox value: ${value}, isChecked: ${isChecked}`),
// };
