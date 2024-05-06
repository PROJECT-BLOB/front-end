import classNames from 'classnames/bind';

import { ValidatorType } from '@utils/registerOptions';

import styles from './Input.module.scss';
// import { FieldValues, UseFormRegister } from 'react-hook-form';

const cx = classNames.bind(styles);

interface InputProps {
  required?: boolean;
  labelName: string;
  id: string;
  name: string;
  value: string;
  maxLength?: number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // register?: UseFormRegister<FieldValues>;
  register?: any;
  validator?: ValidatorType;
  borderColor?: string;
}

export default function Input({
  required,
  labelName,
  id,
  name,
  value,
  maxLength,
  placeholder,
  onChange,
  register,
  validator,
  borderColor,
  ...rest
}: InputProps) {
  return (
    <div className={cx('input', 'text-default')}>
      <div className={cx('label')}>
        <label className={cx('label-name')} htmlFor={id}>
          {labelName}
        </label>
        {required && <span className={cx('label-required')}>*</span>}
      </div>
      <div className={cx('input-box')}>
        <input
          className={cx('input-field', borderColor)}
          type='text'
          {...(register && register(name, validator))}
          id={id}
          name={name}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
        <span className={cx('max-length')}>
          {value.length > 0 && `${value.replace(/<br\s*\/?>/gm, '\n').length}/${maxLength}`}
        </span>
      </div>
    </div>
  );
}
