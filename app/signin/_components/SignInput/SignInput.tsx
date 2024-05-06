import classNames from 'classnames/bind';

import Input from '@components/Input/Input';

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
}: InputProps) {
  console.log('errors', errors);
  const errorText = errors && errors[name] ? 'error-text' : '';
  const errorInput = errors && errors[name] ? 'error-input' : '';

  return (
    <div className={cx('input-and-check')}>
      <Input
        required={required}
        labelName={labelName}
        id={id}
        name={name}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        register={register}
        validator={validator}
        borderColor={errorInput}
      />
      <span className={cx('message', errorText)}>{errors[name]?.message || ''}</span>
    </div>
  );
}
