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
  watch,
  maxLength,
  placeholder,
  register,
  validator,
  borderColor,
  ...rest
}: ExtendedInputProps) {
  const inputValue = (watch && watch(id)) ?? '';

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
          // {...(register && register(name as 'id' | 'nickname', validator))}
          {...(register && register(name , validator))}

          id={id}
          name={name}
          maxLength={maxLength}
          placeholder={placeholder}
          {...rest}
        />
        <span className={cx('max-length')}>{inputValue.length > 0 && `${inputValue.length}/${maxLength}`}</span>
      </div>
    </div>
  );
}
