import React from 'react';

import TabItem from '@components/GlobalNavigationBar/TabItem';

import styles from './NavigationTabs.module.scss';

const NAVIGATION_TABS = [
  { label: 'Map', href: '/map' },
  { label: 'Feed', href: '/feed' },
];

export default function NavigationTab() {
  if (!NAVIGATION_TABS.length) {
    return null;
  }

  return (
    <div className={styles['align-tabs']}>
      {NAVIGATION_TABS.map((tab, index) => (
        <TabItem key={tab.label} label={tab.label} href={tab.href} isFirstChild={!index} />
      ))}
    </div>
  );
}
