import useModalStore from '@stores/useBlobModalStore';

import styles from './Modal.module.scss';
import useCreateForm from '../_hooks/useCreateForm';

export default function Modal() {
  const { show, toggleModal } = useModalStore();
  const { register, handleSubmit, onSubmit } = useCreateForm();
  // TODO: 카테고리는 구체화 될때까지 보류, 위치도 보류
  // 제목, 내용, 사진

  return (
    show && (
      <>
        <div className={styles['back-drop']} />
        <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className={styles.title}>글 작성</h2>
            <button type='button' onClick={toggleModal} className={styles.button}>
              X
            </button>
          </div>
          <input {...register('title')} type='text' placeholder='제목' className={styles.input} />
          <input {...register('content')} type='text' placeholder='내용' className={styles.input} />
          <input
            {...register('image')}
            type='file'
            id='inputFile'
            accept='image/*'
            multiple
            className={styles.input}
            // onChange={handleImageChange}
          />
          <button type='submit'>완료</button>
        </form>
      </>
    )
  );
}
