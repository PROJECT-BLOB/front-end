import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import useCreateUserForm from '@/app/map/_hooks/useCreateUserForm';
import Input from '@/components/Input/Input';
import CloseButton from '@/public/icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

import BlobButton from '@components/Button/BlobButton';

import styles from './CreateUser.module.scss';
import Modal from '../Modal';

const cx = classNames.bind(styles);

export default function CreateUser() {
  const { toggleModal } = useModalStore();
  const { handleSubmit, onSubmit, cancelForm } = useCreateUserForm(toggleModal);

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

  // TODO: id, nickname 유효성 검사 추가
  return (
    <Modal>
      <form className={cx('form')} onSubmit={handleSubmit(() => onSubmit(userFormData))}>
        <header className={cx('header')}>
          <span>회원가입</span>
          <span className={cx('close')}>
            <Image src={CloseButton} fill alt='닫기' onClick={cancelForm} />
          </span>
        </header>

        <main className={cx('input')}>
          <Input labelName='아이디' id='id' name='id' value={userFormData.id} onChange={handleChangeInput} />
          <Input
            labelName='닉네임'
            id='nickname'
            name='nickname'
            value={userFormData.nickname}
            onChange={handleChangeInput}
          />
        </main>

        <footer className={cx('buttons')}>
          {/* <button type='button' onClick={cancelForm}>
            취소
          </button> */}
          {/* <button type='submit'>회원가입</button> */}
          <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={cancelForm} />
          {/* <BlobButton text='회원가입' type='submit' color='button-colord-contain' /> */}
          <button type='submit'>회원가입</button>
        </footer>
      </form>
    </Modal>
  );
}
