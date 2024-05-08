import { useState } from 'react';

import { Switch } from 'antd';
import classNames from 'classnames/bind';
import Image from 'next/image';

import SignInput from '@/app/signin/_components/SignInput/SignInput';
import useCreateUserForm from '@/app/signin/_hooks/useCreateUserForm';
import { UserDetail } from '@/types/User';
import CloseButton from '@icons/x-close.svg';
import { useDetailQueries } from '@queries/useUserQueries';
import { useUserStore } from '@stores/userStore';

import Avatar from '@components/Avatar/Avatar';
import BlobButton from '@components/Button/BlobButton';
import MonoButton from '@components/Button/MonoButton';
import Input from '@components/Input/Input';

import { nicknameValidator } from '@utils/registerOptions';

import styles from './UpdateProfileModal.module.scss';

const cx = classNames.bind(styles);

export default function UpdateProfileModal() {
  const { userId } = useUserStore();
  // TODO: 유저디테일 페이지에서 모달로 props로 내려줄 수는 없을까나...
  // 프사, 닉네임, 바이오는 계속 바뀌는 값이 아닌데 모달에서 api를 다시 호출하는게 굳이..? 싶음

  const { data, isLoading, isError, error } = useDetailQueries(userId);

  if (isLoading) return <div>유저 데이터 로딩중...</div>;

  if (isError) return <div>에러 발생: {error.toString()}</div>;

  const userData: UserDetail | undefined = data?.data;

  console.log('userData', userData);
  // TODO: useUpdateUserForm 만들기
  const { errors, register, handleSubmit, onSubmit, cancelForm, watch } = useCreateUserForm();

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const [value, setValue] = useState('');

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
      <header className={cx('header')}>
        <span>프로필 수정</span>
        <span className={cx('close')}>
          <Image src={CloseButton} fill alt='닫기' onClick={cancelForm} />
        </span>
      </header>

      <main>
        <section className={cx('profile-image')}>
          <Avatar size='medium' imageSource={userData?.profileUrl || ''} />
          <MonoButton text='이미지 수정' type='button' />
        </section>
        <section className={cx('update-informations')}>
          <SignInput
            required
            register={register}
            labelName='닉네임'
            id='nickname'
            name='nickname'
            watch={watch}
            maxLength={10}
            placeholder='닉네임을 입력해주세요'
            errors={errors}
            validator={nicknameValidator}
            // defaultValue={userData?.nickName || ''}
          />
          <Input
            labelName='자기소개'
            id='bio'
            name='bio'
            maxLength={50}
            rows={2} // textarea로 사용하려면 rows 속성 필수추가 해야됨
            value={value}
            onChange={handleChangeTextArea}
            placeholder='한줄로 본인을 소개해보세요.'
          />
          <div className={cx('control-visibility')}>
            <p className={cx('toggle-box')}>
              <span>내프로필 공개하기</span>
              <Switch defaultChecked onChange={onChange} />
            </p>
            <span>동의하시면 프로필이 다른사람들에게 공개됩니다.</span>
          </div>
        </section>
      </main>
      <footer className={cx('buttons')}>
        <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={cancelForm} />
        <BlobButton text='BLOB' type='submit' color='button-colord-contain' />
      </footer>
    </form>
  );
}
