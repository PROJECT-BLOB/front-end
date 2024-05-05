// import { useFormContext } from 'react-hook-form';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

interface InputProps {
  required?: boolean;
  labelName: string;
  id: string;
  // validation: any;
  name: string;
  value: string;
  maxLength: number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  ...rest
}: InputProps) {
  // const {
  // register,
  //   formState: { errors },
  // } = useFormContext();

  return (
    <div className={cx('input', 'text-default')}>
      <div className={cx('label')}>
        <label className={cx('label-name')} htmlFor={id}>
          {labelName}
        </label>
        {required && <span className={cx('label-required')}>*</span>}
      </div>
      <div className={cx('input-and-check')}>
        <div className={cx('input-box')}>
          <input
            className={cx('input-field')}
            type='text'
            // {...register(id)}
            // {...register(id, validation)}
            id={id}
            name={name}
            value={value}
            maxLength={maxLength}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
          />
          <span className={cx('max-length')}>
            ({value.replace(/<br\s*\/?>/gm, '\n').length}/{maxLength})
          </span>
        </div>
        <p className={cx('double-check')}>
          {/* <span className={styles.message}>{errors.root?.message}</span> */}

          <span className={cx('message')}>중복된 아이디입니다.</span>
          <button type='button' className={cx('double-check-button')}>
            중복체크
          </button>
        </p>
      </div>
    </div>
  );
}
