import useCreateForm from '@/app/map/_hooks/useCreateForm';
import useModalStore from '@stores/useModalStore';

import styles from './TitleInput.module.scss';

export default function TitleInput({ onChange }: { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  const { toggleModal } = useModalStore();
  const { register } = useCreateForm(toggleModal);

  return (
    <>
      <label htmlFor='title'>
        제목 <span className={styles.force}> * </span>
      </label>
      <input
        id='title'
        {...register('title')}
        type='text'
        placeholder='제목'
        className={styles.input}
        onChange={onChange}
      />
    </>
  );
}
