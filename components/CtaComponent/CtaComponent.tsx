import CtaPopular from '@icons/check-heart default 24.svg';
import CtaExplore from '@icons/CTA Explore.svg';
import CtaWrite from '@icons/CTA Write.svg';

import CtaButton from '@components/CtaButton/CtaButton';

import styles from './CtaComponent.module.scss';

export default function CtaComponent({ title = '아직 쓴 글이 없어요' }: { title?: string }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>{title}</h1>
      <h2 className={styles.h2}>이런건 어떠세요?</h2>
      <p className={styles.buttons}>
        <CtaButton imageSource={CtaPopular}>실시간 인기글 보기</CtaButton>
        <CtaButton imageSource={CtaExplore}>새로운 도시 구경하기</CtaButton>
        <CtaButton imageSource={CtaWrite}>직접 글 작성하기</CtaButton>
      </p>
    </div>
  );
}
