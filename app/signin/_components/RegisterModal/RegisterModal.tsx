import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import useCreateUserForm from '@/app/map/_hooks/useCreateUserForm';
import CloseButton from '@/public/icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

import BlobButton from '@components/Button/BlobButton';

import { blobIdValidator, nicknameValidator } from '@utils/registerOptions';

import styles from './RegisterModal.module.scss';
import SignInput from '../SignInput/SignInput';

const cx = classNames.bind(styles);

export default function RegisterModal() {
  const { toggleModal } = useModalStore();
  const { errors, register, handleSubmit, onSubmit, cancelForm } = useCreateUserForm(toggleModal);

  const [userFormData, setUserFormData] = useState({
    id: '',
    nickname: '',
  });

  console.log(userFormData);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFormData((prevValues: { id: string; nickname: string }) => {
      const { name, value } = e.target;

      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  return (
    <form className={cx('form')} onSubmit={handleSubmit(() => onSubmit(userFormData))}>
      <header className={cx('header')}>
        <span>회원가입</span>
        <span className={cx('close')}>
          <Image src={CloseButton} fill alt='닫기' onClick={cancelForm} />
        </span>
      </header>

      <main className={cx('input')}>
        <SignInput
          required
          register={register}
          labelName='아이디'
          id='id'
          name='id'
          value={userFormData.id}
          maxLength={20}
          onChange={handleChangeInput}
          placeholder='아이디를 입력해주세요'
          errors={errors}
          validator={blobIdValidator}
        />

        <SignInput
          required
          register={register}
          labelName='닉네임'
          id='nickname'
          name='nickname'
          value={userFormData.nickname}
          maxLength={10}
          onChange={handleChangeInput}
          placeholder='닉네임을 입력해주세요'
          errors={errors}
          validator={nicknameValidator}
        />
      </main>

      <footer className={cx('buttons')}>
        <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={cancelForm} />
        <BlobButton text='회원가입' type='submit' color='button-colord-contain' />
      </footer>
    </form>
  );
}
