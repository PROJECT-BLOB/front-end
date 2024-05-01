import { useState } from 'react';

// import classNames from 'classnames/bind';

import Image from 'next/image';

import useCreateUserForm from '@/app/map/_hooks/useCreateUserForm';
import Input from '@/components/Input/Input';
import CloseButton from '@/public/icons/x-close.svg';
import useModalStore from '@stores/useModalStore';
// import { useUserStore } from '@stores/userStore';
import { useOAuthStore } from '@stores/useOAuthStore';

import styles from './CreateUser.module.scss';
import Modal from '../Modal';

// import createUser from '@apis/user/sign/createUser';

// const cx = classNames.bind(styles);

export default function CreateUser() {
  const { oauthId } = useOAuthStore();
  console.log(oauthId); // null이 담겨오네요...............

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

  const handleSubmitUserForm = async () => {
    // TODO: 유저 정보 백엔드에 전송
    // oauthId가 null임.....
    // const { data, status } = await createUser({ oauthId: oauthId, ...userFormData });
    // status===200이면 회원가입 성공, 로그인 처리
    // if(status===200){
    //   const { signin } = useUserStore();
    //   signin();
    // }
  };

  // 스타일링 해야됨
  return (
    <Modal>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          <button type='submit' onClick={handleSubmitUserForm}>
            회원가입
          </button>
        </footer>
        {/* </Modal.Footer> */}
      </form>
    </Modal>
  );
}
