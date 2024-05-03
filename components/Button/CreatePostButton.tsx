import EllipseIcon from '@icons/ellipse-63.svg?component';
import PlusIcon from '@icons/plus.svg?component';

import styles from './CreatePostButton.module.scss';

interface CreatePostButtonProps {
  onClick?: () => void;
}

export default function CreatePostButton({ onClick }: CreatePostButtonProps = {}) {
  return (
    <button type='button' className={styles.background} onClick={onClick}>
      <EllipseIcon className={styles.ellipse} />
      <PlusIcon className={styles.plus} />
    </button>
  );
}
