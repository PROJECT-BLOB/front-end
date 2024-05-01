import useModalStore from '@stores/useModalStore';

import ImageUploader from '@components/ImageUploader';

import CloseHeader from './CloseHeader';
import ContentInput from './ContentInput';
import TitleInput from './TitleInput';
import styles from './WritePost.module.scss';
import useCreateForm from '../../../app/map/_hooks/useCreateForm';
import BlobButton from '../../Button/BlobButton';
import Modal from '../Modal';

export default function WritePost() {
  const { toggleModal } = useModalStore();
  const { handleSubmit, onSubmit, cancelForm, setValue } = useCreateForm(toggleModal);
  // TODO: 카테고리는 구체화 될때까지 보류, 위치도 보류

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <CloseHeader />
        </Modal.Header>
        <Modal.Body>
          <div>카테고리</div>
          <TitleInput />
          <ContentInput />
          <ImageUploader setValue={setValue} />
        </Modal.Body>
        <Modal.Footer>
          <div className={styles.postFooter}>
            <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={cancelForm} />
            <BlobButton text='BLOB' type='submit' color='button-colord-contain' />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
