import React from 'react';

import MenuBar from '@components/GlobalNavigationBar/MenuBar';
import NavigationTab from '@components/GlobalNavigationBar/NavigationTab';
import Logo from '@components/shared/Logo';

import styles from './GlobalNavigationBar.module.scss';

export default function GlobalNavigationBar() {
  return (
    <nav className={styles.navigation}>
      <div className={styles['align-tab']}>
        <div className={styles['align-menu']}>
          <div className={styles['logo-padding']}>
            <Logo />
          </div>
          <MenuBar />
        </div>
        <NavigationTab />
      </div>
    </nav>
  );
}
