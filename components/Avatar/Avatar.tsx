import classNames from 'classnames/bind';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import defaultUserProfileImage from '@images/default-user-image.svg';

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
        <Image
          priority
          fill
          style={{ objectFit: 'cover' }}
          src={imageSource || defaultUserProfileImage}
          alt='프로필 사진'
        />
      </div>
    </>
  );
}
