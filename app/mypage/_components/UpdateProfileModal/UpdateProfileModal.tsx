/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Switch } from 'antd';
import classNames from 'classnames/bind';
import Image from 'next/image';

import SignInput from '@/app/signin/_components/SignInput/SignInput';
import { UserDetail } from '@/types/User';
import CloseButton from '@icons/x-close.svg';
import { useDetailQueries } from '@queries/useUserQueries';
import { useUserStore } from '@stores/userStore';

import Avatar from '@components/Avatar/Avatar';
import BlobButton from '@components/Button/BlobButton';
import MonoButton from '@components/Button/MonoButton';
import TextArea from '@components/Input/TextArea';

import { nicknameValidator } from '@utils/registerOptions';

import styles from './UpdateProfileModal.module.scss';
import useUpdateUserProfileForm from '../../_hooks/useUpdateUserProfileForm';

const cx = classNames.bind(styles);

export default function UpdateProfileModal() {
  const { userId } = useUserStore();

  const { data, isLoading, isError, error } = useDetailQueries(userId);

  if (isLoading) return <div>유저 데이터 로딩중...</div>;

  if (isError) return <div>에러 발생: {error.toString()}</div>;

  const userData: UserDetail | undefined = data?.data;

  const initialData = {
    profileUrl: userData?.profileUrl || '',
    nickname: userData?.nickname || '',
    bio: userData?.bio || '',
    isPublic: userData?.isPublic || false,
  };

  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    cancelForm,
    watch,
    isPublic,
    onChangeToggle,
    selectedImage,
    handleChangeImage,
  } = useUpdateUserProfileForm(initialData);

  return (
    <form className={cx('form')} onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
      <header className={cx('header')}>
        <span>프로필 수정</span>
        <span className={cx('close')}>
          <Image src={CloseButton} fill alt='닫기' onClick={cancelForm} />
        </span>
      </header>

      <main className={cx('main-section')}>
        <section className={cx('profile-image')}>
          {selectedImage ? (
            <Avatar size='medium' imageSource={URL.createObjectURL(selectedImage)} />
          ) : (
            <Avatar size='medium' imageSource={userData?.profileUrl || ''} />
          )}
          {/* TODO: 이 부분 수정해야 됨ㅋㅋ */}
          <input id='profileImageInput' type='file' onChange={handleChangeImage} />
          {document.getElementById('profileImageInput') && (
            <MonoButton
              text='이미지 수정'
              type='button'
              onClick={() => document.getElementById('profileImageInput')!.click()}
            />
          )}
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
          />
          <TextArea
            labelName='자기소개'
            id='bio'
            name='bio'
            watch={watch}
            maxLength={50}
            rows={2}
            register={register}
            placeholder='한줄로 본인을 소개해보세요.'
          />
          <div className={cx('control-visibility')}>
            <p className={cx('toggle-box')}>
              <span>내프로필 공개하기</span>
              <Switch checked={isPublic} onChange={onChangeToggle} />
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
