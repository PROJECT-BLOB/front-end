import useModalStore from '@stores/useModalStore';

import styles from './TitleInput.module.scss';
import useCreateForm from '../../../app/map/_hooks/useCreateForm';

export default function TitleInput() {
  const { toggleModal } = useModalStore();
  const { register } = useCreateForm(toggleModal);

  return (
    <>
      <label htmlFor='title'>
        제목 <span className={styles.force}> * </span>
      </label>
      <input id='title' {...register('title')} type='text' placeholder='제목' className={styles.input} />
    </>
  );
}
