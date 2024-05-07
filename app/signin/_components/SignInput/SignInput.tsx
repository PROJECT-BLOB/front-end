import classNames from 'classnames/bind';

import { InputProps } from '@/types/Input';

import Input from '@components/Input/Input';

import styles from './SignInput.module.scss';

const cx = classNames.bind(styles);

export default function SignInput({
  required,
  labelName,
  id,
  name,
  watch,
  maxLength,
  placeholder,
  register,
  errors,
  validator,
}: InputProps) {
  console.log('errors', errors);
  const errorText = errors && errors[name] ? 'error-text' : '';
  const errorInput = errors && errors[name] ? 'error-input' : '';

  const errorMessage = errors?.[name]?.message ?? '';

  return (
    <div className={cx('input-and-check')}>
      <Input
        required={required}
        labelName={labelName}
        id={id}
        name={name}
        watch={watch}
        maxLength={maxLength}
        placeholder={placeholder}
        register={register}
        validator={validator}
        borderColor={errorInput}
      />
      <span className={cx('message', errorText)}>{errorMessage}</span>
    </div>
  );
}
