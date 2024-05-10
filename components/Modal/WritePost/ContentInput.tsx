import useCreateForm from '@/app/map/_hooks/useCreateForm';
import useModalStore from '@stores/useModalStore';

import styles from './ContentInput.module.scss';

export default function ContentInput() {
  const { toggleModal } = useModalStore();
  const { register } = useCreateForm(toggleModal);

  return (
    <>
      <label htmlFor='content'>내용</label>
      <input id='content' {...register('content')} type='text' placeholder='내용' className={styles.input} />
    </>
  );
}
