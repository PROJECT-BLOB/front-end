import { useRouter } from 'next/navigation';

import CtaPopular from '@icons/check-heart default 24.svg';
import CtaExplore from '@icons/CTA Explore.svg';
import CtaWrite from '@icons/CTA Write.svg';
import useModalStore, { ModalName } from '@stores/useModalStore';

import CtaButton from '@components/CtaButton/CtaButton';

import styles from './CtaComponent.module.scss';

export default function CtaComponent({
  title = '아직 쓴 글이 없어요',
  isSidebar,
}: {
  title?: string;
  isSidebar?: boolean;
}) {
  const router = useRouter();
  const { toggleModal, setCurrentName } = useModalStore();
  function handleClickWriteButton(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  const buttonClass = isSidebar ? styles['buttons-sidebar'] : styles.buttons;

  const handleClickCta = (href: string) => {
    router.push(href);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>{title}</h1>
      <h2 className={styles.h2}>이런건 어떠세요?</h2>
      <p className={buttonClass}>
        <CtaButton isSidebar={isSidebar} imageSource={CtaPopular} onClick={() => handleClickCta('/feed')}>
          실시간 인기글 보기
        </CtaButton>
        <CtaButton isSidebar={isSidebar} imageSource={CtaExplore} onClick={() => handleClickCta('/map')}>
          새로운 도시 구경하기
        </CtaButton>
        {/* // TODO: 글 작성할 때 마이페이지에서도 작성 가능한가요? 위치때문에.. */}
        <CtaButton isSidebar={isSidebar} imageSource={CtaWrite} onClick={() => handleClickWriteButton('write')}>
          직접 글 작성하기
        </CtaButton>
      </p>
    </div>
  );
}
