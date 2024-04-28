import style from './style-guide.module.scss';

export default function Page() {
  return (
    <div className={style.page}>
      <div className={style.ibmPlex}>
        <div className={style['weight-100']}> 100 안녕하세요 test </div>
        <div className={style['weight-100']}> 100 안녕하세요 test </div>
        <div className={style['weight-200']}> 200 안녕하세요 test </div>
        <div className={style['weight-300']}> 300 안녕하세요 test </div>
        <div className={style['weight-400']}> 400 안녕하세요 test </div>
        <div className={style['weight-500']}> 500 안녕하세요 test </div>
        <div className={style['weight-600']}> 600 안녕하세요 test </div>
        <div className={style['weight-700']}> 700 안녕하세요 test </div>
        <div className={style['weight-800']}> 800 안녕하세요 test </div>
      </div>
      <div className={style.pretendard}>
        <div className={style['weight-100']}> 100 안녕하세요 test </div>
        <div className={style['weight-200']}> 200 안녕하세요 test </div>
        <div className={style['weight-300']}> 300 안녕하세요 test </div>
        <div className={style['weight-400']}> 400 안녕하세요 test </div>
        <div className={style['weight-500']}> 500 안녕하세요 test </div>
        <div className={style['weight-600']}> 600 안녕하세요 test </div>
        <div className={style['weight-700']}> 700 안녕하세요 test </div>
        <div className={style['weight-800']}> 800 안녕하세요 test </div>
      </div>
      <div className={style.sanserif}>
        <div className={style['weight-100']}> 100 안녕하세요 test </div>
        <div className={style['weight-200']}> 200 안녕하세요 test </div>
        <div className={style['weight-300']}> 300 안녕하세요 test </div>
        <div className={style['weight-400']}> 400 안녕하세요 test </div>
        <div className={style['weight-500']}> 500 안녕하세요 test </div>
        <div className={style['weight-600']}> 600 안녕하세요 test </div>
        <div className={style['weight-700']}> 700 안녕하세요 test </div>
        <div className={style['weight-800']}> 800 안녕하세요 test </div>
      </div>
    </div>
  );
}
