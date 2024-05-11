import classNames from 'classnames/bind';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

interface AvatarProps {
  size: 'small' | 'medium' | 'large';
  imageSource: string | StaticImport;
}

export default function Avatar({ size, imageSource }: AvatarProps) {
  return (
    <>
      <div className={cx(size, 'profile-image')}>
        <Image fill objectFit='cover' src={imageSource} alt='프로필 사진' />
      </div>
    </>
  );
}
