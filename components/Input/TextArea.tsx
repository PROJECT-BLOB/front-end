import classNames from 'classnames/bind';

import { TextAreaProps } from '@/types/Input';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export default function TextArea({
  labelName,
  id,
  name,
  value,
  onChange,
  maxLength,
  placeholder,
  rows,
  ...rest
}: TextAreaProps) {
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
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            rows={rows}
            onChange={onChange}
            {...rest}
          />
          {value && <span className={cx('max-length')}>{`${value.length}/${maxLength}`}</span>}
        </>
      </div>
    </div>
  );
}
