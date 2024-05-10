import { UseFormSetValue } from 'react-hook-form';

import Image from 'next/image';

import UploadImg from '@public/icons/upload-image.svg';

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
      {imageList && imageList.map((image) => <Image key={image} src={image} alt='이미지' width={78} height={78} />)}
      <label htmlFor='inputFile'>
        <div className={styles.inputFile}>
          <Image src={UploadImg} alt='업로드하기' />
          <p>업로드</p>
        </div>
        <input type='file' id='inputFile' accept='image/*' multiple onChange={handleChangeImage} />
      </label>
    </>
  );
}
