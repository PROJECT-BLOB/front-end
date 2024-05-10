import { UseFormSetValue } from 'react-hook-form';

import Image from 'next/image';

import { ContentField } from '@/app/map/_hooks/useCreateForm';
import Upload from '@public/icons/upload-01.svg';
import UploadImg from '@public/icons/upload-image.svg';

import useUploadImage from '@hooks/useUploadImage';

import styles from './ImageUploader.module.scss';

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
            width={78} // 원하는 너비를 설정하세요
            height={78} // 원하는 높이를 설정하세요
          />
        ))}
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
