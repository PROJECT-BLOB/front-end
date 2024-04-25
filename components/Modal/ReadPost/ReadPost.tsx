import Image from 'next/image';

import useModalStore from '@stores/useModalStore';

import styles from './ReadPost.module.scss';
import Modal from '../Modal';

export default function ReadPost() {
  const mockImage = {
    title: '사람 살려요',
    content: '뒤에 듀크가 쫓아와요',
    imageList: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
      'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
    ],
  }; // useQuery로 데이터 받아옴

  const { toggleModal } = useModalStore();

  return (
    <Modal>
      <Modal.Header>{mockImage.title}</Modal.Header>
      <button type='button' onClick={toggleModal} className={styles.button}>
        X
      </button>
      <Modal.Body>
        {mockImage.content}
        {mockImage.imageList.map((image) => (
          <Image key={image} src={image} alt='이미지' width={200} height={200} />
        ))}
      </Modal.Body>
    </Modal>
  );
}
