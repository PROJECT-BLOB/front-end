import { useRef } from 'react';

import { Switch } from 'antd';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import SignInput from '@/app/signin/_components/SignInput/SignInput';
import { UserDetail } from '@/types/User';
import CloseButton from '@icons/x-close.svg';
import { useDeleteUser, useDetailQueries } from '@queries/useUserQueries';
import { useUserStore } from '@stores/userStore';

import Avatar from '@components/Avatar/Avatar';
import BlobButton from '@components/Button/BlobButton';
import MonoButton from '@components/Button/MonoButton';
import TextArea from '@components/Input/TextArea';
import Loading from '@components/Loading/Loading';

import { nicknameValidator } from '@utils/registerOptions';

import styles from './UpdateProfileModal.module.scss';
import useUpdateUserProfileForm from '../../_hooks/useUpdateUserProfileForm';

const cx = classNames.bind(styles);

export default function UpdateProfileModal() {
  const router = useRouter();
  const { blobId } = useUserStore();
  const { mutate: deleteUserMutate } = useDeleteUser();

  const { data, isLoading, isError, error } = useDetailQueries(blobId);

  if (isLoading) return <Loading />;

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
    isDeleteProfileImage,
    setIsDeleteProfileImage,
  } = useUpdateUserProfileForm(initialData);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickInput = () => {
    inputRef.current?.click();
  };

  const handleClickDeleteUser = () => {
    deleteUserMutate();

    cancelForm();
    localStorage.clear();
    router.push('/');
  };

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
            <Avatar size='medium' imageSource={isDeleteProfileImage ? '' : URL.createObjectURL(selectedImage)} />
          ) : (
            <Avatar size='medium' imageSource={isDeleteProfileImage ? '' : userData?.profileUrl || ''} />
          )}
          <div className={cx('profile-edit-buttons')}>
            <MonoButton type='button' onClick={() => setIsDeleteProfileImage(true)}>
              기본 이미지로 변경
            </MonoButton>
            <input type='file' onChange={handleChangeImage} ref={inputRef} style={{ display: 'none' }} />
            <MonoButton type='button' onClick={handleClickInput}>
              이미지 수정
            </MonoButton>
          </div>
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
      <footer className={cx('footer')}>
        <button type='button' className={cx('delete-user-button')} onClick={handleClickDeleteUser}>
          회원 탈퇴
        </button>
        <div className={cx('form-buttons')}>
          <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={cancelForm} />
          <BlobButton text='BLOB' type='submit' color='button-colord-contain' />
        </div>
      </footer>
    </form>
  );
}
