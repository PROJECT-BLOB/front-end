'use client';

import { useUserStore } from '@stores/userStore';

import NavigationTab from '@components/GlobalNavigationBar/NavigationTab';
import Logo from '@components/shared/Logo';

import styles from './GlobalNavigationBar.module.scss';
import SignedMenuBar from './SignedMenubar';
import SigninMenubar from './SigninMenubar';

export default function GlobalNavigationBar() {
  const { isSignin, isLoaded } = useUserStore();

  if (!isLoaded) return null; // 로딩 중일 때는 아무것도 렌더링하지 않음

  return (
    <nav className={styles.navigation}>
      <div className={styles['align-tab']}>
        <div className={styles['align-menu']}>
          <div className={styles['logo-padding']}>
            <Logo />
          </div>
          {isSignin ? <SignedMenuBar /> : <SigninMenubar />}
        </div>
        <NavigationTab />
      </div>
    </nav>
  );
}
