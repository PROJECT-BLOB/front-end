/* eslint-disable react/no-array-index-key */
// TODO: 안쓸지도 모름-나중에 삭제

import Radio from './Radio';

interface RadioOption {
  label: string;
  name: string;
  value: string;
}

interface RadioGroupProps {
  radioOptions: RadioOption[];
  selectedValue: string; // 현재 선택된 라디오 버튼 값
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioGroup({ radioOptions, selectedValue, onChange }: RadioGroupProps) {
  return (
    <div>
      {/* 사용예시 */}

      {radioOptions.map((options, index) => {
        const isChecked = options.value === selectedValue;

        return (
          <Radio key={index} value={options.value} name={options.name} onChange={onChange} checked={isChecked}>
            {options.label}
          </Radio>
        );
      })}
    </div>
  );
}
