import classNames from 'classnames/bind';

import { InputProps } from '@/types/Input';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export interface ExtendedInputProps extends InputProps {
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
}: ExtendedInputProps) {
  return (
    <div className={cx('input')}>
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
          {...(register && register(name as 'id' | 'nickname', validator))}
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
