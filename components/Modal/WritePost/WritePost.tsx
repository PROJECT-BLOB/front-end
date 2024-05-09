import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import AutoCompleteCity from '@/app/maptest/AutoCompleteCity';
import CloseButton from '@/public/icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

// import CategoryFiltering from '@components/Category/CategoryFiltering';
import ImageUploader from '@components/ImageUploader';
import Input from '@components/Input/Input';

import PositionDetail from './PositionDetail';
import styles from './WritePost.module.scss';
import useCreateForm from '../../../app/map/_hooks/useCreateForm';
import BlobButton from '../../Button/BlobButton';

const cx = classNames.bind(styles);

export default function WritePost() {
  const { toggleModal } = useModalStore();
  const { handleSubmit, onSubmit, cancelForm, setValue } = useCreateForm(toggleModal);
  const [titleInputValue, setTitleInputValue] = useState('');

  // 제목이 없으면 blob를 눌러도 제출이 되지 않게 했습니다

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(event.target.value);
  };

  const onSelectCity = (city: string) => {
    console.log(`Selected city: ${city}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
      <header className={cx('close-header')}>
        <span>글쓰기</span>
        <span className={cx('close-button')}>
          <Image src={CloseButton} fill alt='닫기' onClick={toggleModal} />
        </span>
      </header>
      <div className={cx('post-body')}>
        <p className={cx('category-title')}>
          카테고리<span className={cx('force')}> * </span>
        </p>

        {/* <CategoryFiltering categoryFilteringType='recommendation' title='추천' />
        <CategoryFiltering categoryFilteringType='blame' title='비추천' />
        <CategoryFiltering categoryFilteringType='question' title='질문' />
        <CategoryFiltering categoryFilteringType='caution' title='주의' />
        <CategoryFiltering categoryFilteringType='help' title='도움' /> */}
        <Input
          labelName='제목'
          id='title'
          name='title'
          placeholder='제목은 필수입니다'
          maxLength={20}
          onChange={handleTitleInputChange}
        />
        <Input labelName='내용' id='content' name='content' placeholder='내용을 입력하세요' maxLength={20} />
        <p className={cx('city-title')}> 어디에 관한 글인가요? (도시까지)</p>
        <AutoCompleteCity onSelectCity={onSelectCity} />
        <PositionDetail />
        <ImageUploader setValue={setValue} />
      </div>
      <div className={styles.postFooter}>
        <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={cancelForm} />
        <BlobButton text='BLOB' type='submit' color='button-colord-contain' disabled={!titleInputValue} />
      </div>
    </form>
  );
}
