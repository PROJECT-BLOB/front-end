import useModalStore from '@stores/useModalStore';

import ImageUploader from '@components/ImageUploader/ImageUploader';

import styles from './WritePost.module.scss';
import useCreateForm from '../../../app/map/_hooks/useCreateForm';
import ModalContainer from '../Modal';

export default function WritePost() {
  const { toggleModal } = useModalStore();
  const { register, handleSubmit, onSubmit, cancelForm, setValue } = useCreateForm(toggleModal);
  // TODO: 카테고리는 구체화 될때까지 보류, 위치도 보류

  return (
    <ModalContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContainer.Header>글 작성</ModalContainer.Header>
        <ModalContainer.Body>
          <label htmlFor='title'>title</label>
          <input id='title' {...register('title')} type='text' placeholder='제목' className={styles.input} />
          <label htmlFor='content'>content</label>
          <input id='content' {...register('content')} type='text' placeholder='내용' className={styles.input} />
          <ImageUploader setValue={setValue} />
        </ModalContainer.Body>
        <ModalContainer.Footer>
          <div className={styles.footer}>
            <button type='button' onClick={cancelForm} className={styles.cancelButton}>
              취소
            </button>
            <button type='submit' className={styles.submitButton}>
              완료
            </button>
          </div>
        </ModalContainer.Footer>
      </form>
    </ModalContainer>
  );
}
