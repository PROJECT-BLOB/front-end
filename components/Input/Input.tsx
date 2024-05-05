// import { useFormContext } from 'react-hook-form';

import styles from './Input.module.scss';

interface InputProps {
  labelName: string;
  id: string;
  // validation: any;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ labelName, id, name, value, onChange }: InputProps) {
  // const {
  //   // register,
  //   formState: { errors },
  // } = useFormContext();

  return (
    <div className={styles['input-box']}>
      <div className={styles.label}>
        <label className={styles['label-name']} htmlFor={id}>
          {labelName}
        </label>
        <span className={styles['label-required']}>*</span>
      </div>

      <input
        className={styles.input}
        type='text'
        // {...register(id)}
        // {...register(id, validation)}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`${labelName}을 입력해주세요`}
      />
      {/* <span className={styles.error}>{errors.root?.message}</span> */}
    </div>
  );
}
