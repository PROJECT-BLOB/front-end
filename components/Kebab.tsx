import styles from './Kebab.module.scss';

enum CONTENT {
  user = '삭제하기',
  notUser = '신고하기',
}

export default function Kebab({ isUser }: { isUser: boolean }) {
  //  삭제 시 로직, 신고하기 시 로직 필요

  return (
    <div className={styles['kebab-container']}>
      <button type='button' className='kebab-content' onClick={() => {}}>
        {isUser ? CONTENT.user : CONTENT.notUser}
      </button>
    </div>
  );
}
