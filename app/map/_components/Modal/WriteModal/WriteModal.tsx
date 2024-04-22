import useModalStore from '@stores/useBlobModalStore';

import styles from './WriteModal.module.scss';
import useCreateForm from '../../../_hooks/useCreateForm';
import ModalImage from '../ModalImage/ModalImage';

export default function WriteModal() {
  const { toggleModal } = useModalStore();
  const { register, handleSubmit, onSubmit, cancelForm, setValue } = useCreateForm(toggleModal);
  // TODO: 카테고리는 구체화 될때까지 보류, 위치도 보류

  return (
    <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className={styles.title}>글 작성</h2>
      </div>
      <label htmlFor='title'>title</label>
      <input id='title' {...register('title')} type='text' placeholder='제목' className={styles.input} />
      <label htmlFor='content'>content</label>
      <input id='content' {...register('content')} type='text' placeholder='내용' className={styles.input} />
      <ModalImage setValue={setValue} />
      <button type='button' onClick={cancelForm} className={styles.button}>
        취소
      </button>
      <button type='submit'>완료</button>
    </form>
  );
}
