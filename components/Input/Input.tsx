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
        {rest.rows ? ( // TODO: ts 오류 때문에 textarea를 그냥 따로 빼서 만들어야겠음...^^
          <>
            <textarea
              className={cx('input-field', 'textarea')}
              {...(register && register(name as 'id' | 'nickname', validator))}
              id={id}
              name={name}
              // value={value}
              maxLength={maxLength}
              placeholder={placeholder}
              rows={rest.rows}
              // onChange={onChange}
              {...rest}
            />
            {rest.value && <span className={cx('max-length')}>{`${rest.value.length}/${maxLength}`}</span>}
          </>
        ) : (
          // input일 경우
          <>
            <input
              className={cx('input-field', borderColor)}
              type='text'
              {...(register && register(name as 'id' | 'nickname', validator))}
              id={id}
              name={name}
              maxLength={maxLength}
              placeholder={placeholder}
              {...rest}
            />
            <span className={cx('max-length')}>{inputValue.length > 0 && `${inputValue.length}/${maxLength}`}</span>
          </>
        )}
      </div>
    </div>
  );
}
