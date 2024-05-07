import { useState } from 'react';

import AutoCompleteCity from '@/app/maptest/AutoCompleteCity';
import useModalStore from '@stores/useModalStore';

// import CategoryFiltering from '@components/Category/CategoryFiltering';
import ImageUploader from '@components/ImageUploader';

import CloseHeader from './CloseHeader';
import ContentInput from './ContentInput';
import PositionDetail from './PositionDetail';
import TitleInput from './TitleInput';
import styles from './WritePost.module.scss';
import useCreateForm from '../../../app/map/_hooks/useCreateForm';
import BlobButton from '../../Button/BlobButton';

export default function WritePost() {
  const { toggleModal } = useModalStore();
  const { handleSubmit, onSubmit, cancelForm, setValue } = useCreateForm(toggleModal);
  const [titleInputValue, setTitleInputValue] = useState('');

  // 제목이 없으면 blob를 눌러도 제출이 되지 않게 했습니다

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.postHeader}>
        <CloseHeader />
      </div>
      <div className={styles.postBody}>
        <p>카테고리</p>
        {/* <CategoryFiltering categoryFilteringType='recommendation' title='추천' />
        <CategoryFiltering categoryFilteringType='blame' title='비추천' />
        <CategoryFiltering categoryFilteringType='question' title='질문' />
        <CategoryFiltering categoryFilteringType='caution' title='주의' />
        <CategoryFiltering categoryFilteringType='help' title='도움' /> */}
        <TitleInput onChange={handleTitleInputChange} />
        <ContentInput />
        <PositionDetail />
        <AutoCompleteCity />
        <ImageUploader setValue={setValue} />
      </div>
      <div className={styles.postFooter}>
        <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={cancelForm} />
        <BlobButton text='BLOB' type='submit' color='button-colord-contain' disabled={!titleInputValue} />
      </div>
    </form>
  );
}
