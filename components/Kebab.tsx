import styles from './Kebab.module.scss';

enum CONTENT {
  true = '신고하기',
  false = '삭제하기',
}

export default function Kebab({ isUser }: { isUser: boolean }) {
  //  삭제 시 로직, 신고하기 시 로직 필요

  return (
    <div className={styles['kebab-container']}>
      <button type='button' className='kebab-content' onClick={() => {}}>
        {isUser ? CONTENT.true : CONTENT.false}
      </button>
    </div>
  );
}
