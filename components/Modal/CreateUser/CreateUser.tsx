import { useState } from 'react';

// import classNames from 'classnames/bind';

import Image from 'next/image';

import useCreateUserForm from '@/app/map/_hooks/useCreateUserForm';
import Input from '@/components/Input/Input';
import CloseButton from '@/public/icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

import styles from './CreateUser.module.scss';

// const cx = classNames.bind(styles);

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
    <form className={styles.form} onSubmit={handleSubmit(() => onSubmit(userFormData))}>
      {/* <Modal.Header> */}
      <header className={styles.header}>
        <span>회원가입</span>
        <span className={styles.close}>
          <Image src={CloseButton} fill alt='닫기' onClick={cancelForm} />
        </span>
      </header>
      {/* </Modal.Header> */}
      {/* <Modal.Body> */}
      <main className={styles.input}>
        <Input
          labelName='아이디'
          id='id'
          name='id'
          value={userFormData.id}
          onChange={handleChangeInput}
          // register={register}
        />
        <Input
          labelName='닉네임'
          id='nickname'
          name='nickname'
          value={userFormData.nickname}
          onChange={handleChangeInput}
          // register={register}
        />
      </main>

      {/* </Modal.Body> */}
      {/* <Modal.Footer> */}
      <footer className={styles.buttons}>
        <button type='button' onClick={cancelForm}>
          취소
        </button>
        <button type='submit'>회원가입</button>
      </footer>
      {/* </Modal.Footer> */}
    </form>
  );
}
