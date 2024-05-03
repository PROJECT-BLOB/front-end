import styles from './Input.module.scss';

interface InputProps {
  labelName: string;
  id: string;
  // validation: any;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // register: any; // register 함수 전달 - 에러남,,,,사용법 공부 필요
}

export default function Input({ labelName, id, name, value, onChange }: InputProps) {
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
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`${labelName}을 입력해주세요`}
        // {...register(id, validation)} // register 함수 사용
      />
      {/* <span className={styles.error}>{error}</span> */}
    </div>
  );
}
