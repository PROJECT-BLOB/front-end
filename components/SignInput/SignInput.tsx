import classNames from 'classnames/bind';

import { ValidatorType } from '@utils/registerOptions';

import styles from './SignInput.module.scss';
// import { FieldValues, UseFormRegister } from 'react-hook-form';

const cx = classNames.bind(styles);

interface InputProps {
  required?: boolean;
  labelName: string;
  id: string;
  name: string;
  value: string;
  maxLength: number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // register?: UseFormRegister<FieldValues>;
  register?: any;
  errors?: any;
  validator?: ValidatorType;
}

export default function SignInput({
  required,
  labelName,
  id,
  name,
  value,
  maxLength,
  placeholder,
  onChange,
  register,
  errors,
  validator,
  ...rest
}: InputProps) {
  console.log('errors', errors);
  // const hasError = errors && errors[name];
  const errorText = errors && errors[name] ? 'error-text' : '';
  const errorInput = errors && errors[name] ? 'error-input' : '';

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
            className={cx('input-field', errorInput)}
            // className={cx('input-field', hasError && 'error-input')}
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
            ({value.replace(/<br\s*\/?>/gm, '\n').length}/{maxLength})
          </span>
        </div>
        <p className={cx('double-check')}>
          <span className={cx('message', errorText)}>{errors[name]?.message || ''}</span>
        </p>
      </div>
    </div>
  );
}
