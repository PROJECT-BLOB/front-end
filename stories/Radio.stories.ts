import Radio from '@components/RadioButton/Radio';

export default {
  title: 'Design System/Radio',
  component: Radio,
  argTypes: {
    checked: { control: 'boolean', description: '라디오 버튼이 체크 되었는지 알려줌' },
    name: { control: 'text', description: '라디오 버튼 그룹 이름' },
    value: { control: 'text', description: '라디오 버튼의 값' },
    onChange: { action: 'onChange', description: '라디오 버튼의 상태가 바뀔 때 호출되는 이벤트 핸들러' },
  },
};

export const Checked = {
  args: {
    checked: true,
    name: 'radio-test',
    value: 'checked',
  },
};

export const Unchecked = {
  args: {
    checked: false,
    name: 'radio-test',
    value: 'unchecked',
  },
};
