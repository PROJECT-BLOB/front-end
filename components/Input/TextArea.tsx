import classNames from 'classnames/bind';

import { TextAreaProps } from '@/types/Input';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export default function TextArea({
  labelName,
  id,
  name,
  watch,
  register,
  maxLength,
  placeholder,
  rows,
  ...rest
}: TextAreaProps) {
  const inputValue = (watch && watch(id)) ?? '';

  return (
    <div className={cx('input')}>
      <div className={cx('label')}>
        <label className={cx('label-name')} htmlFor={id}>
          {labelName}
        </label>
      </div>
      <div className={cx('input-box')}>
        <>
          <textarea
            className={cx('input-field', 'textarea')}
            id={id}
            name={name}
            maxLength={maxLength}
            placeholder={placeholder}
            rows={rows}
            {...(register && register(name as 'bio'))}
            {...rest}
          />
          <span className={cx('max-length')}>{inputValue.length > 0 && `${inputValue.length}/${maxLength}`}</span>
        </>
      </div>
    </div>
  );
}
