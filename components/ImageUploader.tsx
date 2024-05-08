import { UseFormSetValue } from 'react-hook-form';

import Image from 'next/image';

import Upload from '@public/icons/upload-01.svg';

import useUploadImage from '@hooks/useUploadImage';

import styles from './ImageUploader.module.scss';
import { ContentField } from '../app/map/_hooks/useCreateForm';

interface ModalImageProps {
  setValue: UseFormSetValue<ContentField>;
}

export default function ImageUploader({ setValue }: ModalImageProps) {
  const { imageList, handleChangeImage } = useUploadImage({ setValue });

  return (
    <>
      {imageList &&
        imageList.map((image) => (
          <Image
            key={image}
            src={image}
            alt='이미지'
            width={48} // 원하는 너비를 설정하세요
            height={48} // 원하는 높이를 설정하세요
          />
        ))}
      <label htmlFor='inputFile'>
        <div className={styles.inputFile}>
          <Image src={Upload} alt='업로드하기' />
          <p>업로드</p>
        </div>
      </label>
      <input type='file' id='inputFile' accept='image/*' multiple onChange={handleChangeImage} />
    </>
  );
}
